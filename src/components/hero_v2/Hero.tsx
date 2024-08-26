"use client";
import styles from "./Hero.module.scss";
import {useEffect, useState} from "react";
import {useStateContext} from "@/contexts";
import HeroContent from "@/components/hero_v2/HeroContent/HeroContent";

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
        <div className={styles.container}>
            <HeroContent/>
        </div>
    );
}

export default Hero;
