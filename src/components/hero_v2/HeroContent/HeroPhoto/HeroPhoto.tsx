import React from 'react';
import styles from './styles.module.scss'
import Image from "next/image";
import doctorPng from "@/public/posters/doctor2.jpg";

export const HeroPhoto = () => {
    return (
        <div className={styles.heroImgs}>
            {["heroImg3", "heroImg1", "heroImg2"].map((imgClass, index) => (
                <Image
                    key={index}
                    className={styles[imgClass]}
                    src={doctorPng}
                    alt=""
                    width={350}
                    quality={100}
                />
            ))}
        </div>
    );
};
