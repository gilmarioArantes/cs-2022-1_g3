import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Foorum</title>
        <meta
          name="description"
          content="O melhor forum de programação de Goiânia."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Foorum!</h1>
      </main>
    </div>
  );
}
