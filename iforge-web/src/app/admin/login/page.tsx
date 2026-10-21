import { redirect } from "next/navigation";
import { isAuthenticated, isAdminConfigured } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin Login · iForge", robots: { index: false } };

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");
  return <LoginForm configured={isAdminConfigured()} />;
}
