import TasksPage from "../../components/TasksPage";
import { Task, TaskKey } from "../../types";

export default function Tasks() {
  const tasks: Record<TaskKey, Task> = {}; // Fetch tasks here

  return <TasksPage tasks={tasks} />;
}
