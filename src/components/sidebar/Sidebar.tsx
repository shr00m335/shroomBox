import { BlueButton } from "../Buttons";
import SidebarAccounts from "./accounts/Accounts";
import SidebarCategory from "./category/Category";
import SidebarGeneral from "./general/General";
import React, { useState } from 'react';
import NewMail from '../newMail/NewMail';

const Sidebar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewMailClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#FFFFFF] min-w-[200px] w-[20%] max-w-[300px] px-5 h-full">
      {/* Title */}
      <p className="font-bold text-2xl my-3">
        <span className="text-[#4880FF]">Shroom</span>Box
      </p>
      <BlueButton onClick={handleNewMailClick}>New Mail</BlueButton>
      <SidebarGeneral />
      <SidebarCategory />
      <SidebarAccounts />
      {isModalOpen && <NewMail onClose={handleCloseModal} />}
    </div>
  );
};

export default Sidebar;