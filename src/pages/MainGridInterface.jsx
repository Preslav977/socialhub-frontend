import { Suspense } from "react";
import { AsideUlContent } from "../components/AsideUlContent/AsideUlContent";
import { LatestUserFetching } from "../components/LatestUsersFetching/LatestUsersFetching";
import { Loading } from "../components/Loading/Loading";
import { MostFollowedUsers } from "../components/MostFollowedUsers/MostFollowedUsers";
// import { Navbar } from "../components/Navbar/Navbar";
import styles from "./MainGridInterface.module.css";

export function MainGridInterface() {
  return (
    <>
      {/* <Navbar /> */}
      <main className={styles.mainGridContainer}>
        <aside className={styles.mainGridAsideNavigation}>
          <AsideUlContent />
        </aside>

        <section></section>

        <section className={styles.mainGridRightSectionContainer}>
          <div className={styles.latestUsersContainer}>
            {/* <Suspense fallback={<Loading />}> */}
            <LatestUserFetching />
            {/* </Suspense> */}
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
