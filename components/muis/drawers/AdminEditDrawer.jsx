"use client";
import * as React from "react";

import { useNodePostApi, useNodePatchApi } from "@/hooks/useNode.js";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import FormPropsTextFields from "../inputs/TextInput.jsx";
import SelectTextFields from "../inputs/SelectInput.jsx";
import FormPropsMutiTextFields from "../inputs/MutipleForm.jsx";
import FormPropsCostTextFields from "../inputs/CostForm.jsx";

export default function AdminEditDrawer({
  titles = [{ name: "基本資料", url: "/dashboard/company" }],
  isOpen = false,
  toggleDrawer = () => {
    console.log("open");
  },
  updateDatas = () => {},
  userId = "",
}) {
  // 可以簡單填寫之資料
  const labelsForEasyDatas = [
    { name: "公司名稱", labelKey: "companyName" },
    { name: "計畫名稱", labelKey: "projectTitle" },
    { name: "通訊地址", labelKey: "companyAddress" },
  ];
  // 需要選擇之資料
  const labelsForSelect = [
    { name: "本市重點領域", labelKey: "keyPoint4Keelung" },
    { name: "計畫類別", labelKey: "projectType" },
  ];
  const optionsForSelect = [
    ["智慧科技數位應用", "文化創意", "綠色永續產業", "地方特色"],
    ["創新技術", "創新服務"],
  ];
  // 多項輸入之資料
  const labelsForMutiple = ["計畫主持人資料", "計畫聯絡人資料"];
  const labelsForCost = [
    { name: "計畫總經費", labelKey: "amount" },
    { name: "補助款", labelKey: "subsidy" },
    { name: "自籌款", labelKey: "self_funding" },
  ];

  const [open, setOpen] = React.useState(false);
  const [editDatas, setEditDatas] = React.useState({
    companyName: "",
    companyAddress: "",
    projectTitle: "",
    keyPoint4Keelung: "",
    projectType: "",
  });

  // 查詢
  React.useEffect(() => {
    async function findUser() {
      try {
        const dbUserData = await useNodePostApi("/api/user/findOneById", {
          id: userId,
        });
        console.log("Drawer", dbUserData.data.data);
        const userDatas = { ...dbUserData.data.data };
        setEditDatas({
          ...userDatas,
        });
        toggleDrawer(true);
      } catch (err) {
        console.log(err);
      }
    }

    if (userId) findUser();
  }, [userId]);

  React.useEffect(() => {
    // console.log("isOpen", isOpen);
    _toggleDrawer(isOpen)();
  }, [isOpen]);

  React.useEffect(() => {
    // console.log("open", open);
    // 外部展開 Func
    toggleDrawer(open);
  }, [open]);

  // 預設填充資料
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

  // 編輯
  const inputEditDatas = (data, labelKey) => {
    console.log("out Data", data, labelKey);

    const _editDatas = {
      ...editDatas,
    };

    switch (labelKey) {
      case "companyName":
        _editDatas.companyName = data;
        break;
      case "projectTitle":
        _editDatas.projectTitle = data;
        break;
      case "companyAddress":
        _editDatas.companyAddress = data;
        break;
      case "keyPoint4Keelung":
        _editDatas.keyPoint4Keelung = data;
        break;
      case "projectType":
        _editDatas.projectType = data;
        break;
      case "projectLeaderName":
        _editDatas.projectLeaderName = data;
        break;
      case "projectLeaderJobTitle":
        _editDatas.projectLeaderJobTitle = data;
        break;
      case "projectLeaderPhone":
        _editDatas.projectLeaderPhone = data;
        break;
      case "projectLeaderCellPhone":
        _editDatas.projectLeaderCellPhone = data;
        break;
      case "projectLeaderFax":
        _editDatas.projectLeaderFax = data;
        break;
      case "projectLeaderEmail":
        _editDatas.projectLeaderEmail = data;
        break;
      case "contactPersonName":
        _editDatas.contactPersonName = data;
        break;
      case "contactPersonJobTitle":
        _editDatas.contactPersonJobTitle = data;
        break;
      case "contactPersonPhone":
        _editDatas.contactPersonPhone = data;
        break;
      case "contactPersonCellPhone":
        _editDatas.contactPersonCellPhone = data;
        break;
      case "contactPersonFax":
        _editDatas.contactPersonFax = data;
        break;
      case "contactPersonEmail":
        _editDatas.contactPersonEmail = data;
        break;
      case "amount":
        _editDatas.amount = data;
        break;
      case "subsidy":
        _editDatas.subsidy = data;
        break;
      case "self_funding":
        _editDatas.self_funding = data;
        break;
    }
    console.log("edit", _editDatas);
    setEditDatas({ ..._editDatas });
  };

  // 註冊
  const onSubmit = async () => {
    console.log("onSubmit", editDatas);
    try {
      const _updateDatas = await useNodePatchApi("/api/user/update", editDatas);
      console.log("_updateDatas", _updateDatas.data.data);
      _toggleDrawer(false);
      updateDatas();
    } catch (err) {
      console.log(err);
    }
  };

  const DrawerList = (
    <Box
      sx={{
        width: 500,
        height: "fit-content",
        background: "#F7F7F7",
        paddingBottom: 5,
      }}
      role="presentation"
    >
      <div className="flex flex-col w-full h-max px-4">
        <div className="flex w-full h-[5rem] text-xl font-bold text-primary_500 items-center">
          <span>基本資料</span>
        </div>
        {/* 簡單資料 */}
        <div className="flex flex-col w-full h-max gap-4">
          {labelsForEasyDatas.map((label, lIdx) => (
            <FormPropsTextFields
              key={lIdx}
              label={label.name}
              labelKey={label.labelKey}
              defaultValue={editDatas[label.labelKey]}
              onBlur={inputEditDatas}
            />
          ))}
          {labelsForSelect.map((label, lIdx) => (
            <SelectTextFields
              key={lIdx}
              label={label.name}
              labelKey={label.labelKey}
              defaultValue={editDatas[label.labelKey]}
              options={optionsForSelect[lIdx]}
              onChange={inputEditDatas}
            />
          ))}
        </div>
        {/* 複雜資料 */}
        <div className="flex flex-col w-full h-max gap-4 mt-4">
          {labelsForMutiple.map((label, lIdx) => (
            <div key={lIdx} className="flex flex-col gap-4">
              <span className="text-primary_500 font-bold">{label}</span>
              <FormPropsMutiTextFields
                label={label}
                defaultValue={{ ...editDatas }}
                onBlur={inputEditDatas}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full h-max gap-4 mt-4">
          {labelsForCost.map((label, lIdx) => (
            <div key={lIdx} className="flex flex-col gap-4">
              <span className="text-primary_500 font-bold">{label.name}</span>
              <FormPropsCostTextFields
                labelKey={label.labelKey}
                defaultValue={editDatas[label.labelKey]}
                onBlur={inputEditDatas}
              />
            </div>
          ))}
        </div>
        <div className="flex w-full h-max gap-4 mt-8 justify-center">
          <button
            className="w-[10rem] border-[2px] rounded px-4 py-2 hover:bg-primary_200"
            onClick={onSubmit}
          >
            送出更新
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
