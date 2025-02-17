"use client";

import Link from "next/link";

import { navigationRoutes } from "@/shared/constants/page-routes";
import { cn } from "@/shared/utils/cn";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={cn("mb-10 flex items-center gap-8")}>
      {navigationRoutes.map(({ text, path, matcher }) => (
        <Link
          key={path}
          href={path}
          className={cn(
            "text-base font-semibold text-slate-400 transition-colors duration-300 hover:text-slate-100 hover:underline",
            {
              "text-slate-100 underline": matcher(pathname),
            },
          )}
        >
          {text}
        </Link>
      ))}
    </nav>
  );
};
