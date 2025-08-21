import { Suspense } from "react";
import { AsideUlContent } from "../../components/AsideUlContent/AsideUlContent";
import { LatestUser } from "../../components/LatestUsers/LatestUsers";
import { Loading } from "../../components/Loading/Loading";
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
            <Suspense fallback={<Loading />}>
              <MostFollowedUsers />
            </Suspense>
          </div>

          <div className={styles.announcementsContainer}>
            <p>Announcements</p>
            <hr />
            <li>Added latest users feature</li>
            <li>Added most followed users feature</li>
          </div>
        </section>
      </main>
    </>
  );
}
