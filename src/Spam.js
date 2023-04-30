import { useContext } from "react";
import { MailContext } from "./context/MailContext";
export const Spam = () => {
  const {
    mailBox: { spamMails }
  } = useContext(MailContext);
  return (
    <>
      <h2>Spam mails</h2>
      <ul>
        {spamMails.map(({ mId, subject, content }) => (
          <li key={mId}>
            <h4>Subject:{subject}</h4>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
