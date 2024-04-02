import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function SuccessAlert({
  success = false,
  handleClose = () => {},
}) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        severity="success"
        className={`${!success ? "hidden" : "flex"}`}
        onClose={handleClose}
      >
        操作成功
      </Alert>
    </Stack>
  );
}
