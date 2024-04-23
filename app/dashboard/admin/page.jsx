"use client";
import React, { useState, useEffect } from "react";
import NormalTable from "@/components/dashboard/admin/NormalTable.jsx";

import {
  useNodeGetApi,
  useNodePostApi,
  useNodePatchApi,
} from "@/hooks/useNode.js";

// 賽程管理的 cloumns
const columns = [
  { title: "編號", type: "String" },
  { title: "公司名稱", type: "String" },
  { title: "公司地址", type: "String" },
  { title: "聯絡Email", type: "String" },
  { title: "主持人姓名", type: "String" },
  { title: "主持人電話", type: "String" },
  { title: "聯絡人姓名", type: "String" },
  { title: "聯絡人電話", type: "String" },
];

function page() {
  const [rows, setRows] = useState([]);

  const [editUserId, setEditUserId] = useState("");

  useEffect(() => {
    async function findAllUsers() {
      try {
        const dbUsers = await useNodePostApi("/api/user/findAll");
        console.log("dbUsers", dbUsers.data.data);
        const users = dbUsers.data.data;
        const _rows = users.map((user, uIdx) => {
          return [
            { column: user._id, data: uIdx + 1, isShow: true },
            { column: "companyName", data: user.companyName, isShow: true },
            {
              column: "companyAddress",
              data: user.companyAddress,
              isShow: true,
            },
            { column: "email", data: user.email, isShow: true },
            {
              column: "projectLeaderName",
              data: user.projectLeaderName,
              isShow: true,
            },
            {
              column: "projectLeaderPhone",
              data: user.projectLeaderPhone,
              isShow: true,
            },
            {
              column: "contactPersonName",
              data: user.contactPersonName,
              isShow: true,
            },
            {
              column: "contactPersonPhone",
              data: user.contactPersonPhone,
              isShow: true,
            },
          ];
        });
        setRows([..._rows]);
      } catch (err) {
        console.log("err", err);
      }
    }
    findAllUsers();
  }, []);

  return (
    <div className="w-full">
      <NormalTable columns={columns} rows={[...rows]} />
    </div>
  );
}

export default page;
