import { HTMLAttributes } from "react";

import InfoIcon from "@/shared/assets/callout-icon/info.svg";
import WarningIcon from "@/shared/assets/callout-icon/warning.svg";
import { cn } from "../utils/cn";

const CALLOUT_STYLES = {
  info: {
    icon: InfoIcon,
    color: "*:fill-violet-600",
    background: "bg-violet-950",
  },
  warning: {
    icon: WarningIcon,
    color: "*:fill-yellow-500",
    background: "bg-yellow-950",
  },
} as const;

type CalloutType = keyof typeof CALLOUT_STYLES;

export interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  type: CalloutType;
}

export const Callout = ({ type = "info", children }: CalloutProps) => {
  const { icon: SVGIcon, color, background } = CALLOUT_STYLES[type];

  return (
    <div className={cn(`my-6 flex gap-4 rounded-lg px-6 py-5`, background)}>
      <SVGIcon className={cn("mt-1 max-h-5 w-5 min-w-5", color)} />
      <div className="flex w-full flex-col gap-3 *:my-0">{children}</div>
    </div>
  );
};
