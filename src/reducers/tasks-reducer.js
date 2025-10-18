export default function tasksReducer(currentTasks, action) {
  const { type, payload } = action;

  if (type === "complete") {
    const { id } = payload;
    const tasksTemp = [...currentTasks];
    const index = tasksTemp.findIndex((task) => task.id === id);
    tasksTemp[index] = {
      ...tasksTemp[index],
      isCompleted: !tasksTemp[index].isCompleted,
    };
    localStorage.setItem("tasks", JSON.stringify(tasksTemp));
    return tasksTemp;
  } else if (type === "edit") {
    const { editedTask, id } = payload;
    // const tasksTemp = [...currentTasks];
    // const taskToEdit = tasksTemp.find((task) => task.id === id);
    // taskToEdit.title = editedTask.newTitle;
    // taskToEdit.details = editedTask.newDetails;
    // handleTasks(tasksTemp);

    const updatedTasks = currentTasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: editedTask.newTitle,
            details: editedTask.newDetails,
          }
        : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    return updatedTasks;
  } else if (type === "delete") {
    const { id } = payload;
    const tasksTemp = [...currentTasks];
    tasksTemp.splice(
      tasksTemp.findIndex((task) => task.id === id),
      1
    );
    localStorage.setItem("tasks", JSON.stringify(tasksTemp));
    return tasksTemp;
  } else if (type === "add") {
    const { addedTaskTitle } = payload;
    if (addedTaskTitle !== "") {
      const updatedTasks = [
        ...currentTasks,
        {
          id: currentTasks[currentTasks.length - 1].id + 1,
          title: addedTaskTitle,
          details: "",
        },
      ];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    }
    return currentTasks;
  }
}
