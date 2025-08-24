import { AsideUlContent } from "../../components/AsideUlContent/AsideUlContent";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "./MainGridInterface.module.css";

export function MainGridInterface({ middlePageProp, rightPageProp }) {
  return (
    <>
      <Navbar />
      <main className={styles.mainGridContainer}>
        <aside className={styles.mainGridAsideNavigation}>
          <AsideUlContent />
        </aside>

        <section className={styles.mainGridSectionContainer}>
          {middlePageProp}
        </section>

        <section className={styles.mainGridRightSectionContainer}>
          {rightPageProp}
        </section>
      </main>
    </>
  );
}
