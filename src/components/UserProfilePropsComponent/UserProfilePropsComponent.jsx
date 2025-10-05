import { useContext } from "react";
import { useForm } from "react-hook-form";
import { EditUserProfileContext } from "../../context/EditUserProfileContext";
import { UserLogInContext } from "../../context/UserLogInContext";
import styles from "./UserProfilePropsComponent.module.css";

export function UserProfilePropsComponent({
  onSubmit,
  profile_picture,
  username,
  usernameError,
  display_name,
  displayNameError,
  followersNumber,
  followedBy,
  followingNumber,
  posts,
  bio,
  website,
  github,
  userLogInID,
  followOrUnFollowUser,
  startConversationWithUser,
}) {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [editUserProfile, setEditUserProfile] = useContext(
    EditUserProfileContext,
  );

  const [userLoggedIn, setUserLoggedIn] = useContext(UserLogInContext);

  return (
    <form onSubmit={onSubmit} className={styles.userProfileWrapper}>
      <div
        className={
          !editUserProfile
            ? styles.userProfileFlexContainer
            : styles.editUserProfileContainer
        }
      >
        {editUserProfile ? (
          <>
            <img
              className={styles.userProfileImg}
              src={
                profile_picture === ""
                  ? "/user-default-pfp.jpg"
                  : profile_picture
              }
              alt="user profile picture"
            />
            <img
              className={styles.userProfileEditImg}
              src="/edit.svg"
              alt="edit profile picture"
            />

            <label htmlFor="file"></label>
            <input
              className={styles.userProfileEditInput}
              type="file"
              name="file"
              id="file"
              aria-label="file"
              required
            />
          </>
        ) : (
          <img
            className={styles.userProfileImg}
            src={
              profile_picture === "" ? "/user-default-pfp.jpg" : profile_picture
            }
            alt="user profile picture"
          />
        )}
        <div>
          <div className={styles.userCredentials}>
            {editUserProfile ? (
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

            {editUserProfile ? (
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
          {Number(userLogInID) !== userLoggedIn.id ? (
            <div className={styles.userFollowAndStartConversationFlexContainer}>
              <button
                data-testid="followUserProfileButton"
                onClick={(e) => {
                  e.preventDefault();

                  followOrUnFollowUser();
                }}
                className={styles.followUserBtn}
              >
                {!followedBy.some(
                  (followedUser) => followedUser.id === userLoggedIn.id,
                )
                  ? "Follow"
                  : "Unfollow"}
              </button>
              <img
                onClick={(e) => {
                  e.preventDefault();

                  startConversationWithUser();
                }}
                className={styles.userStartConversationSVG}
                src="/comment.svg"
                alt="start conversation"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={styles.userProfileWebsites}>
        {editUserProfile ? (
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
          <img
            className={styles.userProfileSVG}
            src="/website.svg"
            alt="website"
          />
          {editUserProfile ? (
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
          <img
            className={styles.userProfileSVG}
            src="/github.svg"
            alt="github"
          />
          {editUserProfile ? (
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
        {Number(userLogInID) !== userLoggedIn.id ? (
          ""
        ) : (
          <>
            <button
              data-testid="editProfileBtn"
              className={styles.userProfileBtn}
              onClick={() => setEditUserProfile(true)}
            >
              Edit
            </button>
            <button
              disabled={!editUserProfile}
              className={styles.userProfileBtn}
              type="submit"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
      <p className={styles.userProfilePostsPara}>Posts</p>
      <hr className={styles.userProfileHr} />
    </form>
  );
}
