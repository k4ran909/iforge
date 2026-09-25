"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/siteData";
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Clock,
  Send
} from "lucide-react";

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(servicesData[0].slug);
  const [scope, setScope] = useState("mid");
  const [timeline, setTimeline] = useState("1-3months");
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const scopeOptions = [
    { id: "startup", title: "Startup / Pilot", desc: "Targeted MVP, architectural review, or initial PoC prototype", budget: "$5k – $15k" },
    { id: "mid", title: "Mid-Market Growth", desc: "Production rollout, cloud migration, or dedicated team scaling", budget: "$15k – $40k" },
    { id: "enterprise", title: "Enterprise Overhaul", desc: "Multi-system overhaul, 24/7 managed support, and compliance", budget: "$40k – $100k+" },
  ];

  const timelineOptions = [
    { id: "urgent", title: "Urgent (< 1 Month)", desc: "Immediate sprint kick-off with priority engineer allocation" },
    { id: "1-3months", title: "1 – 3 Months", desc: "Standard agile delivery cycle with bi-weekly milestone reviews" },
    { id: "flexible", title: "Flexible / Ongoing", desc: "Continuous engineering retainer or long-term team augmentation" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentServiceObj = servicesData.find((s) => s.slug === selectedService) || servicesData[0];
  const currentScopeObj = scopeOptions.find((s) => s.id === scope) || scopeOptions[1];

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-900/5">
      {/* Progress Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F4FC] text-[#1783C1] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0A3C6E]">Project Estimator Wizard</h2>
            <p className="text-xs text-slate-500 font-medium">Step {step} of 3</p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step 
                  ? "w-8 bg-[#1783C1]" 
                  : s < step 
                    ? "w-2 bg-emerald-500" 
                    : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {!submitted ? (
        <div>
          {/* STEP 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-[#0A3C6E]">Select Your Primary IT Service</h3>
                <p className="text-xs sm:text-sm text-[#666666] mt-1">
                  Choose the core discipline you need architecture or engineering assistance with.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {servicesData.map((s) => {
                  const isSelected = selectedService === s.slug;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.slug)}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isSelected
                          ? "bg-[#E8F4FC]/80 border-[#1783C1] shadow-xs"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-[#1783C1] bg-[#1783C1] text-white" : "border-slate-300"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? "text-[#0A3C6E]" : "text-[#333333]"}`}>
                          {s.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {s.shortDesc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-md transition-all cursor-pointer"
                >
                  <span>Continue to Scope & Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Scope & Timeline Selection */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-[#0A3C6E]">Project Scale & Delivery Horizon</h3>
                <p className="text-xs sm:text-sm text-[#666666] mt-1">
                  Help us gauge your team requirements, infrastructure scale, and urgency.
                </p>
              </div>

              {/* Scope Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider">
                  Target Scope & Budget Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {scopeOptions.map((opt) => {
                    const isSelected = scope === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setScope(opt.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#E8F4FC]/80 border-[#1783C1] shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className={`text-sm font-bold ${isSelected ? "text-[#0A3C6E]" : "text-[#333333]"}`}>
                          {opt.title}
                        </div>
                        <div className="text-xs font-semibold text-[#1783C1] mt-1">
                          {opt.budget}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Selection */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider">
                  Delivery Horizon
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {timelineOptions.map((opt) => {
                    const isSelected = timeline === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTimeline(opt.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#E8F4FC]/80 border-[#1783C1] shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className={`text-sm font-bold ${isSelected ? "text-[#0A3C6E]" : "text-[#333333]"}`}>
                          {opt.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-md transition-all cursor-pointer"
                >
                  <span>Review & Request Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Summary & Contact Details */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-[#0A3C6E]">Scope Summary & Dispatch</h3>
                <p className="text-xs sm:text-sm text-[#666666] mt-1">
                  Enter your contact details to receive your formal architectural proposal.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Selected Discipline:</span>
                  <span className="font-bold text-[#0A3C6E]">{currentServiceObj.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Target Scope:</span>
                  <span className="font-bold text-[#1783C1]">{currentScopeObj.title} ({currentScopeObj.budget})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Delivery Timeline:</span>
                  <span className="font-bold text-[#0A3C6E]">{timelineOptions.find(t => t.id === timeline)?.title}</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="David Miller"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@company.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 99718 66720"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A3C6E] uppercase tracking-wider mb-1.5">
                  Specific Technical Requirements / Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify any existing cloud provider, compliance mandates (SOC 2, ISO 27001), or tech stacks..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#333333] focus:outline-none focus:border-[#1783C1] focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1783C1] hover:bg-[#136FA5] shadow-md shadow-[#1783C1]/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <span>Dispatch Quote Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* Confirmation State */
        <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#0A3C6E]">
            Proposal Scoping Requested!
          </h3>
          <p className="text-sm text-[#666666] max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-[#0A3C6E]">{clientInfo.name}</span>. We have generated preliminary architecture parameters for your <strong>{currentServiceObj.title}</strong> initiative. A Principal Consultant will email your structured proposal within 2 hours.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setClientInfo({ name: "", email: "", phone: "", notes: "" });
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#0A3C6E] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Start Another Estimate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
