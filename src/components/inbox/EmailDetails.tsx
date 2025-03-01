import React from "react";
import { FaArrowLeft } from "react-icons/fa"; // Importing an icon from react-icons
import { EmailContent } from "./Inbox";

interface EmailDetailsProps {
  email: EmailContent;
  onBack: () => void;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onBack }) => {
  return (
    <div className="w-full h-full p-5 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-5">
        <button onClick={onBack} className="text-blue-500 flex items-center">
          <FaArrowLeft className="mr-2" /> {/* Icon */}
          Back
        </button>
      </div>
      <div className="border-b pb-3 mb-3">
        <h2 className="font-bold text-2xl text-left">{email.subject}</h2>
        <p className="text-gray-700 text-left">From: {email.from}</p>
      </div>
      <div className="mt-5">
        <p className="text-left">{email.content}</p>
      </div>
    </div>
  );
};

export default EmailDetails;
