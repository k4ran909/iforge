import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/auth";
import { getContent, saveContent, type TeamMember } from "@/lib/content";

const s = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Save the whole team list (order included) from the admin team editor.
export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body?.team)) {
    return Response.json({ ok: false, error: "Invalid team." }, { status: 400 });
  }

  const team: TeamMember[] = (body.team as Record<string, unknown>[])
    .map((m) => ({
      id: s(m.id, 64) || crypto.randomUUID(),
      name: s(m.name, 120),
      role: s(m.role, 120),
      bio: s(m.bio, 1200),
      photo: s(m.photo, 1000),
      linkedin: s(m.linkedin, 300) || undefined,
      github: s(m.github, 300) || undefined,
      x: s(m.x, 300) || undefined,
    }))
    .filter((m) => m.name);

  const content = await getContent();
  const result = await saveContent({ ...content, team });
  if (!result.ok) return Response.json({ ok: false, error: result.error }, { status: 500 });
  revalidatePath("/team");
  return Response.json({ ok: true, team });
}
