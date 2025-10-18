import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({ task, handlers }) {
  const [handleCompleteButton, handleEditButton, handleDeleteButton] = handlers;
  return (
    <div className={`task${task.isCompleted ? " completed-task" : ""}`}>
      <div className="task-content">
        <p className="task-title">{task.title}</p>
        <p className="task-details">{task.details}</p>
      </div>
      <div className="task-action-buttons">
        <Button
          className="complete-task-btn"
          variant="outlined"
          onClick={() => handleCompleteButton(task.id)}
        >
          <CheckIcon sx={{ padding: "0.8rem 0" }} />
        </Button>
        <Button variant="outlined" onClick={() => handleEditButton(task.id)}>
          <EditIcon />
        </Button>
        <Button variant="outlined" onClick={() => handleDeleteButton(task.id)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
}
