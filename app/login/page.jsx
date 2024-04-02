"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";

// import {
//   useNodeGetApi,
//   useNodePostApi,
//   useNodePatchApi,
// } from "@/hooks/useNode.js";

export default function Home() {
  const router = useRouter();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    console.log("mail", email);
    console.log("password", password);

    try {
      const a = await useNodePostApi("/auth/signin", {
        account: email,
        password: password,
      });
      router.push("/dashboard");
      console.log("a", a.data);
      // setCookie("accessToken", a.data.data.acc, {
      //   domain: ".zhshihpoan.com",
      // });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-[100vw] mx-auto bg-green-100">
        <div className=" flex items-center h-[100vh] justify-center">
          <div className="zhWidth500 ">
            <div className="zhPadding48 w-[20rem] bg-gray-100 relative flex flex-col min-w-0 break-words mb-6 shadow-lg rounded-lg zhBasicColorWhiteBackground zhCorner15 border-0">
              <div className="rounded-t">
                <div className="text-center mb-3">
                  <p className="zhH2 zhPrimary text-4xl	font-bold pt-3">
                    系統登入
                  </p>
                </div>
              </div>
              <div className="flex-auto px-3">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase font-bold zhBasicColorOutline text-xs mb-2"
                    htmlFor="grid-password"
                  >
                    電子郵件
                  </label>
                  <input
                    type="email"
                    className="border-1 py-1 px-2 zhPadding8 zhBasicColorOutline bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="請輸入電子郵件"
                    value={email}
                    ref={emailInputRef}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase font-bold zhBasicColorOutline text-xs  mb-2"
                    htmlFor="grid-password"
                  >
                    密碼
                  </label>
                  <div className=" flex flex-inlink-block">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="border-1 py-1 px-2 zhBasicColorOutline bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="請輸入密碼"
                      value={password}
                      ref={passwordInputRef}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className=" absolute inline-block right-0 zhPadding8 "
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <i className="ri-eye-off-line"></i>
                      ) : (
                        <i className="ri-eye-line"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="py-2">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="rounded zhPrimary ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      onChange={(e) => setRememberMe(e.target.checked)}
                      checked={rememberMe}
                    />
                    <span className="ml-2 font-bold zhH5 zhBasicColorBlack">
                      記住我
                    </span>
                  </label>
                </div>
                <div className="flex flex-col text-center mt-6 gap-2">
                  <button
                    className="zhPrimaryBackground  bg-blue-50 pb-1 zhPrimary zhCorner33 active:zhPrimaryBackground zhOnPrimary text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <i className="ri-check-line inline-block"></i>
                    <p className="inline-block px-2">登入</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
