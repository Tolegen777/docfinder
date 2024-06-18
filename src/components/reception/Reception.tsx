"use client";

import React, { useState } from "react";
import styles from "./reception.module.scss";
import Procedures from "../Procedueres/Procedures";
import Clinics from "../Clinics/Clinics";
function Reception() {
  const [activeLink, setActiveLink] = useState("Врачи");

  const specialists = [
    {
      letter: "А",
      items: [
        { name: "Акушер", count: 3695 },
        { name: "Аллерголог", count: 553 },
        { name: "Ангихирург", count: 359 },
        { name: "Аллерголог", count: 553 },
        { name: "Ангихирург", count: 359 },
        { name: "Аллерголог", count: 553 },
        { name: "Ангихирург", count: 359 },
      ],
    },
    {
      letter: "Б",
      items: [
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
        { name: "Бактериолог", count: 199 },
      ],
    },

    {
      letter: "Y",
      items: [
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
      ],
    },
    {
      letter: "S",
      items: [
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
        { name: "Бактериолог", count: 199 },
        { name: "Биолог", count: 121 },
      ],
    },
  ];

  return (
    <>
      <section className={styles.reception}>
        <div className="container">
          <div className={styles.content}>
            <div className="container">
              <div className={styles.navs}>
                <h1 className={styles.title}>Круглосуточная запись на прием</h1>
                <nav className={styles.nav}>
                  <div
                    className={`${styles.link} ${
                      activeLink === "Врачи" ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink("Врачи")}
                  >
                    Врачи
                  </div>
                  <div
                    className={`${styles.link} ${
                      activeLink === "процедуры" ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink("процедуры")}
                  >
                    процедуры
                  </div>
                  <div
                    className={`${styles.link} ${
                      activeLink === "Клиники" ? styles.active : ""
                    }`}
                    onClick={() => setActiveLink("Клиники")}
                  >
                    Клиники
                  </div>
                </nav>
              </div>
            </div>
            {activeLink === "Врачи" ? (
              <div className={styles.dostors}>
                <div className={styles.cards}>
                  {specialists.map((item) => (
                    <div key={item.letter} className={styles.specialties}>
                      <h2 className={styles.letter}>{item.letter}</h2>
                      <ul>
                        {item.items.map((el) => (
                          <li key={el.name} className={styles.speciality}>
                            {el.name}
                            <span className={styles.quantity}>{el.count}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeLink === "процедуры" ? (
              <Procedures />
            ) : (
              <Clinics />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Reception;
