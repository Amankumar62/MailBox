import { useContext, useReducer } from "react";
import {
  AiFillBell,
  AiFillStar,
  AiFillDelete,
  AiFillRead
} from "react-icons/ai";
import { RiSpam2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { MailContext } from "./context/MailContext";

const filterReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "ADD_CHECK":
      return [...prevState, payload];
    case "REMOVE_CHECK":
      return prevState.filter((item) => item !== payload);
    default:
      return prevState;
  }
};

export const Inbox = () => {
  const {
    mailBox: { mailData },
    spamHandler,
    trashHandler,
    countUnreadMail,
    markUnreadHandler,
    markStarHandler
  } = useContext(MailContext);

  const [filters, dispatch] = useReducer(filterReducer, []);

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      dispatch({ type: "ADD_CHECK", payload: e.target.value });
    } else {
      dispatch({ type: "REMOVE_CHECK", payload: e.target.value });
    }
  };

  const displayData = mailData.filter((mails) =>
    filters.every((check) => mails[check])
  );

  return (
    <>
      <fieldset>
        <legend>Filters</legend>
        <label>
          <input
            type="checkbox"
            value="unread"
            onChange={(e) => checkboxHandler(e)}
          />
          Show unread mails
        </label>
        <label>
          <input
            type="checkbox"
            value="isStarred"
            onChange={(e) => checkboxHandler(e)}
          />
          Show starred mails
        </label>
      </fieldset>
      <h3>
        <AiFillBell />
        You have {countUnreadMail()} Unread Mails
      </h3>
      <ul className="mail-list" style={{ listStyle: "none" }}>
        {displayData.map((mail) => {
          const { mId, subject, content, unread, isStarred } = mail;
          return (
            <li key={mId} style={{ backgroundColor: unread ? "#fff" : "#eee" }}>
              <section className="mail-header">
                <p className="subject">{subject}</p>
                <button
                  className="star"
                  style={{ color: !isStarred && "#000" }}
                  onClick={() => markStarHandler(mId)}
                >
                  <AiFillStar style={{ fontSize: "20px" }} />
                </button>
              </section>
              <p className="content">{content}</p>
              <section className="btn-section">
                <button
                  className="view-detail"
                  onClick={() => {
                    if (unread) markUnreadHandler(mId);
                  }}
                >
                  <Link to={`/mailcard/${mId}`} style={{ display: "inline" }}>
                    View Detail
                  </Link>
                </button>
                <button className="delete" onClick={() => trashHandler(mail)}>
                  <AiFillDelete /> Delete
                </button>
                <button
                  className="unread"
                  onClick={() => markUnreadHandler(mId)}
                >
                  <AiFillRead />
                  Mark as {unread ? "Read" : "Unread"}
                </button>
                <button className="spam" onClick={() => spamHandler(mail)}>
                  <RiSpam2Fill /> Report Spam
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </>
  );
};
