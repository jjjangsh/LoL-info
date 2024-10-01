import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LOL DEX",
  description: "League of Legends Information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="py-[60px] bg-black">
        <header className="bg-gray-900 text-white py-6 fixed top-0 w-full z-10">
          <nav className="container mx-auto flex justify-around">
            <Link href={"/"} className="hover:text-red-600">
              <span className="font-bold text-lg">홈</span>
            </Link>
            <Link href={"/champions"} className="hover:text-red-600">
              <span className="font-bold text-lg">챔피언 목록</span>
            </Link>
            <Link href={"/items"} className="hover:text-red-600">
              <span className="font-bold text-lg">아이템 목록</span>
            </Link>
            <Link href={"/rotation"} className="hover:text-red-600">
              <span className="font-bold text-lg">챔피언 로테이션</span>
            </Link>
          </nav>
        </header>

        <main className="flex-1 py-[100px] 100vh">{children}</main>

        <footer className="bg-gray-900 p-4 py-6 mt-8 fixed bottom-0 w-full">
          <div className="container mx-auto text-center text-yellow-50 text-sm">
            LOL-DEX is not endorsed by Riot Games and does not reflect the views
            or opinions of Riot Games or anyone officially involved in producing
            or managing Riot Games properties. Riot Games and all associated
            properties are trademarks or registered trademarks of Riot Games,
            Inc.
          </div>
        </footer>
      </body>
    </html>
  );
}
