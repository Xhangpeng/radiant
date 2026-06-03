import { json, method, readContent } from "./_cms";

export default async function handler(req: any, res: any) {
  if (!method(req, res, "GET")) return;
  json(res, 200, await readContent());
}
