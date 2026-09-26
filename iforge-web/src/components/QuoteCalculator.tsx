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
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#0D0D0D] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-lg shadow-black/5 dark:shadow-black/50 transition-colors duration-250">
      {/* Progress Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-800 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDE8EA] dark:bg-[#E61E32]/15 text-[#E61E32] flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">Project Estimator Wizard</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Step {step} of 3</p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step 
                  ? "w-8 bg-[#E61E32]" 
                  : s < step 
                    ? "w-2 bg-emerald-500" 
                    : "w-2 bg-neutral-200 dark:bg-neutral-800"
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
                <h3 className="text-lg font-bold text-black dark:text-white">Select Your Primary IT Service</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
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
                          ? "bg-[#FDE8EA]/60 dark:bg-[#E61E32]/15 border-[#E61E32] shadow-xs"
                          : "bg-white dark:bg-[#141414] border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-[#E61E32] bg-[#E61E32] text-white" : "border-neutral-300 dark:border-neutral-700"
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? "text-black dark:text-white" : "text-neutral-800 dark:text-neutral-200"}`}>
                          {s.title}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/20 transition-all cursor-pointer hover:scale-[1.01]"
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
                <h3 className="text-lg font-bold text-black dark:text-white">Project Scale & Delivery Horizon</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Help us gauge your team requirements, infrastructure scale, and urgency.
                </p>
              </div>

              {/* Scope Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider">
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
                            ? "bg-[#FDE8EA]/60 dark:bg-[#E61E32]/15 border-[#E61E32] shadow-xs"
                            : "bg-white dark:bg-[#141414] border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        <div className={`text-sm font-bold ${isSelected ? "text-black dark:text-white" : "text-neutral-800 dark:text-neutral-200"}`}>
                          {opt.title}
                        </div>
                        <div className="text-xs font-semibold text-[#E61E32] mt-1">
                          {opt.budget}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline Selection */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider">
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
                            ? "bg-[#FDE8EA]/60 dark:bg-[#E61E32]/15 border-[#E61E32] shadow-xs"
                            : "bg-white dark:bg-[#141414] border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                        }`}
                      >
                        <div className={`text-sm font-bold ${isSelected ? "text-black dark:text-white" : "text-neutral-800 dark:text-neutral-200"}`}>
                          {opt.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-snug">
                          {opt.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/20 transition-all cursor-pointer hover:scale-[1.01]"
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
                <h3 className="text-lg font-bold text-black dark:text-white">Scope Summary & Dispatch</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Enter your contact details to receive your formal architectural proposal.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Selected Discipline:</span>
                  <span className="font-bold text-black dark:text-white">{currentServiceObj.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-200 dark:border-neutral-800">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Target Scope:</span>
                  <span className="font-bold text-[#E61E32]">{currentScopeObj.title} ({currentScopeObj.budget})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500 dark:text-neutral-400 font-medium">Delivery Timeline:</span>
                  <span className="font-bold text-black dark:text-white">{timelineOptions.find(t => t.id === timeline)?.title}</span>
                </div>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="David Miller"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#E61E32] focus:bg-white dark:focus:bg-[#1A1A1A] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-1.5">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@company.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#E61E32] focus:bg-white dark:focus:bg-[#1A1A1A] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 99718 66720"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="w-full bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#E61E32] focus:bg-white dark:focus:bg-[#1A1A1A] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-1.5">
                  Specific Technical Requirements / Comments (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify any existing cloud provider, compliance mandates (SOC 2, ISO 27001), or tech stacks..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  className="w-full bg-neutral-50 dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:border-[#E61E32] focus:bg-white dark:focus:bg-[#1A1A1A] transition-all"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#E61E32] hover:bg-[#C81426] shadow-md shadow-[#E61E32]/25 transition-all hover:scale-[1.01] cursor-pointer"
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
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-black dark:text-white">
            Proposal Scoping Requested!
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold text-black dark:text-white">{clientInfo.name}</span>. We have generated preliminary architecture parameters for your <strong>{currentServiceObj.title}</strong> initiative. A Principal Consultant will email your structured proposal within 2 hours.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setClientInfo({ name: "", email: "", phone: "", notes: "" });
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              Start Another Estimate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
