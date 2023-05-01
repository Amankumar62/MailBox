import "./styles.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { AiTwotoneMail, AiOutlineInbox } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { RiSpam2Fill } from "react-icons/ri";
import { Inbox } from "./Inbox";
import { Spam } from "./Spam";
import { Trash } from "./Trash";
import { MailCard } from "./MailCard";

export default function App() {
  const styleLink = ({ isActive }) => ({
    color: isActive && "red",
    transition: "color 0.3s ease-out",
    backgroundColor: isActive && "#f5f5f5"
  });
  return (
    <div className="App">
      <aside>
        <NavLink style={styleLink} to="/">
          <AiOutlineInbox /> Inbox
        </NavLink>
        <NavLink style={styleLink} to="/spam">
          <RiSpam2Fill /> Spam
        </NavLink>
        <NavLink style={styleLink} to="/trash">
          <BsTrashFill />
          Trash
        </NavLink>
      </aside>
      <section className="mail-section">
        <h1>
          <AiTwotoneMail /> Mail box
        </h1>
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
