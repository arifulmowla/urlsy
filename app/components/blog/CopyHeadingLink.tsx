"use client";

import { useState } from "react";

type CopyHeadingLinkProps = {
  id: string;
};

export function CopyHeadingLink({ id }: CopyHeadingLinkProps) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // No-op: keep UI calm if copy is blocked.
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="focus-ring inline-flex items-center border-2 border-[var(--stroke)] bg-[var(--surface-1)] px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.13em] text-black/80 hover:text-black"
      aria-label={`Copy link to section ${id}`}
      title="Copy section link"
    >
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
