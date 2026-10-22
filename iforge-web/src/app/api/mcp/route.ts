import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { z } from "zod";
import { isAgentRequest } from "@/lib/hermes";
import { getInquiry, listInquiries, updateInquiry, type Inquiry, type InquiryPatch } from "@/lib/inquiries";

/**
 * MCP endpoint for the Hermes agent (Streamable HTTP, stateless, JSON
 * responses). Hermes connects with:
 *
 *   mcp_servers:
 *     iforge:
 *       url: "https://<your-site>/api/mcp"
 *       headers: { Authorization: "Bearer ${IFORGE_AGENT_KEY}" }
 *
 * and gets three tools — mcp__iforge__list_inquiries, mcp__iforge__get_inquiry
 * and mcp__iforge__update_inquiry. Every update is logged on the enquiry as a
 * Hermes action and shows up in the admin inbox.
 */

export const dynamic = "force-dynamic";

const STATUS = z.enum(["new", "in_progress", "resolved", "archived"]);
const ASSIGNEE = z.enum(["unassigned", "hermes", "admin"]);

const json = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] });
const fail = (message: string) => ({ content: [{ type: "text" as const, text: message }], isError: true });

/** The fields worth reading in a list; get_inquiry returns everything. */
const summary = (i: Inquiry) => ({
  id: i.id,
  ticket: i.ticket,
  status: i.status,
  assignee: i.assignee,
  createdAt: i.createdAt,
  source: i.source,
  name: i.name,
  email: i.email,
  company: i.company,
  service: i.service,
  budget: i.budget,
  timeline: i.timeline,
  message: i.message.slice(0, 280),
});

function buildServer() {
  const server = new McpServer(
    { name: "iforge", version: "1.0.0" },
    {
      instructions:
        "Website enquiries for iForge Technologies (enterprise IT, cloud, AI/ML, cybersecurity, app development). " +
        "Use get_inquiry to read one, update_inquiry to triage it. Replies you write are DRAFTS for a human to review " +
        "and send — nothing you write is emailed to the customer.",
    },
  );

  server.registerTool(
    "list_inquiries",
    {
      title: "List enquiries",
      description:
        "List website enquiries, newest first. Filter by status (new, in_progress, resolved, archived) and/or " +
        "`since` (ISO timestamp — only enquiries changed after it). Messages are truncated; use get_inquiry for one in full.",
      inputSchema: {
        status: STATUS.optional(),
        since: z.string().optional().describe("ISO 8601 timestamp"),
        limit: z.number().int().min(1).max(200).optional().describe("Default 50"),
      },
      annotations: { readOnlyHint: true },
    },
    async ({ status, since, limit }) => json((await listInquiries({ status, since, limit: limit ?? 50 })).map(summary)),
  );

  server.registerTool(
    "get_inquiry",
    {
      title: "Read an enquiry",
      description: "Read one enquiry in full — contact details, message, notes, draft reply and its activity log.",
      inputSchema: { id: z.string().describe("The enquiry id (not the IF-#### ticket)") },
      annotations: { readOnlyHint: true },
    },
    async ({ id }) => {
      const inquiry = await getInquiry(id);
      return inquiry ? json(inquiry) : fail(`No enquiry with id ${id}`);
    },
  );

  server.registerTool(
    "update_inquiry",
    {
      title: "Triage an enquiry",
      description:
        "Update an enquiry: set its status, write triage notes, and/or save a DRAFT reply. The reply is stored for a " +
        "human to review and send; it is NOT emailed to the customer. Omitted fields are left unchanged. Updating an " +
        "unassigned enquiry assigns it to Hermes. Every change is logged and shown in the admin inbox.",
      inputSchema: {
        id: z.string().describe("The enquiry id"),
        status: STATUS.optional(),
        notes: z.string().max(10_000).optional().describe("Triage notes for the team — replaces the current notes"),
        reply: z.string().max(10_000).optional().describe("Draft reply to the customer — replaces the current draft"),
        assignee: ASSIGNEE.optional(),
      },
      annotations: { destructiveHint: false, idempotentHint: true },
    },
    async ({ id, ...fields }) => {
      const current = await getInquiry(id);
      if (!current) return fail(`No enquiry with id ${id}`);
      const patch: InquiryPatch = Object.fromEntries(
        Object.entries(fields).filter(([, v]) => v !== undefined),
      ) as InquiryPatch;
      if (!Object.keys(patch).length) return fail("Nothing to update — pass status, notes, reply or assignee.");
      if (!patch.assignee && current.assignee === "unassigned") patch.assignee = "hermes";
      const updated = await updateInquiry(id, patch, "agent");
      return updated ? json(summary(updated)) : fail("Update failed");
    },
  );

  return server;
}

async function handle(request: Request): Promise<Response> {
  if (!isAgentRequest(request)) {
    return Response.json(
      { jsonrpc: "2.0", error: { code: -32001, message: "Unauthorized — send Authorization: Bearer <AGENT_API_KEY>" }, id: null },
      { status: 401 },
    );
  }
  // Stateless: a fresh server per request, plain JSON replies (no SSE stream).
  const server = buildServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  return transport.handleRequest(request);
}

export { handle as GET, handle as POST, handle as DELETE };
