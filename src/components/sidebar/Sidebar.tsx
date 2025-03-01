import { BlueButton } from "../Buttons";
import SidebarGeneral from "./general/General";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-[#FFFFFF] min-w-[200px] w-[20%] max-w-[300px] px-5 h-full">
      {/* Title */}
      <p className="font-bold text-2xl my-3">
        <span className="text-[#4880FF]">Shroom</span>Box
      </p>
      <BlueButton>New Mail</BlueButton>
      <SidebarGeneral />
    </div>
  );
};

export default Sidebar;
