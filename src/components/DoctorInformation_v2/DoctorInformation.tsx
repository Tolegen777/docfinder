"use client";

import React, {useEffect, useState} from "react";
import styles from "./DoctorInformation.module.scss";
import "./CalendarInput.css";
import {ISpecProcDoctor} from "@/types/specProcDoctorsTypes";
import Image from "next/image";
import docImg from "../../public/icons/doctor.svg";
import {getCurrentMonthName} from "@/utils/date/getCurrentMonthName";
import {getCurrentDate} from "@/utils/date/getCurrentDate";
import {getWeekDay} from "@/utils/date/getWeekDay";
import {formatTime} from "@/utils/date/formatTime";
import clsx from "clsx";
import {getDayOfMonth} from "@/utils/date/getDayOfMonth";
import {useRouter} from "next/navigation";
import DoctorModal from "@/components/DoctorModal/DoctorModal";
import HeaderModal from "@/components/HeaderModal/HeaderModal";
import {useStateContext} from "@/contexts";
import ClinicBookingModal from "@/components/Clinic/ClinicBookingModal/ClinicBookingModal";
import {DoctorsList} from "@/types/clinicsTypes";

type DoctorInformationProps = {
    modalFunction: () => void;
    doctor: DoctorsList | undefined;
    specId: string;
    type: "spec" | "proc" | "clinic";
    isPreventRedirect?: boolean;
};

// @ts-ignore
const DoctorInformation = ({
                               modalFunction,
                               doctor,
                               specId,
                               type,
                               isPreventRedirect = false,
                           }: DoctorInformationProps) => {
    const router = useRouter();

    const currentDate = getCurrentDate();

    const currentMonth = getCurrentMonthName();

    const {state} = useStateContext()

    const [activeDate, setActiveDate] = useState(currentDate);

    const [activeBranchId, setActiveBranchId] = useState<number | null>(null);

    const [activeTime, setActiveTime] = useState<{
        id: number | null,
        time: string
    }>({
        id: null,
        time: ''
    });

    const [isOpenVisitModal, setIsOpenVisitModal] = useState(false)

    const [showAll, setShowAll] = useState(false);

    const [modal, setModal] = useState(false)

    const [openBookingModal, setOpenBookingModal] = useState(false)

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const handleOpenVisits = (time: {
        id: number | null,
        time: string
    }) => {
        if (!state.authUser) {
            // setModal(true)
            setOpenBookingModal(true)
        } else {
            if (type === 'clinic') {
                setOpenBookingModal(true)
            } else {
                setIsOpenVisitModal(true)
                setActiveTime(time)
            }
        }

    }

    const onClose = () => {
        setIsOpenVisitModal(false)
    }

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
                                    {/*<h4 className={styles.doctorInformationUrl}>*/}
                                    {/*    {type === "spec" && doctor?.medical_speciality_title}*/}
                                    {/*    {type === "proc" && doctor?.medical_procedure_title}*/}
                                    {/*</h4>*/}
                                    <h4 className={styles.doctorInformationOpt}>
                                        Стаж {doctor?.experience_years} лет
                                    </h4>
                                    {/*<h5 className={styles.doctorInformationClin}>*/}
                                    {/*    {doctor?.doctor_category}*/}
                                    {/*</h5>*/}
                                    <div className={styles.doctorInformationSale}>
                                        <h4 className={styles.doctorInformationPrice}>
                      <span className={styles.doctorInformationPriceMinus}>
                        {/*{doctor?.doctor_procedure_consultation_price*/}
                        {/*        ?.default_price &&*/}
                        {/*    doctor?.doctor_procedure_consultation_price*/}
                        {/*        ?.default_price}{" "}*/}
                      </span>
                                            {/*{doctor?.doctor_procedure_consultation_price*/}
                                            {/*        ?.final_price &&*/}
                                            {/*    `${doctor?.doctor_procedure_consultation_price?.final_price} тг.`}*/}
                                        </h4>
                                        {/*{doctor?.doctor_procedure_consultation_price?.discount && (*/}
                                        {/*    <h4*/}
                                        {/*        className={styles.doctorInformationMinusPro}*/}
                                        {/*    >{`-${doctor?.doctor_procedure_consultation_price?.discount}%`}</h4>*/}
                                        {/*)}*/}
                                    </div>
                                    {/*<h3 className={styles.doctorInformationEm}>*/}
                                    {/*    {doctor?.franchise_employee}*/}
                                    {/*</h3>*/}
                                    {/*<p className={styles.doctorInformationMap}>*/}
                                    {/*    {doctor?.current_clinic_branch_address}*/}
                                    {/*</p>*/}
                                    {/*<h6 className={styles.doctorInformationMapH6}>*/}
                                    {/*    {doctor?.current_clinic_branch_title}*/}
                                    {/*</h6>*/}
                                    {/*<h6 className={styles.doctorInformationMapH6}>На карте</h6>*/}
                                </div>
                            </div>

                            <div className={styles.doctorInformationDate}>
                                <div className={styles.doctorInformationMonths}>
                                    {/*<h4 className={styles.doctorInformationMonthAp}>Апрель</h4>*/}
                                    <div className="mianClock">
                                        {/*<MonthCalendar date={currentDate}/>*/}
                                    </div>
                                    <h4 className={styles.doctorInformationMonthsIn}>
                                        {currentMonth}
                                    </h4>
                                </div>
                                {" "}
                                <div className={styles.doctorInformationWeeks}>
                                    {doctor?.nearest_week_work_schedule?.map((item, key) => (
                                        <div
                                            className={clsx({
                                                [styles.doctorInformationWeeksMonth]: true,
                                                [styles.doctorInformationWeeksMonth_active]:
                                                item?.doctor_work_schedule_detailed_api_view?.work_date === activeDate,
                                            })}
                                            key={key}
                                            onClick={() => {
                                                setActiveDate(item?.doctor_work_schedule_detailed_api_view?.work_date)
                                            }}
                                        >
                                            <h3 className={styles.doctorInformationWeeksElH3}>
                                                {getWeekDay(item?.doctor_work_schedule_detailed_api_view?.work_date)}
                                            </h3>
                                            <h5 className={styles.doctorInformationWeeksElH5}>
                                                {getDayOfMonth(item?.doctor_work_schedule_detailed_api_view?.work_date)}
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.doctorInformationClock}>
                                    {doctor?.nearest_week_work_schedule
                                        ?.find((item) => item?.doctor_work_schedule_detailed_api_view?.work_date === activeDate)?.doctor_work_schedule_detailed_api_view?.working_hours_list
                                        ?.slice(0, showAll ? doctor?.nearest_week_work_schedule?.length : 15)
                                        ?.map((el, key) => (
                                            <h4
                                                className={styles.doctorInformationClockH4}
                                                key={key}
                                                onClick={() => {
                                                    handleOpenVisits({
                                                        id: el?.time_slot_id,
                                                        time: el?.start_time
                                                    })

                                                    // @ts-ignore
                                                    const item = doctor?.nearest_week_work_schedule?.find(item => item)?.clinic_branch_id

                                                    setActiveBranchId(item)
                                                }}
                                            >
                                                {formatTime(el?.start_time)}
                                            </h4>
                                        ))}
                                </div>
                                {doctor?.nearest_week_work_schedule && doctor?.nearest_week_work_schedule?.length > 15 ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <button
                                            onClick={toggleShowAll}
                                            className={styles.showAllButton}
                                        >
                                            {showAll ? "Скрыть" : "Показать еще"}
                                        </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DoctorInformation;
