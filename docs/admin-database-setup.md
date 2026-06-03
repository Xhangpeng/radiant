# Admin Database Setup

Recommended free provider: Supabase.

Supabase free currently gives 500 MB database quota and 1 GB file storage. That is enough for a school admin content panel if images are compressed before upload.

## Supabase

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/admin-content.sql`.
3. In Project Settings, copy:
   - Project URL
   - Service role key
4. Add these Vercel environment variables:

```env
DATABASE_PROVIDER=supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_CONTENT_TABLE=site_content
SUPABASE_CONTENT_ID=radiant
SUPABASE_STORAGE_BUCKET=uploads
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SESSION_SECRET=generate-a-long-random-secret
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Never expose it in client code.

## Local Fallback

Without `DATABASE_PROVIDER=supabase`, the app uses local files:

```env
DATABASE_PROVIDER=file
CONTENT_DIR=./data
ADMIN_PASSWORD=radiant-admin
ADMIN_SESSION_SECRET=local-dev-secret
```

Firebase can also be used, but this repo is wired for Supabase because the admin panel stores one structured JSON document plus uploaded public media, which maps cleanly to Postgres JSONB and Supabase Storage.
