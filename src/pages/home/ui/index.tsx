import { contentsBases } from "@/shared/constants/paths";
import { PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";
import { PostList } from "@/widgets/post-list";

import Introduce from "./introduce.mdx";

export const HomePage = async () => {
  const posts = getContents<PostFrontmatter>({ base: contentsBases.posts });
  const recentPosts = posts.slice(0, 5);

  return (
    <section className="space-y-8">
      <article className="prose prose-invert">
        <Introduce />
      </article>

      <h3 className="text-lg font-bold text-white">Recent Posts</h3>
      <PostList list={recentPosts} />
    </section>
  );
};
