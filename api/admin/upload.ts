import { json, method, requireAdmin, storageError, readBody, uploadDataUrl } from "../_cms.js";

export default async function handler(req: any, res: any) {
  if (!method(req, res, "POST")) return;
  if (!requireAdmin(req, res)) return;

  try {
    const body = readBody(req);
    json(res, 200, await uploadDataUrl(body.fileName, body.dataUrl));
  } catch (error) {
    if (storageError(res, error)) return;
    json(res, 500, { message: "Upload failed" });
  }
}
