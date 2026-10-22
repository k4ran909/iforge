import { isAuthenticated } from "@/lib/auth";
import { parsePatch, updateInquiry } from "@/lib/inquiries";

// Admin: change an enquiry's status, assignee, notes or reply.
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const patch = parsePatch(await request.json().catch(() => null));
  if (!patch) return Response.json({ ok: false, error: "Nothing to update." }, { status: 400 });
  const inquiry = await updateInquiry(id, patch, "admin");
  if (!inquiry) return Response.json({ ok: false, error: "Not found" }, { status: 404 });
  return Response.json({ ok: true, inquiry });
}
