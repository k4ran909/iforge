"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/siteData";
import { ArrowRight, Check } from "reicon-react";

const INPUT =
  "w-full border border-hairline bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-[#E61E32] focus:outline-none";
const LABEL =
  "mb-2 block font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "cloud-services",
    budget: "$10k - $25k",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start border border-hairline p-8 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center border border-[#E61E32]/40 bg-accent text-[#E61E32]">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          Inquiry received
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you, <span className="font-semibold text-foreground">{formData.name}</span>. A
          Principal Architect will review your requirements and respond within 2 business hours.
        </p>
        <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          Ticket #IF-{Math.floor(1000 + Math.random() * 9000)}
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              company: "",
              service: "cloud-services",
              budget: "$10k - $25k",
              message: "",
            });
          }}
          className="mt-7 border border-hairline px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-[#E61E32] hover:text-[#E61E32]"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Full name *</label>
          <input
            type="text"
            required
            placeholder="Sarah Jenkins"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={INPUT}
          />
        </div>
        <div>
          <label className={LABEL}>Work email *</label>
          <input
            type="email"
            required
            placeholder="sarah@enterprise.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={INPUT}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Phone / WhatsApp</label>
          <input
            type="tel"
            placeholder="+91 99718 66720"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={INPUT}
          />
        </div>
        <div>
          <label className={LABEL}>Company</label>
          <input
            type="text"
            placeholder="Acme Corporation"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={INPUT}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Practice interest *</label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className={INPUT}
          >
            {servicesData.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="custom">Custom Enterprise Architecture</option>
          </select>
        </div>
        <div>
          <label className={LABEL}>Anticipated investment</label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className={INPUT}
          >
            <option value="< $10k">&lt; $10,000 (Sprint Audit)</option>
            <option value="$10k - $25k">$10,000 – $25,000 (Core Module)</option>
            <option value="$25k - $50k">$25,000 – $50,000 (Full Architecture)</option>
            <option value="$50k+">$50,000+ (Large Enterprise)</option>
          </select>
        </div>
      </div>

      <div>
        <label className={LABEL}>Project goals &amp; scope *</label>
        <textarea
          required
          rows={4}
          placeholder="Outline your current stack, timelines, key challenges, or specific deliverables required…"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${INPUT} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 bg-foreground px-8 py-4 text-sm font-semibold text-background transition-colors hover:bg-[#E61E32] disabled:opacity-50"
      >
        {loading ? (
          "Securing dispatch…"
        ) : (
          <>
            Submit discovery request
            <ArrowRight className="h-4 w-4 arrow-nudge" />
          </>
        )}
      </button>

      <p className="text-center font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        Strict NDA • 100% IP protection
      </p>
    </form>
  );
}
