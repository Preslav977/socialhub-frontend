import { useContext } from "react";
import { AsideUlContent } from "../../components/AsideUlContent/AsideUlContent";
import { Footer } from "../../components/Footer/Footer";
import { LatestUser } from "../../components/LatestUsers/LatestUsers";
import { Modal } from "../../components/Modal/Modal";
import { MostFollowedUsers } from "../../components/MostFollowedUsers/MostFollowedUsers";
import { Navbar } from "../../components/Navbar/Navbar";
import { HasNewPostBeenCreatedContext } from "../../context/HasNewPostBeenCreatedContext";
import styles from "./MainGridInterface.module.css";

export function MainGridInterface({ pageProp }) {
  const [hasNewPostBeenCreated, setHasNewPostBeenCreated] = useContext(
    HasNewPostBeenCreatedContext,
  );

  return (
    <>
      <Navbar />
      <main className={styles.mainGridContainer}>
        <aside className={styles.mainGridAsideNavigation}>
          <AsideUlContent />
        </aside>

        <section className={styles.mainGridSectionContainer}>
          {pageProp}
        </section>

        <section className={styles.mainGridRightSectionContainer}>
          <div className={styles.latestUsersContainer}>
            <LatestUser />
          </div>

          <div className={styles.mostFollowedUsersContainer}>
            <MostFollowedUsers />
          </div>

          <div className={styles.announcementsContainer}>
            <p className={styles.announcementsPara}>Announcements</p>
            <hr className={styles.announcementsHr} />
            <li>Added latest users feature</li>
            <li>Added most followed users feature</li>
          </div>
        </section>
      </main>
      {hasNewPostBeenCreated ? <Modal></Modal> : ""}
      <Footer />
    </>
  );
}
