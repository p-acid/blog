import dayjs from "dayjs";

import { pageRoutes } from "@/shared/constants/page-routes";
import { contentsBases } from "@/shared/constants/paths";
import { authorName, siteUrl } from "@/shared/constants/url";
import { PostFrontmatter } from "@/shared/types/contents";
import { NextPageProps } from "@/shared/types/nextjs";
import { getContentDetail } from "@/shared/utils/contents";
import { Toc } from "./toc";
import { cn } from "@/shared/utils/cn";
import { Giscus } from "./giscus";
import { BackLink } from "@/widgets/layouts";

export type PostDetailPageParams = {
  slug: string;
};

export const PostDetailPage = async ({
  params,
}: NextPageProps<PostDetailPageParams>) => {
  const { slug } = await params;

  const { frontmatter, MDX, toc } = await getContentDetail<PostFrontmatter>({
    base: contentsBases.posts,
    slug,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: dayjs(frontmatter.date).toISOString(),
    author: { "@type": "Person", name: authorName, url: siteUrl },
    mainEntityOfPage: `${siteUrl}${pageRoutes.posts}/${slug}`,
    keywords: frontmatter.tags,
    inLanguage: "ko-KR",
  };

  return (
    <article
      className={cn(
        "post-content prose-h3: prose prose-invert relative w-full max-w-none",
        "prose-headings:mt-10 prose-headings:font-medium prose-h2:text-xl prose-h3:text-lg prose-h4:text-base",
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <BackLink
        href={
          frontmatter.category === "log" ? pageRoutes.logs : pageRoutes.posts
        }
        text={frontmatter.category === "log" ? "Logs" : "Posts"}
      />

      <div className="mb-10 border-b border-zinc-800 pb-6">
        <h1 className="!mt-0 mb-3 text-2xl font-semibold">
          {frontmatter.title}
        </h1>

        <p className="my-0 text-sm tabular-nums text-zinc-500">
          {dayjs(frontmatter.date).format("YYYY.MM.DD")}
          {frontmatter.tags.length > 0 && ` · ${frontmatter.tags.join(", ")}`}
        </p>
      </div>

      <Toc toc={toc} />

      <MDX />

      <Giscus />
    </article>
  );
};
