import { useAtomValue } from "jotai";
import "./App.css";
import EmailManager from "./components/emailManager/EmailManager";
import Inbox from "./components/inbox/Inbox";
import Sidebar from "./components/sidebar/Sidebar";
import { AppRoutes, currentRouteAtom } from "./stores/AppStores";

const renderRoute = (currentRoute: AppRoutes): React.ReactNode => {
  switch (currentRoute) {
    case AppRoutes.Inbox:
      return <Inbox />;
    case AppRoutes.EmailManager:
      return <EmailManager />;
    default:
      return <div></div>;
  }
};

function App() {
  const currentRoute: AppRoutes = useAtomValue(currentRouteAtom);

  return (
    <div className="flex bg-[#F5F6FA] w-screen h-screen">
      <Sidebar />
      {renderRoute(currentRoute)}
    </div>
  );
}

export default App;
