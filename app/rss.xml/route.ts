import dayjs from "dayjs";

import { pageRoutes } from "@/shared/constants/page-routes";
import { contentsBases } from "@/shared/constants/paths";
import { siteDescription, siteName, siteUrl } from "@/shared/constants/url";
import { PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// 네이버 서치어드바이저 RSS 제출용
export const GET = () => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });

  const items = posts
    .map(({ slug, title, description, date, tags }) => {
      const url = `${siteUrl}${pageRoutes.posts}/${slug}`;

      return `<item>
<title>${escapeXml(title)}</title>
<link>${url}</link>
<guid>${url}</guid>
<description>${escapeXml(description ?? "")}</description>
<pubDate>${dayjs(date).toDate().toUTCString()}</pubDate>
${tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>${escapeXml(siteName)}</title>
<link>${siteUrl}</link>
<description>${escapeXml(siteDescription)}</description>
<language>ko</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
