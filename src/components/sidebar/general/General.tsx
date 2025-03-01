import { AiTwotoneMail } from "react-icons/ai";
import { FaMailBulk } from "react-icons/fa";
import { MdLowPriority, MdMail, MdMoreHoriz } from "react-icons/md";
import SidebarGeneralItem from "./GeneralItem";

interface SidebarGeneralProps {
  selectedItem: string;
}

const SidebarGeneral = ({
  selectedItem,
}: SidebarGeneralProps): React.ReactNode => {
  return (
    <div className="flex flex-col items-start my-3">
      <p className="font-bold text-xl">General</p>
      <div className="py-1 w-full">
        <SidebarGeneralItem
          selected={selectedItem === "inbox"}
          icon={<MdMail size={24} />}
          label="Inbox"
          onClick={() => (window.location.href = "/inbox")}
        />
        <SidebarGeneralItem
          selected={selectedItem === "manager"}
          icon={<FaMailBulk size={24} />}
          label="Email Manager"
          onClick={() => (window.location.href = "/manager")}
        />
        <SidebarGeneralItem
          selected={false}
          icon={<MdLowPriority size={24} />}
          label="Smart Prioritizing"
          onClick={() => {}}
        />
        <SidebarGeneralItem
          selected={currentRoute === AppRoutes.TempMail}
          icon={<AiTwotoneMail size={24} />}
          label="Temporary Mail"
          onClick={() => setCurrentRoute(AppRoutes.TempMail)}
        />
        <SidebarGeneralItem
          selected={false}
          icon={<MdMoreHoriz size={24} />}
          label="More"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default SidebarGeneral;
