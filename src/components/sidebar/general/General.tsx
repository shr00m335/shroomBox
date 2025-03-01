import { useAtom } from "jotai";
import { AiTwotoneMail } from "react-icons/ai";
import { FaMailBulk } from "react-icons/fa";
import { MdLowPriority, MdMail, MdMoreHoriz } from "react-icons/md";
import { AppRoutes, currentRouteAtom } from "../../../stores/AppStores";
import SidebarGeneralItem from "./GeneralItem";

const SidebarGeneral = (): React.ReactNode => {
  const [currentRoute, setCurrentRoute] = useAtom(currentRouteAtom);

  return (
    <div className="flex flex-col items-start my-3">
      <p className="font-bold text-xl">General</p>
      <div className="py-1 w-full">
        <SidebarGeneralItem
          selected={currentRoute === AppRoutes.Inbox}
          icon={<MdMail size={24} />}
          label="Inbox"
          onClick={() => setCurrentRoute(AppRoutes.Inbox)}
        />
        <SidebarGeneralItem
          selected={currentRoute === AppRoutes.EmailManager}
          icon={<FaMailBulk size={24} />}
          label="Email Manager"
          onClick={() => setCurrentRoute(AppRoutes.EmailManager)}
        />
        <SidebarGeneralItem
          selected={false}
          icon={<MdLowPriority size={24} />}
          label="Smart Prioritizing"
          onClick={() => {}}
        />
        <SidebarGeneralItem
          selected={false}
          icon={<AiTwotoneMail size={24} />}
          label="Temporary Mail"
          onClick={() => {}}
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
