import ToDoList from "./components/todo-list";
import NotificationMessage from "./components/notification";
import { NotificationProvider } from "./contexts/notificationContext";

export default function App() {
  return (
    <NotificationProvider>
      <ToDoList />
      <NotificationMessage />
    </NotificationProvider>
  );
}
