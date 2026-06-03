import { json, logoutCookie, method } from "../_cms";

export default function handler(req: any, res: any) {
  if (!method(req, res, "POST")) return;
  res.setHeader("Set-Cookie", logoutCookie());
  json(res, 200, { ok: true });
}
