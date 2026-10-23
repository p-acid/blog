import { Metadata } from "next";

import { siteDescription, siteName, siteUrl } from "@/shared/constants/url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s - ${siteName}` },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    locale: "ko_KR",
    title: siteName,
    description: siteDescription,
  },
  twitter: { card: "summary_large_image" },
};

export { RootLayout as default } from "@/app/layouts/root-layout";
