"use client";

import { Dispatch, useState } from "react";

import { CommentForm, CommentFormProps } from "./CommentForm";

interface CommentChildrenFormProps extends CommentFormProps {
  children: React.ReactNode;
  selectedCommentId: string;
}
export function CommentChildrenForm({
  children,
  selectedCommentId,
  ...props
}: CommentChildrenFormProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div>
        {children}
      </div>
      {selectedCommentId == props.defaultValues.parentId && <CommentForm {...props} />}
    </div>
  );
}
