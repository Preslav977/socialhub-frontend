import { useNavigate } from "react-router-dom";
import { useFetchChats } from "../../api/userFetchChats";
import { ErrorElement } from "../../components/ErrorElement/ErrorElement";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import { LoadingSkeletonChats } from "../../components/LoadingSkeletonChats/LoadingSkeletonChats";
import styles from "./Chats.module.css";

export function Chats() {
  const { chats, loading, error } = useFetchChats();

  const navigate = useNavigate();

  if (loading)
    return <LoadingSkeletonChats chats={chats}></LoadingSkeletonChats>;

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
              <p>{chat.receiverChat.username}</p>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}
