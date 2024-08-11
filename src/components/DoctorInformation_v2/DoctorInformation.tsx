"use client";

import React, {useEffect, useState} from "react";
import styles from "./DoctorInformation.module.scss";
import "./CalendarInput.css";
import Image from "next/image";
import docImg from "../../public/icons/doctor.svg";
import {getCurrentMonthName} from "@/utils/date/getCurrentMonthName";
import {getCurrentDate} from "@/utils/date/getCurrentDate";
import HeaderModal from "@/components/HeaderModal/HeaderModal";
import ClinicBookingModal from "@/components/Clinic/ClinicBookingModal/ClinicBookingModal";
import {DoctorsList} from "@/types/clinicsTypes";
import DoctorSchedule from "@/components/DcotorSchedule_v2/DoctorSchedule";

type DoctorInformationProps = {
    modalFunction: () => void;
    doctor: DoctorsList | undefined;
    isPreventRedirect?: boolean;
};


const DoctorInformation = ({
                               modalFunction,
                               doctor,
                               isPreventRedirect = false,
                           }: DoctorInformationProps) => {
    const currentDate = getCurrentDate();

    const currentMonth = getCurrentMonthName();

    const [activeDate, setActiveDate] = useState(currentDate);

    const [modal, setModal] = useState(false)

    const [openBookingModal, setOpenBookingModal] = useState(false)

    useEffect(() => {
        if (doctor?.nearest_week_work_schedule) {
            const firstDate = doctor?.nearest_week_work_schedule?.find(item => item)?.doctor_work_schedule_detailed_api_view
            if (firstDate?.work_date && firstDate?.work_date !== currentDate) {
                setActiveDate(firstDate?.work_date)
            }
        }

    }, [doctor?.nearest_week_work_schedule])


    return (
        <div>
            <ClinicBookingModal
                open={openBookingModal}
                closeModal={() => setOpenBookingModal(false)}
            />
            <HeaderModal setModal={() => setModal(false)} open={modal}/>
            <section id={styles.doctorInformation}>
                <div className="container">
                    <div className={styles.doctorInformation}>
                        <div className={styles.doctorInformationBlock}>
                            <div
                                className={styles.doctorInformationBlockMain}
                                style={{cursor: !isPreventRedirect ? 'pointer' : undefined}}
                            >
                                <div className={styles.doctorInformationImg}>
                                    <Image
                                        onClick={modalFunction}
                                        className={styles.doctorInformationPhoto}
                                        src={doctor?.photos_list?.find(item => item)?.photo || docImg}
                                        alt={""}
                                        width={100}
                                        height={100}
                                    />
                                    <h4 className={styles.doctorInformationReiting}>
                                        {doctor?.rating?.toFixed(1)}
                                    </h4>
                                    <h5 className={styles.doctorInformationh5}>
                                        {doctor?.reviews_count ?? 0} отзывов
                                    </h5>
                                </div>
                                <div className={styles.doctorInformationDecr}>
                                    <h3 className={styles.doctorInformationName}>
                                        {doctor?.full_name}
                                    </h3>
                                    <h4 className={styles.doctorInformationOpt}>
                                        Стаж {doctor?.experience_years} лет
                                    </h4>
                                    <div className={styles.doctorInformationSale}>
                                        <h4 className={styles.doctorInformationPrice}>
                      <span className={styles.doctorInformationPriceMinus}>
                      </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.doctorInformationDate}>
                                <DoctorSchedule
                                    setOpenBookingModal={setOpenBookingModal}
                                    activeDate={activeDate}
                                    weeks={doctor?.nearest_week_work_schedule ?? []}
                                    setActiveDate={setActiveDate}
                                    month={currentMonth}
                                    workingHours={doctor?.nearest_week_work_schedule
                                        ?.find((item) => item?.doctor_work_schedule_detailed_api_view?.work_date === activeDate)
                                        ?.doctor_work_schedule_detailed_api_view?.working_hours_list ?? []}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DoctorInformation;
