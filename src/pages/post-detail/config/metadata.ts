import { contentsBases } from "@/shared/constants/contents";
import {
  NextGenerateMetadata,
  NextGenerateStaticParams,
} from "@/shared/types/nextjs";
import { getContents } from "@/shared/utils/contents";
import { PostDetailPageParams } from "../ui";

export const generateStaticParams: NextGenerateStaticParams<
  PostDetailPageParams
> = async () => {
  const posts = getContents({ base: contentsBases.posts });
  return posts.map(({ slug }) => ({ slug }));
};

export const generateMetadata: NextGenerateMetadata<
  PostDetailPageParams
> = async ({ params }) => {
  const { slug } = await params;

  const frontmatter = getContents({ base: contentsBases.posts }).find(
    (post) => post.slug === slug,
  );

  if (!frontmatter) {
    return {};
  }

  return { title: frontmatter.title, description: frontmatter.description };
};
