import { FaBox } from "react-icons/fa";

interface SidebarCategoryItemProps {
  label: string;
}

const SidebarCategoryItem = ({
  label,
}: SidebarCategoryItemProps): React.ReactNode => {
  return (
    <button className="flex items-center my-3 w-full">
      <>
        <FaBox size={20} />
        <p className="text-lg ml-2 font-light">{label}</p>
      </>
    </button>
  );
};

export default SidebarCategoryItem;
