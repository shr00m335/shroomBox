import { BiLogoGmail } from "react-icons/bi";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import SidebarAccountItem from "./AccountItem";

const SidebarAccounts = (): React.ReactNode => {
  return (
    <div className="flex flex-col items-start my-3">
      <p className="font-bold text-xl">Accounts</p>
      <div className="py-1">
        <SidebarAccountItem
          label="shr00mwork@gmail.com"
          icon={<BiLogoGmail size={20} />}
        />
        <SidebarAccountItem
          label="shr00mgame@gmail.com"
          icon={<BiLogoGmail size={20} />}
        />
        <SidebarAccountItem
          label="shr00mschool@outlook.com"
          icon={<PiMicrosoftOutlookLogoFill size={20} />}
        />
      </div>
    </div>
  );
};

export default SidebarAccounts;
