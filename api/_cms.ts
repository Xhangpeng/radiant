import crypto from "crypto";
import { get, put } from "@vercel/blob";

const adminPassword = process.env.ADMIN_PASSWORD || "RADIANT";
const adminSecret = process.env.ADMIN_SESSION_SECRET || "radiant-local-session";
const adminCookie = "radiant_admin";
const contentBlobPath = "cms/content.json";

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

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string | string[]) => void;
};

type VercelRequest = {
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  method?: string;
};

export function json(res: VercelResponse, status: number, body: unknown) {
  res.setHeader("Cache-Control", "no-store");
  res.status(status).json(body);
}

export function method(req: VercelRequest, res: VercelResponse, expected: string) {
  if (req.method === expected) return true;
  json(res, 405, { message: "Method not allowed" });
  return false;
}

export function readBody(req: VercelRequest) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body as Record<string, unknown>;
}

export function signSession(value: string) {
  const signature = crypto.createHmac("sha256", adminSecret).update(value).digest("hex");
  return `${value}.${signature}`;
}

export function verifySession(value = "") {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;
  const expected = crypto.createHmac("sha256", adminSecret).update(payload).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function parseCookies(cookieHeader = "") {
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

export function hasAdminSession(req: VercelRequest) {
  const cookieHeader = Array.isArray(req.headers.cookie)
    ? req.headers.cookie.join(";")
    : req.headers.cookie || "";
  const cookies = parseCookies(cookieHeader);
  return verifySession(cookies[adminCookie]);
}

export function requireAdmin(req: VercelRequest, res: VercelResponse) {
  if (hasAdminSession(req)) return true;
  json(res, 401, { message: "Admin login required" });
  return false;
}

export function loginCookie() {
  const token = signSession(`admin:${Date.now()}`);
  return `${adminCookie}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`;
}

export function logoutCookie() {
  return `${adminCookie}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function passwordMatches(value: unknown) {
  return value === adminPassword;
}

function requireBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return;
  const error = new Error(
    "Persistent storage is not configured. Create and connect a Vercel Blob store for BLOB_READ_WRITE_TOKEN.",
  );
  error.name = "MissingBlobStore";
  throw error;
}

export async function readContent() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return seedContent;

  try {
    const result = await get(contentBlobPath, { access: "public" });
    if (!result || result.statusCode !== 200) return seedContent;
    const text = await new Response(result.stream as BodyInit).text();
    return JSON.parse(text);
  } catch {
    return seedContent;
  }
}

export async function writeContent(content: unknown) {
  requireBlobToken();
  const payload = {
    ...(content as Record<string, unknown>),
    updatedAt: new Date().toISOString(),
  };

  await put(contentBlobPath, JSON.stringify(payload, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });

  return payload;
}

export function safeUploadName(name: string) {
  const ext = name.includes(".")
    ? name.slice(name.lastIndexOf(".")).toLowerCase().replace(/[^a-z0-9.]/g, "")
    : ".jpg";
  const base = name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 54);
  return `${base || "upload"}-${crypto.randomBytes(4).toString("hex")}${ext || ".jpg"}`;
}

export async function uploadDataUrl(fileName: unknown, dataUrl: unknown) {
  requireBlobToken();
  const match = typeof dataUrl === "string" ? dataUrl.match(/^data:(.+);base64,(.+)$/) : null;
  if (!fileName || typeof fileName !== "string" || !match) {
    const error = new Error("Expected fileName and base64 dataUrl");
    error.name = "BadUpload";
    throw error;
  }

  const safeName = safeUploadName(fileName);
  const blob = await put(`cms/uploads/${safeName}`, Buffer.from(match[2], "base64"), {
    access: "public",
    contentType: match[1],
    addRandomSuffix: false,
    cacheControlMaxAge: 31536000,
  });

  return { url: blob.url };
}

export function storageError(res: VercelResponse, error: unknown) {
  if (error instanceof Error && error.name === "MissingBlobStore") {
    json(res, 503, { message: error.message });
    return true;
  }
  if (error instanceof Error && error.name === "BadUpload") {
    json(res, 400, { message: error.message });
    return true;
  }
  return false;
}
