import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  alternates: { canonical: "/posts" },
};

export { PostListPage as default } from "@/pages/post-list";
