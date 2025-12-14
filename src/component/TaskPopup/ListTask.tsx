import { Activity, type Dispatch, type SetStateAction } from "react";

import Expand from "@/assets/icon/expand.svg";

import ActionTask from "./ActionTask";
import StikerTask from "./StikerTask";

import type { Task } from ".";

import { formatDDMMYYYY, getDaysLeft } from "../../helper/formatDate";
import { DatePicker } from "../DatePicker";
import DescriptionTask from "./DescriptionTask";
import TitleTask from "./TitleTask";

interface ListTaskProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  openItems: Record<number, boolean>;
  setOpenItems: Dispatch<SetStateAction<Record<number, boolean>>>;
  handleDeleteTask: (id: number) => void;
}

const ListTask = ({
  tasks,
  setTasks,
  openItems,
  setOpenItems,
  handleDeleteTask,
}: ListTaskProps) => {
  const toggleItem = (id: number) => {
    setOpenItems((prev: Record<number, boolean>) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateTask = (id: number, data: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  return (
    <div>
      {tasks.map((item) => {
        const isOpen = openItems[item.id];
        const isCompleted = item.status === "completed";
        return (
          <div key={item.id} className="py-[22px] border-b">
            <div className="flex items-start justify-between pr-[25px]">
              <div className="flex items-start gap-5">
                <input
                  className="w-[18px] h-[18px] border border-[#828282] checked:bg-white mt-1"
                  type="checkbox"
                  name={item.title}
                  checked={isCompleted}
                  onChange={(e) =>
                    updateTask(item.id, {
                      checked: e.target.checked,
                      status: e.target.checked ? "completed" : "open",
                    })
                  }
                  id={item.id.toString()}
                />
                <TitleTask
                  value={item.title}
                  status={item.status}
                  isCompleted={isCompleted}
                  onChange={(data) => updateTask(item.id, { title: data })}
                />
              </div>
              <div className="flex items-center gap-2">
                {getDaysLeft(item.dueDate) > 0 && item.status != "new" && (
                  <span className="text-[#EB5757]">
                    {getDaysLeft(item.dueDate)} Days Left
                  </span>
                )}
                <p className="text-[#4F4F4F]">
                  {formatDDMMYYYY(new Date(item.dueDate))}
                </p>
                <img
                  src={Expand}
                  alt="VerDot"
                  width={16}
                  height={16}
                  className={openItems[item.id] ? "" : "rotate-180"}
                  onClick={() => toggleItem(item.id)}
                />
                <div className="cursor-pointer relative">
                  <ActionTask onDelete={() => handleDeleteTask(item.id)} />
                </div>
              </div>
            </div>
            <Activity mode={isOpen ? "visible" : "hidden"}>
              <div className="px-10 flex flex-col gap-[15px] mt-4">
                <div className="flex items-center ">
                  <DatePicker
                    value={item.dueDate}
                    onChange={(date) =>
                      updateTask(item.id, { dueDate: date?.toISOString() })
                    }
                  />
                </div>
                <DescriptionTask
                  value={item.description}
                  onChange={(data) =>
                    updateTask(item.id, { description: data })
                  }
                />
                <StikerTask
                  value={item.stikers}
                  onChange={(data) => updateTask(item.id, { stikers: data })}
                />
              </div>
            </Activity>
          </div>
        );
      })}
    </div>
  );
};

export default ListTask;
