"use client";
// import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";

// function Menu() {
//   return (
//     <div>
//       <MenuIcon />
//     </div>
//   );
// }

// export default Menu;
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const options = ["免費下載", "廠商登入"];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            <div className="flex gap-2">
              {oIdx == 0 ? <CloudDownloadIcon /> : <AccountCircleIcon />}
              {option}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
