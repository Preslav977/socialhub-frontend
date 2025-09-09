import { AsideUlContent } from "../../components/AsideUlContent/AsideUlContent";
import { LatestUser } from "../../components/LatestUsers/LatestUsers";
import { MostFollowedUsers } from "../../components/MostFollowedUsers/MostFollowedUsers";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "./MainGridInterface.module.css";

export function MainGridInterface({ pageProp }) {
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
            <p>Announcements</p>
            <hr className={styles.announcementsHr} />
            <li>Added latest users feature</li>
            <li>Added most followed users feature</li>
          </div>
        </section>
      </main>
    </>
  );
}
