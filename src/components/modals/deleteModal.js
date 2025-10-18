import { Backdrop, Box, Modal, Fade, Typography, Button } from "@mui/material";
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

export default function DeleteModal({ state, updateState, taskID, dispatch }) {
  const handleClose = () => updateState(false);
  const { setNotification } = useNotification();

  function handleDeleteButton(id) {
    dispatch({ type: "delete", payload: { id } });
    handleClose();
    setNotification({ message: "Task Deleted Successfully", isOpen: true });
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
          <Box sx={style}>
            <Typography variant="h6" component="h2">
              Are you Sure you want to delete this task?
            </Typography>
            <Typography sx={{ mt: 2 }}>
              If you press Delete you cannot undo the deletion
            </Typography>
            <div style={{ textAlign: "right" }}>
              <Button variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="text" onClick={() => handleDeleteButton(taskID)}>
                Delete
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
