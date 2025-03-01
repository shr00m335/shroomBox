import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import EmailManager from "./components/emailManager/EmailManager";
import Inbox from "./components/inbox/Inbox";

// Import the wrapper that handles nested routes for Temp Mail
import TempMailMain from "./components/tempMail/TempMailMain";
import TempMailDetailsPage from "./components/tempMail/TempMailDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing pages */}
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/manager" element={<EmailManager />} />

        {/* TempMail (nested routes inside) */}
        <Route path="/tempMail/*" element={<TempMailMain />} />

        {/* Optional catch-all or default route */}
        <Route path="*" element={<Inbox />} />

{/* The details page for /tempMail/:email */}
<Route path="/tempMail/:email" element={<TempMailDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
