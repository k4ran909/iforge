import {
  generateSampleContributions,
  type ContributionDay,
} from "@/lib/sample-contributions";

// Revalidate the cached response every 30 minutes so the skyline stays near-live
// without hammering GitHub's API on every page view.
export const revalidate = 1800;

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

// GraphQL query for a user's contribution calendar over a date range.
const QUERY = /* GraphQL */ `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

type CalendarDay = { date: string; contributionCount: number };

/** Flatten GitHub's week→day structure into the component's { date, count }[] shape. */
function toDays(weeks: { contributionDays: CalendarDay[] }[]): ContributionDay[] {
  const out: ContributionDay[] = [];
  for (const w of weeks) {
    for (const d of w.contributionDays) {
      out.push({ date: d.date, count: d.contributionCount });
    }
  }
  return out;
}

export async function GET(request: Request) {
  const token = process.env.GITHUB_TOKEN;
  const url = new URL(request.url);
  // Username comes from the query (?username=…) or the GITHUB_USERNAME env var.
  const login = url.searchParams.get("username") || process.env.GITHUB_USERNAME;

  // Last 371 days (53 weeks) ending today — matches the component's year window.
  const to = new Date();
  const from = new Date(to.getTime() - 371 * 86400000);

  // Without a token or username we can't call the API, so return a believable
  // sample year. The UI stays populated and nothing breaks in local dev.
  if (!token || !login) {
    return Response.json(
      {
        source: "sample",
        reason: !token ? "GITHUB_TOKEN not set" : "GITHUB_USERNAME not set",
        login: login ?? null,
        days: generateSampleContributions(Math.floor(to.getTime() / 86400000) * 86400000),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "iforge-web",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login, from: from.toISOString(), to: to.toISOString() },
      }),
      // Let Next cache this fetch for the revalidate window.
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded ${res.status}`);
    }

    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) {
      const message = json?.errors?.[0]?.message || "No contribution data returned";
      throw new Error(message);
    }

    return Response.json({
      source: "github",
      login,
      total: cal.totalContributions,
      days: toDays(cal.weeks),
    });
  } catch (err) {
    // On any failure, degrade to sample data rather than a broken chart.
    return Response.json(
      {
        source: "sample",
        reason: err instanceof Error ? err.message : "GitHub request failed",
        login,
        days: generateSampleContributions(Math.floor(to.getTime() / 86400000) * 86400000),
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
