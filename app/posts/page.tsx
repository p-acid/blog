import { Metadata } from "next";

import { PostListPage } from "@/pages/post-list";

export const metadata: Metadata = {
  title: "Posts",
  alternates: { canonical: "/posts" },
};

export default function Page() {
  return <PostListPage category="tech" />;
}
