import { json, method, requireAdmin, storageError, readBody, writeContent } from "../_cms";

export default async function handler(req: any, res: any) {
  if (!method(req, res, "PUT")) return;
  if (!requireAdmin(req, res)) return;

  try {
    json(res, 200, await writeContent(readBody(req)));
  } catch (error) {
    if (storageError(res, error)) return;
    json(res, 500, { message: "Publish failed" });
  }
}
