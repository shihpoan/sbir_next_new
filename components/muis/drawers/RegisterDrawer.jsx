"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image.js";
import { useRouter } from "next/navigation.js";

import { useNodePostApi } from "@/hooks/useNode.js";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormPropsTextFields from "../inputs/TextInput.jsx";
import SuccessAlert from "../alerts/SuccessAlert.jsx";
import ErrorAlert from "../alerts/ErrorAlert.jsx";

export default function RegisterDrawer({
  titles = [{ name: "基本資料", url: "/dashboard/company" }],
  isOpen = false,
  toggleDrawer = () => {
    console.log("open");
  },
}) {
  // 可以簡單填寫之資料
  const labelsForEasyDatas = ["電子郵件", "密碼", "公司名稱", "通訊地址"];

  const [open, setOpen] = useState(false);
  const [registerDatas, setRegisterDatas] = useState({
    email: "",
    password: "",
    companyName: "",
    companyAddress: "",
  });

  const [isRegisterError, setIsRegisterError] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // 阻止默認行為
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  useEffect(() => {
    // console.log("isOpen", isOpen);
    _toggleDrawer(isOpen)();
  }, [isOpen]);

  useEffect(() => {
    // console.log("open", open);
    // 外部展開 Func
    toggleDrawer(open);
  }, [open]);

  // 內部展開 Func
  const _toggleDrawer = (newOpen) => () => {
    // console.log("in new", newOpen);
    setOpen(newOpen);
  };

  // 更新註冊欄位
  const inputRegisterDatas = (data, labelKey) => {
    console.log("out Data", data, labelKey);

    const _registerDatas = {
      ...registerDatas,
    };

    switch (labelKey) {
      case "email":
        _registerDatas.email = data;
        break;
      case "password":
        _registerDatas.password = data;
        break;
      case "companyName":
        _registerDatas.companyName = data;
        _registerDatas.s3FolderName = data;
        break;
      case "companyAddress":
        _registerDatas.companyAddress = data;
        break;
    }
    console.log("update", _registerDatas);
    setRegisterDatas({ ..._registerDatas });
  };

  // 註冊
  const onSubmit = async () => {
    console.log("onSubmit", registerDatas);
    try {
      if (
        !registerDatas.email ||
        !registerDatas.password ||
        !registerDatas.companyName ||
        !registerDatas.companyAddress
      ) {
        throw new Error("缺少必填項目");
      }
      const signup = await useNodePostApi("/auth/signup", registerDatas);
      const newS3Folder = await useNodePostApi("/api/aws/createFolder", {
        folderName: registerDatas.companyName,
      });
      console.log("signup", signup.data);
      // setCookie("accessToken", a.data.data.acc, {
      //   domain: ".zhshihpoan.com",
      // });
      setIsRegisterSuccess(true);
      setTimeout(() => {
        toggleDrawer(false);
        setIsRegisterSuccess(false);
      }, [1000]);
    } catch (err) {
      setIsRegisterError(true);
      console.log(err);
    }
  };

  const DrawerList = (
    <Box
      sx={{
        width: 500,
        height: "100%",
        background: "#F7F7F7",
        paddingBottom: 5,
      }}
      role="presentation"
    >
      <div className="flex flex-col w-full h-max px-4 py-2">
        <SuccessAlert
          success={isRegisterSuccess}
          handleClose={() => {
            setIsRegisterSuccess(false);
          }}
        />
        <ErrorAlert
          error={isRegisterError}
          handleClose={() => {
            setIsRegisterError(false);
          }}
        />
        <div className="flex w-full h-[5rem] text-xl font-bold text-primary_500 items-center">
          <span>填寫註冊資料</span>
        </div>
        {/* 簡單資料 */}
        <div className="flex flex-col w-full h-max gap-4">
          <FormPropsTextFields
            label={"電子郵件"}
            labelKey={"email"}
            onChange={inputRegisterDatas}
          />
          <FormPropsTextFields
            label={"密碼"}
            labelKey={"password"}
            onChange={inputRegisterDatas}
          />
          <FormPropsTextFields
            label={"公司名稱"}
            labelKey={"companyName"}
            onChange={inputRegisterDatas}
          />
          <FormPropsTextFields
            label={"通訊地址"}
            labelKey={"companyAddress"}
            onChange={inputRegisterDatas}
          />
        </div>
        <div className="flex w-full h-max gap-4 mt-8 justify-center">
          <button
            className="w-[10rem] border-[2px] rounded px-4 py-2 hover:bg-primary_200"
            onClick={onSubmit}
          >
            註冊
          </button>
        </div>
      </div>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={_toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}
