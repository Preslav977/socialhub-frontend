import { useNavigate } from "react-router-dom";
import { useFetchChats } from "../../api/userFetchChats";
import { LeftArrow } from "../../components/LeftArrow/LeftArrow";
import styles from "./Chats.module.css";

export function Chats() {
  const { chats, loading, error } = useFetchChats();

  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error...</p>;

  return (
    <>
      <LeftArrow textProp={"Messages"} navigation={"/messages"} />

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
