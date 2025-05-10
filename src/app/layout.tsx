import type { Metadata } from "next";
import "./globals.css";
import MenuBar from "@/componets/MenuBar";

export const metadata: Metadata = {
  title: "Muze",
  description: "음악 스트리밍 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <MenuBar></MenuBar>
        {children}
      </body>
    </html>
  );
}
