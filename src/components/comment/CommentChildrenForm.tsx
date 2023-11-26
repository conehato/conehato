"use client";

import { useState } from "react";

import { CommentForm, CommentFormProps } from "./CommentForm";

interface CommentChildrenFormProps extends CommentFormProps {
  children: React.ReactNode;
  disable: boolean;
}
export function CommentChildrenForm({
  children,
  disable,
  ...props
}: CommentChildrenFormProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div
        onClick={disable ? undefined : () => setShow((prev) => !prev)}
        className={disable ? "" : "cursor-pointer"}
      >
        {children}
      </div>
      {show && <CommentForm {...props} />}
    </div>
  );
}
