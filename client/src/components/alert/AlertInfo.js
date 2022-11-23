import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const alertBg = {
//   success: ,
//   error: "#E64B59",
// };

const AlertInfo = ({
  open = false,
  setOpen,
  severity = "success",
  children,
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%", backgroundColor: "#4AC860" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default AlertInfo;
