import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { Inbox } from "./Inbox";
import { Spam } from "./Spam";
import { Trash } from "./Trash";
import { MailCard } from "./MailCard";

export default function App() {
  const styleLink = ({ isActive }) => ({
    borderRight: isActive && "4px solid #000",
    color: isActive && "red",
    transition: "all 0.3s ease-out",
    backgroundColor: "#fff"
  });
  return (
    <div className="App">
      <nav>
        <NavLink style={styleLink} to="/">
          Inbox
        </NavLink>
        <NavLink style={styleLink} to="/spam">
          Spam
        </NavLink>
        <NavLink style={styleLink} to="/trash">
          Trash
        </NavLink>
      </nav>
      <section className="mail-section">
        <h1>My Mail box</h1>
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/spam" element={<Spam />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/mailcard/:mailId" element={<MailCard />} />
        </Routes>
      </section>
    </div>
  );
}
