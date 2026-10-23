import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export { HomePage as default } from "@/pages/home";
