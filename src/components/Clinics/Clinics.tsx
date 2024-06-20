import React from "react";
import styles from "./Clinics.module.scss";
import Image from "next/image";

const Clinics: React.FC = () => {
  return (
    <div>
      <section id={styles.clinics}>
        <div className="container">
          <div className={styles.clinics}>
            <div className={styles.clinicsBlock}>
              <div className={styles.clinicsImg}>
                <Image
                  height={100}
                  width={100}
                  src="https://s3-alpha-sig.figma.com/img/0021/7d71/999888070ee68dde4c77397a4d00081c?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H40yEjIyMgqsdbWZof9-vRbiCrLksyapakg4llLJc8y7tu4WGEs7LLj1emHjoPeVlCXOjNE1mVFF422U8sN8E2jKwXmjXFkbB98MmIGqVwNayvuPjJJALaB2S67HUV85ztU-XBa5SeMNb~obXrfnAhp8yHT5nB~XXmO-tUB6-fMQSngaZ5EyV2Nyz4b-ye3CVkefLfvH2nx04JxNfUetoRwOozOjPL0A~gFZx0h6QuoNGDaA1JDR83QQyNgrGcUTXq5xQlTc8Xvfl7WJZRfK8R82vaOrOLLyrX6xYBDPunpRdYxzcfbc55HxNvaAlfOOQFoqxztgGbIeA5mrXlszfg__"
                  alt="image"
                  className={styles.clinicsImg1}
                />
                <h3 className={styles.clinicsImgH3}>★ ★ ★ ★ ★</h3>
                <h4 className={styles.clinicsImgH4}>5 159 отзвыов</h4>
              </div>
              <div className={styles.clinicsText}>
                <h3 className={styles.clicicsTextH3}>ЭМИРМЕД</h3>
                <h4 className={styles.clicicsTextH5}>
                  Сеть многопрофильных клиник №1 в Казахстане!
                </h4>
                <p className={styles.clicicsTextP}>
                  сеть круглосуточных медицинских центров, где забота о вашем
                  здоровье становится вечной миссией. Наша клиника – это оазис
                  заботы и профессионализма, доступный без перерывов и выходных,
                  чтобы обеспечить вам высочайший уровень медицинского
                  обслуживания.
                </p>
              </div>
              <div className={styles.clinicsEnd}>
                <h4>​Улица Розыбакиева, 37в</h4>
                <p className={styles.clincsEndP}>
                  Тастак-3 м-н, Алмалинский район, Алматы, 050009/A05G6F2
                </p>
                <div className={styles.clinicsEndFlexMain}>
                  <div className={styles.clinicsEndFlex}>
                    <h5>пн-пт</h5>
                    <h5>0:00 - 24:00</h5>
                  </div>
                  <div className={styles.clinicsEndFlex}>
                    <h5>сб</h5>
                    <h5>0:00 - 24:00</h5>
                  </div>
                  <div className={styles.clinicsEndFlex}>
                    <h5>вс</h5>
                    <h5>0:00 - 24:00</h5>
                  </div>
                </div>
                <button className={styles.clinicsButton}>
                  Записаться в клинику
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clinics;
