export function formatDate(date: Date) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric"
  };

  if (isToday) return `Today, ${date.toLocaleDateString("en-US", options)}`;
  if (isYesterday) return `Yesterday, ${date.toLocaleDateString("en-US", options)}`;
  return date.toLocaleDateString("en-US", options);
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const formatDDMMYYYY = (date: Date) => {
  if (isNaN(date.getTime())) return "";

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  return `${d}/${m}/${y}`;
};

export const getDaysLeft = (dueDate: string) => {
  const today = new Date();
  const due = new Date(dueDate);

  // reset time (hindari bug timezone)
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diff =
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
console.log(Math.ceil(diff));
  return Math.ceil(diff);
};
