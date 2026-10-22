import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · iForge",
  robots: { index: false, follow: false },
};

// The admin area opts out of the public site's nav/footer by rendering its own
// shell. (It still sits under the root layout, which is fine — it just adds a
// minimal full-height wrapper.)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-foreground">{children}</div>;
}
