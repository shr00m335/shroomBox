interface SidebarGeneralItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarGeneralItem = ({
  icon,
  label,
}: SidebarGeneralItemProps): React.ReactNode => {
  return (
    <button className="flex items-center my-3 w-full">
      <>
        {icon}
        <p className="text-lg ml-2 font-light">{label}</p>
        <p className="ml-auto mr-0 text-sm text-gray-400">1234</p>
      </>
    </button>
  );
};

export default SidebarGeneralItem;
