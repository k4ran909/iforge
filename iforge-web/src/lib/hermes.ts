import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { logEvent, type Inquiry } from "@/lib/inquiries";

/**
 * The bridge to your Hermes agent (or any agent that speaks HTTP).
 *
 * Push — every new enquiry is POSTed to HERMES_WEBHOOK_URL as JSON, signed
 * with HMAC-SHA256 over the raw body using HERMES_WEBHOOK_SECRET in the
 * `X-iForge-Signature: sha256=<hex>` header.
 *
 * Pull — Hermes can list, read and update enquiries through /api/agent/*,
 * authenticating with `Authorization: Bearer <AGENT_API_KEY>`.
 */

export const isHermesWebhookConfigured = Boolean(process.env.HERMES_WEBHOOK_URL);
export const isAgentApiConfigured = Boolean(process.env.AGENT_API_KEY);

export function sign(body: string): string {
  const secret = process.env.HERMES_WEBHOOK_SECRET || "";
  return "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
}

/** Send the new enquiry to Hermes and record whether it arrived. */
export async function notifyHermes(inq: Inquiry): Promise<void> {
  const url = process.env.HERMES_WEBHOOK_URL;
  if (!url) return;
  const body = JSON.stringify({ event: "inquiry.created", sentAt: new Date().toISOString(), inquiry: inq });
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "iforge-web",
        "X-iForge-Event": "inquiry.created",
        "X-iForge-Signature": sign(body),
      },
      body,
      signal: AbortSignal.timeout(8000),
    });
    await logEvent(inq.id, res.ok ? "webhook.delivered" : "webhook.failed", `Hermes responded ${res.status}`);
  } catch (e) {
    await logEvent(inq.id, "webhook.failed", e instanceof Error ? e.message : "request failed");
  }
}

/** True when the request carries the agent's bearer key. */
export function isAgentRequest(request: Request): boolean {
  const key = process.env.AGENT_API_KEY;
  if (!key) return false;
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token);
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}
