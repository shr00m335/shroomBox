import React from 'react';

interface InboxItemProps {
  onClick: () => void;
  sender: string;
  title: string;
  date: string;
}

const InboxItem: React.FC<InboxItemProps> = ({ onClick, sender, title, date }) => {
  return (
    <div
      className="grid grid-cols-[10%_80%_10%] h-[50px] w-full border-b-[1px] border-[#B3B3B3] cursor-pointer"
      onClick={onClick}
    >
      <p className="my-auto font-bold">{sender}</p>
      <p className="my-auto self-start text-sm text-gray-500">{title}</p>
      <p className="my-auto text-sm text-gray-500">{date}</p>
    </div>
  );
};

export default InboxItem;