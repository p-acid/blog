import { Metadata } from "next";

import { PostListPage } from "@/pages/post-list";

export const metadata: Metadata = {
  title: "Logs",
  description: "회고와 정기 기록",
  alternates: { canonical: "/logs" },
};

export default function Page() {
  return <PostListPage category="log" />;
}
