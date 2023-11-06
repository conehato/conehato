import type { PutBlobResult } from "@vercel/blob";

interface PostFileProps {
  file: File;
}
export async function postFile({ file }: PostFileProps) {
  const res = await fetch(`/api/file?filename=${file.name}`, {
    method: "POST",
    body: file,
  });
  return res.json() as Promise<PutBlobResult>;
}
