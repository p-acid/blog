import { pageRoutes } from "@/shared/constants/page-routes";
import { contentsBases } from "@/shared/constants/paths";
import { PostCategory, PostFrontmatter } from "@/shared/types/contents";
import { getContents } from "@/shared/utils/contents";
import { BackLink } from "@/widgets/layouts";
import { PostList } from "@/widgets/post-list";

interface PostListPageProps {
  category: PostCategory;
}

const CATEGORY_TITLE: Record<PostCategory, string> = {
  tech: "Posts",
  log: "Logs",
};

export const PostListPage = ({ category }: PostListPageProps) => {
  const posts = getContents<PostFrontmatter>({
    base: contentsBases.posts,
  }).filter((post) => post.category === category);

  return (
    <>
      <BackLink href={pageRoutes.home} text="Home" />
      <h1 className="mb-8 text-base font-medium text-zinc-100">
        {CATEGORY_TITLE[category]}
      </h1>
      <PostList list={posts} />
    </>
  );
};
