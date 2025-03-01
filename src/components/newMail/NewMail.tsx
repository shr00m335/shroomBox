import React, { useState } from 'react';
import NewMailItem from './NewMailItem';

interface NewMailProps {
  onClose: () => void;
}

const NewMail: React.FC<NewMailProps> = ({ onClose }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    // Handle send email logic here
    console.log('Sending email:', { to, subject, body });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white w-[70%] h-[70%] rounded-lg shadow-lg relative flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">New Email</h1>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-left">To</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Recipient email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-left">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email subject"
            />
          </div>
          <div className="mb-4 flex-1">
            <label className="block text-sm font-medium text-gray-700 text-left">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-40 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your email here"
            />
          </div>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMail;