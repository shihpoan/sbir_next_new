import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ErrorAlert({ error = false, handleClose = () => {} }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity="error"
        className={`${!error ? "hidden" : "flex"}`}
        onClose={handleClose}
      >
        操作失敗
      </Alert>
    </Stack>
  );
}
