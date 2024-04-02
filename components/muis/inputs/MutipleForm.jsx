import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsMutiTextFields({
  label = "",
  defaultValue = null,
  onChange = (data, key) => {
    console.log("changed", data, key);
  },
  onBlur = (data, key) => {
    console.log("onBlur", data, key);
  },
}) {
  const projectLeaderLabelKey = [
    "projectLeaderName",
    "projectLeaderJobTitle",
    "projectLeaderPhone",
    "projectLeaderCellPhone",
    "projectLeaderFax",
    "projectLeaderEmail",
  ];
  const contactPersonLabelKey = [
    "contactPersonName",
    "contactPersonJobTitle",
    "contactPersonPhone",
    "contactPersonCellPhone",
    "contactPersonFax",
    "contactPersonEmail",
  ];

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mr: 1, mb: 2, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="姓名"
          onBlur={(e) =>
            onBlur(
              e.target.value,
              label == "計畫主持人資料"
                ? projectLeaderLabelKey[0]
                : contactPersonLabelKey[0]
            )
          }
          defaultValue={
            defaultValue
              ? defaultValue[
                  label == "計畫主持人資料"
                    ? projectLeaderLabelKey[0]
                    : contactPersonLabelKey[0]
                ]
              : ""
          }
        />
        <TextField
          required
          id="outlined-required"
          label="職稱"
          onBlur={(e) =>
            onBlur(
              e.target.value,
              label == "計畫主持人資料"
                ? projectLeaderLabelKey[1]
                : contactPersonLabelKey[1]
            )
          }
          defaultValue={
            defaultValue
              ? defaultValue[
                  label == "計畫主持人資料"
                    ? projectLeaderLabelKey[1]
                    : contactPersonLabelKey[1]
                ]
              : ""
          }
        />
        <TextField
          required
          id="outlined-disabled"
          label="聯絡電話"
          onBlur={(e) =>
            onBlur(
              e.target.value,
              label == "計畫主持人資料"
                ? projectLeaderLabelKey[2]
                : contactPersonLabelKey[2]
            )
          }
          defaultValue={
            defaultValue
              ? defaultValue[
                  label == "計畫主持人資料"
                    ? projectLeaderLabelKey[2]
                    : contactPersonLabelKey[2]
                ]
              : ""
          }
        />
        <TextField
          id="outlined-password-input"
          label="行動電話"
          onBlur={(e) =>
            onBlur(
              e.target.value,
              label == "計畫主持人資料"
                ? projectLeaderLabelKey[3]
                : contactPersonLabelKey[3]
            )
          }
          defaultValue={
            defaultValue
              ? defaultValue[
                  label == "計畫主持人資料"
                    ? projectLeaderLabelKey[3]
                    : contactPersonLabelKey[3]
                ]
              : ""
          }
        />
        <TextField
          id="outlined-read-only-input"
          label="傳真號碼"
          onBlur={(e) =>
            onBlur(
              e.target.value,
              label == "計畫主持人資料"
                ? projectLeaderLabelKey[4]
                : contactPersonLabelKey[4]
            )
          }
          defaultValue={
            defaultValue
              ? defaultValue[
                  label == "計畫主持人資料"
                    ? projectLeaderLabelKey[4]
                    : contactPersonLabelKey[4]
                ]
              : ""
          }
        />
        <TextField
          required
          id="outlined-number"
          label="電子信箱"
          onBlur={(e) =>
            onBlur(
              e.target.value,
              label == "計畫主持人資料"
                ? projectLeaderLabelKey[5]
                : contactPersonLabelKey[5]
            )
          }
          defaultValue={
            defaultValue
              ? defaultValue[
                  label == "計畫主持人資料"
                    ? projectLeaderLabelKey[5]
                    : contactPersonLabelKey[5]
                ]
              : ""
          }
        />
      </div>
    </Box>
  );
}
