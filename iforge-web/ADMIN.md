# Admin panel & live content

The site reads all editable content (services, site info, about, community,
GitHub username) through `src/lib/content.ts`. When Supabase is configured, that
content comes from the database and is editable at **`/admin`** with no code
changes. When it isn't, the site serves the built-in defaults from
`src/data/siteData.ts` and the admin panel runs in read-only preview.

## 1. Set an admin password

In `iforge-web/.env.local`:

```
ADMIN_PASSWORD=choose-a-strong-password
```

Restart the dev server. You can now sign in at `/admin`.

## 2. Connect Supabase (to actually save edits)

1. Create a free project at <https://supabase.com>.
2. In the project's **SQL Editor**, run the contents of
   [`supabase/schema.sql`](supabase/schema.sql) once. It creates the
   `site_content` table and a public read policy.
3. In **Project Settings → API**, copy these into `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...        # "anon" / public key
   SUPABASE_SERVICE_ROLE_KEY=eyJ...            # "service_role" key — server only
   ```

4. Restart the dev server. The `/admin` "preview mode" banner disappears and
   **Save changes** now persists to the database. Saving also refreshes the
   public pages so edits appear immediately.

> The `service_role` key bypasses row-level security. Keep it on the server
> only — it must never be sent to the browser. (`.env.local` is gitignored.)

## 3. GitHub skyline (Community page)

Set `GITHUB_USERNAME` and a `GITHUB_TOKEN` (classic token, `read:user` scope) in
`.env.local`, or set the username from the admin panel's **Community** tab. The
token must still be on the server. Without a token the skyline shows a
"Connect GitHub" empty state — never demo data.

## What you can edit from `/admin`

- **Site & Contact** — company name, tagline, headline, email, phone, address.
- **Services** — all 5 services: titles, descriptions, features, technologies,
  deliverables, benefits, metrics, and FAQs.
- **About** — value propositions and the company timeline.
- **Community** — headline, intro, GitHub username, and community tracks.

## Deploying

Add the same env vars in your host's environment settings (e.g. Vercel →
Project → Settings → Environment Variables). Don't commit secrets to the repo.
