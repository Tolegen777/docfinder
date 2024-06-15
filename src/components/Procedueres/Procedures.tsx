import React from "react";
import styles from "./procedures.module.scss";
import ReceptionNav from "@/components/reseptionNav/ReceptionNav";
import icon from "@/components/svg/procedures.svg";
import Image from "next/image";
function Procedures() {
  return (
    <>
      <div className={styles.procedure}>
        <div className="container">
          <div className={styles.content}>
            <ReceptionNav />
            <div className={styles.procedures}>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <Image src={icon} alt="" className={styles.image} />
                  Анестезиолог
                </div>
                <div className={styles.card}>
                  <Image src={icon} alt="" className={styles.image} />
                  Анестезиолог
                </div>
                <div className={styles.card}>
                  <Image src={icon} alt="" className={styles.image} />
                  Анестезиолог
                </div>
                <div className={styles.card}>
                  <Image src={icon} alt="" className={styles.image} />
                  Анестезиолог
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Procedures;
