import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from "@mui/icons-material/Circle";

export default function SelectTextFields({
  label = "本市重點領域",
  options = [],
  labelKey = "123",
  defaultValue = "",
  onChange = (data, key) => {
    console.log("changed", data, key);
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
          id="outlined-select-currency"
          required
          select
          label={label}
          defaultValue={defaultValue}
          // helperText="Please select your currency"
          onChange={(e) => onChange(e.target.value, labelKey)}
        >
          {options.map((option) => (
            <MenuItem key={option} sx={{ gap: "1rem" }} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
