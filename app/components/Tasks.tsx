'use client';

import { useState, useEffect } from "react";

type UserData = {
  username: string;
  points: number;
};

type TaskKey = "task1" | "task2";

export default function Tasks({
  userData,
  setUserData,
}: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}) {
  const [tasks, setTasks] = useState(() => {
    // استرجاع المهام من Local Storage
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks
      ? JSON.parse(storedTasks)
      : {
          task1: { completed: false, points: 50 },
          task2: { completed: false, points: 100 },
        };
  });

  // تحديث Local Storage عند تغيير حالة المهام
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskKey: TaskKey) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey].completed = true;

      // إضافة النقاط إلى المستخدم
      setUserData((prevData) => {
        const newData = {
          ...prevData,
          points: prevData.points + updatedTasks[taskKey].points,
        };
        localStorage.setItem("userData", JSON.stringify(newData)); // تخزين النقاط
        return newData;
      });

      return updatedTasks;
    });
  };

  const handleTaskClick = (taskKey: TaskKey) => {
    if (!tasks[taskKey].completed) {
      let url = "";
      switch (taskKey) {
        case "task1":
          url = "https://example.com/task1";
          break;
        case "task2":
          url = "https://example.com/task2";
          break;
        default:
          break;
      }

      if (url) {
        window.open(url, "_blank");
        toggleTask(taskKey); // اكمل المهمة
      }
    }
  };

  return (
    <div className="tasks-container">
      <h2>Tasks</h2>
      <div className="task">
        {!tasks.task1.completed && (
          <>
            <h3>Task 1: Be a good dog 🐶 (+50 DOGS)</h3>
            <button
              onClick={() => handleTaskClick("task1")}
              disabled={tasks.task1.completed}
            >
              {tasks.task1.completed ? "Check" : "Start"}
            </button>
          </>
        )}
      </div>
      <div className="task">
        {!tasks.task2.completed && (
          <>
            <h3>Task 2: Subscribe to DOGS channel (+100 DOGS)</h3>
            <button
              onClick={() => handleTaskClick("task2")}
              disabled={tasks.task2.completed}
            >
              {tasks.task2.completed ? "Check" : "Start"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
