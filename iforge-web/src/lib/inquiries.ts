import "server-only";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
import { readJson, writeJson, withLock } from "@/lib/local-store";

/**
 * Enquiries from the website's contact and quote forms. Stored in Supabase
 * (`inquiries` table) when configured, else `.data/inquiries.json` locally.
 * The admin inbox reads these, and the Hermes agent manages them through the
 * agent API — every change is appended to the enquiry's activity log.
 */

export type InquiryStatus = "new" | "in_progress" | "resolved" | "archived";
export type InquiryAssignee = "unassigned" | "hermes" | "admin";
export type InquiryActor = "website" | "admin" | "agent" | "system";

export interface InquiryEvent {
  at: string;
  actor: InquiryActor;
  /** created · status · assigned · note · reply · webhook.delivered · webhook.failed */
  type: string;
  detail?: string;
}

export interface Inquiry {
  id: string;
  ticket: string;
  createdAt: string;
  updatedAt: string;
  source: "contact" | "quote";
  status: InquiryStatus;
  assignee: InquiryAssignee;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  scope?: string;
  timeline?: string;
  message: string;
  /** Page the form was sent from. */
  page?: string;
  /** Working notes — written by Hermes or by you. */
  notes?: string;
  /** Draft or sent reply to the customer. */
  reply?: string;
  events: InquiryEvent[];
}

export type NewInquiry = Pick<
  Inquiry,
  "source" | "name" | "email" | "phone" | "company" | "service" | "budget" | "scope" | "timeline" | "message" | "page"
>;

export interface InquiryPatch {
  status?: InquiryStatus;
  assignee?: InquiryAssignee;
  notes?: string;
  reply?: string;
}

const TABLE = "inquiries";
const FILE = "inquiries";

const now = () => new Date().toISOString();
const ticketFor = () => `IF-${Math.floor(1000 + Math.random() * 9000)}`;

// ---- storage, Supabase or local file -------------------------------------

async function loadAll(): Promise<Inquiry[]> {
  const db = getSupabaseAdmin();
  if (!db) return readJson<Inquiry[]>(FILE, []);
  const { data, error } = await db.from(TABLE).select("data").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.data as Inquiry);
}

async function saveOne(inq: Inquiry): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) {
    await withLock(FILE, async () => {
      const all = await readJson<Inquiry[]>(FILE, []);
      const i = all.findIndex((x) => x.id === inq.id);
      if (i === -1) all.unshift(inq);
      else all[i] = inq;
      await writeJson(FILE, all);
    });
    return;
  }
  const { error } = await db.from(TABLE).upsert({
    id: inq.id,
    status: inq.status,
    created_at: inq.createdAt,
    updated_at: inq.updatedAt,
    data: inq,
  });
  if (error) throw new Error(error.message);
}

// ---- public API ------------------------------------------------------------

export async function createInquiry(input: NewInquiry): Promise<Inquiry> {
  const at = now();
  const inq: Inquiry = {
    ...input,
    id: randomUUID(),
    ticket: ticketFor(),
    createdAt: at,
    updatedAt: at,
    status: "new",
    assignee: "unassigned",
    events: [{ at, actor: "website", type: "created", detail: `via ${input.source} form` }],
  };
  await saveOne(inq);
  return inq;
}

export async function listInquiries(filter: { status?: InquiryStatus; since?: string; limit?: number } = {}) {
  let all = await loadAll();
  all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (filter.status) all = all.filter((i) => i.status === filter.status);
  if (filter.since) all = all.filter((i) => i.updatedAt > filter.since!);
  if (filter.limit) all = all.slice(0, filter.limit);
  return all;
}

export async function getInquiry(id: string): Promise<Inquiry | null> {
  const db = getSupabaseAdmin();
  if (!db) return (await readJson<Inquiry[]>(FILE, [])).find((i) => i.id === id) ?? null;
  const { data } = await db.from(TABLE).select("data").eq("id", id).maybeSingle();
  return (data?.data as Inquiry) ?? null;
}

const STATUSES: InquiryStatus[] = ["new", "in_progress", "resolved", "archived"];
const ASSIGNEES: InquiryAssignee[] = ["unassigned", "hermes", "admin"];

/** Validate an untrusted patch body. Returns null when nothing usable was sent. */
export function parsePatch(body: unknown): InquiryPatch | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const patch: InquiryPatch = {};
  if (typeof b.status === "string" && STATUSES.includes(b.status as InquiryStatus)) patch.status = b.status as InquiryStatus;
  if (typeof b.assignee === "string" && ASSIGNEES.includes(b.assignee as InquiryAssignee)) patch.assignee = b.assignee as InquiryAssignee;
  if (typeof b.notes === "string") patch.notes = b.notes.slice(0, 10_000);
  if (typeof b.reply === "string") patch.reply = b.reply.slice(0, 10_000);
  return Object.keys(patch).length ? patch : null;
}

/** Apply a change, logging each field that actually changed. */
export async function updateInquiry(id: string, patch: InquiryPatch, actor: InquiryActor): Promise<Inquiry | null> {
  const inq = await getInquiry(id);
  if (!inq) return null;
  const at = now();
  if (patch.status && patch.status !== inq.status) {
    inq.events.push({ at, actor, type: "status", detail: `${inq.status} → ${patch.status}` });
    inq.status = patch.status;
  }
  if (patch.assignee && patch.assignee !== inq.assignee) {
    inq.events.push({ at, actor, type: "assigned", detail: patch.assignee });
    inq.assignee = patch.assignee;
  }
  if (patch.notes !== undefined && patch.notes !== inq.notes) {
    inq.events.push({ at, actor, type: "note" });
    inq.notes = patch.notes;
  }
  if (patch.reply !== undefined && patch.reply !== inq.reply) {
    inq.events.push({ at, actor, type: "reply" });
    inq.reply = patch.reply;
  }
  inq.updatedAt = at;
  await saveOne(inq);
  return inq;
}

/** Record a system event (e.g. webhook delivery) without other changes. */
export async function logEvent(id: string, type: string, detail?: string): Promise<void> {
  const inq = await getInquiry(id);
  if (!inq) return;
  inq.events.push({ at: now(), actor: "system", type, detail });
  inq.updatedAt = now();
  await saveOne(inq);
}
