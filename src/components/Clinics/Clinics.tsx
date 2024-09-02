'use client'
import React, { useState } from "react";
import styles from "./Clinics.module.scss";
import Image from "next/image";
import { IClinics } from "@/types/clinicsTypes";
import { ClinicsSkeleton } from "@/components/shared/skeleton/ClinicsSkeleton";
import { getRussianShortDayOfWeek } from "@/utils/date/getRussianDayOfWeek";
import { formatTime } from "@/utils/date/formatTime";
import ClinicBookingModal from "@/components/Clinic/ClinicBookingModal/ClinicBookingModal";
import { useRouter } from "next/navigation";
import {Empty, Rate} from "antd";

type Props = {
    data: IClinics[];
    isLoading: boolean;
};

const Clinics = ({ data, isLoading }: Props) => {
    const [openBookingModal, setOpenBookingModal] = useState(false);

    const router = useRouter();

    const handleBookClinic = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        setOpenBookingModal(true);
    };

    if (isLoading) {
        return <ClinicsSkeleton />;
    }

    if (data?.length === 0) {
        return <Empty description={<>Данных нет...</>}/>
    }

    return (
        <div>
            <ClinicBookingModal open={openBookingModal} closeModal={() => setOpenBookingModal(false)} />
            {data?.map((item) => (
                <div
                    key={item?.id}
                    className={styles.container}
                    onClick={() => router.push(`/clinics/${item?.id}`)}
                >
                    <div className={styles.about}>
                        <div className={styles.avatar}>
                            <div className={styles.photo}>
                                <Image
                                    src={item?.photo_url}
                                    alt=""
                                    layout="fill"
                                    objectFit="cover"
                                    sizes="100%"
                                />
                            </div>
                            <Rate
                                className={styles.rate}
                                style={{
                                    color: '#ff6200'
                                }}
                                value={item?.rating ?? 0}
                            />
                            <div className={styles.review_title}>{item?.reviews_count} отзвыов</div>
                        </div>
                        <div className={styles.description}>
                            <div className={styles.title}>{item?.franchise_title}</div>
                            {/*<div className={styles.sub_title}>{item?.title}</div>*/}
                            {item?.franchise_title === 'Эмирмед' && <div className={styles.phone_wrapper}>
                                <div className={styles.phone}>{'+7 (707) 000-01-03'}</div>
                                <div className={styles.phone}>{'+7 (727) 355-11-11'}</div>
                                <div className={styles.phone}>{'+7 (747) 000-01-03'}</div>
                            </div>}
                            <div className={styles.desc} dangerouslySetInnerHTML={{__html: item?.description}}/>
                        </div>
                    </div>

                    <div className={styles.time_info}>
                    <div className={styles.title}>{item?.address}</div>
                        <div className={styles.desc}>
                            {item?.address}
                        </div>
                        <div className={styles.times_wrapper}>
                            {item?.working_hours?.map((hour, index) => (
                                <div key={hour?.day_of_week + index} className={styles.times}>
                                    <div>{getRussianShortDayOfWeek(hour?.day_of_week)}</div>
                                    <div>
                                        {formatTime(hour?.open_time)} - {formatTime(hour?.close_time)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className={styles.action} onClick={(e) => handleBookClinic(e)}>
                            Записаться в клинику
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Clinics;
