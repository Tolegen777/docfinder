import React from "react";
import styles from "./reception.module.scss";
function Reaception() {
  return (
    <>
      <section className={styles.reception}>
        <div className="container">
          <div className={styles.content}>
            <h1 className={styles.title}>Круглосуточная запись на прием</h1>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reaception;
