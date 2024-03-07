"use client";

import { Dispatch, useState } from "react";

import { CommentForm, CommentFormProps } from "./CommentForm";

interface CommentChildrenFormProps extends CommentFormProps {
  children: React.ReactNode;
  disable: boolean;
  selectedCommentId: string;
  setSelectedCommentId: Dispatch<React.SetStateAction<string>>;
}
export function CommentChildrenForm({
  children,
  disable,
  selectedCommentId,
  setSelectedCommentId,
  ...props
}: CommentChildrenFormProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div
        onClick={disable ? undefined : () => setSelectedCommentId((id) => id == props.defaultValues.parentId ? '' : props.defaultValues.parentId!)}
        className={disable ? "" : "cursor-pointer"}
      >
        {children}
      </div>
      {selectedCommentId == props.defaultValues.parentId && <CommentForm {...props} />}
    </div>
  );
}
