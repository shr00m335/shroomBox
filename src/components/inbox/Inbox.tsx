import axios from "axios";
import React, { useEffect, useState } from "react";
import { getOpenAIResponse } from "../../../api";
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
  plain_content: string;
  category: string;
}

const Inbox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [selectedEmail, setSelectedEmail] = useState<null | EmailContent>(null);
  const [emails, setEmails] = useState<EmailContent[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "all",
    "work",
    "travel",
    "school",
    "hangouts",
    "others",
  ]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [categoryColors, setCategoryColors] = useState<string[]>([]);

  useEffect(() => {
    getAllEmails();
  }, []);

  useEffect(() => {
    setCategoryColors(categories.map((_) => getRandomColor()));
  }, [categories]);

  const getAllEmails = async (): Promise<void> => {
    const res = await axios.get("/gmail_api/emails");
    if (res.status !== 200) return;
    const data: EmailContent[] = (res.data as EmailContent[]).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const subjects: string[] = data.map((x) => x.subject);
    const prompt = `${subjects.join(
      ",,"
    )}\nPlease categorize the given email subjects, seperated by two commas, into one of the following categories. And return the results in a json format of {subject:category}.\nCategory: ${categories
      .slice(1)
      .join(",")}`;
    const aiResponse = await getOpenAIResponse(prompt);
    const results = Object.values(
      JSON.parse(aiResponse.choices[0].message.content.trim())
    ) as string[];
    for (let i = 0; i < results.length; i++) {
      data[i].category = results[i];
    }
    console.log(data);
    setEmails(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleAIRequest = async () => {
    console.log("Submitting query:", query); // Debug log
    try {
      let emailContents: string = "";
      for (let i = 0; i < emails.length; i++) {
        emailContents += `Email ${i + 1}.\n`;
        emailContents += `Subject: ${emails[i].subject}\n`;
        emailContents += `Body: ${emails[i].plain_content}\n\n`;
      }
      const prompt: string = `${emailContents}\nBased on the given emails subjects and contents, answer the following query in 2 to 3 sentences. Each email starts with "Email x", where x is the number of the email. When mentioning the email, use the subject of the email and do not include its number.\nQuery: ${query}`;
      const aiResponse = await getOpenAIResponse(prompt);
      console.log("AI response:", aiResponse); // Debug log
      setResponse(aiResponse.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  const getRandomColor = (): string => {
    const r = Math.floor(Math.random() * 156) + 100;
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
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

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setActiveTab(newCategory);
    }
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
            <div className="w-full flex space-x-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded ${
                    activeTab === category
                      ? "bg-gray-300"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
              <button
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                onClick={handleAddCategory}
              >
                + Add Category
              </button>
            </div>
            <div className="w-full h-9/10 bg-white my-5 rounded-2xl flex flex-col items-start p-5">
              <div className="w-full grid grid-cols-4">
                <input
                  className="bg-[#F5F6FA] bg-[url(/openai-icon.png)] bg-left bg-origin-padding bg-scroll bg-no-repeat bg-[32px,32px] border-[#D5D5D5] border-[1px] rounded-lg px-3 py-3 w-4/5 col-span-3 pl-10"
                  placeholder="Ask AI..."
                  value={query}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              {response && (
                <div className="w-full col-span-4 mt-2 p-4 bg-gray-100 rounded-lg">
                  <p className="text-gray-700">{response}</p>
                </div>
              )}
              <div className="w-full my-1 overflow-y-auto">
                {emails
                  .filter(
                    (x) => activeTab === "all" || x.category === activeTab
                  )
                  .map((email) => (
                    <InboxItem
                      email={email}
                      categoryColor={
                        categoryColors[categories.indexOf(email.category)]
                      }
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
