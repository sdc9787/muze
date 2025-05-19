"use client";

import { useSideMenu } from "@/store/useSideMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string;
  link: string;
  icon?: string; // 아이콘이 선택적임을 나타내기 위해 ? 사용
}

export default function SideMenu() {
  const { isSideMenuOpen, toggleSideMenuOpen } = useSideMenu();

  const pathname = usePathname();

  const menuList: MenuItem[] = [
    { name: "홈", link: "/", icon: "xi-home" },
    { name: "플레이리스트", link: "/playlist", icon: "xi-library-music" },
  ];

  // isSideMenuOpen이 true일 때만 SideMenu를 렌더링
  return (
    <div className={"transition-all fixed top-0 left-0 h-full bg-background shadow-lg z-10 " + (isSideMenuOpen ? "translate-x-0" : "-translate-x-full")}>
      <div className="flex flex-col p-4 mt-20">
        <ul>
          {menuList.map((item: MenuItem) => (
            <Link key={item.name} href={item.link} className="text-lg">
              <li className={"flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-hover-background mb-2 " + (pathname === item.link ? "bg-active-background" : "")}>
                <i className={`${item.icon}` + (pathname === item.link ? " text-white" : "")}></i>
                <span>{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
