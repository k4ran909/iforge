import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";
import TeamEditor from "../../TeamEditor";

export const metadata = { title: "Team · Admin · iForge", robots: { index: false } };

export default async function TeamAdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { team } = await getContent();
  return <TeamEditor initialTeam={team} />;
}
