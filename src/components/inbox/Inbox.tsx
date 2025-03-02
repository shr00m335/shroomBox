import axios from "axios";
import React, { useEffect, useState } from "react";
import { getOpenAIResponse } from "../../../api";
import { BlueButton } from "../Buttons";
import Sidebar from "../sidebar/Sidebar";
import EmailDetails from "./EmailDetails";
import InboxItem from "./inboxItem";

export interface EmailContent {
  subject: string;
  from: string;
  content: string;
  date: string;
  avatar: string;
  unread: boolean;
}

const Inbox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<null | EmailContent>(null);
  const [emails, setEmails] = useState<EmailContent[]>([]);

  useEffect(() => {
    getAllEmails();
  }, []);

  const getAllEmails = async (): Promise<void> => {
    const res = await axios.get("/gmail_api/emails");
    if (res.status !== 200) return;
    const data: EmailContent[] = res.data;
    setEmails(
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAIRequest = async () => {
    console.log("Submitting query:", query); // Debug log
    try {
      const aiResponse = await getOpenAIResponse(query);
      console.log("AI response:", aiResponse); // Debug log
      setResponse(aiResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAIRequest();
    }
  };

  const handleEmailClick = (email: EmailContent) => {
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
                email={{
                  subject: "Well Done",
                  from: "sammy@shroomtechnology.com",
                  content: "well done sammy, i am proud of you.",
                  date: "01-03-2025",
                  avatar: "",
                  unread: false
                }}
                onClick={() =>
                  handleEmailClick({
                    subject: "Well Done",
                    from: "sammy@shroomtechnology.com",
                    content: "well done sammy, i am proud of you.",
                    date: "01-03-2025",
                    avatar: "",
                    unread: false
                  })
                }
              />
                {emails.map((email) => (
                  <InboxItem
                    email={email}
                    onClick={() => handleEmailClick(email)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inbox;
