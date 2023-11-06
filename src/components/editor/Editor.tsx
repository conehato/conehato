"use client";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CKEditorPlugin } from "./CKEditorPlugin";

interface IEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: IEditorProps) {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{ extraPlugins: [CKEditorPlugin] }}
      onReady={(editor: any) => editor.data.set(value || "")}
      onChange={(_: any, editor: any) => onChange(editor.getData())}
    />
  );
}
