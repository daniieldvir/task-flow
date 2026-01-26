import MuiSnackbar from "@mui/material/Snackbar";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const AppSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    show: (msg) => {
      setMessage(msg);
      setOpen(true);
    },
  }));

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (message) console.log("message changed:", message);
  }, [message]);

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    />
  );
});

export default AppSnackbar;
