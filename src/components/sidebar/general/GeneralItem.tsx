interface SidebarGeneralItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected: boolean;
}

const SidebarGeneralItem = ({
  icon,
  label,
  onClick,
  selected,
}: SidebarGeneralItemProps): React.ReactNode => {
  return (
    <button
      className={`flex items-center py-2 w-full ${
        selected ? "bg-blue-200" : "bg-transparent"
      } hover:bg-gray-200`}
      onClick={onClick}
    >
      <>
        {icon}
        <p className="text-lg ml-2 font-light">{label}</p>
      </>
    </button>
  );
};

export default SidebarGeneralItem;
