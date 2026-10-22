import { isAuthenticated } from "@/lib/auth";
import { getContent, saveContent, type SiteContent } from "@/lib/content";
import { revalidatePath } from "next/cache";

// GET: current content (admin only — the public reads via getContent() in pages).
export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContent();
  return Response.json({ ok: true, content });
}

// PUT: save the full content document, then revalidate every page that reads it.
export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let content: SiteContent;
  try {
    content = (await request.json()) as SiteContent;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const result = await saveContent(content);
  if (!result.ok) {
    return Response.json({ ok: false, error: result.error }, { status: 500 });
  }

  // Refresh the public pages so edits show up immediately.
  for (const path of ["/", "/about", "/community", "/contact", "/quote"]) {
    revalidatePath(path);
  }
  revalidatePath("/services/[slug]", "page");

  return Response.json({ ok: true });
}
