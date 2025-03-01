import React from "react";
import { useAtomValue } from "jotai";
import "./App.css";
import EmailManager from "./components/emailManager/EmailManager";
import Inbox from "./components/inbox/Inbox";
import Sidebar from "./components/sidebar/Sidebar";
import TempMail from "./components/tempMail/TempMail";  // <-- Import the new component
import { AppRoutes, currentRouteAtom } from "./stores/AppStores";

const renderRoute = (currentRoute: AppRoutes): React.ReactNode => {
  switch (currentRoute) {
    case AppRoutes.Inbox:
      return <Inbox />;
    case AppRoutes.EmailManager:
      return <EmailManager />;
    case AppRoutes.TempMail:
      // Pass your backend URL if different from the default
      return <TempMail backendUrl="http://localhost:5000" />;
    default:
      // You can display a "Not Found" or empty component
      return <div>Not Found</div>;
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
