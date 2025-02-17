import { contentsBases } from "@/shared/constants/paths";
import { ContentDetail, FrontmatterBase } from "@/shared/types/contents";

interface GetContentDetailParams {
  base: (typeof contentsBases)[keyof typeof contentsBases];
  slug: string;
}

export const getContentDetail = async <F extends FrontmatterBase>(
  params: GetContentDetailParams,
): Promise<ContentDetail<F>> => {
  const result = await import(
    `/contents/${params.base}/${params.slug}/index.mdx`
  );

  const { frontmatter, default: MDX, toc } = result;

  return { frontmatter, MDX, toc };
};
