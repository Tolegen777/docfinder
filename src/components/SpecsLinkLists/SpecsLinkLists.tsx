'use client'
import React from 'react';
import styles from './styles.module.scss'
import {TransformedData} from "@/utils/transformSpecData";
import {SpecProcsSkeleton} from "../shared/skeleton/SpecProcsSkeleton";
import {useRouter} from "next/navigation";

type Props = {
    formattedData: TransformedData[];
    isLoading: boolean
}

const SpecsLinkLists = ({formattedData, isLoading}: Props) => {

    const router = useRouter()

    const handleClickSpec = (id: number) => {
        router.push(`/specialities/${id}`)
    }

    if (isLoading) {
        return <SpecProcsSkeleton/>
    }

    return (
        <div className={styles.dostors}>
            <div className={styles.cards}>
                {formattedData?.map((item) => (
                    <div key={item.letter} className={styles.specialties}>
                        <h2 className={styles.letter}>{item.letter}</h2>
                        <ul>
                            {item?.items.map((el) => (
                                <li
                                    key={el.medical_speciality_id}
                                    className={styles.speciality}
                                    onClick={() => handleClickSpec(el?.medical_speciality_id)}
                                >
                                    {el.medical_speciality_title}
                                    <span className={styles.quantity}>{el.doctor_profiles_count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecsLinkLists;
