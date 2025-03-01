import { AiTwotoneMail } from "react-icons/ai";
import { FaMailBulk } from "react-icons/fa";
import { MdLowPriority, MdMail, MdMoreHoriz } from "react-icons/md";
import SidebarGeneralItem from "./GeneralItem";

const SidebarGeneral = (): React.ReactNode => {
  return (
    <div className="flex flex-col items-start my-3">
      <p className="font-bold text-xl">General</p>
      <div className="py-1 w-full">
        <SidebarGeneralItem icon={<MdMail size={24} />} label="Inbox" />
        <SidebarGeneralItem
          icon={<FaMailBulk size={24} />}
          label="Email Manager"
        />
        <SidebarGeneralItem
          icon={<MdLowPriority size={24} />}
          label="Smart Prioritizing"
        />
        <SidebarGeneralItem
          icon={<AiTwotoneMail size={24} />}
          label="Temporary Mail"
        />
        <SidebarGeneralItem icon={<MdMoreHoriz size={24} />} label="More" />
      </div>
    </div>
  );
};

export default SidebarGeneral;
