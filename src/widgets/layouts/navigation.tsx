"use client";

import Link from "next/link";

import { navigationRoutes } from "@/shared/constants/page-routes";
import { cn } from "@/shared/utils/cn";
import { usePathname } from "next/navigation";
import { externalLinks } from "@/shared/constants/external-links";
import { SquareArrowOutUpRight } from "lucide-react";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="mb-10 flex items-center justify-between">
      <nav className={cn("flex items-center gap-8")}>
        {navigationRoutes.map(({ text, path, matcher }) => {
          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "flex items-center gap-1 text-base font-semibold text-slate-400 transition-colors duration-300 hover:text-slate-100 hover:underline",
                {
                  "text-slate-100 underline": matcher(pathname),
                },
              )}
            >
              {text}
            </Link>
          );
        })}
      </nav>

      {externalLinks.map(({ text, url }) => (
        <a
          key={text}
          target="_blank"
          href={url}
          className="inline-flex h-7 items-center gap-1 rounded-2xl bg-slate-100 px-2.5 text-sm font-medium text-slate-900"
        >
          {text}
          <SquareArrowOutUpRight className="size-3.5" />
        </a>
      ))}
    </div>
  );
};
