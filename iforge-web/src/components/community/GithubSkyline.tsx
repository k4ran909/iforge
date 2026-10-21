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

  // No real data → empty state, never a generated year.
  if (!hasData) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 border border-dashed border-hairline bg-muted/40 px-6 py-16 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-muted-foreground">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.5-2.69-.95-.09-.23-.48-.95-.82-1.14-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {loading ? "Loading activity…" : "Connect GitHub to see live activity"}
          </p>
          {!loading && (
            <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Set a GitHub username and token on the server, and this becomes a live heat map and
              3D skyline of real contributions.
            </p>
          )}
        </div>
      </div>
    );
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
