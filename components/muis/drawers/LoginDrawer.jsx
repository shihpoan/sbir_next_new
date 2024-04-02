"use client";
import * as React from "react";
import Image from "next/image.js";
import { useRouter } from "next/navigation.js";

import { useNodePostApi } from "@/hooks/useNode.js";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormPropsTextFields from "../inputs/TextInput.jsx";
import SuccessAlert from "../alerts/SuccessAlert.jsx";
import ErrorAlert from "../alerts/ErrorAlert.jsx";

export default function LoginDrawer({
  isOpen = false,
  toggleDrawer = () => {
    console.log("open");
  },
}) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [loginDatas, setLoginDatas] = React.useState({
    email: "",
    password: "",
  });

  const [isLoginError, setIsLoginError] = React.useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = React.useState(false);

  React.useEffect(() => {
    // console.log("isOpen", isOpen);
    _toggleDrawer(isOpen)();
  }, [isOpen]);

  React.useEffect(() => {
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

    const _loginDatas = {
      ...loginDatas,
    };

    switch (labelKey) {
      case "email":
        _loginDatas.email = data;
        break;
      case "password":
        _loginDatas.password = data;
        break;
    }
    console.log("update", _loginDatas);
    setLoginDatas({ ..._loginDatas });
  };

  // 註冊
  const onSubmit = async () => {
    console.log("onSubmit", loginDatas);
    try {
      const signin = await useNodePostApi("/auth/signin", loginDatas);
      console.log("signin", signin.data);
      // setCookie("accessToken", a.data.data.acc, {
      //   domain: ".zhshihpoan.com",
      // });
      setIsLoginSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/company");
      }, [500]);
    } catch (err) {
      setIsLoginError(true);
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
          success={isLoginSuccess}
          handleClose={() => {
            setIsLoginSuccess(false);
          }}
        />
        <ErrorAlert
          error={isLoginError}
          handleClose={() => {
            setIsLoginError(false);
          }}
        />
        <div className="flex w-full h-[5rem] text-xl font-bold text-primary_500 items-center">
          <span>登入資料</span>
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
        </div>
        <div className="flex w-full h-max gap-4 mt-8 justify-center">
          <button
            className="w-[10rem] border-[2px] rounded px-4 py-2 hover:bg-primary_200"
            onClick={onSubmit}
          >
            登入
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
