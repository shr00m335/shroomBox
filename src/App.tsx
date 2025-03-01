import "./App.css";
import Inbox from "./components/inbox/Inbox";
import EmailManager from "./components/emailManager/EmailManager";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar />
      <Inbox />
    </div>
  );
}

export default App;
