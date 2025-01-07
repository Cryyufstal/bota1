import { Task, TaskKey } from "./types";

interface TasksPageProps {
  tasks: Record<TaskKey, Task>;
}

export default function TasksPage({ tasks }: TasksPageProps) {
  const activeTasks = Object.entries(tasks).filter(([_, task]) => !task.completed);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {activeTasks.map(([key, task]) => (
        <div className="task" key={key} style={{ marginBottom: "10px" }}>
          <span>{task.label}</span>
          {task.started ? (
            <button>Check</button>
          ) : (
            <button>Start</button>
          )}
        </div>
      ))}
    </div>
  );
}
