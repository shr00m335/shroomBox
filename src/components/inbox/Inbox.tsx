import React, { useState } from 'react';
import { BlueButton } from "../Buttons";
import Sidebar from "../sidebar/Sidebar";
import InboxItem from "./inboxItem";
import EmailDetails from "./EmailDetails";
import { getOpenAIResponse } from '../../../api';

const Inbox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<null | { subject: string; sender: string; body: string }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAIRequest = async () => {
    console.log('Submitting query:', query); // Debug log
    try {
      const aiResponse = await getOpenAIResponse(query);
      console.log('AI response:', aiResponse); // Debug log
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

  const handleEmailClick = (email: { subject: string; sender: string; body: string }) => {
    setSelectedEmail(email);
  };

  const handleBack = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar selectedItem="inbox" />
      <div className="w-full h-full p-5">
        {selectedEmail ? (
          <EmailDetails email={selectedEmail} onBack={handleBack} />
        ) : (
          <>
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
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 1', sender: 'sender1@example.com', body: 'This is the body of email 1.' })}
                  sender="sender1@example.com"
                  title="Email 1"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 2', sender: 'sender2@example.com', body: 'This is the body of email 2.' })}
                  sender="sender2@example.com"
                  title="Email 2"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 3', sender: 'sender3@example.com', body: 'This is the body of email 3.' })}
                  sender="sender3@example.com"
                  title="Email 3"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 4', sender: 'sender4@example.com', body: 'This is the body of email 4.' })}
                  sender="sender4@example.com"
                  title="Email 4"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 5', sender: 'sender5@example.com', body: 'This is the body of email 5.' })}
                  sender="sender5@example.com"
                  title="Email 5"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 6', sender: 'sender6@example.com', body: 'This is the body of email 6.' })}
                  sender="sender6@example.com"
                  title="Email 6"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 7', sender: 'sender7@example.com', body: 'This is the body of email 7.' })}
                  sender="sender7@example.com"
                  title="Email 7"
                  date="2025-02-28"
                />
                <InboxItem
                  onClick={() => handleEmailClick({ subject: 'Email 8', sender: 'sender8@example.com', body: 'This is the body of email 8.' })}
                  sender="sender8@example.com"
                  title="Email 8"
                  date="2025-02-28"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;