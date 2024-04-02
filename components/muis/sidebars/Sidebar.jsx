"use client";
import * as React from "react";
import Image from "next/image.js";
import { useRouter } from "next/navigation.js";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar({
  titles = [{ name: "基本資料", url: "/dashboard/company" }],
}) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className="w-full h-[5rem] lg:justify-start">
        <Image
          alt="LOGO"
          width={365}
          height={106}
          src="/logo.svg"
          className="w-full h-full lg:w-max"
        />
      </div>
      <List>
        {titles.map((title, index) => (
          <ListItem
            key={index}
            onClick={() => {
              router.push(title.url);
            }}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={title.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="flex flex-col w-[4rem] h-full bg-primary_500">
      <Button onClick={toggleDrawer(true)} className="h-[3rem]">
        <MenuIcon className="text-white" />
      </Button>
      <Divider />
      <div className="flex flex-col w-full h-max items-center pt-4 px-2 gap-4">
        {titles.map((title, index) => (
          <div
            key={index}
            className="relative flex group w-full text-white rounded p-1 hover:bg-white hover:text-primary_500 justify-center cursor-pointer"
            onClick={() => {
              router.push(title.url);
            }}
          >
            {/* 這裡要做 group hover 原本是隱藏，當div hover 時顯示 */}
            <span className="absolute top-0 left-[100rem] w-max bg-primary_500 text-white rounded opacity-0 translate-x-6 group-hover:left-[10rem] group-hover:opacity-100 group-hover:translate-x-[-6rem] transition-transform duration-500 p-1">
              {title.name}
            </span>
            <InboxIcon />
          </div>
        ))}
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
