import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

export default function FormPropsCostTextFields({
  suffix = "仟元",
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
        "& .MuiTextField-root": { width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FormControl sx={{ m: 0, width: "100%" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            endAdornment={
              <InputAdornment position="end">{suffix}</InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            type="number"
            defaultValue={defaultValue}
            onBlur={(e) => onBlur(e.target.value, labelKey)}
          />
        </FormControl>
      </div>
    </Box>
  );
}
