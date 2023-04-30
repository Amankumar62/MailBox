import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MailContext } from "./context/MailContext";
export const MailCard = () => {
  const { mailId } = useParams();
  const { getMailHandler, markUnreadHandler } = useContext(MailContext);

  const { mId, subject, content, unread } = getMailHandler(mailId);

  return (
    <>
      <h2>{subject}</h2>
      <p>{content}</p>
    </>
  );
};
