import { AsideUlContent } from "../components/AsideUlContent/AsideUlContent";
import { Navbar } from "../components/Navbar/Navbar";
import styles from "./MainGridInterface.module.css";

// console.log(fetchLatestUsers());

export function MainGridInterface() {
  return (
    <>
      <Navbar />
      <main className={styles.mainGridContainer}>
        <aside>
          <AsideUlContent />
        </aside>

        <section></section>

        <section></section>
      </main>
    </>
  );
}
