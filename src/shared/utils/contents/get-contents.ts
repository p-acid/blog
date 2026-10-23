import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { join } from "path";

import { contentsBases, contentsDirectoryPath } from "@/shared/constants/paths";
import { Content, FrontmatterBase } from "@/shared/types/contents";
import dayjs from "dayjs";

interface GetContentsParams {
  base: (typeof contentsBases)[keyof typeof contentsBases];
}

export const getContents = <F extends FrontmatterBase>({
  base,
}: GetContentsParams): Content<F>[] => {
  const path = join(contentsDirectoryPath, base);

  const slugs = readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const contents = slugs.map((slug) => {
    const contentsPath = join(path, slug, "index.mdx");
    const file = readFileSync(contentsPath, { encoding: "utf8" });
    const { data } = matter(file);
    const frontmatter = data as F;

    return { slug, ...frontmatter };
  });

  // 초안은 개발 서버에서만 노출
  const publishedContents = contents.filter(
    (content) =>
      process.env.NODE_ENV !== "production" ||
      !(content as { draft?: boolean }).draft,
  );

  const sortedContents = publishedContents.sort((a, b) =>
    dayjs(b.date).diff(dayjs(a.date)),
  );

  return sortedContents;
};
