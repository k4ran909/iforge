import "server-only";
import {
  siteConfig as defaultSiteConfig,
  servicesData as defaultServices,
  valueProps as defaultValueProps,
  techCapabilities as defaultTech,
  companyTimeline as defaultTimeline,
  type ServiceItem,
} from "@/data/siteData";

export type { ServiceItem };
import {
  getSupabase,
  getSupabaseAdmin,
  isSupabaseConfigured,
  CONTENT_TABLE,
  CONTENT_ID,
} from "@/lib/supabase";
import { readJson, writeJson, withLock } from "@/lib/local-store";

// ---- The shape of everything the admin panel can edit ----

export interface SiteConfig {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  contactEmail: string;
  phone: string;
  address: string;
  founded: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}

export interface TechCapability {
  category: string;
  items: string[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface CommunityTrack {
  title: string;
  desc: string;
}

export interface CommunityContent {
  headline: string;
  intro: string;
  githubUsername: string;
  tracks: CommunityTrack[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Image URL — uploaded through the admin panel, or any public link. */
  photo: string;
  linkedin?: string;
  github?: string;
  x?: string;
}

export interface TeamStat {
  value: string;
  label: string;
}

/** The Team page around the member grid. Empty parts are simply not shown. */
export interface TeamPageContent {
  introHeading: string;
  introBody: string;
  introImage: string;
  /** Real figures only — empty by default, so the row stays hidden. */
  stats: TeamStat[];
  /** First part of the quote, set in full colour. */
  quoteLead: string;
  /** The rest of the quote, set in muted grey. */
  quoteRest: string;
  quoteName: string;
  quoteRole: string;
  quotePhoto: string;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  services: ServiceItem[];
  valueProps: ValueProp[];
  techCapabilities: TechCapability[];
  timeline: TimelineEntry[];
  community: CommunityContent;
  /** Real people only — starts empty and is filled from the admin panel. */
  team: TeamMember[];
  teamPage: TeamPageContent;
}

// ---- Defaults, built from the code so the site works with no DB ----

export const defaultContent: SiteContent = {
  siteConfig: { ...defaultSiteConfig },
  services: defaultServices,
  valueProps: defaultValueProps,
  techCapabilities: defaultTech,
  timeline: defaultTimeline,
  community: {
    headline: "Where builders ship together",
    intro:
      "A space for engineers, architects, and creators to share production architectures, review each other's work, and ship in the open.",
    githubUsername: process.env.GITHUB_USERNAME || "",
    tracks: [
      {
        title: "AI & ML Innovation",
        desc: "RAG architectures, local model inference, LangChain pipelines, and vector database optimization.",
      },
      {
        title: "Cloud & DevOps",
        desc: "Multi-region Kubernetes, Terraform IaC modules, FinOps cost cutting, and continuous delivery.",
      },
      {
        title: "Application Development",
        desc: "Next.js App Router, React 19 server components, cross-platform mobile, and real-time dashboards.",
      },
      {
        title: "Cybersecurity & Zero Trust",
        desc: "VAPT challenges, ethical hacking walkthroughs, cloud security audits, and SOC 2 frameworks.",
      },
    ],
  },
  team: [],
  teamPage: {
    introHeading: "Who we are",
    introBody:
      "We are a team of certified architects, engineers, and security specialists building production-grade cloud, AI, and application systems for enterprises that demand reliability at scale.",
    introImage: "",
    stats: [],
    quoteLead: "",
    quoteRest: "",
    quoteName: "",
    quoteRole: "",
    quotePhoto: "",
  },
};

/** Deep-merge a stored partial over the defaults so missing fields never break a page. */
function mergeContent(stored: Partial<SiteContent> | null | undefined): SiteContent {
  if (!stored) return defaultContent;
  return {
    siteConfig: { ...defaultContent.siteConfig, ...(stored.siteConfig || {}) },
    services: stored.services?.length ? stored.services : defaultContent.services,
    valueProps: stored.valueProps?.length ? stored.valueProps : defaultContent.valueProps,
    techCapabilities: stored.techCapabilities?.length
      ? stored.techCapabilities
      : defaultContent.techCapabilities,
    timeline: stored.timeline?.length ? stored.timeline : defaultContent.timeline,
    community: { ...defaultContent.community, ...(stored.community || {}) },
    // An empty team is a real state (nobody added yet), so no default swap.
    team: Array.isArray(stored.team) ? stored.team : [],
    teamPage: { ...defaultContent.teamPage, ...(stored.teamPage || {}) },
  };
}

/** Where admin edits land: Supabase in production, a local file in dev. */
export const storageMode: "supabase" | "local" = isSupabaseConfigured ? "supabase" : "local";

/**
 * The site's content: the stored document from Supabase when configured, else
 * the local `.data/content.json` written by the admin panel, else the code
 * defaults. Pages call this instead of importing siteData directly.
 */
export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabase();
  if (!supabase) {
    return mergeContent(await readJson<Partial<SiteContent> | null>("content", null));
  }
  try {
    const { data, error } = await supabase
      .from(CONTENT_TABLE)
      .select("data")
      .eq("id", CONTENT_ID)
      .maybeSingle();
    if (error || !data?.data) return defaultContent;
    return mergeContent(data.data as Partial<SiteContent>);
  } catch {
    return defaultContent;
  }
}

/** Persist the full content document (admin only). Returns ok + optional error. */
export async function saveContent(
  content: SiteContent,
): Promise<{ ok: boolean; error?: string }> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    try {
      await withLock("content", () => writeJson("content", content));
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Local save failed" };
    }
  }
  try {
    const { error } = await admin
      .from(CONTENT_TABLE)
      .upsert({ id: CONTENT_ID, data: content, updated_at: new Date().toISOString() });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}
