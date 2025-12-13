import { useState, useRef, useEffect, Activity } from "react";
import VerDot from "@/assets/icon/ver-dot.svg";

export function ActionTask({ onDelete }: { onDelete: () => void }) {
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
        <div className="absolute top-7 w-[120px] rounded divide-y  divide-[#BDBDBD] border border-[#BDBDBD] bg-white z-50 right-0">
          <button
            onClick={() => (onDelete(), setOpen(!open))}
            className="w-[126px] text-left px-3 py-2 hover:bg-gray-100 cursor-pointer text-base text-[#EB5757]">
            Delete
          </button>
        </div>
      </Activity>
    </div>
  );
}
