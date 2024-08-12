"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import styles from "./Hero.module.scss";
import "./hero.css";
import {useEffect, useState} from "react";
import {CityModal} from "@/components/CityModal/CityModal";
import {useStateContext} from "@/contexts";
import doctorPng from '../../public/posters/doctor.png'
import Image from "next/image";

const HeroContent = () => (
    <div className="container">
        <div className={styles.hero}>
            <div className={styles.heroText}>
                <h2 className={styles.heroTexth2}>Врачи которым вы доверяете </h2>
                <h4 className={styles.heroTexth4}>Средний стаж от 7 лет</h4>
                <p className={styles.heroTextP}>
                    Наша команда – это высококвалифицированные специалисты с проверенным опытом. Мы гордимся тем, что
                    наши врачи имеют средний стаж работы более 7 лет, что гарантирует вам лучшее медицинское
                    обслуживание.
                </p>
                <div className={styles.heroTextInput}>
                    <input
                        className={styles.heroTextInputMain}
                        type="text"
                        placeholder="Врачи, Услуги, Клиники"
                    />
                    <button className={styles.heroTextButton}>Найти</button>
                </div>
            </div>
            <div className={styles.heroImgs}>
                {["heroImg3", "heroImg1", "heroImg2"].map((imgClass, index) => (
                    <Image
                        key={index}
                        className={styles[imgClass]}
                        src={doctorPng}
                        alt=""
                        width={406}
                        quality={100}
                        unoptimized={true}
                    />
                ))}
            </div>
        </div>
    </div>
);

function Hero() {

    const [open, setOpen] = useState(false)

    const {state} = useStateContext()

    const {cityId} = state

    useEffect(() => {
        if (!cityId.length) {
            setOpen(true)
        }
    }, [])

    return (
        <div>
            {open && <CityModal open={open} onClose={() => setOpen(false)}/>}
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                className={styles.moduleScss}
                slidesPerView={1}
                navigation
                onSlideChange={() => console.log("slide change")}
            >
                {[...Array(3)].map((_, index) => (
                    <SwiperSlide key={index}>
                        <section id={styles.hero}>
                            <HeroContent/>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Hero;
