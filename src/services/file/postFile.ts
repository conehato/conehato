interface PostFileProps {
  file: File;
}
export async function postFile({ file }: PostFileProps) {
  const preSignedUrlRes = await fetch(`/api/file`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  });

  const { url, fields } = await preSignedUrlRes.json();

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", file);

  await fetch(url, {
    method: "POST",
    body: formData,
  });

  return { url: url + fields.key };
}
