import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";
import AdminEditor from "../../AdminEditor";

export const metadata = { title: "Content · Admin · iForge", robots: { index: false } };

export default async function ContentPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  return <AdminEditor initialContent={await getContent()} />;
}
