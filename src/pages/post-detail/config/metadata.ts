import dayjs from "dayjs";

import { pageRoutes } from "@/shared/constants/page-routes";
import { contentsBases } from "@/shared/constants/paths";
import { siteName } from "@/shared/constants/url";
import { PostFrontmatter } from "@/shared/types/contents";
import {
  NextGenerateMetadata,
  NextGenerateStaticParams,
} from "@/shared/types/nextjs";
import { getContents } from "@/shared/utils/contents";
import { PostDetailPageParams } from "../ui";

export const generateStaticParams: NextGenerateStaticParams<
  PostDetailPageParams
> = async () => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });
  return posts.map(({ slug }) => ({ slug }));
};

export const generateMetadata: NextGenerateMetadata<
  PostDetailPageParams
> = async ({ params }) => {
  const { slug } = await params;

  const frontmatter = getContents<PostFrontmatter>({
    base: contentsBases.posts,
  }).find((post) => post.slug === slug);

  if (!frontmatter) {
    return {};
  }

  const path = `${pageRoutes.posts}/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName,
      locale: "ko_KR",
      url: path,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: dayjs(frontmatter.date).toISOString(),
      tags: frontmatter.tags,
      // openGraph를 덮어쓰면 루트 opengraph-image가 빠지므로 명시
      images: "/opengraph-image.png",
    },
  };
};
