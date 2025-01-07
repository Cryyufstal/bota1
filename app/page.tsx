'use client';

import { useState, useEffect } from "react";

type Task = {
  completed: boolean;
  points: number;
};

type TasksProps = {
  userData: {
    username: string;
    points: number;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      username: string;
      points: number;
    }>
  >;
};

export default function Tasks({ userData, setUserData }: TasksProps) {
  const [tasks, setTasks] = useState<{ [key: string]: Task }>({
    task1: { completed: false, points: 10 },
    task2: { completed: false, points: 20 },
  });

  // تحميل البيانات من Local Storage عند أول تشغيل
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // حفظ البيانات عند تغيير المهام
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (taskKey: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[taskKey].completed = true;

      // إضافة النقاط عند إتمام المهمة
      setUserData((prevData) => ({
        ...prevData,
        points: prevData.points + updatedTasks[taskKey].points,
      }));

      return updatedTasks;
    });
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {Object.entries(tasks).map(([key, task]) => (
          !task.completed && (
            <li key={key}>
              Task: {key}, Points: {task.points}
              <button
                onClick={() => toggleTask(key)}
                style={{ marginLeft: "10px" }}
              >
                Complete Task
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
}
