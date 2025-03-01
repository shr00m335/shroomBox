import { BlueButton } from "../Buttons";
import SidebarAccounts from "./accounts/Accounts";
import SidebarCategory from "./category/Category";
import SidebarGeneral from "./general/General";

const Sidebar: React.FC = () => {
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

      <BlueButton>New Mail</BlueButton>
      <SidebarGeneral />
      <SidebarCategory />
      <SidebarAccounts />
    </div>
  );
};

export default Sidebar;
