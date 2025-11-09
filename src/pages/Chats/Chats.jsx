import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchChats } from "../../api/userFetchChats";
import { ErrorElement } from "../../components/ErrorElement/ErrorElement";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import { LoadingSkeletonChats } from "../../components/LoadingSkeletonChats/LoadingSkeletonChats";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./Chats.module.css";

export function Chats() {
  const { chats, loading, error } = useFetchChats();

  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const navigate = useNavigate();

  if (loading) return <LoadingSkeletonChats />;

  if (error)
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
      <LeftArrow textProp={"Messages"} />

      {chats ? (
        <ul>
          {chats.map((chat) => (
            <li
              onClick={() => {
                navigate(`/message/${chat.id}`);
              }}
              className={styles.flexedLiContainer}
              key={chat.id}
            >
              <img
                className={styles.userReceiverImg}
                src={
                  !chat.receiverChat.profile_picture
                    ? "/user-default-pfp.jpg"
                    : chat.receiverChat.profile_picture
                }
                alt="user profile picture"
              />
              <p>
                {chat.receiverChatId !== userLogIn.id
                  ? chat.receiverChat.username
                  : chat.senderChat.username}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
