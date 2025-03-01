import { BlueButton } from "../Buttons";
import Sidebar from "../sidebar/Sidebar";
import InboxItem from "./inboxItem";

const Inbox = (): React.ReactNode => {
  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar selectedItem="inbox" />
      <div className="w-full h-full p-5">
        <p className="font-bold text-3xl w-full text-left">Inbox</p>
        <div className="w-full h-9/10 bg-white my-5 rounded-2xl flex flex-col items-start p-5">
          <div className="w-full grid grid-cols-4">
            <input
              className="bg-[#F5F6FA] bg-[url(/openai-icon.png)] bg-left bg-origin-padding bg-scroll bg-no-repeat bg-[32px,32px] border-[#D5D5D5] border-[1px] rounded-lg px-3 py-3 w-4/5 col-span-3 pl-10"
              placeholder="Ask AI..."
            />
            <BlueButton>Categorize</BlueButton>
          </div>
          <div className="w-full my-1">
            <InboxItem />
            <InboxItem />
            <InboxItem />
            <InboxItem />
            <InboxItem />
            <InboxItem />
            <InboxItem />
            <InboxItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
