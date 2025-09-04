import { format } from "date-fns";
import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { useFetchSingleChat } from "../../api/useFetchSingleChat";
import { UserLogInContext } from "../../context/UserLogInContext";
import { LeftArrow } from "../LeftArrow/LeftArrow";
import styles from "./ChatsDetails.module.css";

export function ChatsDetails() {
  const { id } = useParams();

  const { chatDetails, setChatDetails, loading, error } =
    useFetchSingleChat(id);

  console.log(chatDetails);

  const [userLoggedIn, setUserLoggedIn] = useContext(UserLogInContext);

  return (
    <>
      {chatDetails ? (
        <>
          <LeftArrow textProp={chatDetails.receiverChat.username} />

          <div className={styles.chatDetailsContainer}>
            {chatDetails.messages.map((message) => (
              <Fragment key={message.id}>
                {message.senderMessageId === userLoggedIn.id ? (
                  <div className={styles.chatDetailsUserMessage}>
                    {message.text ? (
                      <p className={styles.chatDetailsSendMessage}>
                        {message.text}
                      </p>
                    ) : (
                      <div>
                        <img
                          className={styles.chatDetailsSendImage}
                          src={message.imageURL}
                        />
                      </div>
                    )}
                    <p>{format(message.createdAt, "HH:mm aaaaa'm'")}</p>
                  </div>
                ) : (
                  <div className={styles.chatDetailsUserReceiverMessage}>
                    {message.text ? (
                      <div>
                        <p className={styles.chatDetailsSendMessage}>
                          {message.text}
                        </p>
                        <p>{format(message.createdAt, "HH:mm aaaaa'm'")}</p>
                      </div>
                    ) : (
                      <img
                        className={styles.chatDetailsSendImage}
                        src={message.imageURL}
                      />
                    )}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div>
            <form className={styles.chatDetailsSendMessageOrImageContainer}>
              <label htmlFor="text"></label>
              <input type="text" />
              <button></button>
            </form>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
