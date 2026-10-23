import { contentsBases } from "@/shared/constants/paths";
import { PostCategory, PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";
import { PostList } from "@/widgets/post-list";

interface PostListPageProps {
  category: PostCategory;
}

export const PostListPage = ({ category }: PostListPageProps) => {
  const posts = getContents<PostFrontmatter>({
    base: contentsBases.posts,
  }).filter((post) => post.category === category);

  return (
    <>
      <PostList list={posts} />
    </>
  );
};
