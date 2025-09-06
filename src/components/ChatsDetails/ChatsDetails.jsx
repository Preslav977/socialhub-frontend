import { format } from "date-fns";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchSingleChat } from "../../api/useFetchSingleChat";
import { UserLogInContext } from "../../context/UserLogInContext";
import { LeftArrow } from "../LeftArrow/LeftArrow";
import styles from "./ChatsDetails.module.css";

export function ChatsDetails() {
  const { id } = useParams();

  const { chatDetails, setChatDetails, loading, error } =
    useFetchSingleChat(id);

  const [userLoggedIn, setUserLoggedIn] = useContext(UserLogInContext);

  const [sendMessageOrImage, setSendMessageOrImage] = useState(false);

  console.log(sendMessageOrImage);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error...</p>;

  const onSubmitMessageText = async (data) => {
    const { text } = data;

    try {
      const response = await fetch(
        `${localhostURL}/chats/${chatDetails.id}/message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            text,
            receiverId: chatDetails.receiverChatId,
          }),
        },
      );
      const result = await response.json();

      const chatDetailsMessagesObject = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(chatDetailsMessagesObject);

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setSendMessageOrImage(false);
    }
  };

  const onSubmitMessageImage = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    formData.append("receiverId", chatDetails.receiverChatId);

    try {
      const response = await fetch(
        `${localhostURL}/chats/${chatDetails.id}/image`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
        },
      );
      const result = await response.json();

      console.log(result);

      const chatDetailsMessagesObject = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(chatDetailsMessagesObject);

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setSendMessageOrImage(false);
    }
  };

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
            <form
              encType="multipart/formdata"
              onSubmit={
                sendMessageOrImage
                  ? (e) => handleSubmit(onSubmitMessageImage(e))
                  : handleSubmit(onSubmitMessageText)
              }
              className={styles.chatDetailsSendMessageOrImageContainer}
            >
              <label htmlFor="text"></label>
              <input
                className={styles.chatDetailsInput}
                type="text"
                name="text"
                id="text"
                {...register("text", {
                  maxLength: "666",
                })}
                aria-invalid={errors.text ? "true" : "false"}
              />
              {errors.text?.type === "maxLength" && (
                <span role="alert">
                  Message shouldn't be more than 666 characters
                </span>
              )}

              <div>
                <input
                  onClick={() => setSendMessageOrImage(true)}
                  className={styles.chatDetailsSendImgInput}
                  type="file"
                  name="file"
                  id="file"
                />
                <img
                  className={styles.chatDetailsSendImageSVG}
                  src="/send-image.svg"
                  alt=""
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={styles.chatDetailsSendBtn}
                ></button>
                <img
                  className={styles.chatDetailsSendMessageSVG}
                  src="/send-message.svg"
                  alt=""
                />
              </div>
            </form>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
