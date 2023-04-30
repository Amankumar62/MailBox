import { useContext } from "react";
import { MailContext } from "./context/MailContext";
export const Trash = () => {
  const {
    mailBox: { trashMails }
  } = useContext(MailContext);
  return (
    <>
      <h2>Trash mails</h2>
      <ul>
        {trashMails.map(({ mId, subject, content }) => (
          <li key={mId}>
            <h4>Subject:{subject}</h4>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
