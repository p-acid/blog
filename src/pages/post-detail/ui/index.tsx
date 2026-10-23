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
        "post-content prose-h3: prose prose-invert relative mt-6 w-full max-w-none",
        "prose-headings:mt-10 prose-headings:font-medium prose-h2:text-xl prose-h3:text-lg prose-h4:text-base",
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mb-8 border-b border-zinc-800 pb-6">
        <ul className="mb-6 mt-0 flex list-none gap-2 pl-0">
          {frontmatter.tags.map((tag) => (
            <li
              key={tag}
              className="my-0 rounded-md bg-zinc-800 px-2.5 py-1.5 text-xs"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h1 className="mb-3 text-3xl font-bold">{frontmatter.title}</h1>

        <span className="text-base max-sm:text-sm">
          {dayjs(frontmatter.date).format("YYYY년 MM월 DD일")}
        </span>
      </div>

      <Toc toc={toc} />

      <MDX />

      <Giscus />
    </article>
  );
};
