"use client";
import dynamic from 'next/dynamic';
import styles from "./Hero.module.scss";
import { useEffect, useState } from "react";
import { useStateContext } from "@/contexts";

// Динамический импорт вложенных компонентов с отключением SSR
const HeroContent = dynamic(() => import('@/components/hero_v2/HeroContent/HeroContent'));
const CityModal = dynamic(() => import('@/components/CityModal/CityModal'), { ssr: false });

function Hero() {
    const [open, setOpen] = useState(false);
    const { state } = useStateContext();
    const { cityId } = state;

    useEffect(() => {
        if (!cityId.length) {
            setOpen(true);
        }
    }, [cityId]); // Добавьте cityId как зависимость

    return (
        <>
            {open && <CityModal open={open} onClose={() => setOpen(false)} />}
            <div className={styles.container}>
                <HeroContent />
            </div>
        </>
    );
}

export default Hero;
