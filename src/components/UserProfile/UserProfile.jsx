import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchUser } from "../../api/useFetchUser";
import { EditUserProfileContext } from "../../context/EditUserProfileContext";
import { UserLogInContext } from "../../context/UserLogInContext";
import { Posts } from "../../pages/Posts/Posts";
import { ErrorElement } from "../ErrorElement/ErrorElement";
import { LeftArrow } from "../LeftArrow/LeftArrow";
import { Loading } from "../Loading/Loading";
import { UserProfilePropsComponent } from "../UserProfilePropsComponent/UserProfilePropsComponent";

export function UserProfile() {
  const { id } = useParams();

  const [userLoggedIn, setUserLoggedIn] = useContext(UserLogInContext);

  const { userDetails, setUserDetails, error, loading } = useFetchUser(
    Number(id),
  );

  const [editUserProfile, setEditUserProfile] = useContext(
    EditUserProfileContext,
  );

  const [usernameError, setUsernameError] = useState("");

  const [displayNameError, setDisplayNameError] = useState("");

  const [isTokenHasExpired, setIsTokenHasExpired] = useState();

  const { handleSubmit, reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${localhostURL}/users/${Number(id)}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });

      if (response.status >= 400) {
        const errors = await response.json();

        errors.forEach((err) => {
          if (err.msg.startsWith("Username")) {
            setUsernameError(err.msg);
          } else {
            setDisplayNameError(err.msg);
          }
        });
      } else {
        const result = await response.json();

        setUserLoggedIn(result);

        setEditUserProfile(false);

        reset();
      }
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  };

  async function followOrUnFollowUser() {
    try {
      const response = await fetch(
        `${localhostURL}/users/following/${userDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            id: userDetails.id,
          }),
        },
      );
      const result = await response.json();

      const [follower, following] = result;

      const followOrUnfollowUserDetailsObject = {
        ...userDetails,
        followedBy: follower.followedBy,
        followersNumber: follower.followersNumber,
      };

      setUserDetails(followOrUnfollowUserDetailsObject);

      const followOrUnfollowUserLoggedInObject = {
        ...userLoggedIn,
        following: following.following,
        followingNumber: following.followingNumber,
      };

      setUserLoggedIn(followOrUnfollowUserLoggedInObject);
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

  async function startChatWithUser() {
    try {
      const response = await fetch(`${localhostURL}/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          senderId: userLoggedIn.id,
          receiverId: userDetails.id,
        }),
      });
      const result = await response.json();

      navigate(`/message/${result.id}`);
    } catch (error) {
      setIsTokenHasExpired(error);
    }
  }

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
      <LeftArrow textProp={"Profile"} />
      {userLoggedIn.id !== Number(id) ? (
        <UserProfilePropsComponent
          onSubmit={(e) => handleSubmit(onSubmit(e))}
          profile_picture={userDetails.profile_picture}
          username={userDetails.username}
          usernameError={usernameError}
          display_name={userDetails.display_name}
          displayNameError={displayNameError}
          followersNumber={userDetails.followersNumber}
          followedBy={userDetails.followedBy}
          followingNumber={userDetails.followingNumber}
          posts={userDetails.posts}
          bio={userDetails.bio}
          website={userDetails.website}
          github={userDetails.github}
          userLogInID={userDetails.id}
          followOrUnFollowUser={followOrUnFollowUser}
          startConversationWithUser={startChatWithUser}
        />
      ) : (
        <UserProfilePropsComponent
          onSubmit={(e) => handleSubmit(onSubmit(e))}
          profile_picture={userLoggedIn.profile_picture}
          username={userLoggedIn.username}
          usernameError={usernameError}
          display_name={userLoggedIn.display_name}
          displayNameError={displayNameError}
          followersNumber={userLoggedIn.followersNumber}
          followingNumber={userLoggedIn.followingNumber}
          posts={userLoggedIn.posts}
          bio={userLoggedIn.bio}
          website={userLoggedIn.website}
          github={userLoggedIn.github}
          userLogInID={userLoggedIn.id}
        />
      )}
      <Posts postsHeader={false} />
    </>
  );
}
