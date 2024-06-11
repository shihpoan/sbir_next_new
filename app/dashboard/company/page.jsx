"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link.js";
import {
  useNodeGetApi,
  useNodePostApi,
  useNodePatchApi,
} from "@/hooks/useNode.js";

import { setCookie, deleteCookie, getCookies, getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

import Divider from "@mui/material/Divider";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";

import EditDrawer from "@/components/muis/drawers/EditDrawer.jsx";

function page() {
  const router = useRouter();

  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);

  // 登入者的 id
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  // 判斷是否有 aws folder
  const [dbS3FolderName, setDbS3FolderName] = useState(null);

  // aws 上傳
  const [file, setFile] = useState(null);
  const [isFilesExist, setIsFilesExist] = useState([
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
    {
      isFirstEdit: true,
    },
  ]);
  const [nowUpdateIndex, setNowUpdateIndex] = useState(0);

  const accessToken = getCookie("sbirAccessToken");

  // 上傳文件Titles
  const uploadDatasTitle = [
    "計畫申請表",
    "計畫書(PDF)",
    "公司/商業登記證明文件",
    "營利事業所得稅結算申報書",
    "營業稅申報書",
    "僱用勞保員工人數證明文件",
    "公司無欠稅之證明文件",
    "技轉契約、合作意願書（備忘錄）",
    "顧問及國內外專家願任同意書/任職單位同意書",
    "育成中心或開放實驗室和可進駐影本及其他",
    "員工人數未滿五人切結書",
    "建議迴避之人員清單",
    "蒐集個人資料告知事項暨個人資料提供同意書",
    "聯合合作協議書",
    "初審簡報檔",
  ];

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
        const _s3FolderName = userDatas.s3FolderName;
        if (_s3FolderName !== "NoFolder") setDbS3FolderName(_s3FolderName);

        // 查詢資料
        const dbDatas = await useNodeGetApi(
          `/api/document/findByCompanyId/${userId}`
        );
        const datas = [...dbDatas.data.data];
        console.log("dbDatas", datas);
        datas.forEach((data) => {
          const index = data.index;
          isFilesExist[index] = data;
        });
        console.log("isFilesExist", isFilesExist);
        setIsFilesExist([...isFilesExist]);
      } catch (err) {
        console.log(err);
      }
    }

    if (userId) findUser();
  }, [userId, isNeedUpdate]);

  // 選擇檔案後直接上傳
  useEffect(() => {
    if (file) handleUpload();
  }, [file]);

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

  // 上傳文件
  const handleUpload = async () => {
    try {
      if (!file) throw new Error();

      const formData = new FormData();
      // file.name = encodeURIComponent(file.name);
      formData.append("fileContent", file, encodeURIComponent(file.name));

      const _uploadDatas = await useNodePostApi(
        `/api/aws/upload/${dbS3FolderName}`,
        formData
      );

      console.log("_uploadDatas", _uploadDatas);

      // 上傳後更新db Document
      if (_uploadDatas) {
        if (isFilesExist[nowUpdateIndex].isFirstEdit) {
          const _dbDocument = await useNodePostApi(`/api/document/new`, {
            companyId: userId,
            index: nowUpdateIndex,
            isFirstEdit: false,
            s3Url: _uploadDatas.data,
          });
          console.log("_dbDocument", _dbDocument);
        } else {
          const _dbDocument = await useNodePatchApi(`/api/document/update`, {
            companyId: userId,
            index: nowUpdateIndex,
            isFirstEdit: false,
            s3Url: _uploadDatas.data,
          });
          console.log("_dbDocument", _dbDocument);
        }
        setIsNeedUpdate(!isNeedUpdate);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="flex w-full h-full max-h-full bg-primary_content_bg_100 overflow-auto">
      <div className="flex flex-col w-full h-max items-center">
        {/* 第一條Bar 登出 */}
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
        {/* 第二條Bar 公司名稱 ＋ 資料下載 */}
        <div className="flex w-full h-[3rem] bg-white text-primary_900 font-semibold justify-between items-center px-4 py-2">
          <span>{userData && userData.companyName}</span>
          <Link
            href={
              "https://drive.google.com/drive/folders/14TciBSbioYU-PBDUX6gcoFavqDUzlnar"
            }
            target="_blank"
          >
            <div className="flex gap-4">
              <span>資料下載</span>
            </div>
          </Link>
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
                  <button
                    className="bg-primary_500 text-white rounded-[33px] px-4 py-2"
                    style={{
                      display:
                        userData && userData.accountTier == "admin"
                          ? "flex"
                          : "none",
                    }}
                    onClick={() => router.push("/dashboard/admin")}
                  >
                    管理者介面
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
                          開放上傳時間：自公告起 ~ 2024.05.31
                        </span>
                      </div>
                    </div>
                    {/* 上傳資料 */}
                    <div className="flex flex-col">
                      {[...Array(15).keys()].map((i, idx) => (
                        <div
                          key={idx}
                          className={`flex w-full h-max min-h-[3rem] border-l-[1px] border-r-[1px] ${
                            !idx && "border-t-[1px]"
                          } ${
                            idx == 14 && "border-b-[1px]"
                          } border-text_color_100`}
                          style={{
                            backgroundColor: idx % 2 == 0 ? "white" : "#DBDBDB",
                          }}
                        >
                          <div className="flex w-[60%] justify-start items-center px-2">
                            {uploadDatasTitle[idx]}
                          </div>
                          <div className="flex w-[30%] border-l-[1px] justify-center items-center px-1">
                            <span>
                              {!isFilesExist[idx].isFirstEdit
                                ? isFilesExist[idx].updatedAt
                                : "尚未上傳"}
                            </span>
                          </div>
                          <div className="flex w-[10%] text-gray-400 border-l-[1px] justify-center items-center">
                            <div>
                              {/* 隱藏的 input 元素 */}
                              <input
                                type="file"
                                id="file-input"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                              />
                              {/* ICON 元素，單擊時觸發 input 元素的點擊事件 */}
                              <label htmlFor="file-input">
                                <CloudUploadOutlinedIcon
                                  className="cursor-pointer hover:text-primary_500"
                                  onClick={() => setNowUpdateIndex(idx)}
                                />
                              </label>
                            </div>
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
