'use client'
import React, { useState } from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";
import { getWeekDay } from "@/utils/date/getWeekDay";
import { getDayOfMonth } from "@/utils/date/getDayOfMonth";
import { Button, Tabs } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { NewNearestWeekWorkSchedule, WorkingHour } from "@/types/specProcDoctorsTypes";
import { formatTime } from "@/utils/date/formatTime";
import { useStateContext } from "@/contexts";
import HeaderModal from "@/components/HeaderModal/HeaderModal";

type Props = {
    month: string,
    newNearestWeekWorkSchedule: NewNearestWeekWorkSchedule[],
    activeDate: string,
    setActiveDate: (date: string) => void,
    setActiveTime: (time: { id: number | null, time: string }) => void,
    setOpenBookingModal: (flag: boolean) => void,
    setIsOpenVisitModal: (flag: boolean) => void,
    setActiveBranchId: (id: number | null) => void,
    type: "spec" | "proc" | "clinic",
}

const DoctorSchedule = ({
                            month,
                            newNearestWeekWorkSchedule,
                            activeDate,
                            setActiveDate,
                            setOpenBookingModal,
                            setActiveTime,
                            setIsOpenVisitModal,
                            setActiveBranchId,
                            type
                        }: Props) => {

    const { state } = useStateContext();
    const [showAllTimeSlots, setShowAllTimeSlots] = useState(false);
    const [modal, setModal] = useState(false);

    const handleOpenVisits = (time: { id: number | null, time: string }) => {
        if (!state.authUser) {
            setModal(true);
        } else {
            if (type === 'clinic') {
                setOpenBookingModal(true);
            } else {
                setIsOpenVisitModal(true);
                setActiveTime(time);
            }
        }
    };

    return (
        <>
            <HeaderModal setModal={() => setModal(false)} open={modal} />
            <div className={styles.scheduleContainer}
                 onClick={(event) => {
                     event?.stopPropagation()
                     event.preventDefault()
                 }}>
                <div className={styles.month}>{month}</div>
                <Tabs type="card">
                    {newNearestWeekWorkSchedule.map((clinic, index) => (
                        <Tabs.TabPane tab={clinic.clinic_branch} key={index}>
                            <div className={styles.daysContainer}>
                                {clinic.schedules.map(day => (
                                    <div
                                        className={clsx({
                                            [styles.day]: true,
                                            [styles.day_active]: day.work_date === activeDate,
                                        })}
                                        key={day.work_date}
                                        onClick={() => setActiveDate(day.work_date)}
                                    >
                                        <h3 className={styles.day_title}>
                                            {getDayOfMonth(day.work_date)}
                                        </h3>
                                        <h5 className={styles.day_sub_title}>
                                            {getWeekDay(day.work_date)}
                                        </h5>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.timeSlotsContainer}>
                                <div className={`${styles.timeSlots} ${showAllTimeSlots ? styles.showAll : ''}`}>
                                    {clinic?.schedules && clinic?.schedules
                                        ?.find(item => item?.work_date === activeDate)?.working_hours
                                        ?.map((el, index) => (
                                        <div
                                            key={index}
                                            className={styles.timeSlot}
                                            onClick={() => {
                                                handleOpenVisits({ id: el.start_time_id, time: el.start_time });
                                                setActiveBranchId(clinic.clinic_branch_id);
                                            }}
                                        >
                                            {formatTime(el.start_time)}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.action}>
                                    <Button
                                        type="text"
                                        icon={showAllTimeSlots ? <UpOutlined /> : <DownOutlined />}
                                        onClick={() => setShowAllTimeSlots(prevState => !prevState)}
                                        style={{ color: '#459BFF' }}
                                    >
                                        {showAllTimeSlots ? 'Скрыть' : 'Показать еще'}
                                    </Button>
                                </div>
                            </div>
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </div>
        </>
    );
};

export default DoctorSchedule;
