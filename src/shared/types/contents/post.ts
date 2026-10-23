// tech: 기술 글, log: 회고·정기 기록
export type PostCategory = "tech" | "log";

export type PostFrontmatter = {
  title: string;
  description: string;
  tags: string[];
  category: PostCategory;
  draft: boolean;
  date: string;
};
