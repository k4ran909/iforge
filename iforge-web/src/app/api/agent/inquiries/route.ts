import { isAgentRequest } from "@/lib/hermes";
import { listInquiries, type InquiryStatus } from "@/lib/inquiries";

// Agent API (Hermes): list enquiries.
//   GET /api/agent/inquiries?status=new&since=<ISO>&limit=50
//   Authorization: Bearer <AGENT_API_KEY>
export async function GET(request: Request) {
  if (!isAgentRequest(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const q = new URL(request.url).searchParams;
  const status = (q.get("status") || undefined) as InquiryStatus | undefined;
  const limit = Math.min(Number(q.get("limit")) || 50, 200);
  const inquiries = await listInquiries({ status, since: q.get("since") || undefined, limit });
  return Response.json({ ok: true, inquiries });
}
