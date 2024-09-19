import React from 'react';
import styles from './styles.module.scss'
import {HeroPhoto} from "@/components/hero_v2/HeroContent/HeroPhoto/HeroPhoto";

const HeroContent = () => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h2 className={styles.title}>Врачи которым вы доверяете </h2>
                <h4 className={styles.subTitle}>Средний стаж от 15 лет</h4>
                <p className={styles.description}>
                    Наша команда – это высококвалифицированные специалисты с проверенным опытом. Мы гордимся тем, что
                    наши врачи имеют средний стаж работы более 15 лет, что гарантирует вам лучшее медицинское
                    обслуживание.
                </p>
            </div>
            <HeroPhoto/>
        </div>
    );
};

export default HeroContent;
