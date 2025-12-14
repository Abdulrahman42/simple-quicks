import { Activity, useEffect, useRef, useState } from "react";
import Pencil from "@/assets/icon/pencil.svg";
import PencilBlack from "@/assets/icon/pencil-black.svg";

type DescriptionTaskProps = {
  value: string;
  onChange: (data: string) => void;
};
const DescriptionTask = ({ value, onChange }: DescriptionTaskProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
    <div className="flex gap-[18px]">
      <span className="" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={isOpen ? Pencil : PencilBlack}
          alt="Pencil"
          width={15}
          height={15}
        />
      </span>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div ref={ref}>
          <textarea
            autoFocus
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Add description"
            className="w-[543px] ml-1 resize-none text-sm text-[#4F4F4F] outline-none border border-[#828282] rounded p-2"
          />
        </div>
      </Activity>
      <Activity mode={isOpen ? "hidden" : "visible"}>
        <p className="text-[#4F4F4F] ml-1" onClick={() => setIsOpen(!isOpen)}>
          {value ? value : "No Description"}
        </p>
      </Activity>
    </div>
  );
};

export default DescriptionTask;
