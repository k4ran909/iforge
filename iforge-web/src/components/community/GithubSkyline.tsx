"use client";

import React from "react";
import ContributionSkyline, {
  type ContributionDay,
} from "@/components/ui/contribution-skyline";

interface ApiResponse {
  source: "github" | "empty";
  login?: string | null;
  total?: number;
  days: ContributionDay[];
  reason?: string;
}

interface Props {
  /** Optional GitHub username; falls back to the server's GITHUB_USERNAME env var. */
  username?: string;
  /** Poll interval in ms to keep it live. Defaults to 5 minutes; 0 disables polling. */
  refreshMs?: number;
}

/**
 * Fetches real GitHub contribution data from /api/github-contributions and
 * renders the skyline with it, polling on an interval so it stays near-live.
 * When GitHub isn't configured (no token/username) it shows a connect-GitHub
 * empty state — never invented data.
 */
export default function GithubSkyline({ username, refreshMs = 300000 }: Props) {
  const [res, setRes] = React.useState<ApiResponse | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    try {
      const qs = username ? `?username=${encodeURIComponent(username)}` : "";
      const r = await fetch(`/api/github-contributions${qs}`, { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      const data: ApiResponse = await r.json();
      setRes(data);
    } catch {
      setRes({ source: "empty", reason: "network", days: [] });
    } finally {
      setLoading(false);
    }
  }, [username]);

  React.useEffect(() => {
    load();
    if (!refreshMs) return;
    const id = setInterval(load, refreshMs);
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [load, refreshMs]);

  const hasData = res?.source === "github" && res.days.length > 0;

  // While loading, hold the space quietly. With no real data (GitHub not set
  // up, or unreachable) show nothing — never a generated year, and never setup
  // instructions to visitors. The Community page also only renders this
  // section when a token and username are configured.
  if (!hasData) {
    return loading ? (
      <div aria-hidden className="min-h-[220px] animate-pulse rounded-xl border border-hairline bg-muted/40" />
    ) : null;
  }

  const isLive = res?.source === "github";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E61E32]" />
          Live · @{res?.login}
        </span>
        {res?.login && isLive && (
          <a
            href={`https://github.com/${res.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            View on GitHub →
          </a>
        )}
      </div>

      <ContributionSkyline
        data={res?.days}
        palette={{
          light: ["#fbd3d7", "#f08a92", "#e61e32", "#a5101e"],
          dark: ["#4a0d14", "#8f1522", "#e61e32", "#ff5a6a"],
        }}
        defaultView="3d"
        title={
          <>
            <span className="font-semibold tabular-nums">
              {(res?.total ?? 0).toLocaleString()}
            </span>{" "}
            contributions in the last year
          </>
        }
      />
    </div>
  );
}
