'use client';
import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

type PropsType = {
    backgroundImg: string;
};
export default function BannerItem({
                                       backgroundImg,
                                   }: PropsType) {

    return (
        <>
            <div className={styles.itemContainer}>
                <Image
                    src={backgroundImg}
                    fill
                    objectFit={'cover'}
                    alt=""
                    quality={100}
                    objectPosition={'center'}
                />
            </div>
        </>
    );
}
