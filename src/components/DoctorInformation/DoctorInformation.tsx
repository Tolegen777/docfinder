"use client";

import React, { useState } from "react";
import styles from "./DoctorInformation.module.scss";
import "./CalendarInput.css";
import { ISpecProcDoctor } from "@/types/specProcDoctorsTypes";
import Image from "next/image";
import docImg from "../../public/icons/doctor.svg";
import { getCurrentMonthName } from "@/utils/date/getCurrentMonthName";
import { getCurrentDate } from "@/utils/date/getCurrentDate";
import { getWeekDay } from "@/utils/date/getWeekDay";
import { formatTime } from "@/utils/date/formatTime";
import clsx from "clsx";
import { getDayOfMonth } from "@/utils/date/getDayOfMonth";
import { useRouter } from "next/navigation";

type DoctorInformationProps = {
  modalFunction: () => void;
  doctor: ISpecProcDoctor | undefined;
  specId: string;
  type: "spec" | "proc";
  isPreventRedirect?: boolean;
};

const DoctorInformation = ({
  modalFunction,
  doctor,
  specId,
  type,
  isPreventRedirect = false,
}: DoctorInformationProps) => {
  const router = useRouter();

  const currentDate = getCurrentDate();

  const [activeDate, setActiveDate] = useState(currentDate);

  const currentMonth = getCurrentMonthName();

  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleGoToDoctorsPage = () => {
    if (!isPreventRedirect) {
      if (type === "spec") {
        router.push(
          `/specialities/${specId}/doctor/${doctor?.doctor_speciality_id}`
        );
      } else {
        router.push(
          `/procedures/${specId}/doctor/${doctor?.doctor_procedure_id}`
        );
      }
    }
  };

  const dateSchedule = [
    { number: 10, ned: "пн" },
    { number: 11, ned: "вт" },
    { number: 12, ned: "ср" },
    { number: 13, ned: "чт" },
    { number: 14, ned: "пт" },
    { number: 14, ned: "пт" },
    { number: 14, ned: "пт" },
  ];

  const dataClock = [
    { clock: "11:30" },
    { clock: "12:30" },
    { clock: "13:30" },
    { clock: "14:30" },
    { clock: "15:30" },
    { clock: "11:30" },
    { clock: "11:30" },
    { clock: "11:30" },
    { clock: "12:30" },
    { clock: "13:30" },
    { clock: "14:30" },
    { clock: "15:30" },
    { clock: "11:30" },
    { clock: "12:30" },
    { clock: "13:30" },
    { clock: "14:30" },
    { clock: "15:30" },
  ];

  return (
    <div>
      <section id={styles.doctorInformation}>
        <div className="container">
          <div className={styles.doctorInformation}>
            <div className={styles.doctorInformationBlock}>
              <div
                className={styles.doctorInformationBlockMain}
                onClick={handleGoToDoctorsPage}
              >
                <div className={styles.doctorInformationImg}>
                  <Image
                    onClick={modalFunction}
                    className={styles.doctorInformationPhoto}
                    src={docImg}
                    alt={""}
                    width={50}
                    height={50}
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
                    {doctor?.doctor_full_name}
                  </h3>
                  <h4 className={styles.doctorInformationUrl}>
                    {type === "spec"
                      ? doctor?.medical_speciality_title
                      : doctor?.medical_procedure_title}
                  </h4>
                  <h4 className={styles.doctorInformationOpt}>
                    Стаж {doctor?.experience_years} лет
                  </h4>
                  <h5 className={styles.doctorInformationClin}>
                    {doctor?.doctor_category}
                  </h5>
                  <div className={styles.doctorInformationSale}>
                    <h4 className={styles.doctorInformationPrice}>
                      <span className={styles.doctorInformationPriceMinus}>
                        {doctor?.doctor_procedure_consultation_price
                          ?.default_price &&
                          doctor?.doctor_procedure_consultation_price
                            ?.default_price}{" "}
                      </span>
                      {doctor?.doctor_procedure_consultation_price
                        ?.final_price &&
                        `${doctor?.doctor_procedure_consultation_price?.final_price} тг.`}
                    </h4>
                    {doctor?.doctor_procedure_consultation_price?.discount && (
                      <h4
                        className={styles.doctorInformationMinusPro}
                      >{`-${doctor?.doctor_procedure_consultation_price?.discount}%`}</h4>
                    )}
                  </div>
                  <h3 className={styles.doctorInformationEm}>
                    {doctor?.franchise_employee}
                  </h3>
                  <p className={styles.doctorInformationMap}>
                    {doctor?.current_clinic_branch_address}
                  </p>
                  <h6 className={styles.doctorInformationMapH6}>
                    {doctor?.current_clinic_branch_title}
                  </h6>
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
                </div>{" "}
                <div className={styles.doctorInformationWeeks}>
                  {/* {doctor?.nearest_week_work_schedule?.map((el, key) => (
                    <div
                      className={clsx({
                        [styles.doctorInformationWeeksMonth]: true,
                        [styles.doctorInformationWeeksMonth_active]:
                          el?.work_date === activeDate,
                      })}
                      key={key}
                      onClick={() => setActiveDate(el?.work_date)}
                    >
                      <h3 className={styles.doctorInformationWeeksElH3}>
                        {getWeekDay(el?.work_date)}
                      </h3>
                      ddjj
                      <h5 className={styles.doctorInformationWeeksElH5}>
                        {getDayOfMonth(el?.work_date)}
                      </h5>
                    </div>
                  ))} */}
                  {dateSchedule.map((el, key) => (
                    <div
                      className={styles.doctorInformationWeeksMonth}
                      key={key}
                    >
                      <h3 className={styles.doctorInformationWeeksElH3}>
                        {el.number}
                      </h3>
                      <h5 className={styles.doctorInformationWeeksElH5}>
                        {el.ned}
                      </h5>
                    </div>
                  ))}
                </div>
                <div className={styles.doctorInformationClock}>
                  {/* {doctor?.nearest_week_work_schedule
                    ?.find((item) => item?.work_date === activeDate)
                    ?.working_hours?.map((el, key) => (
                      <h4 className={styles.doctorInformationClockH4} key={key}>
                        {formatTime(el?.start_time)}
                      </h4>
                    ))} */}
                  {dataClock
                    .slice(0, showAll ? dataClock.length : 15)
                    .map((el, key) => (
                      <h4 className={styles.doctorInformationClockH4} key={key}>
                        {el.clock}
                      </h4>
                    ))}
                </div>
                {dataClock.length > 15 ? (
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
