import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchUser } from "../../api/useFetchUser";
import { EditUserProfileContext } from "../../context/EditUserProfileContext";
import { UserLogInContext } from "../../context/UserLogInContext";
import { UsersPosts } from "../../pages/UsersPosts/UsersPosts";
import { LeftArrow } from "../LeftArrow/LeftArrow";
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

  const { handleSubmit, reset } = useForm();

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

        console.log(errors);

        errors.forEach((err) => {
          if (err.msg.startsWith("Username")) {
            setUsernameError(err.msg);
          } else {
            setDisplayNameError(err.msg);
          }
        });
      } else {
        const result = await response.json();

        setUserDetails(result);

        setEditUserProfile(false);

        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

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
          followingNumber={userDetails.followingNumber}
          posts={userDetails.posts}
          bio={userDetails.bio}
          website={userDetails.website}
          github={userDetails.github}
          userLogInID={userDetails.id}
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
      <UsersPosts />
    </>
  );
}
