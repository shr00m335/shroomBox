import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import EmailManager from "./components/emailManager/EmailManager";
import Inbox from "./components/inbox/Inbox";
import TempMail from "./components/tempMail/TempMail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/inbox" element={<Inbox />} />
        <Route path="/manager" element={<EmailManager />}></Route>
        <Route path="/tempMail" element={<TempMail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
