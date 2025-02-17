import { Lacquer } from "next/font/google";

import { contentsBases } from "@/shared/constants/paths";
import { resumeUrl } from "@/shared/constants/url";
import { PostFrontmatter } from "@/shared/types/contents";
import { cn } from "@/shared/utils/cn";
import { getContents } from "@/shared/utils/contents";
import { PostList } from "@/widgets/post-list";
import Introduce from "./introduce.mdx";

const lacquer = Lacquer({
  weight: "400",
  subsets: ["latin"],
});

export const HomePage = async () => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });
  const recentPosts = posts.slice(0, 5);

  return (
    <section className="space-y-8">
      <h2
        className={cn(
          lacquer.className,
          "flex items-center gap-1.5 text-xl text-white",
        )}
      >
        welcome to
        <a
          target="_blank"
          href={resumeUrl}
          className="text-slate-400 transition-colors duration-500 hover:text-green-500"
        >
          351
        </a>
        blog
      </h2>

      <article className="prose prose-invert">
        <Introduce />
      </article>

      <h3 className="text-lg font-bold text-white">Recent Posts</h3>
      <PostList list={recentPosts} />
    </section>
  );
};
