import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { logEvent, type Inquiry } from "@/lib/inquiries";

/**
 * The bridge to your Hermes agent (Nous Research Hermes Agent).
 *
 * Push — every new enquiry is POSTed to HERMES_WEBHOOK_URL (a Hermes webhook
 * route, e.g. https://<vps>/webhooks/iforge-enquiries) in Hermes's V2
 * signature format: `X-Webhook-Timestamp: <unix seconds>` plus
 * `X-Webhook-Signature-V2: <hex HMAC-SHA256 of "<timestamp>.<body>">` keyed
 * with HERMES_WEBHOOK_SECRET. The body carries `event_type` so the route's
 * `events` filter can match it.
 *
 * Pull — Hermes reads and updates enquiries through the MCP endpoint at
 * /api/mcp (or the REST routes under /api/agent/*), authenticating with
 * `Authorization: Bearer <AGENT_API_KEY>`.
 */

export const isHermesWebhookConfigured = Boolean(process.env.HERMES_WEBHOOK_URL);
export const isAgentApiConfigured = Boolean(process.env.AGENT_API_KEY);

/** Hermes webhook V2 signature: HMAC-SHA256 over "<timestamp>.<body>", hex. */
export function signV2(timestamp: string, body: string): string {
  const secret = process.env.HERMES_WEBHOOK_SECRET || "";
  return createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex");
}

/** Send the new enquiry to Hermes and record whether it arrived. */
export async function notifyHermes(inq: Inquiry): Promise<void> {
  const url = process.env.HERMES_WEBHOOK_URL;
  if (!url) return;
  if (!process.env.HERMES_WEBHOOK_SECRET) {
    // Hermes rejects unsigned requests, so say why instead of sending one.
    await logEvent(inq.id, "webhook.failed", "HERMES_WEBHOOK_SECRET is not set on the website");
    return;
  }
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const body = JSON.stringify({
    event_type: "inquiry.created",
    sentAt: new Date().toISOString(),
    inquiry: inq,
  });
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "iforge-web",
        "X-Webhook-Timestamp": timestamp,
        "X-Webhook-Signature-V2": signV2(timestamp, body),
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
