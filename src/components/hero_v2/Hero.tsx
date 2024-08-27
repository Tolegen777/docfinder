"use client";
import styles from "./Hero.module.scss";
import {useEffect, useState} from "react";
import {useStateContext} from "@/contexts";
import HeroContent from "@/components/hero_v2/HeroContent/HeroContent";
import {CityModal} from "@/components/CityModal/CityModal";

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
        <>
            {open && <CityModal open={open} onClose={() => setOpen(false)}/>}
            <div className={styles.container}>
                <HeroContent/>
            </div>
        </>
    );
}

export default Hero;
