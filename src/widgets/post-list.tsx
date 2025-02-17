import Link from "next/link";

import { pageRoutes } from "@/shared/constants/page-routes";
import { Content, PostFrontmatter } from "@/shared/types/contents";
import { getRelativeDate } from "@/shared/utils/get-relative-date";

interface PostListProps {
  list: Content<PostFrontmatter>[];
}

export const PostList = ({ list }: PostListProps) => {
  return (
    <ul className="space-y-5">
      {list.map(({ slug, title, description, date }) => (
        <li key={slug}>
          <Link
            className="flex justify-between gap-4"
            href={`${pageRoutes.posts}/${slug}`}
          >
            <div className="flex flex-col gap-1">
              <p className="w-fit text-base font-medium text-zinc-100 hover:underline">
                {title}
              </p>
              <p className="break-keep text-sm text-zinc-400">{description}</p>
            </div>

            <span className="whitespace-pre text-sm text-zinc-200">
              {getRelativeDate(date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
