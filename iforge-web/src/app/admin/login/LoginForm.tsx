"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <span className="text-2xl font-black lowercase tracking-tight text-foreground">iforge</span>
        <p className="eyebrow mt-6 mb-5">Admin</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Sign in</h1>

        {!configured && (
          <p className="mt-4 border border-hairline bg-muted p-4 text-sm leading-relaxed text-muted-foreground">
            Set <code className="font-mono text-foreground">ADMIN_PASSWORD</code> in{" "}
            <code className="font-mono text-foreground">.env.local</code> and restart the server to
            enable the admin panel.
          </p>
        )}

        <form onSubmit={submit} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!configured}
              className="w-full border border-hairline bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-[#E61E32] focus:outline-none disabled:opacity-50"
            />
          </div>

          {error && (
            <p className="font-mono text-[0.7rem] uppercase tracking-wider text-[#E61E32]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !configured}
            className="group inline-flex w-full items-center justify-center gap-2 bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
            <ArrowRight className="h-4 w-4 arrow-nudge" />
          </button>
        </form>
      </div>
    </div>
  );
}
