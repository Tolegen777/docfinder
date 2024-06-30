import styles from './styles.module.scss';
import React from 'react';
import {CustomSkeleton} from "@/components/shared/skeleton/CustomSkeleton";

export const SpecProcsSkeleton = () => {
    const arr = Array.from({length: 30}, (_, i) => i + 1); // создаем массив длиной 5, заполненный значениями [1, 2, 3, 4, 5]


    return (
        <div className={styles.container}>
            {arr.map(item => <CustomSkeleton key={item} height={50} width={100} borderRadius={4}/>)}
        </div>
    );
};
