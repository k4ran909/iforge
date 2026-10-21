"use client";

import React from "react";

const INPUT =
  "w-full border border-hairline bg-background px-3 py-2.5 text-sm text-foreground transition-colors focus:border-[#E61E32] focus:outline-none";
const LABEL =
  "mb-1.5 block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground";

export function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      {label && <label className={LABEL}>{label}</label>}
      <input className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div>
      {label && <label className={LABEL}>{label}</label>}
      <textarea
        rows={rows}
        className={`${INPUT} resize-y`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function SubtleButton({
  children,
  onClick,
  tone = "default",
}: {
  children: React.ReactNode;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border border-hairline px-3 py-1.5 text-xs font-semibold transition-colors ${
        tone === "danger"
          ? "text-muted-foreground hover:border-[#E61E32] hover:text-[#E61E32]"
          : "text-foreground hover:border-[#E61E32] hover:text-[#E61E32]"
      }`}
    >
      {children}
    </button>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-hairline p-5">
      {title && (
        <h2 className="mb-5 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </h2>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  );
}

/** An editable list of plain strings — add / remove / edit each. */
export function StringList({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const setAt = (i: number, v: string) => {
    const next = values.slice();
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const add = () => onChange([...values, ""]);

  return (
    <div>
      {label && <label className={LABEL}>{label}</label>}
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <input className={INPUT} value={v} onChange={(e) => setAt(i, e.target.value)} />
            <button
              type="button"
              onClick={() => remove(i)}
              className="shrink-0 border border-hairline px-3 text-sm text-muted-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
              aria-label="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-2 border border-hairline px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
      >
        + Add
      </button>
    </div>
  );
}

/** An editable list of structured items with a custom per-item field renderer. */
export function RepeatList<T>({
  label,
  items,
  empty,
  onChange,
  render,
}: {
  label: string;
  items: T[];
  empty: T;
  onChange: (items: T[]) => void;
  render: (item: T, set: (v: T) => void) => React.ReactNode;
}) {
  const setAt = (i: number, v: T) => {
    const next = items.slice();
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, structuredClone(empty)]);

  return (
    <div>
      {label && <label className={LABEL}>{label}</label>}
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="space-y-3 border border-hairline p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">
                #{i + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs font-semibold text-muted-foreground transition-colors hover:text-[#E61E32]"
              >
                Remove
              </button>
            </div>
            {render(item, (v) => setAt(i, v))}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 border border-hairline px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
      >
        + Add item
      </button>
    </div>
  );
}
