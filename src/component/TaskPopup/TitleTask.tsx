import { useEffect, useRef, useState } from "react";

type TitleTaskProps = {
  value: string;
  status: string;
  isCompleted: boolean;
  onChange: (value: string) => void;
};
const TitleTask = ({
  value,
  status,
  isCompleted,
  onChange,
}: TitleTaskProps) => {
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
    <div className="w-auto">
      {status === "new" || isOpen ? (
        <div ref={ref}>
          <input
            autoFocus
            placeholder="Type Task Title"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border border-[#828282] w-[380px] h-10 focus:ring-0 focus:border-[#828282] focus:outline-none active:border-[#828282] rounded px-3 py-2"
          />
        </div>
      ) : (
        <p
          onClick={() => setIsOpen(!isOpen)}
          className={`font-semibold text-[#4F4F4F]  w-[356px] ${
            isCompleted ? "line-through text-[#828282]" : ""
          }`}>
          {value}
        </p>
      )}
    </div>
  );
};

export default TitleTask;
