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
    <div className="bg-[#FFFFFF] w-[320px] px-5 h-full overflow-y-auto">
      {/* Title */}
      <div className="my-3">
        <img
          src="/shroomBox_logo_name.png"
          alt="ShroomBox Logo"
          width={64}
          height={64}
          className="mx-auto"
        />
        <p className="font-bold text-2xl my-1">
          <span className="text-[#4880FF]">Shroom</span>Box
        </p>
      </div>

      <BlueButton onClick={handleNewMailClick}>New Mail</BlueButton>
      <SidebarGeneral />
      <SidebarCategory />
      <SidebarAccounts />
      {isModalOpen && <NewMail onClose={handleCloseModal} />}
    </div>
  );
};

export default Sidebar;