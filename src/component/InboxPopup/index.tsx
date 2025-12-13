import { useState } from "react";

import Search from "@/assets/icon/search.svg";

import DetailInbox from "./DetailInbox";
import ListInbox from "./ListInbox";

export interface Message {
  id: number;
  title: string;
  sender: string;
  preview: string;
  date: string;
  isUnread?: boolean;
  avatarType: "icon" | "letter";
  avatarLetter?: string;
  participants?: number;
}

const messages: Message[] = [
  {
    id: 1,
    title: "109220-Naturalization",
    sender: "Cameron Phillips",
    preview: "Please check this out!",
    date: "January 1,2021 19:10",
    isUnread: true,
    avatarType: "icon",
    participants: 2,
  },
  {
    id: 2,
    title:
      "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
    sender: "Ellen",
    preview: "Hey, please read.",
    date: "02/06/2021 10:45",
    avatarType: "icon",
    participants: 3,
  },
  {
    id: 3,
    title: "8405-Diana SALAZAR MUNGUIA",
    sender: "Cameron Phillips",
    preview:
      "I understand your initial concerns and thats very valid, Elizabeth. But you ...",
    date: "01/06/2021 12:19",
    avatarType: "icon",
    participants: 4,
  },
  {
    id: 4,
    title: "FastVisa Support",
    sender: "",
    preview: "Hey there! Welcome to your inbox.",
    date: "01/06/2021 12:19",
    avatarType: "letter",
    avatarLetter: "F",
    participants: 2,
  },
];
const InboxPopup = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  if (selectedMessage) {
    return (
      <DetailInbox
        title={selectedMessage.title}
        participants={selectedMessage.participants || 2}
        onBack={() => setSelectedMessage(null)}
        onClose={() => setSelectedMessage(null)}
      />
    );
  }
  return (
    <div className="fixed bottom-28 right-6 z-50 w-[734px] h-[737px] bg-white rounded-lg shadow-xl px-8 py-6 animate-slide-up">
      <div className=" px-10 py-1 w-full h-8 rounded-[5px]  border border-[#828282]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="placeholder:text-[#333333] outline-none border-none focus:ring-0 w-full"
          />
          <img
            src={Search}
            alt="Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3"
          />
        </div>
      </div>
      <ListInbox messages={messages} setSelectedMessage={setSelectedMessage} />
    </div>
  );
};

export default InboxPopup;
