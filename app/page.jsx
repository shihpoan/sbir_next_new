"use client";
import React from "react";
import Image from "next/image.js";

import Menu from "@/components/muis/menus/Menu.jsx";

function page() {
  return (
    <>
      <div className="flex flex-col w-full h-full items-center">
        {/* top bar */}
        <div className="flex flex-col w-full h-[8rem] justify-between px-4 py-2 lg:flex-row">
          <div className="w-full h-[5rem] lg:justify-start">
            <Image
              alt="LOGO"
              width={365}
              height={106}
              src="/logo.svg"
              className="w-full h-full lg:w-max"
            />
          </div>
          <div className="hidden w-full justify-center lg:flex lg:justify-end lg:items-center">
            <Menu />
          </div>
        </div>
        {/* 主要內容區域 */}
        <div className="flex flex-col relative w-full h-max p-4 gap-4 lg:py-10 lg:gap-16 items-center">
          {/* 格子底圖 */}
          <div className="absolute top-0 left-0 w-full h-[19rem] bg-home_grid_bg z-0 lg:h-[40rem]" />
          {/* 年度 */}
          <div className="relative z-10 lg:w-2/3">
            <Image
              alt="LOGO"
              width={800}
              height={106}
              src="/年度banner.png"
              className="w-full h-full"
            />
          </div>
          {/* 主辦 */}
          <div className="relative z-10 lg:w-3/5">
            <Image
              alt="LOGO"
              width={800}
              height={106}
              src="/主辦方.png"
              className="w-full h-full"
            />
          </div>
          {/* 簡單大圖 */}
          <div className="relative z-10 lg:w-2/3">
            <Image
              alt="LOGO"
              width={800}
              height={106}
              src="/首頁封面113.png"
              className="w-full h-full"
            />
          </div>
        </div>
        {/* 精選廠商 */}
        <div className="relative flex flex-col w-full h-max z-10 gap-2">
          <div className="flex w-full text-3xl font-bold justify-center">
            <span>歷年獲選廠商</span>
          </div>
          <div className="flex flex-wrap justify-center">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
              (i, idx) => (
                <Image
                  key={idx}
                  alt="logo"
                  src={`/廠商/廠商${idx}.png`}
                  width={604}
                  height={260}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
