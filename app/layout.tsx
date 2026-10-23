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
  // Search Console 소유 확인 (공개 값)
  verification: { google: "UVhM9NkoE76iIlWiqyLqh63BXVIs9RSMtUIbBU31cTk" },
};

export { RootLayout as default } from "@/app/layouts/root-layout";
