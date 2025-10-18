import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNotification } from "../../contexts/notificationContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
};

export default function EditModal({
  state,
  updateState,
  taskID,
  updateTaskID,
  tasks,
  dispatch,
}) {
  const [editedTask, setEditedTask] = useState({
    newTitle: "",
    newDetails: "",
  });

  const { setNotification } = useNotification();

  useEffect(() => {
    if (taskID || taskID === 0) {
      const { title: oldTitle, details: oldDetails } = tasks.find(
        (task) => task.id === taskID
      );
      setEditedTask({ newTitle: oldTitle, newDetails: oldDetails });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskID]);

  const handleClose = () => {
    updateState(false);
    updateTaskID(null);
  };

  const handleInputChange = (field) => (event) => {
    setEditedTask({ ...editedTask, [field]: event.target.value });
  };

  function handleEditButton(id) {
    dispatch({ type: "edit", payload: { editedTask, id } });
    handleClose();
    setNotification({ message: "Task Edited Successfully", isOpen: true });
  }

  return (
    <>
      <Modal
        className="modal"
        open={state}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={state}>
          <Box className="editModal" sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit task
            </Typography>
            <TextField
              label="Title"
              variant="standard"
              defaultValue={editedTask.newTitle}
              onChange={handleInputChange("newTitle")}
            />
            <TextField
              label="Details"
              variant="standard"
              defaultValue={editedTask.newDetails}
              onChange={handleInputChange("newDetails")}
            />
            <div>
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="text" onClick={() => handleEditButton(taskID)}>
                Edit
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
