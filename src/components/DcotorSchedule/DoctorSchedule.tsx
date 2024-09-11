'use client'
import React, {useState} from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";
import {getWeekDay} from "@/utils/date/getWeekDay";
import {getDayOfMonth} from "@/utils/date/getDayOfMonth";
import {Button} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {NearestWeekWorkSchedule, WorkingHour} from "@/types/specProcDoctorsTypes";
import {formatTime} from "@/utils/date/formatTime";
import {useStateContext} from "@/contexts";

type Props = {
    month: string,
    weeks: NearestWeekWorkSchedule[],
    workingHours: WorkingHour[],
    activeDate: string,
    setActiveDate: (date: string) => void
    setActiveTime: (date: { id: number | null, time: string }) => void
    setOpenBookingModal: (flag: boolean) => void
    setIsOpenVisitModal: (flag: boolean) => void
    setActiveBranchId: (flag: number | null) => void
    type: "spec" | "proc" | "clinic";
    isClinic?: boolean

}

const DoctorSchedule = ({
                            month,
                            weeks,
                            workingHours,
                            activeDate,
                            setActiveDate,
                            setOpenBookingModal,
                            setActiveTime,
                            setIsOpenVisitModal,
                            setActiveBranchId,
                            type,
                            isClinic
                        }: Props) => {

    const {state} = useStateContext()

    const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);

    const handleOpenVisits = (time: {
        id: number | null,
        time: string
    }) => {
        if (isClinic) {
            setOpenBookingModal(true)
            return
        }

        if (!state.authUser) {
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

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.month}>{month}</div>
            <div className={styles.daysContainer}>
                {weeks?.map(day => (
                    <div
                        className={clsx({
                            [styles.day]: true,
                            [styles.day_active]:
                            day?.work_date === activeDate,
                        })}
                        key={day?.work_date}
                        onClick={() => {
                            setActiveDate(day?.work_date)
                        }}
                    >
                        <h3 className={styles.day_title}>
                            {getDayOfMonth(day?.work_date)}
                        </h3>
                        <h5 className={styles.day_sub_title}>
                            {getWeekDay(day?.work_date)}
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
                                handleOpenVisits({
                                    id: el?.start_time_id,
                                    time: el?.start_time
                                })


                                // @ts-ignore
                                const item = weeks?.find(item => item)?.clinic_branch_id

                                setActiveBranchId(item ?? null)
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
