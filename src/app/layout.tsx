import type { Metadata } from "next";
import "./style/globals.css";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import NavBar from "@/componets/NavBar";
import SideMenu from "@/componets/SideMenu";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // 필요에 따라 추가
  variable: "--font-roboto",
});

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"], // 필요에 따라 추가
  variable: "--font-noto-sans-kr",
});

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
    <html lang="ko" className={`${roboto.variable} ${notoSansKR.variable}`}>
      <head>
        <link rel="stylesheet" type="text/css" href="/XEIcon/xeicon.min.css" />
      </head>
      <body>
        <NavBar></NavBar>
        <SideMenu></SideMenu>
        {children}
      </body>
    </html>
  );
}
