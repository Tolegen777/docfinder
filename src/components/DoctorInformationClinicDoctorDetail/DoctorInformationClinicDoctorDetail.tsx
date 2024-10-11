"use client";

import React, {useEffect, useState} from "react";
import styles from "./DoctorInformation.module.scss";
import "./CalendarInput.css";
import {ISpecProcDoctor} from "@/types/specProcDoctorsTypes";
import Image from "next/image";
import docImg from "../../public/icons/doctor.svg";
import {getCurrentMonthName} from "@/utils/date/getCurrentMonthName";
import {getCurrentDate} from "@/utils/date/getCurrentDate";
import HeaderModal from "@/components/HeaderModal/HeaderModal";
import ClinicBookingModal from "@/components/Clinic/ClinicBookingModal/ClinicBookingModal";
import DoctorSchedule from "@/components/DcotorSchedule/DoctorSchedule";
import DoctorModal from "@/components/DoctorModal/DoctorModal";

type DoctorInformationProps = {
    modalFunction: () => void;
    doctor: ISpecProcDoctor | undefined;
    type: "spec" | "proc" | "clinic";
    isCheapestPrice?: boolean;
    clinicId?: string;
    isPreventDefault?: boolean
};


const DoctorInformationClinicDoctorDetail = ({
                                                 modalFunction,
                                                 doctor,
                                                 type,
                                                 isCheapestPrice,
                                                 clinicId,
                                                 isPreventDefault
                                             }: DoctorInformationProps) => {

    const currentDate = getCurrentDate();

    const currentMonth = getCurrentMonthName();

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

    const [modal, setModal] = useState(false)

    const [openBookingModal, setOpenBookingModal] = useState(false)

    useEffect(() => {
        if (doctor?.nearest_week_work_schedule) {
            const firstDate = doctor?.nearest_week_work_schedule?.find(item => item)
            if (firstDate?.work_date && firstDate?.work_date !== currentDate) {
                setActiveDate(firstDate?.work_date)
            }
        }

    }, [doctor?.nearest_week_work_schedule])

    const onClose = () => {
        setIsOpenVisitModal(false)
    }


    return (
        <div>
            <HeaderModal setModal={() => setModal(false)} open={modal}/>
            <ClinicBookingModal
                open={openBookingModal}
                closeModal={() => setOpenBookingModal(false)}
            />
            {isOpenVisitModal && <DoctorModal
                // @ts-ignore
                doctorData={doctor}
                onClose={onClose}
                type={type}
                procs={doctor?.doctor_procedures_data ?? []}
                date={activeDate}
                visitTime={activeTime}
                procId={doctor?.doctor_procedure_id ?? null}
                procLabel={doctor?.medical_procedure_title}
                doctorProcData={{
                    id: doctor?.doctor_procedure_id as number,
                    comission_amount: doctor?.doctor_procedure_price?.default_price as number,
                    is_active: !!doctor?.doctor_procedure_price?.is_active,
                    // @ts-ignore
                    price: doctor?.doctor_procedure_price
                }}
                branchId={activeBranchId}
            />
            }
            <section id={styles.doctorInformation}>
                <div className="container">
                    <div className={styles.doctorInformation}>
                            <div className={styles.doctorInformationBlock}>
                                <a href={`/clinics/${clinicId}/doctor/${doctor?.doctor_profile_id}`}
                                   style={{
                                       textDecoration: 'none',
                                       color: 'inherit',
                                       background: 'none',
                                       border: 'none',
                                       outline: 'none',
                                       cursor: clinicId?.length ? 'cursor' : 'auto'
                                   }}
                                   onClick={(event) => {
                                       if (isPreventDefault) {
                                           event.preventDefault()
                                       }
                                   }}
                                >
                                <div
                                    className={styles.doctorInformationBlockMain}
                                >
                                    <div className={styles.doctorInformationImg}>
                                        <div className={styles.doctorInformationPhoto}>
                                            <Image
                                                onClick={modalFunction}
                                                src={doctor?.doctor_photos?.find(item => item)?.photo || docImg}
                                                alt={""}
                                                fill={true}
                                                objectFit={'cover'}
                                                objectPosition="top"
                                            />
                                        </div>
                                        <h4 className={styles.doctorInformationReiting}>
                                            {doctor?.rating?.toFixed(1)}
                                        </h4>
                                        <h5 className={styles.doctorInformationh5}>
                                            {doctor?.reviews_count ?? 0} отзывов
                                        </h5>
                                    </div>
                                    <div className={styles.doctorInformationDecr}>
                                        <h3 className={styles.doctorInformationName}>
                                            {doctor?.doctor_full_name}
                                        </h3>
                                        <h4 className={styles.doctorInformationUrl}>
                                            {type === "spec" && doctor?.medical_speciality_title}
                                            {type === "proc" && doctor?.medical_procedure_title}
                                        </h4>
                                        <h4 className={styles.doctorInformationOpt}>
                                            Стаж {doctor?.experience_years} лет
                                        </h4>
                                        <h5 className={styles.doctorInformationClin}>
                                            {doctor?.doctor_category}
                                        </h5>
                                        <div className={styles.doctorInformationSale}>
                                            <h4 className={styles.doctorInformationPrice}>
                                                {'Цена от: '}
                                                {!!doctor?.cheapest_procedure_data
                                                    ?.discount && <span className={styles.doctorInformationPriceMinus}>
                        {doctor?.cheapest_procedure_data
                            ?.default_price}{" "}
                      </span>}
                                                {doctor?.cheapest_procedure_data
                                                        ?.final_price &&
                                                    `${doctor?.cheapest_procedure_data?.final_price} тг.`}
                                            </h4>
                                            {!!doctor?.cheapest_procedure_data?.discount && (
                                                <h4
                                                    className={styles.doctorInformationMinusPro}
                                                >{`-${doctor?.cheapest_procedure_data?.discount}%`}</h4>
                                            )}
                                        </div>
                                        <h3 className={styles.doctorInformationEm}>
                                            {doctor?.franchise_employee}
                                        </h3>
                                        <p className={styles.doctorInformationMap}>
                                            {doctor?.current_clinic_branch_address}
                                        </p>
                                        {/*<h6 className={styles.doctorInformationMapH6}>*/}
                                        {/*    {doctor?.current_clinic_branch_title}*/}
                                        {/*</h6>*/}
                                        {/*<h6 className={styles.doctorInformationMapH6}>На карте</h6>*/}
                                    </div>
                                </div>
                        </a>

                                <div className={styles.doctorInformationDate}>
                                    <DoctorSchedule
                                        type={type}
                                        setOpenBookingModal={setOpenBookingModal}
                                        activeDate={activeDate}
                                        newNearestWeekWorkSchedule={doctor?.new_nearest_week_work_schedule ?? []}
                                        setActiveBranchId={setActiveBranchId}
                                        setActiveDate={setActiveDate}
                                        setIsOpenVisitModal={setIsOpenVisitModal}
                                        setActiveTime={setActiveTime}
                                        month={currentMonth}
                                    />
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DoctorInformationClinicDoctorDetail;
