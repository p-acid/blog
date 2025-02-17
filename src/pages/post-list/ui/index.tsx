import { contentsBases } from "@/shared/constants/paths";
import { PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";
import { PostList } from "@/widgets/post-list";

export const PostListPage = () => {
  const posts = getContents<PostFrontmatter>({
    base: contentsBases.posts,
  });

  return (
    <>
      <PostList list={posts} />
    </>
  );
};
