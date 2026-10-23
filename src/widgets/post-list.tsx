import Link from "next/link";

import { pageRoutes } from "@/shared/constants/page-routes";
import { Content, PostFrontmatter } from "@/shared/types/contents";

import dayjs from "dayjs";

interface PostListProps {
  list: Content<PostFrontmatter>[];
}

export const PostList = ({ list }: PostListProps) => {
  // getContents가 최신순으로 정렬해 주므로 Map 삽입 순서가 곧 연도 내림차순
  const postsByYear = new Map<number, Content<PostFrontmatter>[]>();
  list.forEach((post) => {
    const year = dayjs(post.date).year();
    postsByYear.set(year, [...(postsByYear.get(year) ?? []), post]);
  });

  return (
    <div className="group/list space-y-8">
      {[...postsByYear].map(([year, posts]) => (
        <section
          key={year}
          className="grid grid-cols-[3.5rem_1fr] gap-4 max-sm:grid-cols-1 max-sm:gap-1"
        >
          <h4 className="py-3 text-sm tabular-nums text-zinc-500 max-sm:py-0">
            {year}
          </h4>

          <ul>
            {posts.map(({ slug, title, description, date }) => (
              <li key={slug}>
                <Link
                  className="flex items-baseline justify-between gap-4 border-b border-zinc-800 py-3 text-zinc-100 transition-colors duration-200 hover:!text-zinc-100 group-hover/list:text-zinc-500"
                  href={`${pageRoutes.posts}/${slug}`}
                  title={description}
                >
                  <span className="break-keep text-base">{title}</span>
                  <time
                    dateTime={dayjs(date).format("YYYY-MM-DD")}
                    className="shrink-0 text-sm tabular-nums text-zinc-500"
                  >
                    {dayjs(date).format("MM.DD")}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
