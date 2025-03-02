import React, { useState } from "react";
import { BlueButton } from "../Buttons";
import NewMail from "../newMail/NewMail";
import SidebarCategory from "./category/Category";
import SidebarGeneral from "./general/General";

interface SidebarProps {
  selectedItem: string;
}

const Sidebar = ({ selectedItem }: SidebarProps): React.ReactNode => {
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
      <SidebarGeneral selectedItem={selectedItem} />
      <SidebarCategory />
      {isModalOpen && <NewMail onClose={handleCloseModal} />}
    </div>
  );
};

export default Sidebar;
