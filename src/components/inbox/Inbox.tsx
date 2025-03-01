import React, { useState } from 'react';
import { BlueButton } from "../Buttons";
import InboxItem from "./inboxItem";
import { getOpenAIResponse } from '../../../api';

const Inbox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAIRequest = async () => {
    console.log('Submitting query:', query); // Debug log
    try {
      const aiResponse = await getOpenAIResponse(query);
      console.log('AI response:', aiResponse); // Debug log
      // Updated here: using message.content instead of text
      setResponse(aiResponse.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAIRequest();
    }
  };

  return (
    <div className="w-full h-full p-5">
      <p className="font-bold text-3xl w-full text-left">Inbox</p>
      <div className="w-full h-9/10 bg-white my-5 rounded-2xl flex flex-col items-start p-5">
        <div className="w-full grid grid-cols-4">
          <input
            className="bg-[#F5F6FA] bg-[url(/openai-icon.png)] bg-left bg-origin-padding bg-scroll bg-no-repeat bg-[32px,32px] border-[#D5D5D5] border-[1px] rounded-lg px-3 py-3 w-4/5 col-span-3 pl-10"
            placeholder="Ask AI..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <BlueButton onClick={handleAIRequest}>Categorize</BlueButton>
        </div>
        {response && (
          <div className="w-full col-span-4 mt-2 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700">{response}</p>
          </div>
        )}
        <div className="w-full my-1">
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
          <InboxItem />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
