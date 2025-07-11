import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localFont from "next/font/local";

import { Navigation } from "@/widgets/layouts";

import "dayjs/locale/ko";

import "../styles/globals.css";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const pretendard = localFont({
  src: "../../shared/fonts/PretendardVariable.ttf",
});

export const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko" className="dark">
      <body className={`flex justify-center ${pretendard.className}`}>
        <main className="my-8 w-full max-w-screen-sm px-4 max-sm:my-6">
          <Navigation />
          {children}
        </main>
      </body>
    </html>
  );
};
