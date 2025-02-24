import { HighlightedCode, Pre } from "codehike/code";

import { cn } from "@/shared/utils/cn";
import { callout } from "./callout";
import { CopyButton } from "./copy-button";
import { focus } from "./focus";
import { link } from "./link";

export interface CodeProps {
  codeblock: HighlightedCode;
}

export const Code = ({ codeblock }: CodeProps) => {
  return (
    <div className="relative my-8 rounded-md border border-zinc-800 bg-zinc-900">
      <CopyButton
        className={cn("absolute right-3 top-2", {
          "top-3": !codeblock.meta,
        })}
        text={codeblock.code}
      />

      {codeblock.meta && (
        <div className="border-b border-zinc-800 px-4 py-3 font-mono text-xs">
          {codeblock.meta}
        </div>
      )}

      <Pre
        className="my-0 bg-zinc-900 px-0 *:*:px-3"
        code={codeblock}
        handlers={[callout, link, focus]}
      />
    </div>
  );
};
