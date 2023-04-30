import { useContext, useReducer } from "react";
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
      <h3>Filters</h3>
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
      <h3>Unread:{countUnreadMail()}</h3>
      <ul className="mail-list" style={{ listStyle: "none" }}>
        {displayData.map((mail) => {
          const { mId, subject, content, unread, isStarred } = mail;
          return (
            <li key={mId}>
              <p className="subject">Subject:{subject}</p>
              <button
                className="star"
                style={{ color: isStarred && "#000" }}
                onClick={() => markStarHandler(mId)}
              >
                {isStarred ? "Unstar" : "Star"}
              </button>
              <p>{content}</p>
              <section className="btn-section">
                <Link to={`/mailcard/${mId}`} style={{ display: "inline" }}>
                  View Detail
                </Link>
                <button className="delete" onClick={() => trashHandler(mail)}>
                  Delete
                </button>
                <button
                  className="unread"
                  onClick={() => markUnreadHandler(mId)}
                >
                  Mark as {unread ? "Read" : "Unread"}
                </button>
                <button className="spam" onClick={() => spamHandler(mail)}>
                  Report Spam
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </>
  );
};
