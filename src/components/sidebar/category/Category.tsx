import SidebarCategoryItem from "./CategoryItem";

const SidebarCategory = (): React.ReactNode => {
  return (
    <div className="flex flex-col items-start my-3">
      <p className="font-bold text-xl">Categories</p>
      <div className="py-1">
        <SidebarCategoryItem label="Work" />
        <SidebarCategoryItem label="School" />
        <SidebarCategoryItem label="Holiday" />
        <SidebarCategoryItem label="Orders" />
      </div>
    </div>
  );
};

export default SidebarCategory;
