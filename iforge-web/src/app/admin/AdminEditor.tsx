"use client";

import React from "react";
import type { SiteContent, ServiceItem } from "@/lib/content";
import { Notice, PageHeader } from "./shell";
import {
  Field,
  TextArea,
  StringList,
  Section,
  RepeatList,
  SubtleButton,
} from "./fields";

type Tab = "site" | "services" | "about" | "community";

const TABS: { id: Tab; label: string }[] = [
  { id: "site", label: "Site & Contact" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "community", label: "Community" },
];

export default function AdminEditor({
  initialContent,
  loadError,
}: {
  initialContent: SiteContent;
  /** The stored content couldn't be read; the form shows defaults and mustn't save them. */
  loadError?: string;
}) {
  const [content, setContent] = React.useState<SiteContent>(initialContent);
  const [tab, setTab] = React.useState<Tab>("site");
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState<{ kind: "ok" | "err"; msg: string } | null>(null);
  const [dirty, setDirty] = React.useState(false);

  // Immutable-ish updater that marks the form dirty.
  const update = React.useCallback((fn: (c: SiteContent) => SiteContent) => {
    setContent((prev) => fn(structuredClone(prev)));
    setDirty(true);
    setStatus(null);
  }, []);

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const r = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) {
        setStatus({ kind: "err", msg: data.error || "Save failed." });
      } else {
        setStatus({ kind: "ok", msg: "Saved. Public pages updated." });
        setDirty(false);
      }
    } catch {
      setStatus({ kind: "err", msg: "Network error while saving." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Content"
        description="Edit the words on the public site. Saving updates the live pages straight away."
      />
      {loadError && (
        <Notice>
          Couldn&apos;t read the saved content ({loadError}). These are the default texts, so saving is off
          until it loads — check the Supabase settings and reload.
        </Notice>
      )}

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-px overflow-hidden border border-hairline bg-hairline">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-4 py-3 text-xs font-semibold transition-colors ${
              tab === t.id
                ? "bg-foreground text-background"
                : "bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="mt-8 space-y-8">
        {tab === "site" && <SiteTab content={content} update={update} />}
        {tab === "services" && <ServicesTab content={content} update={update} />}
        {tab === "about" && <AboutTab content={content} update={update} />}
        {tab === "community" && <CommunityTab content={content} update={update} />}
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 mt-10 flex items-center justify-between gap-4 border-t border-hairline bg-background/90 py-4 backdrop-blur">
        <span
          className={`font-mono text-[0.7rem] uppercase tracking-wider ${
            status?.kind === "err"
              ? "text-[#E61E32]"
              : status?.kind === "ok"
                ? "text-foreground"
                : "text-muted-foreground"
          }`}
        >
          {status?.msg || (dirty ? "Unsaved changes" : "All changes saved")}
        </span>
        <button
          onClick={save}
          disabled={saving || !dirty || Boolean(loadError)}
          className="bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

type TabProps = {
  content: SiteContent;
  update: (fn: (c: SiteContent) => SiteContent) => void;
};

// ---- Site & Contact ----
function SiteTab({ content, update }: TabProps) {
  const c = content.siteConfig;
  const set = (k: keyof typeof c, v: string) =>
    update((d) => ({ ...d, siteConfig: { ...d.siteConfig, [k]: v } }));
  return (
    <Section title="Site & contact information">
      <Field label="Company name" value={c.name} onChange={(v) => set("name", v)} />
      <Field label="Tagline" value={c.tagline} onChange={(v) => set("tagline", v)} />
      <Field label="Headline" value={c.headline} onChange={(v) => set("headline", v)} />
      <TextArea label="Subheadline" value={c.subheadline} onChange={(v) => set("subheadline", v)} />
      <Field label="Contact email" value={c.contactEmail} onChange={(v) => set("contactEmail", v)} />
      <Field label="Phone" value={c.phone} onChange={(v) => set("phone", v)} />
      <Field label="Address" value={c.address} onChange={(v) => set("address", v)} />
      <Field label="Founded" value={c.founded} onChange={(v) => set("founded", v)} />
    </Section>
  );
}

// ---- Services ----
function ServicesTab({ content, update }: TabProps) {
  const [open, setOpen] = React.useState(0);
  const services = content.services;

  const setService = (i: number, patch: Partial<ServiceItem>) =>
    update((d) => {
      d.services[i] = { ...d.services[i], ...patch };
      return d;
    });

  return (
    <div className="space-y-4">
      {services.map((s, i) => (
        <div key={s.id} className="border border-hairline">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 p-4 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#E61E32]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-semibold text-foreground">{s.title}</span>
            </span>
            <span className="text-muted-foreground">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="space-y-5 border-t border-hairline p-5">
              <Field label="Title" value={s.title} onChange={(v) => setService(i, { title: v })} />
              <Field
                label="Subtitle"
                value={s.subtitle}
                onChange={(v) => setService(i, { subtitle: v })}
              />
              <TextArea
                label="Short description"
                value={s.shortDesc}
                onChange={(v) => setService(i, { shortDesc: v })}
              />
              <TextArea
                label="Long description"
                value={s.longDesc}
                onChange={(v) => setService(i, { longDesc: v })}
              />
              <StringList
                label="Features"
                values={s.features}
                onChange={(v) => setService(i, { features: v })}
              />
              <StringList
                label="Technologies"
                values={s.technologies}
                onChange={(v) => setService(i, { technologies: v })}
              />
              <StringList
                label="Deliverables"
                values={s.deliverables}
                onChange={(v) => setService(i, { deliverables: v })}
              />
              <StringList
                label="Benefits"
                values={s.benefits}
                onChange={(v) => setService(i, { benefits: v })}
              />

              <RepeatList
                label="Metrics"
                items={s.metrics}
                empty={{ value: "", label: "" }}
                onChange={(metrics) => setService(i, { metrics })}
                render={(m, set) => (
                  <>
                    <Field label="Value" value={m.value} onChange={(v) => set({ ...m, value: v })} />
                    <Field label="Label" value={m.label} onChange={(v) => set({ ...m, label: v })} />
                  </>
                )}
              />

              <RepeatList
                label="FAQs"
                items={s.faqs}
                empty={{ question: "", answer: "" }}
                onChange={(faqs) => setService(i, { faqs })}
                render={(f, set) => (
                  <>
                    <Field
                      label="Question"
                      value={f.question}
                      onChange={(v) => set({ ...f, question: v })}
                    />
                    <TextArea
                      label="Answer"
                      value={f.answer}
                      onChange={(v) => set({ ...f, answer: v })}
                    />
                  </>
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---- About ----
function AboutTab({ content, update }: TabProps) {
  return (
    <div className="space-y-8">
      <Section title="Value propositions">
        <RepeatList
          label=""
          items={content.valueProps}
          empty={{ title: "", description: "", icon: "Target" }}
          onChange={(valueProps) => update((d) => ({ ...d, valueProps }))}
          render={(v, set) => (
            <>
              <Field label="Title" value={v.title} onChange={(t) => set({ ...v, title: t })} />
              <TextArea
                label="Description"
                value={v.description}
                onChange={(t) => set({ ...v, description: t })}
              />
            </>
          )}
        />
      </Section>

      <Section title="Company timeline">
        <RepeatList
          label=""
          items={content.timeline}
          empty={{ year: "", title: "", description: "" }}
          onChange={(timeline) => update((d) => ({ ...d, timeline }))}
          render={(t, set) => (
            <>
              <Field label="Year" value={t.year} onChange={(v) => set({ ...t, year: v })} />
              <Field label="Title" value={t.title} onChange={(v) => set({ ...t, title: v })} />
              <TextArea
                label="Description"
                value={t.description}
                onChange={(v) => set({ ...t, description: v })}
              />
            </>
          )}
        />
      </Section>
    </div>
  );
}

// ---- Community ----
function CommunityTab({ content, update }: TabProps) {
  const cm = content.community;
  const set = (patch: Partial<typeof cm>) =>
    update((d) => ({ ...d, community: { ...d.community, ...patch } }));
  return (
    <div className="space-y-8">
      <Section title="Community page">
        <Field label="Headline" value={cm.headline} onChange={(v) => set({ headline: v })} />
        <TextArea label="Intro" value={cm.intro} onChange={(v) => set({ intro: v })} />
        <Field
          label="GitHub username (for the live skyline)"
          value={cm.githubUsername}
          onChange={(v) => set({ githubUsername: v })}
        />
        <p className="text-xs text-muted-foreground">
          The skyline also needs a <code className="font-mono">GITHUB_TOKEN</code> set on the server.
        </p>
      </Section>

      <Section title="Community tracks">
        <RepeatList
          label=""
          items={cm.tracks}
          empty={{ title: "", desc: "" }}
          onChange={(tracks) => set({ tracks })}
          render={(t, setItem) => (
            <>
              <Field label="Title" value={t.title} onChange={(v) => setItem({ ...t, title: v })} />
              <TextArea
                label="Description"
                value={t.desc}
                onChange={(v) => setItem({ ...t, desc: v })}
              />
            </>
          )}
        />
      </Section>
    </div>
  );
}

export { SubtleButton };
