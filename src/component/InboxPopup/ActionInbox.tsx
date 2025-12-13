import { useState, useRef, useEffect, Activity } from "react";
import VerDot from "@/assets/icon/ver-dot.svg";

export function ActionInbox({
  onShare,
  onReply,
  align = "right", // "left" | "right"
}: {
  onShare: () => void;
  onReply: () => void;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <span onClick={() => setOpen(!open)}>
        <img src={VerDot} alt="VerDot" width={16} height={16} />
      </span>
      <Activity mode={open ? "visible" : "hidden"}>
        <div
          className={`
            absolute top-7 w-[120px] rounded divide-y  divide-[#BDBDBD] border border-[#BDBDBD] bg-white z-50 
            ${align === "right" ? "right-0" : "left-0"}
          `}>
          <button
            onClick={() => (onShare(), setOpen(!open))}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-base text-[#2F80ED]">
            Share
          </button>

          <button
            onClick={() => (onReply(), setOpen(!open))}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 text-base text-[#2F80ED]">
            Reply
          </button>
        </div>
      </Activity>
    </div>
  );
}
