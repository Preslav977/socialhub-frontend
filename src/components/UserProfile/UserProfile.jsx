import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { localhostURL } from "../../../utility/localhostURL";
import { useFetchUser } from "../../api/useFetchUser";
import { LeftArrow } from "../LeftArrow/LeftArrow";
import styles from "./UserProfile.module.css";

export function UserProfile() {
  const { userDetails, setUserDetails, error, loading } = useFetchUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [usernameError, setUsernameError] = useState("");

  const [displayNameError, setDisplayNameError] = useState("");

  const [editProfile, setEditProfile] = useState(false);

  const { id } = useParams();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  const {
    profile_picture,
    username,
    display_name,
    followersNumber,
    followingNumber,
    posts,
    bio,
    website,
    github,
  } = userDetails;

  console.log(userDetails);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    // console.log(formData);

    try {
      const response = await fetch(`${localhostURL}/users/${id}`, {
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

        setEditProfile(false);

        reset();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <LeftArrow textProp={"Profile"} />
      <form
        onSubmit={(e) => handleSubmit(onSubmit(e))}
        className={styles.userProfileWrapper}
      >
        <div
          className={
            !editProfile
              ? styles.userProfileFlexContainer
              : styles.editUserProfileContainer
          }
        >
          {editProfile ? (
            <>
              <img
                className={styles.userProfileImg}
                src={
                  profile_picture === ""
                    ? "/user-default-pfp.jpg"
                    : profile_picture
                }
                alt="users profile picture"
              />
              <img
                className={styles.userProfileEditImg}
                src="/edit.svg"
                alt=""
              />

              <label htmlFor="file"></label>
              <input
                className={styles.userProfileEditInput}
                type="file"
                name="file"
                id="file"
                required
              />
            </>
          ) : (
            <img
              className={styles.userProfileImg}
              src={
                profile_picture === ""
                  ? "/user-default-pfp.jpg"
                  : profile_picture
              }
              alt="users profile picture"
            />
          )}
          <div>
            <div className={styles.userCredentials}>
              {editProfile ? (
                <>
                  <label htmlFor="username"></label>
                  <input
                    className={styles.userProfilePrimaryInput}
                    type="text"
                    name="username"
                    id="username"
                    aria-label="username"
                    {...register("username", {
                      required: true,
                      minLength: 1,
                      maxLength: 30,
                    })}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                </>
              ) : (
                <p>{username}</p>
              )}

              <span role="alert">{usernameError}</span>

              {errors.username?.type === "required" && (
                <span role="alert">Username is required</span>
              )}
              {errors.username?.type === "minLength" ||
                (errors.username?.type === "maxLength" && (
                  <span role="alert">
                    Username must be between 1 and 30 characters
                  </span>
                ))}

              {editProfile ? (
                <>
                  <label htmlFor="display_name"></label>
                  <input
                    className={styles.userProfilePrimaryInput}
                    type="text"
                    name="display_name"
                    id="display_name"
                    aria-label="display_name"
                    {...register("display_name", { required: true })}
                    aria-invalid={errors.display_name ? "true" : "false"}
                  />
                </>
              ) : (
                <p>{display_name}</p>
              )}

              <span role="alert">{displayNameError}</span>

              {errors.display_name?.type === "required" && (
                <span role="alert">Display name is required</span>
              )}
              {errors.display_name?.type === "minLength" ||
                (errors.display_name?.type === "maxLength" && (
                  <span role="alert">
                    Display name must be between 1 and 30 characters
                  </span>
                ))}
            </div>

            <div className={styles.userProfileStatistics}>
              <div>
                <p>{followersNumber}</p>
                <p>Followers</p>
              </div>

              <div>
                <p>{followingNumber}</p>
                <p>Following</p>
              </div>

              <div>
                <p>{posts}</p>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.userProfileWebsites}>
          {editProfile ? (
            <input
              className={styles.userProfileSecondaryInput}
              type="text"
              name="bio"
              id="bio"
              aria-label="bio"
            />
          ) : (
            <p>{bio}</p>
          )}

          <div className={styles.userProfileSVGFlexContainer}>
            <img className={styles.userProfileSVG} src="/website.svg" alt="" />
            {editProfile ? (
              <input
                className={styles.userProfileSecondaryInput}
                type="text"
                name="website"
                id="website"
                aria-label="website"
              />
            ) : (
              <p>{website}</p>
            )}
          </div>

          <div className={styles.userProfileSVGFlexContainer}>
            <img className={styles.userProfileSVG} src="/github.svg" alt="" />
            {editProfile ? (
              <input
                className={styles.userProfileSecondaryInput}
                type="text"
                name="github"
                id="github"
                aria-label="github"
              />
            ) : (
              <p>{github}</p>
            )}
          </div>
        </div>
        <div className={styles.userProfileBtnsContainer}>
          <button onClick={() => setEditProfile(true)}>Edit</button>
          <button type="submit">Save Changes</button>
        </div>
        <p>Posts</p>
      </form>
    </>
  );
}
