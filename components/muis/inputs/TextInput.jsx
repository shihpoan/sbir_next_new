"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsTextFields({
  label = "計畫名稱",
  labelKey = "123",
  defaultValue = "",
  onChange = (data, key) => {
    console.log("changed", data, key);
  },
  onBlur = (data, key) => {
    console.log("onBlur", data, key);
  },
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 0, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label={label}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value, labelKey)}
          onBlur={(e) => onBlur(e.target.value, labelKey)}
        />
      </div>
    </Box>
  );
}
