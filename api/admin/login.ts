import { json, loginCookie, method, passwordMatches, readBody } from "../_cms.js";

export default function handler(req: any, res: any) {
  if (!method(req, res, "POST")) return;
  const body = readBody(req);
  if (!passwordMatches(body.password)) {
    json(res, 401, { message: "Wrong admin password" });
    return;
  }

  res.setHeader("Set-Cookie", loginCookie());
  json(res, 200, { ok: true });
}
