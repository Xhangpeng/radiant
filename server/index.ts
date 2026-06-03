import express from "express";
import { createServer } from "http";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === "production";

const contentDir = process.env.CONTENT_DIR
  ? path.resolve(process.env.CONTENT_DIR)
  : path.resolve(process.cwd(), "data");
const uploadsDir = path.join(contentDir, "uploads");
const contentFile = path.join(contentDir, "content.json");
const adminPassword = process.env.ADMIN_PASSWORD || "RADIANT";
const adminSecret = process.env.ADMIN_SESSION_SECRET || "radiant-local-session";
const adminCookie = "radiant_admin";
const databaseProvider = (process.env.DATABASE_PROVIDER || "file").toLowerCase();
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseContentTable = process.env.SUPABASE_CONTENT_TABLE || "site_content";
const supabaseContentId = process.env.SUPABASE_CONTENT_ID || "radiant";
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET || "uploads";

const seedContent = {
  site: {
    schoolName: "Radiant Secondary School",
    tagline: "Quality | Confidence | Character",
    location: "Bheemdatt Municipality-18, Mahendranagar",
    contact: "099-525169",
    email: "info@radiantmnr.edu.np",
    admissionCta: "Apply Now",
  },
  home: {
    heroTitle: "A disciplined school community for confident learners.",
    heroSubtitle:
      "Radiant Secondary School combines academic focus, practical exposure, and student care in Mahendranagar.",
    highlights: [
      { label: "Established", value: "2057 B.S.", note: "Serving families since 2000 A.D." },
      { label: "Programs", value: "School +2", note: "Science and Management streams" },
      { label: "Focus", value: "Care", note: "Guided academics and co-curricular growth" },
    ],
  },
  gallery: [],
  notices: [],
  updatedAt: new Date().toISOString(),
};

function signSession(value: string) {
  const signature = crypto.createHmac("sha256", adminSecret).update(value).digest("hex");
  return `${value}.${signature}`;
}

function verifySession(value = "") {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = crypto.createHmac("sha256", adminSecret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function parseCookies(cookieHeader = "") {
  return Object.fromEntries(
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");
        return [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      }),
  );
}

async function ensureContentStore() {
  await fs.mkdir(uploadsDir, { recursive: true });
  try {
    await fs.access(contentFile);
  } catch {
    await fs.writeFile(contentFile, JSON.stringify(seedContent, null, 2), "utf8");
  }
}

function useSupabaseStore() {
  return databaseProvider === "supabase" && Boolean(supabaseUrl && supabaseServiceRoleKey);
}

function requireSupabaseConfig() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase storage is selected but SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.");
  }
  return { url: supabaseUrl, key: supabaseServiceRoleKey };
}

async function supabaseRequest(pathname: string, init: RequestInit = {}) {
  const { url, key } = requireSupabaseConfig();
  const response = await fetch(`${url}${pathname}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Supabase request failed (${response.status}): ${body || response.statusText}`);
  }

  return response;
}

async function readFileContent() {
  await ensureContentStore();
  const raw = await fs.readFile(contentFile, "utf8");
  return JSON.parse(raw);
}

async function writeFileContent(content: unknown) {
  await ensureContentStore();
  const payload = {
    ...(content as Record<string, unknown>),
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(contentFile, JSON.stringify(payload, null, 2), "utf8");
  return payload;
}

async function readSupabaseContent() {
  const query = `/rest/v1/${supabaseContentTable}?id=eq.${encodeURIComponent(supabaseContentId)}&select=content`;
  const response = await supabaseRequest(query);
  const rows = (await response.json()) as Array<{ content?: unknown }>;
  if (rows[0]?.content) return rows[0].content;
  return writeSupabaseContent(seedContent);
}

async function writeSupabaseContent(content: unknown) {
  const payload = {
    ...(content as Record<string, unknown>),
    updatedAt: new Date().toISOString(),
  };
  await supabaseRequest(`/rest/v1/${supabaseContentTable}?on_conflict=id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      id: supabaseContentId,
      content: payload,
      updated_at: new Date().toISOString(),
    }),
  });
  return payload;
}

async function readContent() {
  return useSupabaseStore() ? readSupabaseContent() : readFileContent();
}

async function writeContent(content: unknown) {
  return useSupabaseStore() ? writeSupabaseContent(content) : writeFileContent(content);
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const cookies = parseCookies(req.headers.cookie);
  if (verifySession(cookies[adminCookie])) return next();
  res.status(401).json({ message: "Admin login required" });
}

function safeUploadName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^a-z0-9.]/g, "") || ".jpg";
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54);
  return `${base || "upload"}-${crypto.randomBytes(4).toString("hex")}${ext}`;
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "30mb" }));
  await ensureContentStore();

  app.use("/uploads", express.static(uploadsDir));
  if (!isProduction) {
    app.use(
      "/manus-storage",
      express.static(path.resolve(process.cwd(), "client", "public", "manus-storage")),
    );
  }

  app.get("/api/content", async (_req, res) => {
    res.set("Cache-Control", "no-store");
    res.json(await readContent());
  });

  app.get("/api/admin/session", (req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    res.json({ ok: verifySession(cookies[adminCookie]) });
  });

  app.post("/api/admin/login", (req, res) => {
    if (req.body?.password !== adminPassword) {
      res.status(401).json({ message: "Wrong admin password" });
      return;
    }

    const token = signSession(`admin:${Date.now()}`);
    res.setHeader(
      "Set-Cookie",
      `${adminCookie}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800`,
    );
    res.json({ ok: true });
  });

  app.post("/api/admin/logout", (_req, res) => {
    res.setHeader("Set-Cookie", `${adminCookie}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
    res.json({ ok: true });
  });

  app.put("/api/admin/content", requireAdmin, async (req, res) => {
    res.json(await writeContent(req.body));
  });

  app.post("/api/admin/upload", requireAdmin, async (req, res) => {
    const { fileName, dataUrl } = req.body || {};
    const match = typeof dataUrl === "string" ? dataUrl.match(/^data:(.+);base64,(.+)$/) : null;
    if (!fileName || !match) {
      res.status(400).json({ message: "Expected fileName and base64 dataUrl" });
      return;
    }

    const safeName = safeUploadName(fileName);
    const buffer = Buffer.from(match[2], "base64");
    if (useSupabaseStore()) {
      await supabaseRequest(`/storage/v1/object/${supabaseStorageBucket}/${safeName}`, {
        method: "POST",
        headers: {
          "Content-Type": match[1],
          "Cache-Control": "public, max-age=31536000",
          "x-upsert": "true",
        },
        body: buffer,
      });
      res.json({ url: `${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucket}/${safeName}` });
      return;
    }

    await fs.writeFile(path.join(uploadsDir, safeName), buffer);
    res.json({ url: `/uploads/${safeName}` });
  });

  // Serve static files from dist/public in production.
  const staticPath = isProduction
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");

  app.get("/sw.js", (_req, res) => {
    res.type("application/javascript");
    res.set("Cache-Control", "public, max-age=0, must-revalidate");
    res.sendFile(path.join(staticPath, "sw.js"));
  });

  app.get("/manifest.json", (_req, res) => {
    res.type("application/manifest+json");
    res.set("Cache-Control", "public, max-age=3600");
    res.sendFile(path.join(staticPath, "manifest.json"));
  });

  if (isProduction) {
    app.use(express.static(staticPath));

    // Handle client-side routing - serve index.html for all routes
    app.get("*", (_req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0" },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
