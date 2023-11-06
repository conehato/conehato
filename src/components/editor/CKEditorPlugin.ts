import { postFile } from "@/services/file";

export function CKEditorPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return {
      upload() {
        return new Promise((resolve) => {
          loader.file.then(async (file: File | null) => {
            if (file) {
              const res = await postFile({ file });

              resolve({ default: res.url });
            }
          });
        });
      },
    };
  };
}
