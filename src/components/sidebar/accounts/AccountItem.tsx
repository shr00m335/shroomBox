interface SidebarAccountItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarAccountItem = ({
  icon,
  label,
}: SidebarAccountItemProps): React.ReactNode => {
  return (
    <button className="flex items-center my-3 w-full">
      <>
        {icon}
        <p className="text-lg ml-2 font-light">{label}</p>
      </>
    </button>
  );
};

export default SidebarAccountItem;
