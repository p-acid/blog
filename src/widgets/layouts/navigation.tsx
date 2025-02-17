"use client";

import { Lacquer } from "next/font/google";
import Link from "next/link";

import { navigationRoutes } from "@/shared/constants/page-routes";
import { cn } from "@/shared/utils/cn";
import { usePathname } from "next/navigation";

const lacquer = Lacquer({
  weight: "400",
  subsets: ["latin"],
});

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className={cn(lacquer.className, "mb-10 flex items-center gap-8")}>
      {navigationRoutes.map(({ text, path, matcher }) => (
        <Link
          key={path}
          href={path}
          className={cn(
            "text-lg text-slate-400 transition-colors duration-300 hover:text-slate-100",
            {
              "text-slate-100": matcher(pathname),
            },
          )}
        >
          {text}
        </Link>
      ))}
    </nav>
  );
};
