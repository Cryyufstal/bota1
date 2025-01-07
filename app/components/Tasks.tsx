"use client";

interface TasksProps {
  userData: {
    id: number;
    username: string;
    points: number;
  };
  setUserData: (data: { id: number; username: string; points: number }) => void;
}

export default function Tasks({ userData, setUserData }: TasksProps) {
  const completeTask = (points: number) => {
    setUserData({ ...userData, points: userData.points + points });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Tasks</h1>
      <div className="mt-4">
        <button
          onClick={() => completeTask(50)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Complete Task (+50 Points)
        </button>
      </div>
    </div>
  );
}
