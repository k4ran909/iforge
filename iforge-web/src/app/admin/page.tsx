import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { isSupabaseConfigured } from "@/lib/supabase";
import AdminEditor from "./AdminEditor";

export const metadata = { title: "Admin · iForge", robots: { index: false } };

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const content = await getContent();
  return <AdminEditor initialContent={content} supabaseReady={isSupabaseConfigured} />;
}
