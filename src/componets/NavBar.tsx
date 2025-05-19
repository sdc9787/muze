"use client";

import { useSideMenu } from "@/store/useSideMenu";
import { useDarkMode } from "@/store/useDarkMode";
import { useState, useEffect } from "react";

export default function MenuBar() {
  const { isSideMenuOpen, toggleSideMenuOpen } = useSideMenu();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const menuList = [
    { name: "홈", link: "/" },
    { name: "플레이리스트", link: "/playlist" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-start items-center gap-20 p-4 z-20 bg-background shadow-md">
      {/*로고 및 메뉴 토글*/}
      <div className="flex justify-center items-center gap-4">
        <i onClick={() => toggleSideMenuOpen()} className="xi-bars xi-x"></i>
        <h1 className="text-2xl font-bold">Muze</h1>
      </div>
      {/*검색창*/}
      <div className="flex items-center">
        <input type="text" placeholder="검색" className="border border-gray-300 rounded px-4 py-2" />
      </div>

      {/*프로필 및 다크모드*/}
      {/* <div className="flex items-center">
        <div className="flex items-center">
          <i onClick={() => toggleDarkMode()} className={`xi-${isDarkMode ? "brightness" : "moon"} xi-x`}></i>
        </div>

        <div className="ml-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">로그인</button>
        </div>
      </div> */}
    </nav>
  );
}
