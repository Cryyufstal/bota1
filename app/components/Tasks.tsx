export default function Tasks({ userData }: { userData: { username: string; points: number } }) {
  const [tasks, setTasks] = useState({ task1: false, task2: false });

  const toggleTask = (taskKey: "task1" | "task2") => {
    setTasks((prev) => ({ ...prev, [taskKey]: !prev[taskKey] }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow">
          <span>Complete Task 1</span>
          <button
            className={`px-4 py-2 text-white rounded ${
              tasks.task1 ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => toggleTask("task1")}
          >
            {tasks.task1 ? "Completed" : "Start"}
          </button>
        </div>
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow">
          <span>Complete Task 2</span>
          <button
            className={`px-4 py-2 text-white rounded ${
              tasks.task2 ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => toggleTask("task2")}
          >
            {tasks.task2 ? "Completed" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
}
