import { isAuthenticated } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";

// Admin inbox feed. `?since=<ISO>` returns only enquiries changed after it,
// which the inbox polls for new-enquiry notifications.
export async function GET(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const since = new URL(request.url).searchParams.get("since") || undefined;
  try {
    const inquiries = await listInquiries({ since });
    return Response.json({ ok: true, inquiries, serverTime: new Date().toISOString() });
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : "Load failed" },
      { status: 500 },
    );
  }
}
