# Admin panel, enquiry inbox & Hermes

Everything editable on the site — content, the team, and enquiries from the
website — is managed at **`/admin`**, with no code changes.

| Section | What it does |
| --- | --- |
| **Inbox** | Every contact-form and quote-wizard submission, live. Change status, assign to Hermes or yourself, keep notes, draft a reply, and see an activity log of everything that happened. |
| **Team** | The people on the public `/team` page: photo upload, name, role, bio, links, order. |
| **Content** | Site & contact info, the five services, About (values + timeline), Community. |

## 1. Sign in

In `iforge-web/.env.local`:

```
ADMIN_PASSWORD=choose-a-strong-password
```

Restart the dev server and sign in at `/admin`.

## 2. Where data is saved

- **Without Supabase (development):** edits, enquiries and team photos are
  saved to local files — `.data/` and `public/uploads/` (both gitignored). The
  sidebar shows **Local files (dev)**. Fine on your machine, but most hosts
  don't keep files, so connect Supabase before going live.
- **With Supabase (production):**
  1. Create a free project at <https://supabase.com>.
  2. In the **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql)
     once. It creates the `site_content` and `inquiries` tables and the public
     `media` bucket for team photos.
  3. From **Project Settings → API**, add to `.env.local`:

     ```
     NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...        # "anon" / public key
     SUPABASE_SERVICE_ROLE_KEY=eyJ...            # "service_role" key — server only
     ```

  4. Restart. The sidebar shows **Supabase**.

> The `service_role` key bypasses row-level security. Keep it on the server only.

## 3. Notifications

While any admin page is open, it checks for new enquiries every 10 seconds
(and whenever you come back to the tab). A new one raises:

- a toast in the corner (click it to open the enquiry),
- a red count on **Inbox** and in the browser tab title,
- a desktop notification — click **Enable desktop alerts** in the Inbox once.

## 4. Hermes — letting your agent manage enquiries

Hermes connects in two directions. Set both up for the full loop.

### Push: new enquiries are sent to Hermes

Set in `.env.local`:

```
HERMES_WEBHOOK_URL=https://your-hermes-endpoint/...   # where Hermes listens
HERMES_WEBHOOK_SECRET=<long random string>             # shared with Hermes
```

The moment an enquiry is saved, the site sends:

```http
POST <HERMES_WEBHOOK_URL>
Content-Type: application/json
X-iForge-Event: inquiry.created
X-iForge-Signature: sha256=<hex HMAC-SHA256 of the raw body, keyed with HERMES_WEBHOOK_SECRET>

{ "event": "inquiry.created", "sentAt": "…", "inquiry": { …the full enquiry… } }
```

Hermes should recompute the HMAC over the raw body and compare it to the
header before trusting the request. Delivery (or failure) is recorded in the
enquiry's activity log, so you can see in the Inbox whether Hermes got it.

### Pull: Hermes reads and updates enquiries

Set `AGENT_API_KEY=<long random string>` and give Hermes the same key. Every
request needs `Authorization: Bearer <AGENT_API_KEY>`.

| Request | Does |
| --- | --- |
| `GET /api/agent/inquiries?status=new&since=<ISO>&limit=50` | List enquiries (filters optional; newest first) |
| `GET /api/agent/inquiries/<id>` | Read one enquiry |
| `PATCH /api/agent/inquiries/<id>` | Update it — body: `{ "status"?, "notes"?, "reply"?, "assignee"? }` |

- `status`: `new` · `in_progress` · `resolved` · `archived`
- `assignee`: `unassigned` · `hermes` · `admin`
- Updating an unassigned enquiry automatically assigns it to Hermes.
- Every change is logged on the enquiry as a **Hermes** action, and appears in
  your Inbox within 10 seconds. Notes and the draft reply are shared — you can
  edit them in the Inbox too.

Example:

```bash
curl -X PATCH https://your-site/api/agent/inquiries/<id> \
  -H "Authorization: Bearer $AGENT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status":"in_progress","notes":"Qualified lead","reply":"Hi — could we book a call?"}'
```

## 5. GitHub skyline (Community page)

Set `GITHUB_USERNAME` and a `GITHUB_TOKEN` (classic token, `read:user` scope),
or set the username in **Content → Community**. Without a token the skyline
shows a "Connect GitHub" empty state — never demo data.

## Deploying

Add the same variables in your host's environment settings (e.g. Vercel →
Project → Settings → Environment Variables), connect Supabase, and never
commit secrets to the repo.
