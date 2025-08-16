import { Navbar } from "../components/Navbar/Navbar";
import styles from "./MainGridInterface.module.css";

export function MainGridInterface() {
  return (
    <>
      <Navbar />
      <main className={styles.mainGridContainer}>
        <aside></aside>

        <section></section>

        <section></section>
      </main>
    </>
  );
}
