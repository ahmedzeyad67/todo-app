import Snackbar from "@mui/material/Snackbar";
import { useNotification } from "../contexts/notificationContext";

export default function NotificationMessage() {
  const { notification, setNotification } = useNotification();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification({ message: "", isOpen: false });
  };

  return (
    <div>
      <Snackbar
        open={notification.isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message={notification.message}
      />
    </div>
  );
}
