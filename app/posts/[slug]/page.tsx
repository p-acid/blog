export {
  PostDetailPage as default,
  generateMetadata,
  generateStaticParams,
} from "@/pages/post-detail";

// 정적 생성 목록(초안 제외)에 없는 slug는 404
export const dynamicParams = false;
