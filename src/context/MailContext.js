import { createContext, useReducer } from "react";
import { mails } from "../data";
export const MailContext = createContext();

const mailReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_TRASH":
      return {
        ...prevState,
        mailData: prevState.mailData.filter(({ mId }) => payload.mId !== mId),
        trashMails: [...prevState.trashMails, payload]
      };
    case "ADD_TO_SPAM":
      return {
        ...prevState,
        mailData: prevState.mailData.filter(({ mId }) => payload.mId !== mId),
        spamMails: [...prevState.spamMails, payload]
      };
    case "MARK_UNREAD":
      return {
        ...prevState,
        mailData: prevState.mailData.map((mail) =>
          mail.mId === payload ? { ...mail, unread: !mail.unread } : mail
        )
      };
    case "MARK_STARRED":
      return {
        ...prevState,
        mailData: prevState.mailData.map((mail) =>
          mail.mId === payload ? { ...mail, isStarred: !mail.isStarred } : mail
        )
      };
    default:
      return prevState;
  }
};

export const MailProvider = ({ children }) => {
  const [mailBox, dispatch] = useReducer(mailReducer, {
    mailData: [...mails],
    spamMails: [],
    trashMails: []
  });
  const trashHandler = (mail) => {
    dispatch({ type: "ADD_TO_TRASH", payload: mail });
  };
  const spamHandler = (mail) => {
    dispatch({ type: "ADD_TO_SPAM", payload: mail });
  };
  const countUnreadMail = () => {
    return mailBox.mailData.filter(({ unread }) => unread).length;
  };
  const markUnreadHandler = (id) => {
    dispatch({ type: "MARK_UNREAD", payload: id });
  };

  const markStarHandler = (id) => {
    dispatch({ type: "MARK_STARRED", payload: id });
  };

  const getMailHandler = (id) => {
    return mailBox.mailData.find(({ mId }) => mId === id);
  };
  return (
    <MailContext.Provider
      value={{
        mailBox,
        trashHandler,
        spamHandler,
        countUnreadMail,
        markUnreadHandler,
        markStarHandler,
        getMailHandler
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
