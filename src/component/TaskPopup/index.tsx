import { useState } from "react";
import HeaderTask from "./HeaderTask";
import ListTask from "./ListTask";

export type TaskStatus = "new" | "open" | "completed";

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  description: string;
  checked: boolean;
  status: TaskStatus;
  stikers: string[];
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Design new homepage",
    dueDate: "2025-12-19",
    description: "Create a modern and responsive design for the new homepage.",
    checked: true,
    status: "completed",
    stikers: [],
  },
  {
    id: 2,
    title:
      "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    dueDate: "2023-09-19",
    description: "",
    checked: false,
    status: "open",
    stikers: [],
  },
];
const TaskPopup = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const handleNewTask = () => {
    const id = tasks.length + 1;

    setTasks((prev) => {
      const updated = prev.map((msg) => ({
        ...msg,
        dueDate: msg.status === "new" ? new Date().toDateString() : msg.dueDate,
        status: msg.status === "new" ? "open" : msg.status,
      }));
      return [
        ...updated,
        {
          id: updated.length + 1,
          title: "",
          dueDate: "",
          description: "",
          checked: false,
          status: "new",
          stikers: [],
        },
      ];
    });

    setOpenItems((prev) => ({ ...prev, [id]: true }));
  };
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="fixed bottom-28 right-6 z-50 w-[734px] h-[737px] bg-white rounded-lg  shadow-xl px-8 py-6 animate-slide-up">
        <div className="flex justify-between">
          <HeaderTask />
          <button
            onClick={handleNewTask}
            className="h-10 bg-[#2F80ED] px-4 py-2 rounded-[5px] text-white">
            New Task
          </button>
        </div>
        <ListTask
          tasks={tasks}
          setTasks={setTasks}
          openItems={openItems}
          setOpenItems={setOpenItems}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    </>
  );
};

export default TaskPopup;
