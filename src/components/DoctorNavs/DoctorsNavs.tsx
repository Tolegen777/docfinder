import React from "react";
import styles from "./DoctorsNavs.module.scss";

const DoctorsNavs: React.FC = () => {
  return (
    <div>
      <section id={styles.doctorNavs}>
        <div className="container">
          <div className={styles.doctorNavs}>
            <div className={styles.doctorMainNavs}>
              <button className={styles.discount}>Скидки %</button>
              <button className={styles.change}>Cмена</button>
              <button className={styles.children}>Детский</button>
              <h3 className={styles.reset}>Сбросить</h3>
            </div>
            <div className={styles.doctorMainSort}>
              <select className={styles.popularity}>
                <option>Сортировать: Популярность</option>
              </select>
              <select className={styles.price}>
                <option>Сортировать: Стоимость</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorsNavs;
