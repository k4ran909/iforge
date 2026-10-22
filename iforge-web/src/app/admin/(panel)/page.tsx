import { Suspense } from "react";
import InboxView from "../InboxView";

export const metadata = { title: "Admin · iForge", robots: { index: false } };

export default function InboxPage() {
  return (
    <Suspense>
      <InboxView />
    </Suspense>
  );
}
