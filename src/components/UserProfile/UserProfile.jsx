import { useContext } from "react";
import { UserLogInContext } from "../../context/UserLogInContext";
import { LeftArrow } from "../LeftArrow/LeftArrow";
import styles from "./UserProfile.module.css";

export function UserProfile() {
  const [userLogIn, setUserLogIn] = useContext(UserLogInContext);

  const { profile_picture } = userLogIn;

  return (
    <>
      <LeftArrow textProp={"Profile"} />
      <form className={styles.userProfileWrapper}>
        <div className={styles.userProfileFlexContainer}>
          <img
            className={styles.userProfileImg}
            src={
              profile_picture === "" ? "/user-default-pfp.jpg" : profile_picture
            }
            alt="users profile picture"
          />
          <div>
            <div className={styles.userCredentials}>
              <p>{userLogIn.username}</p>

              <p>{userLogIn.display_name}</p>
            </div>

            <div className={styles.userProfileStatistics}>
              <div>
                <p>{userLogIn.followersNumber}</p>
                <p>Followers</p>
              </div>

              <div>
                <p>{userLogIn.followingNumber}</p>
                <p>Following</p>
              </div>

              <div>
                <p>{userLogIn.posts}</p>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.userProfileWebsites}>
          <p>Bio</p>

          <div className={styles.userProfileSVGFlexContainer}>
            <img className={styles.userProfileSVG} src="/website.svg" alt="" />
            <p>Website</p>
          </div>

          <div className={styles.userProfileSVGFlexContainer}>
            <img className={styles.userProfileSVG} src="/github.svg" alt="" />
            <p>Github</p>
          </div>
        </div>
        <button>Edit</button>
        <button>Save Changes</button>
      </form>
    </>
  );
}
