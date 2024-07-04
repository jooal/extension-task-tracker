import styles from "../../styles/Pages.module.css";
import { Card } from "../Index/card";

export default function New({ navigateToPage }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>NICE!</h1>
        {/* <p className={styles.description}>
          You're already on your way to being more productive. Let's add some
          subtasks.
        </p> */}
        <p>Can this be broken down into subtasks?</p>
        <Card />
        <p onClick={() => navigateToPage("index")}>{"< Go Back"}</p>
      </main>
    </div>
  );
}
