"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/siteData";
import { Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

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
    // Simulated instant API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-lg animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0A3C6E] mb-3">
          Inquiry Successfully Received
        </h3>
        <p className="text-[#666666] text-sm sm:text-base max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <span className="font-bold text-[#0A3C6E]">{formData.name}</span>. An iForge Principal Architect will review your technical requirements and contact you within 2 business hours.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 mb-6">
          <Clock className="w-3.5 h-3.5 text-[#1783C1]" />
          <span>Priority Dispatch Ticket #IF-{Math.floor(1000 + Math.random() * 9000)}</span>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", phone: "", company: "", service: "cloud-services", budget: "$10k - $25k", message: "" });
            }}
            className="px-6 py-3 rounded-xl text-xs font-semibold text-[#0A3C6E] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="Sarah Jenkins"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder-slate-400 focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
            Work Email *
          </label>
          <input
            type="email"
            required
            placeholder="sarah@enterprise.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder-slate-400 focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            placeholder="+91 99718 66720"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder-slate-400 focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
            Company / Organization
          </label>
          <input
            type="text"
            placeholder="Acme Corporation"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder-slate-400 focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
            Practice Interest *
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
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
          <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
            Anticipated Investment
          </label>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
          >
            <option value="< $10k">&lt; $10,000 (Sprint Audit)</option>
            <option value="$10k - $25k">$10,000 – $25,000 (Core Module)</option>
            <option value="$25k - $50k">$25,000 – $50,000 (Full Architecture)</option>
            <option value="$50k+">$50,000+ (Multi-Cloud / Large Enterprise)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-2">
          Project Goals & Scope Details *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Outline your current infrastructure stack, timelines, key challenges, or specific deliverables required..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#333333] placeholder-slate-400 focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] disabled:opacity-50 shadow-md shadow-[#1783C1]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        {loading ? (
          <span>Securing Dispatch Pipeline...</span>
        ) : (
          <>
            <span>Submit Architectural Discovery Request</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Strict Non-Disclosure Protocol • 100% IP Protection</span>
      </div>
    </form>
  );
}
