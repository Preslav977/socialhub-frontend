import { format } from "date-fns";
import { Fragment, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchSingleChat } from "../../api/useFetchSingleChat";
import { ErrorElement } from "../../components/ErrorElement/ErrorElement";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import { Loading } from "../../components/Loading/Loading";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./ChatsDetails.module.css";

export function ChatsDetails() {
  const { id } = useParams();

  const { chatDetails, setChatDetails, loading, error } =
    useFetchSingleChat(id);

  const [userLoggedIn, setUserLoggedIn] = useContext(UserLogInContext);

  const [sendMessageOrImage, setSendMessageOrImage] = useState(false);

  const [isTokenHasExpired, setIsTokenHasExpired] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

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
      setIsTokenHasExpired(error);
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

      const chatDetailsMessagesObject = {
        ...chatDetails,
        messages: result.messages,
      };

      setChatDetails(chatDetailsMessagesObject);

      reset();
    } catch (error) {
      setIsTokenHasExpired(error);
    } finally {
      setSendMessageOrImage(false);
    }
  };

  if (loading) return <Loading></Loading>;

  if (error || isTokenHasExpired)
    return (
      <ErrorElement
        textProp={"400 Bad Request"}
        textDescriptionProp={
          "Token seems to be lost in the darkness. Login can fix that!"
        }
      ></ErrorElement>
    );

  return (
    <>
      {chatDetails ? (
        <>
          <LeftArrow
            textProp={chatDetails.receiverChat.username}
            navigation={"/messages"}
          />

          <div className={styles.chatDetailsContainer}>
            {chatDetails.messages.map((message) => (
              <Fragment key={message.id}>
                {message.senderMessageId === userLoggedIn.id ? (
                  <div className={styles.chatDetailsUserMessage}>
                    {message.text ? (
                      <div className={styles.chatDetailsMessage}>
                        <p>{message.text}</p>
                        <div>
                          <p>{format(message.createdAt, "HH:mm aaaaa'm'")}</p>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.chatDetailsImage}>
                        <p>{message.text}</p>
                        <img src={message.imageURL} alt="chat details image" />
                        <div>
                          <p>{format(message.createdAt, "HH:mm aaaaa'm'")}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={styles.chatDetailsUserReceiverMessage}>
                    {message.text ? (
                      <div className={styles.chatDetailsMessage}>
                        <p>{message.text}</p>
                        <div>
                          <p>{format(message.createdAt, "HH:mm aaaaa'm'")}</p>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.chatDetailsImage}>
                        <p>{message.text}</p>
                        <img src={message.imageURL} alt="chat details image" />
                        <div>
                          <p>{format(message.createdAt, "HH:mm aaaaa'm'")}</p>
                        </div>
                      </div>
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
              className={styles.chatDetailsForm}
            >
              <label htmlFor="text"></label>
              <input
                className={styles.chatDetailsInput}
                type="text"
                name="text"
                id="text"
                minLength={!sendMessageOrImage ? 1 : ""}
                required={!sendMessageOrImage ? true : false}
                placeholder="Enter a message..."
                {...register("text", {
                  minLength: "1",
                  maxLength: "666",
                })}
                aria-invalid={errors.text ? "true" : "false"}
              />
              {errors.text?.type === "minLength" && (
                <span role="alert">Message should be at least 1 character</span>
              )}

              {errors.text?.type === "maxLength" && (
                <span role="alert">
                  Message shouldn't be more than 666 characters
                </span>
              )}

              <div>
                <input
                  onClick={() => setSendMessageOrImage(true)}
                  className={styles.chatDetailsSendImgInput}
                  aria-label="file"
                  type="file"
                  name="file"
                  id="file"
                />
                <img
                  className={styles.chatDetailsSendImageSVG}
                  src="/send-image.svg"
                  alt="send image in chat"
                />
              </div>
              <div>
                <button
                  data-testid="sendMessageBtn"
                  type="submit"
                  className={styles.chatDetailsSendBtn}
                ></button>
                <img
                  className={styles.chatDetailsSendMessageSVG}
                  src="/send-message.svg"
                  alt="send message in chat"
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
