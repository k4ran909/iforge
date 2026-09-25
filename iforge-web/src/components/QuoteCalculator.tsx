"use client";

import React, { useState } from "react";
import { servicesData } from "@/data/siteData";
import { 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Check
} from "lucide-react";
import "./QuoteCalculator.css";

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(servicesData[0].slug);
  const [scope, setScope] = useState("mid");
  const [timeline, setTimeline] = useState("1-3months");
  const [clientInfo, setClientInfo] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const scopeOptions = [
    { id: "startup", title: "Startup / Pilot", desc: "Targeted MVP, architecture review, or initial prototype" },
    { id: "mid", title: "Mid-Market Growth", desc: "Production rollout, cloud migration, or dedicated team scaling" },
    { id: "enterprise", title: "Enterprise Overhaul", desc: "Multi-system overhaul, 24/7 managed support, and compliance" },
  ];

  const timelineOptions = [
    { id: "urgent", title: "Urgent (< 1 month)", desc: "Immediate rapid sprint kick-off" },
    { id: "1-3months", title: "1 - 3 Months", desc: "Standard agile delivery cycle" },
    { id: "flexible", title: "Flexible / Ongoing", desc: "Continuous retainer or strategic advisory" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const currentServiceObj = servicesData.find((s) => s.slug === selectedService) || servicesData[0];

  return (
    <div className="quote-calculator-container">
      {/* Progress Header */}
      <div className="quote-calc-header">
        <div className="quote-calc-title-wrap">
          <div className="quote-calc-icon">
            <Calculator style={{ width: 22, height: 22 }} />
          </div>
          <div>
            <h2 className="quote-calc-title">Project Estimator & Consultation</h2>
            <p className="quote-calc-step-label">Step {step} of 3</p>
          </div>
        </div>

        <div className="quote-calc-steps-indicator">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`quote-step-dot ${
                s === step ? "active" : s < step ? "completed" : "inactive"
              }`}
            />
          ))}
        </div>
      </div>

      {!submitted ? (
        <div>
          {/* STEP 1: Service Selection */}
          {step === 1 && (
            <div>
              <h3 className="quote-step-heading">Select Your Primary IT Service</h3>
              <p className="quote-step-desc">
                Choose the core discipline you need assistance with.
              </p>

              <div className="quote-services-grid">
                {servicesData.map((s) => {
                  const isSelected = selectedService === s.slug;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.slug)}
                      className={`quote-card-btn ${isSelected ? "selected" : ""}`}
                    >
                      <div className="quote-card-header">
                        <span className="quote-card-title">{s.title}</span>
                        {isSelected && <Check style={{ width: 16, height: 16, color: "#0284c7" }} />}
                      </div>
                      <p className="quote-card-desc">{s.shortDesc}</p>
                    </button>
                  );
                })}
              </div>

              <div className="quote-actions-row" style={{ justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="quote-btn-primary"
                >
                  <span>Continue to Scope</span>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Scope & Timeline */}
          {step === 2 && (
            <div>
              <h3 className="quote-step-heading">Project Scope & Estimated Timeline</h3>
              <p className="quote-step-desc">
                Help us gauge your project scale for: <strong style={{ color: "#0284c7" }}>{currentServiceObj.title}</strong>
              </p>

              <div className="quote-options-section">
                <label className="quote-options-label">Scope Scale</label>
                <div className="quote-options-grid">
                  {scopeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setScope(opt.id)}
                      className={`quote-card-btn ${scope === opt.id ? "selected" : ""}`}
                    >
                      <div className="quote-card-header">
                        <span className="quote-card-title">{opt.title}</span>
                        {scope === opt.id && <Check style={{ width: 16, height: 16, color: "#0284c7" }} />}
                      </div>
                      <p className="quote-card-desc">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quote-options-section">
                <label className="quote-options-label">Delivery Timeline</label>
                <div className="quote-options-grid">
                  {timelineOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTimeline(opt.id)}
                      className={`quote-card-btn ${timeline === opt.id ? "selected" : ""}`}
                    >
                      <div className="quote-card-header">
                        <span className="quote-card-title">{opt.title}</span>
                        {timeline === opt.id && <Check style={{ width: 16, height: 16, color: "#0284c7" }} />}
                      </div>
                      <p className="quote-card-desc">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="quote-actions-row">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="quote-btn-secondary"
                >
                  <ArrowLeft style={{ width: 16, height: 16 }} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="quote-btn-primary"
                >
                  <span>Confirm Details</span>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact & Submission */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h3 className="quote-step-heading">Your Contact Information</h3>
              <p className="quote-step-desc">
                We will compile a customized architectural proposal for {currentServiceObj.title} based on your selections.
              </p>

              {/* Summary Pill */}
              <div className="quote-summary-pill">
                <div>
                  <span style={{ color: "#94a3b8" }}>Service:</span>{" "}
                  <strong style={{ color: "#0f172a" }}>{currentServiceObj.title}</strong>
                </div>
                <div>
                  <span style={{ color: "#94a3b8" }}>Scope:</span>{" "}
                  <strong style={{ color: "#0f172a", textTransform: "capitalize" }}>{scope}</strong>
                </div>
                <div>
                  <span style={{ color: "#94a3b8" }}>Timeline:</span>{" "}
                  <strong style={{ color: "#0f172a" }}>{timeline}</strong>
                </div>
              </div>

              <div className="quote-form-grid">
                <div>
                  <label className="quote-form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                    className="quote-form-input"
                  />
                </div>
                <div>
                  <label className="quote-form-label">Business Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@organization.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    className="quote-form-input"
                  />
                </div>
              </div>

              <div className="quote-form-group">
                <label className="quote-form-label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="quote-form-input"
                />
              </div>

              <div className="quote-form-group">
                <label className="quote-form-label">Specific Requirements (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any particular technical constraints or team size..."
                  value={clientInfo.notes}
                  onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
                  className="quote-form-textarea"
                />
              </div>

              <div className="quote-actions-row">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="quote-btn-secondary"
                >
                  <ArrowLeft style={{ width: 16, height: 16 }} />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="quote-btn-primary"
                >
                  <span>Request Proposal & Estimate</span>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="quote-success-view">
          <div className="quote-success-icon">
            <CheckCircle2 style={{ width: 32, height: 32 }} />
          </div>
          <h3 className="quote-success-title">Proposal Request Dispatched!</h3>
          <p className="quote-success-desc">
            Thank you, <strong style={{ color: "#0f172a" }}>{clientInfo.name}</strong>. We have logged your request for <strong style={{ color: "#0284c7" }}>{currentServiceObj.title}</strong>. Our enterprise leads will prepare a custom proposal and reach out to <strong style={{ color: "#0f172a" }}>{clientInfo.email}</strong>.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
            className="quote-btn-secondary"
          >
            Start New Estimate
          </button>
        </div>
      )}
    </div>
  );
}
