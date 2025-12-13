import { Activity } from "react";
import Quick from "@/assets/icon/quick.svg";
import Inbox from "@/assets/icon/inbox.svg";
import InboxOpen from "@/assets/icon/inbox-open.svg";
import Task from "@/assets/icon/task.svg";
import TaskOpen from "@/assets/icon/task-open.svg";

import { useFabStore } from "../store/useFabStore";

const actions = [
  {
    key: "task",
    label: "Task",
    icon: Task,
    openIcon: TaskOpen,
    color: "bg-[#F8B76B]",
  },
  {
    key: "inbox",
    label: "Inbox",
    icon: Inbox,
    openIcon: InboxOpen,
    color:  "bg-[#8785FF]",
  },
];

export default function FloatingActionButton() {
  const open = useFabStore((state) => state.open);
  const setOpen = useFabStore((state) => state.setOpen);
  const active = useFabStore((state) => state.active);
  const setActive = useFabStore((state) => state.setActive);

  return (
    <div
      className={`fixed bottom-6 right-6 flex items-center justify-center ${
        active != "" ? "gap-4" : " gap-[26px]"
      }`}>
      {/* Actions */}
      <Activity mode={open ? "visible" : "hidden"}>
        <div
          className={`
          flex items-center gap-[26px] transition-all duration-300
          ${
            open
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-5 pointer-events-none"
          }
        `}>
          {actions.map((a) => (
            <div
              key={a.key}
              onClick={() => setActive(a.key)}
              className={`transition ${
                active !== "" && active === a.key
                  ? "opacity-0 hidden"
                  : `flex flex-col justify-center items-center cursor-pointer ${
                      active !== "" ? "" : "-mt-8"
                    }`
              }`}>
              <p className="text-[#F2F2F2] text-base mb-3">
                {active !== "" ? "" : a.label}
              </p>
              <span className="bg-[#F2F2F2] h-[60px] w-[60px] flex items-center justify-center rounded-full ">
                <img src={a.icon} alt={a.key} width={26}/>
              </span>
            </div>
          ))}
        </div>
      </Activity>

      <Activity mode={active != "" ? "visible" : "hidden"}>
        <OverlapAvatar
          closeAction={() => (setOpen(false), setActive(""))}
          color={actions.find((a) => a.key === active)?.color ?? "#000000"}
          icon={actions.find((a) => a.key === active)?.openIcon}
        />
      </Activity>
      <Activity mode={active == "" ? "visible" : "hidden"}>
        <div
          onClick={() => (setOpen(!open), setActive(""))}
          className="transition bg-[#2F80ED] h-[68px] w-[68px] flex items-center justify-center rounded-full  cursor-pointer">
          <img src={Quick} alt="Quick" />
        </div>
      </Activity>
    </div>
  );
}

function OverlapAvatar({
  color,
  icon,
  closeAction,
}: {
  color: string;
  icon?: string;
  closeAction?: () => void;
}) {
  return (
    <div className="flex -space-x-13">
      <div
        className="h-[68px] w-[68px] rounded-full bg-[#4F4F4F] shrink-0 cursor-pointer"
        onClick={closeAction}></div>
      <div
        className={`h-[68px] w-[68px] rounded-full flex items-center justify-center shrink-0 ${color}`}>
        <img src={icon} width={26} height={26} alt="icon" />
      </div>
    </div>
  );
}
