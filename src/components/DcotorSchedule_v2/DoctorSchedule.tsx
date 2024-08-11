'use client'
import React, {useState} from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";
import {getWeekDay} from "@/utils/date/getWeekDay";
import {getDayOfMonth} from "@/utils/date/getDayOfMonth";
import {Button} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {formatTime} from "@/utils/date/formatTime";
import {NearestWeekWorkSchedule2, WorkingHoursList2} from "@/types/clinicsTypes";

type Props = {
    month: string,
    weeks: NearestWeekWorkSchedule2[],
    workingHours: WorkingHoursList2[],
    activeDate: string,
    setActiveDate: (date: string) => void
    setOpenBookingModal: (flag: boolean) => void
}

const DoctorSchedule = ({
                            month,
                            weeks,
                            workingHours,
                            activeDate,
                            setActiveDate,
                            setOpenBookingModal
                        }: Props) => {

    const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);

    const handleOpenVisits = () => {
        setOpenBookingModal(true)

    }

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.month}>{month}</div>
            <div className={styles.daysContainer}>
                {weeks?.map(day => (
                    <div
                        className={clsx({
                            [styles.day]: true,
                            [styles.day_active]:
                            day?.doctor_work_schedule_detailed_api_view?.work_date === activeDate,
                        })}
                        key={day?.doctor_work_schedule_detailed_api_view?.work_date}
                        onClick={() => {
                            setActiveDate(day?.doctor_work_schedule_detailed_api_view?.work_date)
                        }}
                    >
                        <h3 className={styles.day_title}>
                            {getDayOfMonth(day?.doctor_work_schedule_detailed_api_view?.work_date)}
                        </h3>
                        <h5 className={styles.day_sub_title}>
                            {getWeekDay(day?.doctor_work_schedule_detailed_api_view?.work_date)}
                        </h5>
                    </div>
                ))}
            </div>
            <div className={styles.timeSlotsContainer}>
                <div className={`${styles.timeSlots} ${showAllTimeSlots ? styles.showAll : ''}`}>
                    {workingHours?.map((el, index) => (
                        <div
                            key={index}
                            className={styles.timeSlot}
                            onClick={() => {
                                handleOpenVisits()
                            }}
                        >
                            {formatTime(el?.start_time)}
                        </div>
                    ))}
                </div>
                <div className={styles.action}>
                    <Button
                        type={'text'}
                        icon={showAllTimeSlots ? <UpOutlined/> : <DownOutlined/>}
                        onClick={() => setShowAllTimeSlots(prevState => !prevState)}
                        style={{color: '#459BFF'}}
                    >
                        {showAllTimeSlots ? 'Скрыть' : 'Показать еще'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DoctorSchedule;
