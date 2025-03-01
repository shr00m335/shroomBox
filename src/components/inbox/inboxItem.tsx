const InboxItem = (): React.ReactNode => {
  return (
    <div className="grid grid-cols-[10%_80%_10%] h-[50px] w-full border-b-[1px] border-[#B3B3B3]">
      <p className="my-auto font-bold">Joshua Soh</p>
      <p className="my-auto self-start text-sm text-gray-500">Mail Title</p>
      <p className="my-auto text-sm text-gray-500">2025-02-28</p>
    </div>
  );
};

export default InboxItem;
