import "server-only";
import { siteConfig } from "@/data/siteData";
import { logEvent, type Inquiry } from "@/lib/inquiries";

/**
 * Outgoing email through Resend (https://resend.com), called over its REST API.
 * Needs RESEND_API_KEY and EMAIL_FROM (an address on a domain verified in
 * Resend, e.g. "iForge Technologies <hello@iforge.in>"). Replies from the
 * customer go to siteConfig.contactEmail.
 */

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM;

export const isEmailConfigured = Boolean(apiKey && from);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Plain text → simple HTML paragraphs, matching the text version exactly. */
function toHtml(text: string): string {
  const paras = text
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111;max-width:600px">${paras}</div>`;
}

async function send(to: string, subject: string, text: string): Promise<void> {
  if (!apiKey || !from) throw new Error("Email isn't set up — add RESEND_API_KEY and EMAIL_FROM.");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: siteConfig.contactEmail, subject, text, html: toHtml(text) }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(`Resend ${res.status}${body?.message ? `: ${body.message}` : ""}`);
  }
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "there";

/** Automatic "we got it" email to whoever sent the enquiry. */
export async function sendConfirmation(inq: Inquiry): Promise<void> {
  if (!isEmailConfigured) return;
  const summary = [
    ["Service", inq.service],
    ["Budget", inq.budget],
    ["Scope", inq.scope],
    ["Timeline", inq.timeline],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const text = [
    `Hi ${firstName(inq.name)},`,
    `Thanks for contacting ${siteConfig.name}. We've received your ${
      inq.source === "quote" ? "project estimate request" : "message"
    } — your reference is ${inq.ticket}.`,
    `A member of our team will reply personally from ${siteConfig.contactEmail}. If you need to add anything, just reply to this email.`,
    summary,
    inq.message ? `Your message:\n${inq.message}` : "",
    `— ${siteConfig.name}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    await send(inq.email, `We've received your enquiry (${inq.ticket})`, text);
    await logEvent(inq.id, "email.confirmation", `to ${inq.email}`);
  } catch (e) {
    await logEvent(inq.id, "email.failed", `confirmation: ${e instanceof Error ? e.message : "send failed"}`);
  }
}

/** Email the enquiry's approved reply to the customer. Throws if it fails. */
export async function sendReply(inq: Inquiry): Promise<void> {
  const reply = inq.reply?.trim();
  if (!reply) throw new Error("Write a reply first.");
  try {
    await send(inq.email, `Re: your enquiry (${inq.ticket}) — ${siteConfig.name}`, reply);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "send failed";
    await logEvent(inq.id, "email.failed", `reply: ${msg}`);
    throw new Error(msg);
  }
  await logEvent(inq.id, "email.reply", `to ${inq.email}`);
}
