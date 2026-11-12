import createMDX from "@next/mdx";
import { CodeHikeConfig, recmaCodeHike, remarkCodeHike } from "codehike/mdx";
import type { NextConfig } from "next";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import remarkPublicAssets from "./scripts/remark-public-assets.mjs";
import remarkToc from "./scripts/remark-toc.mjs";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

const codehikeConfig: CodeHikeConfig = {
  components: { code: "Code" },
  syntaxHighlighting: { theme: "github-dark" },
};

// ponytail: Code Hike 가 value 가 undefined 인 Literal 을 만들어, dev 소스맵 생성(astring)이 터진다. 식별자 undefined 로 바꿔 둔다
const recmaFixUndefinedLiteral = () => (tree: object) => {
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const n = node as Record<string, unknown>;
    if (n.type === "Literal" && n.value === undefined && n.raw == null) {
      Object.assign(n, { type: "Identifier", name: "undefined" });
      delete n.value;
      return;
    }
    Object.values(n).forEach(walk);
  };
  walk(tree);
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      remarkToc,
      remarkGfm,
      remarkPublicAssets,
      [remarkCodeHike, codehikeConfig],
    ],
    rehypePlugins: [rehypeSlug],
    recmaPlugins: [[recmaCodeHike, codehikeConfig], recmaFixUndefinedLiteral],
  },
});

export default withMDX(nextConfig);
