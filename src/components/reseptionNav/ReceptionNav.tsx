import React from "react";
import styles from "./receptionNav.module.scss";
import Link from "next/link";
function ReceptionNav() {
  return (
    <div className={styles.receptionNav}>
      <div className="container">
        <div className={styles.content}>
          <h1 className={styles.title}>Круглосуточная запись на прием</h1>
          <div className={styles.nav}>
            <Link href="/" passHref className={styles.link}>
              Врачи
              <hr className={styles.line} />
            </Link>
            <Link href="/procedurespage" className={styles.link}>
              процедуры
            </Link>
            <Link href="/" className={styles.link}>
              Клиники
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceptionNav;
