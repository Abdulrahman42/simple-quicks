import { Activity, useEffect, useRef, useState } from "react";
import Expand from "@/assets/icon/expand.svg";

const TASK_CATEGORIES = [
  { id: 1, name: "Personal Errands" },
  { id: 2, name: "Urgent To-Do" },
];
const HeaderTask = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("My Tasks");
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectTask = (taskName: string) => {
    setSelectedTask(taskName);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="flex justify-center ml-[84px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between border border-[#828282] text-[#4F4F4F] rounded-[5px] py-2.5 px-3.5 h-10 w-[118.55px]">
          <span className="text-sm font-medium text-foreground">
            {selectedTask}
          </span>
          <img
            src={Expand}
            alt="VerDot"
            width={16}
            height={16}
            className={"rotate-180"}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          />
        </button>
      </div>

      {/* Dropdown Content */}
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="w-[288px] border border-[#828282] bg-white rounded-[5px] absolute z-50 mt-[7px]">
          {TASK_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelectTask(category.name)}
              className="w-full text-left px-4 py-2 text-base text-[#4F4F4F] font-medium border-b border-[#828282] cursor-pointer hover:bg-gray-100 last:border-0 ">
              {category.name}
            </button>
          ))}
        </div>
      </Activity>
    </div>
  );
};

export default HeaderTask;
