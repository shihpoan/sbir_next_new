"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link.js";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import RegisterDrawer from "../drawers/RegisterDrawer.jsx";
import LoginDrawer from "../drawers/LoginDrawer.jsx";

// google Drive URL
const googleDriveUrl =
  "https://drive.google.com/drive/folders/14TciBSbioYU-PBDUX6gcoFavqDUzlnar";

const options = [{ name: "資料下載", url: googleDriveUrl }];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isRegisterToggleOpen, setIsRegisterToggleOpen] = useState(false);
  const [isLoginToggleOpen, setIsLoginToggleOpen] = useState(false);
  const open = Boolean(anchorEl);

  // 打開Drawer
  const toggleRegisterDrawer = (newOpen) => {
    // console.log("out new", newOpen);
    setIsRegisterToggleOpen(newOpen);
    setAnchorEl(null);
  };
  // 打開Drawer
  const toggleLoginDrawer = (newOpen) => {
    // console.log("out new", newOpen);
    setIsLoginToggleOpen(newOpen);
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, oIdx) => (
          <MenuItem
            key={oIdx}
            // onClick={handleClose}
          >
            <Link href={option.url} target="_blank">
              <div className="flex gap-4">
                {oIdx == 0 ? <CloudDownloadIcon /> : <AccountCircleIcon />}
                {option.name}
              </div>
            </Link>
          </MenuItem>
        ))}
        <MenuItem>
          <div
            className="flex gap-4"
            onClick={() => {
              toggleLoginDrawer(true);
            }}
          >
            <AccountCircleIcon />
            廠商登入
          </div>
        </MenuItem>
        <MenuItem>
          <div
            className="flex gap-4"
            onClick={() => {
              toggleRegisterDrawer(true);
            }}
          >
            <ContactsOutlinedIcon />
            廠商註冊
          </div>
        </MenuItem>
      </Menu>
      <RegisterDrawer
        isOpen={isRegisterToggleOpen}
        toggleDrawer={toggleRegisterDrawer}
      />
      <LoginDrawer
        isOpen={isLoginToggleOpen}
        toggleDrawer={toggleLoginDrawer}
      />
    </div>
  );
}
