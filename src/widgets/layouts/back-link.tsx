import Link from "next/link";

interface BackLinkProps {
  href: string;
  text: string;
}

// 직접 진입해도 갈 곳이 있도록 history.back 대신 고정 경로로 이동
export const BackLink = ({ href, text }: BackLinkProps) => {
  return (
    <Link
      href={href}
      className="mb-8 inline-block text-sm text-zinc-500 no-underline transition-colors duration-200 hover:text-zinc-100"
    >
      ← {text}
    </Link>
  );
};
