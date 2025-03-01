import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import AddEmailPopup from "./AddEmailPopup";
import EmailManagerAddItem from "./EmailManagerAddItem";
import EmailManagerItem from "./EmailManagerItem";

interface EmailProfile {
  email: string;
  name: string;
  photo: string;
}

const EmailManager: React.FC = () => {
  const [isAddingEmail, setIsAddingEmail] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "personal" | "work" | "temporary" | string
  >("personal");
  const [categories, setCategories] = useState([
    "personal",
    "work",
    "temporary",
  ]);

  // Data
  const [emailList, setEmailList] = useState<EmailProfile[]>([]);

  useEffect(() => {
    getAllEmailProfiles();
  }, []);

  const getAllEmailProfiles = async (): Promise<void> => {
    const res = await axios.get("/gmail_api/all_profiles");
    if (res.status !== 200) return;
    setEmailList(res.data);
  };

  const personalItems = [
    {
      title: "shr00name1@gmail.com",
      summary: "AI Summary: News, Netflix, Instagram, etc.",
      usage:
        "Used for daily life. Contains subscription usage for YouTube Premium, ChatGPT Plus...",
    },
    {
      title: "shr00names@gmail.com",
      summary: "Steam, Riot Games, Minecraft...",
      usage: "Used for gaming services.",
    },
    {
      title: "shr00nmail218@gmail.com",
      summary: "AI Summary: 123Bank, Trading.com...",
      usage: "Used for important finance emails.",
    },
    {
      title: "shr00nmail218@gmail.com",
      summary: "AI Summary: 123Bank, Trading.com...",
      usage: "Used for important finance emails.",
    },
  ];

  const workItems = [
    {
      title: "workmail@company.com",
      summary: "AI Summary: Team updates, project management, etc.",
      usage: "Used for official company communications.",
    },
  ];

  const temporaryItems = [
    {
      title: "temp-user@mail.com",
      summary: "AI Summary: Disposable, short-term usage.",
      usage: "Used for signing up on test websites.",
    },
    // Add more items here...
  ];

  const getItemsForActiveTab = () => {
    switch (activeTab) {
      case "personal":
        return personalItems;
      case "work":
        return workItems;
      case "temporary":
        return temporaryItems;
      default:
        return [];
    }
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category name:");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setActiveTab(newCategory);
    }
  };

  return (
    <>
      <div className="flex bg-[#F5F6FA] w-screen h-screen">
        <Sidebar selectedItem="manager" />
        <div className="w-full h-full p-5">
          <p className="font-bold text-3xl w-full text-left">Email Manager</p>
          <div className="w-full h-9/10 bg-white my-5 rounded-2xl flex flex-col items-start p-5">
            {/* Tabs */}
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
            {/* Cards */}
            <div className="w-full grid grid-cols-3  h-full">
              {emailList.map((x) => (
                <EmailManagerItem
                  imgsrc={x.photo}
                  name={x.name}
                  email={x.email}
                />
              ))}
              <EmailManagerAddItem onClick={() => setIsAddingEmail(true)} />
            </div>
          </div>
        </div>
      </div>
      {isAddingEmail && (
        <AddEmailPopup onClose={() => setIsAddingEmail(false)} />
      )}
    </>
  );
};

export default EmailManager;
