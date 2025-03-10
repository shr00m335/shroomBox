import { FaPlusCircle } from "react-icons/fa";

interface EmailManagerAddItemProps {
  onClick: () => void;
}

const EmailManagerAddItem = ({ onClick }: EmailManagerAddItemProps) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 w-72 m-2 shadow-sm h-[240px] flex justify-center items-center"
      onClick={onClick}
    >
      <FaPlusCircle size={64} />
    </div>
  );
};

export default EmailManagerAddItem;
