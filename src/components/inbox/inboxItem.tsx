import React from "react";
import { EmailContent } from "./Inbox";

interface InboxItemProps {
  onClick: () => void;
  categoryColor: string;
  email: EmailContent;
}

const InboxItem: React.FC<InboxItemProps> = ({
  onClick,
  categoryColor,
  email,
}) => {
  return (
    <div
      className="grid grid-cols-[10%_20%_10%_40%_20%] h-[50px] w-full border-b-[1px] border-[#B3B3B3] cursor-pointer"
      onClick={onClick}
    >
      <img
        src={email.avatar}
        width={32}
        height={32}
        className="rounded-full m-auto"
      />
      <p className={`my-auto ${email.unread ? "font-bold" : "font-light"}`}>
        {email.from.replace(/<[^>]+>/g, "").trim()}
      </p>
      <p
        className="my-auto text-black rounded-md bg-opacity-10"
        style={{
          backgroundColor: categoryColor,
        }}
      >
        {email.category}
      </p>
      <p className="my-auto self-start text-sm text-gray-500">
        {email.subject}
      </p>
      <p className="my-auto text-sm text-gray-500">
        {new Date(email.date).toDateString()}
      </p>
    </div>
  );
};

export default InboxItem;
