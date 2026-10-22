import { isAgentRequest } from "@/lib/hermes";
import { getInquiry, parsePatch, updateInquiry } from "@/lib/inquiries";

// Agent API (Hermes): read one enquiry, or update it.
//   PATCH body: { status?, notes?, reply?, assignee? } — every change is
//   logged on the enquiry as an "agent" event. Touching an unassigned
//   enquiry claims it for Hermes.
type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Ctx) {
  if (!isAgentRequest(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const inquiry = await getInquiry((await params).id);
  if (!inquiry) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, inquiry });
}

export async function PATCH(request: Request, { params }: Ctx) {
  if (!isAgentRequest(request)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const patch = parsePatch(await request.json().catch(() => null));
  if (!patch) return Response.json({ ok: false, error: "Nothing to update." }, { status: 400 });

  const current = await getInquiry(id);
  if (!current) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  if (!patch.assignee && current.assignee === "unassigned") patch.assignee = "hermes";

  const inquiry = await updateInquiry(id, patch, "agent");
  return Response.json({ ok: true, inquiry });
}
