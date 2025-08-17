import { AsideUlContent } from "../components/AsideUlContent/AsideUlContent";
import { LatestUserFetching } from "../components/LatestUserFetching/LatestUsersFetching";
// import { Navbar } from "../components/Navbar/Navbar";
import styles from "./MainGridInterface.module.css";

export function MainGridInterface() {
  return (
    <>
      {/* <Navbar /> */}
      <main className={styles.mainGridContainer}>
        <aside>
          <AsideUlContent />
        </aside>

        <section></section>

        <section>
          <div className={styles.latestUsersContainerWrapper}>
            <LatestUserFetching />
          </div>
        </section>
      </main>
    </>
  );
}
