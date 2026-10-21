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
import { getSupabase, getSupabaseAdmin, CONTENT_TABLE, CONTENT_ID } from "@/lib/supabase";

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

export interface SiteContent {
  siteConfig: SiteConfig;
  services: ServiceItem[];
  valueProps: ValueProp[];
  techCapabilities: TechCapability[];
  timeline: TimelineEntry[];
  community: CommunityContent;
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
  };
}

/**
 * The site's content: the stored document from Supabase when configured, else
 * the code defaults. Cached per-request; pages call this instead of importing
 * siteData directly.
 */
export async function getContent(): Promise<SiteContent> {
  const supabase = getSupabase();
  if (!supabase) return defaultContent;
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
  if (!admin) return { ok: false, error: "Supabase is not configured on the server." };
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
