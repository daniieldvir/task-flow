import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useAuth } from "../../../hooks/authContext";
import { useUsers } from "../../../hooks/users";
import ActionButton from "../Buttons/ActionButton";
import LoginModal from "../Modals/LoginModal";

export default function UserAvater() {
  const { data: users = [] } = useUsers();
  const { loginUser, login, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleLogin = () => {
    setLoginError(false);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setSnackbarOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setLoginError(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirmLogin = (data) => {
    // Find user that matches username and password
    const matchedUser = users.find(
      (user) =>
        (user.username === data.username || user.name === data.username) &&
        user.password === data.password,
    );

    if (matchedUser) {
      // Login successful
      login(matchedUser);
      setLoginError(false);
      setIsModalOpen(false);
    } else {
      // Login failed - show error
      setLoginError(true);
    }
  };

  return (
    <>
      <ActionButton
        onClick={loginUser ? handleLogout : handleLogin}
        label={
          !loginUser
            ? "Login"
            : loginUser.username || loginUser.name || "Logged In"
        }
      />
      <LoginModal
        isOpen={isModalOpen}
        onClose={onClose}
        onConfirm={handleConfirmLogin}
        error={loginError}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="User logged out"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
