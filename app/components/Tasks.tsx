import { useState } from "react";

export default function Tasks({ userData, setUserData }: { userData: { username: string; points: number }; setUserData: React.Dispatch<React.SetStateAction<any>> }) {
  const [tasks, setTasks] = useState({
    task1: { completed: false, points: 50 },
    task2: { completed: false, points: 100 },
  });

  const toggleTask = (taskKey: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey].completed = true;
      
      // إضافة النقاط عند إتمام المهمة
      setUserData((prevData) => ({
        ...prevData,
        points: prevData.points + updatedTasks[taskKey].points,
      }));

      // تخزين المهمة في الذاكرة المحلية
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  };

  const handleTaskClick = (taskKey: string) => {
    // عند الضغط على المهمة، نقوم بنقل المستخدم إلى الرابط الخاص بالمهمة
    if (!tasks[taskKey].completed) {
      let url = "";
      switch (taskKey) {
        case "task1":
          url = "https://example.com/task1"; // رابط المهمة 1
          break;
        case "task2":
          url = "https://example.com/task2"; // رابط المهمة 2
          break;
        default:
          break;
      }

      if (url) {
        window.open(url, "_blank");
        toggleTask(taskKey); // بمجرد الضغط، نكمل المهمة
      }
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        <h3>Task 1: Be a good dog 🐶 (+50 DOGS)</h3>
        <button
          onClick={() => handleTaskClick("task1")}
          disabled={tasks.task1.completed}
        >
          {tasks.task1.completed ? "Check" : "Start"}
        </button>
      </div>
      <div>
        <h3>Task 2: Subscribe to DOGS channel (+100 DOGS)</h3>
        <button
          onClick={() => handleTaskClick("task2")}
          disabled={tasks.task2.completed}
        >
          {tasks.task2.completed ? "Check" : "Start"}
        </button>
      </div>
    </div>
  );
}
