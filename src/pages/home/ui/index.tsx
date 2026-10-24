import Link from "next/link";

import { pageRoutes } from "@/shared/constants/page-routes";
import { contentsBases } from "@/shared/constants/paths";
import { authorName } from "@/shared/constants/url";
import { PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";
import { PostList } from "@/widgets/post-list";

import Introduce from "./introduce.mdx";

export const HomePage = async () => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });
  const sections = [
    {
      title: "Posts",
      href: pageRoutes.posts,
      list: posts.filter((post) => post.category === "tech").slice(0, 5),
    },
    {
      title: "Logs",
      href: pageRoutes.logs,
      list: posts.filter((post) => post.category === "log").slice(0, 3),
    },
  ];

  return (
    <section className="space-y-16">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-zinc-100">
          개발자 {authorName}
        </h1>
        <article className="prose prose-invert break-keep prose-a:font-normal prose-a:text-zinc-400 prose-a:transition-colors hover:prose-a:text-zinc-100">
          <Introduce />
        </article>
      </div>

      {sections.map(({ title, href, list }) => (
        <div key={title} className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm text-zinc-500">{title}</h3>
            <Link
              href={href}
              className="text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-100"
            >
              전체 보기 →
            </Link>
          </div>
          <PostList list={list} />
        </div>
      ))}
    </section>
  );
};
