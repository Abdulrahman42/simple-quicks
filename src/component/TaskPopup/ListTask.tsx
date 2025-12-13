import { Activity, type Dispatch, type SetStateAction } from "react";

import Expand from "@/assets/icon/expand.svg";

import Pencil from "@/assets/icon/pencil.svg";
import PencilBlack from "@/assets/icon/pencil-black.svg";

import { ActionTask } from "./ActionTask";

import type { Task } from ".";

import { formatDDMMYYYY, getDaysLeft } from "../../helper/formatDate";
import { DatePicker } from "../DatePicker";

interface ListTaskProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  openItems: Record<number, boolean>;
  setOpenItems: Dispatch<SetStateAction<Record<number, boolean>>>;
}

const ListTask = ({
  tasks,
  setTasks,
  openItems,
  setOpenItems,
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
                <div className="w-auto">
                  {item.status === "new" ? (
                    <input
                      autoFocus
                      placeholder="Type Task Title"
                      value={item.title}
                      onChange={(e) =>
                        updateTask(item.id, { title: e.target.value })
                      }
                      className="border border-[#828282] w-[380px] h-10 focus:ring-0 focus:border-[#828282] focus:outline-none active:border-[#828282] rounded px-3 py-2"
                    />
                  ) : (
                    <p
                      className={`font-semibold text-[#4F4F4F]  w-[356px] ${
                        isCompleted ? "line-through text-[#828282]" : ""
                      }`}>
                      {item.title}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(getDaysLeft(item.dueDate) > 0 && item.status != "new") && (
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
                  <ActionTask onDelete={() => console.log("Share:")} />
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
                <div className="flex gap-[18px]">
                  <img
                    src={item.status == "new" ? PencilBlack : Pencil}
                    alt="Pencil"
                    width={15}
                    height={15}
                  />
                  <p className="text-[#4F4F4F] ml-1">
                    {item.description ? item.description : "No Description"}
                  </p>
                </div>
              </div>
            </Activity>
          </div>
        );
      })}
    </div>
  );
};

export default ListTask;
