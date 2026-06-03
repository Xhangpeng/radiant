import { hasAdminSession, json, method } from "../_cms";

export default function handler(req: any, res: any) {
  if (!method(req, res, "GET")) return;
  json(res, 200, { ok: hasAdminSession(req) });
}
