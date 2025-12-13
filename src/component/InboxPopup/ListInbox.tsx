import type { Message } from ".";
import User from "@/assets/icon/user.svg";
import UserBlack from "@/assets/icon/user-black.svg";
interface ListInboxProps {
  messages: Message[];
  setSelectedMessage: (message: Message) => void;
}

const ListInbox = ({ messages, setSelectedMessage }: ListInboxProps) => {
  return (
    <div className="divide-y divide-gray-200">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => setSelectedMessage(message)}
          className="flex items-start py-[22px]  cursor-pointer transition-colors">
          {/* Avatar */}
          <div className="shrink-0 w-[51px] flex items-center justify-center">
            {message.avatarType === "icon" ? (
              <div className="flex -space-x-[17px]">
                <div className="w-[34px] h-[34px] bg-[#E0E0E0] rounded-full flex items-center justify-center">
                  <img src={UserBlack} alt="VerDot" width={16} height={16} />
                </div>
                <div className="w-[34px] h-[34px] bg-[#2F80ED] rounded-full flex items-center justify-center">
                  <img src={User} alt="VerDot" width={16} height={16} />
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 bg-[#2F80ED] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {message.avatarLetter}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 ml-[17px]">
            <div className="flex items-start gap-2">
              <h3 className="text-[#2F80ED] w-max-[446px] font-semibold text-sm leading-tight">
                {message.title}
              </h3>
              <span className="text-[#4F4F4F] text-xs whitespace-nowrap shrink-0">
                {message.date}
              </span>
            </div>
            <div className="mt-1">
              {message.sender && (
                <span className="text-[#4F4F4F] font-medium text-sm">
                  {message.sender} :{" "}
                </span>
              )}
              <span className="text-[#4F4F4F] text-sm -mt-2">{` ${message.preview}`}</span>
            </div>
          </div>

          {/* Unread Indicator */}
          {message.isUnread && (
            <div className="self-center mt-2">
              <div className="w-2.5 h-2.5 bg-[#EB5757] rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListInbox;
