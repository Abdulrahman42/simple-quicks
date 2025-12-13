import { Activity, useEffect, useRef, useState } from "react";
import Calendar from "@/assets/icon/calendar.svg";
import Clock from "@/assets/icon/clock.svg";
import ClockBlack from "@/assets/icon/clock-black.svg";
import ArrowForward from "@/assets/icon/arrow-forward.svg";
import ArrowBack from "@/assets/icon/arrow-back.svg";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "S"];

type DatePickerProps = {
  value: string | Date;
  onChange: (date: Date | null) => void;
};
export function DatePicker({ value, onChange }: DatePickerProps) {
  const today = new Date();

  const normalizedValue = normalizeDate(value);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const base = normalizedValue ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );

    setSelectedDate(date);
    onChange(date);
    setIsOpen(false);
  };

  function normalizeDate(value?: string | Date): Date | null {
    if (!value) return null;

    const d = value instanceof Date ? value : new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const openCalendar = () => {
    const base = normalizedValue ?? today;
    setCurrentMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    setIsOpen(true);
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

  // Adjust Sunday to be at the end (6) instead of beginning (0)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div className="inline-block">
      <div className="relative" ref={ref}>
        {/* Date Input */}
        <div className="flex items-center gap-[18px]">
          <img
            src={isOpen ? Clock : ClockBlack}
            alt="clock"
            width={20}
            height={20}
          />
          <div
            className="w-[193px] flex items-center p-3 h-10 border border-[#828282] rounded-[5px] cursor-pointer justify-between transition-colors"
            onClick={openCalendar}>
            <input
              type="text"
              value={normalizedValue ? formatDate(normalizedValue) : ""}
              placeholder="Set date"
              readOnly
              className="outline-none cursor-pointer w-32 text-sm"
            />
            <img src={Calendar} alt="clock" width={16} height={16} />
          </div>
        </div>

        {/* Calendar Dropdown */}
        <Activity mode={isOpen ? "visible" : "hidden"}>
          <div className="absolute top-full -right-62 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-[258px] h-[241px] z-10">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-0.5 hover:bg-gray-100 rounded transition-colors">
                <img src={ArrowBack} alt="ArrowBack" width={12} height={12} />
              </button>
              <span className="font-medium text-gray-700">
                {monthNames[currentMonth.getMonth()]}{" "}
                {currentMonth.getFullYear()}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-0.5 hover:bg-gray-100 rounded transition-colors">
                <img
                  src={ArrowForward}
                  alt="ArrowForward"
                  width={12}
                  height={12}
                />
              </button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-sm font-medium text-gray-600 py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before month starts */}
              {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="py-1" />
              ))}

              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const isSelected = isSelectedDate(day);

                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`py-0.5 text-sm text-[#4F4F4F] rounded-full hover:bg-gray-100 transition-colors ${
                      isSelected ? "bg-white border border-[#2F80ED]" : ""
                    }`}>
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </Activity>
      </div>
    </div>
  );
}
