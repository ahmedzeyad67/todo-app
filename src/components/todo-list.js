import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import EditModal from "./modals/editModal";
import DeleteModal from "./modals/deleteModal";
import { useState, useMemo, useReducer } from "react";
import Todo from "./todo";
import { useNotification } from "../contexts/notificationContext";
import tasksReducer from "../reducers/tasks-reducer";

export default function ToDoList() {
  const savedTasks = localStorage.getItem("tasks");
  const [filter, setFilter] = useState("all");
  const [taskID, setTaskID] = useState(null);
  const [addedTaskTitle, setAddedTaskTitle] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDelModal, setOpenDelModal] = useState(false);

  const { setNotification } = useNotification();

  const [tasks, dispatch] = useReducer(
    tasksReducer,
    savedTasks?.length ? JSON.parse(savedTasks) : []
  );

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) => {
      if (filter === "completed") return task.isCompleted;
      if (filter === "uncompleted") return !task.isCompleted;
      return true;
    });
  }, [tasks, filter]);

  const tasksList = filteredTasks.map((task) => {
    return (
      <Todo
        task={task}
        handlers={[handleCompleteButton, handleEditButton, handleDeleteButton]}
      />
    );
  });

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleCompleteButton(id) {
    dispatch({ type: "complete", payload: { id } });
    setNotification({ message: "Task Edited Successfully", isOpen: true });
  }

  function handleEditButton(id) {
    setTaskID(id);
    setOpenEditModal(true);
  }

  function handleDeleteButton(id) {
    setTaskID(id);
    setOpenDelModal(true);
  }

  function handleAddTaskInput(event) {
    setAddedTaskTitle(event.target.value);
  }

  function handleAddButton() {
    dispatch({ type: "add", payload: { addedTaskTitle } });
    setAddedTaskTitle("");
  }

  return (
    <div className="container">
      <div className="todo-list-body">
        <h1 className="todo-list-title">My ToDo List</h1>
        <div className="todo-list-filters">
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
            <ToggleButton value="uncompleted">Uncompleted</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="tasks-list">{tasksList}</div>
        <div className="add-task">
          <TextField
            className="add-task-input"
            label="Task title"
            variant="outlined"
            size="small"
            onChange={handleAddTaskInput}
            value={addedTaskTitle}
            onKeyDown={({ key }) => key === "Enter" && handleAddButton()}
          />
          <Button
            className="add-task-button"
            variant="contained"
            onClick={handleAddButton}
          >
            Add
          </Button>
        </div>
      </div>
      <EditModal
        state={openEditModal}
        updateState={setOpenEditModal}
        taskID={taskID}
        updateTaskID={setTaskID}
        tasks={tasks}
        dispatch={dispatch}
      />
      <DeleteModal
        state={openDelModal}
        updateState={setOpenDelModal}
        taskID={taskID}
        dispatch={dispatch}
      />
    </div>
  );
}
