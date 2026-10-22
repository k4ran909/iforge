"use client";

import React from "react";
import type { TeamMember } from "@/lib/content";
import { PageHeader } from "./shell";

const INPUT =
  "w-full rounded-lg border border-hairline bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#E61E32] focus:outline-none";
const LABEL = "mb-1.5 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground";

const blank = (): TeamMember => ({ id: crypto.randomUUID(), name: "", role: "", bio: "", photo: "" });

export default function TeamEditor({ initialTeam }: { initialTeam: TeamMember[] }) {
  const [team, setTeam] = React.useState<TeamMember[]>(initialTeam);
  const [dirty, setDirty] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const edit = (next: TeamMember[]) => {
    setTeam(next);
    setDirty(true);
    setStatus(null);
  };
  const setAt = (i: number, patch: Partial<TeamMember>) =>
    edit(team.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  const move = (i: number, by: number) => {
    const j = i + by;
    if (j < 0 || j >= team.length) return;
    const next = team.slice();
    [next[i], next[j]] = [next[j], next[i]];
    edit(next);
  };

  const save = async () => {
    const unnamed = team.findIndex((m) => !m.name.trim());
    if (unnamed !== -1) {
      setStatus({ kind: "err", msg: `Member #${unnamed + 1} needs a name.` });
      return;
    }
    setSaving(true);
    try {
      const r = await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team }),
      });
      const data = await r.json();
      if (!r.ok || !data.ok) setStatus({ kind: "err", msg: data.error || "Save failed." });
      else {
        setTeam(data.team);
        setDirty(false);
        setStatus({ kind: "ok", msg: "Saved — the Team page is updated." });
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
        title="Team"
        description="The people shown on the public Team page, in this order."
        actions={
          <a href="/team" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">
            View Team page ↗
          </a>
        }
      />

      {team.length === 0 && (
        <div className="mb-6 flex flex-col items-center rounded-2xl border border-dashed border-hairline px-6 py-14 text-center">
          <h2 className="text-lg font-semibold text-foreground">No team members yet</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add your people with a photo, role and a short bio. The Team page stays hidden behind a
            friendly placeholder until you do.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {team.map((m, i) => (
          <div key={m.id} className="grid gap-5 rounded-2xl border border-hairline p-5 sm:grid-cols-[9rem_1fr]">
            <PhotoField
              photo={m.photo}
              name={m.name}
              onChange={(photo) => setAt(i, { photo })}
              onError={(msg) => setStatus({ kind: "err", msg })}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] text-muted-foreground">#{i + 1}</span>
                <div className="flex items-center gap-1 text-xs">
                  <IconBtn label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>
                    ↑
                  </IconBtn>
                  <IconBtn label="Move down" onClick={() => move(i, 1)} disabled={i === team.length - 1}>
                    ↓
                  </IconBtn>
                  <button
                    onClick={() => edit(team.filter((_, idx) => idx !== i))}
                    className="ml-2 rounded-full px-2.5 py-1 font-semibold text-muted-foreground transition-colors hover:text-[#E61E32]"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={LABEL}>Name *</span>
                  <input className={INPUT} value={m.name} onChange={(e) => setAt(i, { name: e.target.value })} />
                </label>
                <label>
                  <span className={LABEL}>Role</span>
                  <input
                    className={INPUT}
                    value={m.role}
                    placeholder="e.g. Principal Cloud Architect"
                    onChange={(e) => setAt(i, { role: e.target.value })}
                  />
                </label>
              </div>
              <label className="block">
                <span className={LABEL}>Bio</span>
                <textarea
                  rows={3}
                  className={`${INPUT} resize-y`}
                  value={m.bio}
                  placeholder="Two or three lines on what they do and what they love building."
                  onChange={(e) => setAt(i, { bio: e.target.value })}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-3">
                {(["linkedin", "github", "x"] as const).map((k) => (
                  <label key={k}>
                    <span className={LABEL}>{k === "x" ? "X / Twitter" : k === "github" ? "GitHub" : "LinkedIn"}</span>
                    <input
                      className={INPUT}
                      value={m[k] ?? ""}
                      placeholder="https://…"
                      onChange={(e) => setAt(i, { [k]: e.target.value })}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => edit([...team, blank()])}
        className="mt-4 w-full rounded-2xl border border-dashed border-hairline py-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
      >
        + Add team member
      </button>

      <div className="sticky bottom-0 mt-8 flex items-center justify-between gap-4 border-t border-hairline bg-background/90 py-4 backdrop-blur">
        <span
          className={`font-mono text-[0.7rem] uppercase tracking-wider ${
            status?.kind === "err" ? "text-[#E61E32]" : status?.kind === "ok" ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {status?.msg || (dirty ? "Unsaved changes" : "All changes saved")}
        </span>
        <button
          onClick={save}
          disabled={saving || !dirty}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32] disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save team"}
        </button>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="h-7 w-7 rounded-full border border-hairline text-foreground transition-colors hover:border-foreground/40 disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function PhotoField({
  photo,
  name,
  onChange,
  onError,
}: {
  photo: string;
  name: string;
  onChange: (url: string) => void;
  onError: (msg: string) => void;
}) {
  const input = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const r = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await r.json();
      if (!r.ok || !data.ok) onError(data.error || "Upload failed.");
      else onChange(data.url);
    } catch {
      onError("Upload failed — network error.");
    } finally {
      setUploading(false);
    }
  };

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-xl border border-hairline bg-foreground/[0.04]"
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name || "Team member"} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-muted-foreground">
            {initials || "+"}
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-black/60 py-1.5 text-center text-[0.65rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          {uploading ? "Uploading…" : photo ? "Change photo" : "Upload photo"}
        </span>
      </button>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
      <input
        className="w-full rounded-md border border-hairline bg-background px-2 py-1.5 text-[0.7rem] text-foreground placeholder:text-muted-foreground focus:border-[#E61E32] focus:outline-none"
        value={photo}
        placeholder="…or paste an image URL"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
