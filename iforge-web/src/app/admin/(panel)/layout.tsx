import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";
import { storageMode } from "@/lib/content";
import { isAgentApiConfigured, isHermesWebhookConfigured } from "@/lib/hermes";
import AdminShell from "../shell";

// Signed-in admin pages: one auth check and the live inbox feed for all of them.
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const inquiries = await listInquiries().catch(() => []);
  return (
    <AdminShell
      initialInquiries={inquiries}
      storageMode={storageMode}
      hermes={{ webhook: isHermesWebhookConfigured, agentApi: isAgentApiConfigured }}
    >
      {children}
    </AdminShell>
  );
}
