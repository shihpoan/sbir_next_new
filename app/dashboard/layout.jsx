"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation.js";
import Sidebar from "@/components/muis/sidebars/Sidebar.jsx";

import { setCookie, deleteCookie, getCookies, getCookie } from "cookies-next";

export default function DashboardLayout({ children }) {
  const pathname = usePathname().split("/")[2];

  const [sidebarTitles, setSidebarTitles] = useState(null);

  useEffect(() => {
    // admin
    const adminTitles = [
      { name: "控制台", url: "/dashboard/admin" },
      { name: "廠商管理", url: "/dashboard/admin/companies" },
      { name: "檔案管理", url: "/dashboard/admin/files" },
      { name: "帳號管理", url: "/dashboard/admin/accounts" },
    ];
    // company
    const companyTitles = [
      { name: "首頁", url: "/" },
      { name: "基本資料", usr: "/dashboard/company" },
    ];

    switch (pathname) {
      case "admin":
        // 執行 admin 角色相關的操作
        setSidebarTitles([...adminTitles]);
        break;
      case "company":
        // 執行 company 角色相關的操作
        setSidebarTitles([...companyTitles]);
        break;
      default:
      // 默認情況下執行的操作
    }
  }, [pathname]);
  return (
    <>
      <section className="flex w-full h-full">
        {/* <Sidebar titles={sidebarTitles ? [...sidebarTitles] : []} /> */}
        {children}
      </section>
    </>
  );
}
