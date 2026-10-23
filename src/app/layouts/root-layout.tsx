import dayjs from "dayjs";
import localFont from "next/font/local";

import "dayjs/locale/ko";

import "@/app/styles/globals.css";

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
        <main className="my-16 w-full max-w-2xl px-4 max-sm:my-10">
          {children}
        </main>
      </body>
    </html>
  );
};
