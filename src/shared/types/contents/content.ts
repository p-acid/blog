import { FunctionComponent } from "react";

export type TableOfContents = {
  id: string;
  text: string;
  depth: number;
}[];

export type Content<F extends Record<string, unknown>> = F & {
  slug: string;
};

export interface ContentDetail<F extends Record<string, unknown>> {
  frontmatter: F;
  MDX: FunctionComponent;
  toc: TableOfContents;
}

export type FrontmatterBase = {
  title: string;
  date: string;
  description: string;
  tags: string[];
};
