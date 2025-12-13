import { Activity, useEffect, useRef, useState } from "react";
import Close from "@/assets/icon/close.svg";
import BackArrow from "@/assets/icon/back-arrow.svg";
import { formatDate, formatTime } from "../../helper/formatDate";
import { ActionInbox } from "./ActionInbox";

interface ChatMessage {
  id: number;
  sender: string;
  senderType: "you" | "mary" | "obaidullah";
  message: string;
  time: string;
  isNewMessage?: boolean;
  date?: string;
  replyTo: {
    id: number;
    sender: string;
    message: string;
  } | null;
}

interface ConversationDetailProps {
  title: string;
  participants: number;
  onBack: () => void;
  onClose: () => void;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "You",
    senderType: "you",
    message: "No worries. It will be completed ASAP. I've asked him yesterday.",
    time: formatTime(new Date()),
    date: formatDate(new Date("June 07, 2021")),
    replyTo: null,
  },
  {
    id: 2,
    sender: "Mary Hilda",
    senderType: "mary",
    message:
      "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    time: formatTime(new Date()),
    date: formatDate(new Date("June 07, 2021")),
    replyTo: null,
  },
  {
    id: 3,
    sender: "You",
    senderType: "you",
    message:
      "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
    time: formatTime(new Date()),
    date: formatDate(new Date("June 08, 2021")),
    replyTo: null,
  },
  {
    id: 4,
    sender: "Mary Hilda",
    senderType: "mary",
    message: "Sure thing, Claren",
    time: formatTime(new Date()),
    date: formatDate(new Date("June 09, 2021")),
    replyTo: null,
  },
  {
    id: 5,
    sender: "Obaidullah Amarkhil",
    senderType: "obaidullah",
    message: "Morning. I'll try to do them. Thanks",
    isNewMessage: true,
    time: formatTime(new Date()),
    date: formatDate(new Date("December 11, 2025")),
    replyTo: null,
  },
];

const DetailInbox = ({
  title,
  participants,
  onBack,
  onClose,
}: ConversationDetailProps) => {
  const [currentMessages, setCurrentMessages] =
    useState<ChatMessage[]>(chatMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [replyTo, setReplyTo] = useState<null | {
    id: number;
    sender: string;
    message: string;
  }>(null);
  const getSenderColor = (senderType: string) => {
    switch (senderType) {
      case "you":
        return "text-[#9B51E0]";
      case "mary":
        return "text-[#E5A443]";
      case "obaidullah":
        return "text-[#43B78D]";
      default:
        return "text-gray-600";
    }
  };

  const getMessageBgColor = (senderType: string) => {
    switch (senderType) {
      case "you":
        return "bg-[#EEDCFF]";
      case "mary":
        return "bg-[#FCEED3]";
      case "obaidullah":
        return "bg-[#D2F2EA]";
      default:
        return "bg-gray-100";
    }
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    if (newMessage.trim()) {
      setNewMessage("");
      setCurrentMessages((prevMessages) => {
        const updated = prevMessages.map((msg) => ({
          ...msg,
          isNewMessage: false,
        }));

        return [
          ...updated,
          {
            id: updated.length + 1,
            sender: "You",
            senderType: "you",
            message: newMessage,
            replyTo,
            time: formatTime(new Date()),
            date: formatDate(new Date()),
          },
        ];
      });
      setReplyTo(null);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [currentMessages]);

  return (
    <div className="fixed bottom-28 right-6 z-30 w-[734px] h-[737px] bg-white rounded-lg shadow-xl animate-slide-up">
      <div className="overflow-hidden flex flex-col h-[717px] mx-1">
        {/* Header */}
        <div className="flex items-center justify-between p-4 h-[73px] border-b border-[#BDBDBD]">
          <div className="flex items-center gap-3">
            <span onClick={onBack} className="cursor-pointer">
              <img src={BackArrow} alt="VerDot" width={24} height={24} />
            </span>
            <div>
              <h2 className="text-[#2F80ED] font-semibold text-base">
                {title}
              </h2>
              <p className="text-[#333333] text-xs">
                {participants} Participants
              </p>
            </div>
          </div>
          <span onClick={onClose}>
            <img src={Close} alt="VerDot" width={14} height={14} />
          </span>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto pt-4 pb-14 pl-5 pr-3 space-y-4">
          {currentMessages.map((msg, index) => {
            const isYou = msg.senderType === "you";
            const showNewMessageDivider = msg.isNewMessage;
            const isFirst = index === 0;
            const previous = currentMessages[index - 1];
            const showDateDivider = isFirst || previous.date !== msg.date;

            return (
              <div key={msg.id}>
                <Activity mode={showDateDivider ? "visible" : "hidden"}>
                  <div className="flex items-center justify-center my-2.5">
                    <div className="border-t border-[#4F4F4F] flex-1" />
                    <span className="px-6 text-[#4F4F4F] text-sm font-medium">
                      {msg.date}
                    </span>
                    <div className="border-t border-[#4F4F4F] flex-1" />
                  </div>
                </Activity>
                <Activity mode={showNewMessageDivider ? "visible" : "hidden"}>
                  <div className="flex items-center justify-center my-2.5">
                    <div className="border-t border-[#EB5757] flex-1" />
                    <span className="px-4 text-[#EB5757] text-sm font-medium">
                      New Message
                    </span>
                    <div className="border-t border-[#EB5757] flex-1" />
                  </div>
                </Activity>

                <div
                  className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                  <div className={`${isYou ? "items-end" : "items-start"}`}>
                    <p
                      className={`text-xs font-medium mb-1 ${getSenderColor(
                        msg.senderType
                      )} ${isYou ? "text-right" : "text-left"}`}>
                      {msg.sender}
                    </p>
                    {msg.replyTo && (
                      <div className="border border-[#E0E0E0] bg-[#F2F2F2] rounded-[5px] max-w-[518px] p-2.5 mb-1 text-sm text-[#4F4F4F]">
                        {msg.replyTo.message}
                      </div>
                    )}
                    <div
                      className={`flex items-start gap-2 ${
                        isYou ? "flex-row" : "flex-row-reverse"
                      }`}>
                      <div className="cursor-pointer relative">
                        <ActionInbox
                          onShare={() => console.log("Share:", msg.id)}
                          onReply={() =>
                            setReplyTo({
                              id: msg.id,
                              sender: msg.sender,
                              message: msg.message,
                            })
                          }
                          align="right"
                        />
                      </div>
                      <div
                        className={`rounded p-2.5 ${
                          msg.replyTo ? "w-full" : "max-w-[518px]"
                        }  ${getMessageBgColor(msg.senderType)}`}>
                        <p className="text-[#4F4F4F] text-sm">{msg.message}</p>
                        <p className="text-[#4F4F4F] text-xs mt-1">
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="px-4 relative pt-10">
          <div className="flex items-end gap-[13px] absolute bottom-0 left-4 right-4">
            <div className="flex flex-col w-full">
              <Activity mode={replyTo ? "visible" : "hidden"}>
                <div className="w-full rounded-tr rounded-tl border-t border-x p-4 bg-[#F2F2F2] relative">
                  <div className="font-medium text-[#4F4F4F] ">
                    Replying to {replyTo?.sender}
                  </div>
                  <div className="text-sm text-[#4F4F4F] mt-1">
                    {replyTo?.message}
                  </div>

                  <span
                    onClick={() => setReplyTo(null)}
                    className="absolute top-4 right-4 cursor-pointer">
                    <img src={Close} alt="Close" width={12} height={12} />
                  </span>
                </div>
              </Activity>

              <input
                type="text"
                placeholder="Type a new message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className={`flex-1 px-4 py-2 border border-[#828282] ${
                  replyTo ? "rounded-br rounded-bl" : "rounded"
                }  focus:outline-none  placeholder:text-[#333333]`}
              />
            </div>
            <button
              onClick={handleSend}
              className="flex items-center justify-center cursor-pointer bg-[#2F80ED] text-white rounded font-medium w-[76px] h-10 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInbox;
