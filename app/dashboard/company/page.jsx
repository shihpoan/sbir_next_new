"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { useNodeGetApi, useNodePostApi } from "@/hooks/useNode.js";

import { setCookie, deleteCookie, getCookies, getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import Divider from "@mui/material/Divider";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import EditDrawer from "@/components/muis/drawers/EditDrawer.jsx";

function page() {
  const router = useRouter();

  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  // 登入者的 id
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  const accessToken = getCookie("sbirAccessToken");

  // 解碼
  useEffect(() => {
    // 使用 jwt.decode() 方法解碼 accessToken
    const decodedToken = jwt.decode(accessToken);
    // 檢視解碼後的內容
    // console.log("decodedToken", decodedToken);
    const _userId = decodedToken.user_id;
    setUserId(_userId);
  }, [accessToken]);

  // 查詢
  useEffect(() => {
    async function findUser() {
      try {
        const dbUserData = await useNodePostApi("/api/user/findOneById", {
          id: userId,
        });
        console.log("dbUserData", dbUserData.data.data);
        const userDatas = { ...dbUserData.data.data };
        setUserData({
          ...userDatas,
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (userId) findUser();
  }, [userId, isNeedUpdate]);

  // 打開Drawer
  const toggleDrawer = (newOpen) => {
    // console.log("out new", newOpen);
    setIsToggleOpen(newOpen);
  };

  // 更新後重新查詢
  const updateDatas = () => {
    // console.log("out new", newOpen);
    setIsNeedUpdate(!isNeedUpdate);
  };
  return (
    <div className="flex w-full h-full max-h-full bg-primary_content_bg_100 overflow-auto">
      <div className="flex flex-col w-full h-max items-center">
        <div className="flex w-full h-[3rem] bg-primary_content_bg_100 text-primary_900 font-semibold justify-end items-center px-4 py-2">
          <span
            className="rounded hover:text-white hover:bg-primary_900 p-1 cursor-pointer"
            onClick={() => {
              router.push("/");
              deleteCookie("sbirAccessToken");
            }}
          >
            登出
          </span>
        </div>
        <div className="w-full h-[1px] bg-primary_content_bg_400" />
        <div className="flex w-full h-[3rem] bg-white text-primary_900 font-semibold justify-start items-center px-4 py-2">
          <span>{userData && userData.companyName}</span>
        </div>
        <div className="w-full h-[1px] bg-primary_content_bg_400" />
        {/* 廠商資料 */}
        <div className="w-3/5 h-max p-4">
          <div className="flex flex-col w-full h-max bg-white">
            <div className="w-full h-[1rem] bg-subcolor_500" />
            <div className="flex flex-col w-full h-full p-8 gap-4">
              <span className="text-3xl font-bold">廠商資料</span>
              <span className="text-xl font-bold">
                113年度基隆市政府地方產業創新研發推動計畫-地方型SBIR
              </span>
              <div className="flex w-full h-max justify-between">
                <div className="flex w-1/2 justify-start gap-2">
                  <button
                    className="bg-primary_500 text-white rounded-[33px] px-4 py-2"
                    onClick={() => {
                      toggleDrawer(true);
                    }}
                  >
                    編輯基本資料
                  </button>
                  {/* 暫時隱藏 */}
                  <button className="hidden bg-primary_500 text-white rounded-[33px] px-4 py-2">
                    上傳附件
                  </button>
                </div>
                {/* <div className="flex w-1/2 justify-end">
                  <button className="bg-primary_500 text-white rounded-[33px] px-4 py-2">
                    下載資料
                  </button>
                </div> */}
              </div>
              {/* 廠商資料 Main */}
              <div className="flex w-full h-max">
                {/* 左邊 */}
                <div className="flex flex-col w-full h-max gap-4">
                  {/* 第一格 */}
                  <div className="flex flex-col w-full h-max border-[1px] border-text_color_100 p-4 gap-2">
                    {/* 中文 */}
                    <span className="text-2xl font-bold text-primary_900">
                      {userData ? userData.companyName : "公司名稱"}
                    </span>
                    {/* <span className="text-lg font-bold text-primary_900 opacity-75">
                      {userData && userData.tax}
                    </span> */}
                    <div className="flex w-full text-2xl text-primary_900">
                      <span className="w-1/3 font-bold">計畫名稱</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.projectTitle}</span>
                      </div>
                    </div>
                    {/* 線 */}
                    <div className="w-full h-[1px] bg-primary_content_bg_400" />
                    {/* 英文 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <span className="w-1/3 font-bold">通訊地址</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.companyAddress}</span>
                      </div>
                    </div>
                    {/* 英文 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <span className="w-1/3 font-bold">本市重點領域</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.keyPoint4Keelung}</span>
                      </div>
                    </div>
                    {/* 狀態 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <span className="w-1/3 font-bold">計畫類別</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.projectType}</span>
                      </div>
                    </div>
                    {/* 狀態 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <div className="flex flex-col w-1/3">
                        <span className="w-full font-bold">計畫主持人資料</span>
                        <div className="flex flex-col w-2/3 font-normal gap-2 mt-1 ml-4">
                          <span>姓名</span>
                          <span>職稱</span>
                          <span>聯絡電話</span>
                          <span>行動電話</span>
                          <span>傳真</span>
                          <span>電子信箱</span>
                        </div>
                      </div>
                      <div className="flex flex-col w-2/3">
                        <span className="w-full text-white font-bold">
                          計畫主持人資料
                        </span>
                        <div className="flex flex-col w-2/3 font-normal gap-2 mt-1">
                          <span>{userData && userData.projectLeaderName}</span>
                          <span>
                            {userData && userData.projectLeaderJobTitle}
                          </span>
                          <span>{userData && userData.projectLeaderPhone}</span>
                          <span>
                            {userData && userData.projectLeaderCellPhone}
                          </span>
                          <span>{userData && userData.projectLeaderFax}</span>
                          <span>{userData && userData.projectLeaderEmail}</span>
                        </div>
                      </div>
                    </div>
                    {/* 狀態 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <div className="flex flex-col w-1/3">
                        <span className="w-full font-bold">計畫聯絡人資料</span>
                        <div className="flex flex-col w-2/3 font-normal gap-2 mt-1 ml-4">
                          <span>姓名</span>
                          <span>職稱</span>
                          <span>聯絡電話</span>
                          <span>行動電話</span>
                          <span>傳真</span>
                          <span>電子信箱</span>
                        </div>
                      </div>
                      <div className="flex flex-col w-2/3">
                        <span className="w-full text-white font-bold">
                          計畫主持人資料
                        </span>
                        <div className="flex flex-col w-2/3 font-normal gap-2 mt-1">
                          <span>{userData && userData.contactPersonName}</span>
                          <span>
                            {userData && userData.contactPersonJobTitle}
                          </span>
                          <span>{userData && userData.contactPersonPhone}</span>
                          <span>
                            {userData && userData.contactPersonCellPhone}
                          </span>
                          <span>{userData && userData.contactPersonFax}</span>
                          <span>{userData && userData.contactPersonEmail}</span>
                        </div>
                      </div>
                    </div>
                    {/* 狀態 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <span className="w-1/3 font-bold">計畫總經費</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.amount}</span>
                      </div>
                    </div>
                    {/* 狀態 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <span className="w-1/3 font-bold">補助款</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.subsidy}</span>
                      </div>
                    </div>
                    {/* 狀態 */}
                    <div className="flex w-full text-xl text-text_color_300">
                      <span className="w-1/3 font-bold">自籌款</span>
                      <div className="w-2/3 font-normal truncate">
                        <span>{userData && userData.self_funding}</span>
                      </div>
                    </div>
                    {/* 狀態 */}
                    {/* <div className="flex w-full text-base text-text_color_300">
                      <span className="w-1/3 font-bold">當前狀態</span>
                      <div className="flex w-2/3 font-normal truncate">
                        <span>報名成功</span>
                      </div>
                    </div> */}
                  </div>
                  {/* 第二格:暫時隱藏 */}
                  <div className="flex flex-col w-full h-max gap-2">
                    <div className="flex w-full h-[5rem]">
                      {/* 線 */}
                      <div className="w-2 h-full bg-primary_500" />
                      {/* Title */}
                      <div className="flex flex-col w-full h-full px-4 gap-2 justify-center">
                        <span className="font-bold">附件內容</span>
                        <span className="text-primary_900">
                          開放上傳時間：2024.04.10 ~ 2024.05.31
                        </span>
                      </div>
                    </div>
                    {/* datas */}
                    <div className="flex flex-col">
                      {[1, 2, 3, 4].map((i, idx) => (
                        <div
                          key={idx}
                          className={`flex w-full h-max min-h-[3rem] border-l-[1px] border-r-[1px] ${
                            !idx && "border-t-[1px]"
                          } ${
                            idx == 3 && "border-b-[1px]"
                          } border-text_color_100`}
                          style={{
                            backgroundColor: idx % 2 == 0 ? "white" : "#DBDBDB",
                          }}
                        >
                          <div className="flex w-[30%] justify-center items-center">
                            上傳附件名稱
                          </div>
                          <div className="flex w-[70%] border-l-[1px] items-center px-1">
                            <span>檔案名稱</span>
                          </div>
                          <div className="flex w-[10%] text-gray-400 border-l-[1px] justify-center items-center cursor-not-allowed">
                            <CloudUploadOutlinedIcon />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditDrawer
        isOpen={isToggleOpen}
        toggleDrawer={toggleDrawer}
        updateDatas={updateDatas}
      />
    </div>
  );
}

export default page;
