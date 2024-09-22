import Link from "next/link";
import styles from "./page.module.css";
import Interface from "./components/Interface/page";
import Navbar from "./components/Navbar/page";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.stars}>
        {[...Array(50)].map((_, index) => (
          <div key={index} className={styles.star}></div>
        ))}
      </div>

      

      <Interface /> {/* Interface component remains as is */}

      {/* Overlay div to restrict interaction */}
      <div className={styles.overlay}></div>
    </div>
  );
}
