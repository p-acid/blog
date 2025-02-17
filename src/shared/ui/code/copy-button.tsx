"use client";

import { cn } from "@/shared/utils/cn";
import { Check, Copy } from "lucide-react";
import { ButtonHTMLAttributes, useState } from "react";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function CopyButton({ className, text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={cn(
        "rounded p-1 text-zinc-400 hover:bg-zinc-400/20",
        className,
      )}
      aria-label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
