import { Activity, useEffect, useRef, useState } from "react";
import Bookmarks from "@/assets/icon/bookmarks.svg";
import BookmarksBlack from "@/assets/icon/bookmarks-black.svg";

const categories = [
  { name: "Important ASAP", color: "bg-[#E5F1FF]" },
  { name: "Offline Meeting", color: "bg-[#FDCFA4]" },
  { name: "Virtual Meeting", color: "bg-[#F9E9C3]" },
  { name: "ASAP", color: "bg-[#AFEBDB]" },
  { name: "Client Related", color: "bg-[#CBF1C2]" },
  { name: "Self Task", color: "bg-[#CFCEF9]" },
  { name: "Appointments", color: "bg-[#F9E0FD]" },
  { name: "Court Related", color: "bg-[#9DD0ED]" },
];

type StikerTaskProps = {
  value: string[];
  onChange: (data: string[]) => void;
};
const StikerTask = ({ value, onChange }: StikerTaskProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(value);
  const ref = useRef<HTMLDivElement>(null);

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories((prev) => {
      let next: string[];

      if (prev.includes(categoryName)) {
        next = prev.filter((name) => name !== categoryName);
      } else {
        if (prev.length >= 4) return prev;
        next = [...prev, categoryName];
      }

      onChange(next);
      return next;
    });
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

  useEffect(() => {
    setSelectedCategories(value);
  }, [value]);

  return (
    <div className="h-[49px] bg-[#F9F9F9] p-3 -ml-4 relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4">
        <img src={isOpen ? Bookmarks : BookmarksBlack} alt="Bookmarks" />

        <div className="flex gap-2 flex-1 flex-wrap">
          {selectedCategories.map((catName) => {
            const categoryData = categories.find((cat) => cat.name === catName);
            return (
              <span
                key={catName}
                className={`px-3 py-1.5 rounded-md font-medium text-[13px] text-[#4F4F4F] ${categoryData?.color}`}>
                {catName}
              </span>
            );
          })}
        </div>
      </button>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="absolute top-full left-0 right-0 mt-1 w-[277px] bg-white rounded-[5px] shadow-lg border border-[#828282] z-10">
          <div className="p-4 space-y-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.name);
              const isMaxReached =
                selectedCategories.length >= 4 && !isSelected;
              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryToggle(category.name)}
                  disabled={isMaxReached}
                  className={`w-full flex text-sm items-center px-3 rounded-[5px] text-left text-[#4F4F4F] font-medium transition-all h-7 ${
                    category.name === "Important ASAP"
                      ? `${category.color}`
                      : category.color
                  } ${isSelected ? "ring ring-[#2F80ED]" : ""} ${
                    isMaxReached ? "opacity-50 cursor-not-allowed" : ""
                  }`}>
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </Activity>
    </div>
  );
};

export default StikerTask;
