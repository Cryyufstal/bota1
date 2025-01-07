// types.ts
export interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export interface Task {
  label: string;
  url: string;
  started: boolean;
  completed: boolean;
}

export type TaskKey = "task1" | "task2" | "task3" | "task4" | "task5" | "task6" | "task7";
