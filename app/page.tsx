import { allPosts } from "@/.contentlayer/generated";

import Link from "next/link";

export default function Home() {
  return (
    <main className="prose prose-sky dark:prose-invert">
      <h1 className="pt-6">Post</h1>

      {allPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2 className="mb-1">{post.title}</h2>
          </Link>
          {post.description && <p className="mt-1">{post.description}</p>}
        </article>
      ))}
    </main>
  );
}
