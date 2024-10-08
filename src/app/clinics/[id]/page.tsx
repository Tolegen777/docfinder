"use client";

import dynamic from 'next/dynamic';
import React, {useState} from "react";
import {usePathname} from "next/navigation";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {useStateContext} from "@/contexts";
import {IClinicById} from "@/types/clinicsTypes";
import DoctorDetailsSkeleton from "@/components/shared/skeleton/DoctorDetailsSkeleton";
import styles from './styles.module.scss';
import clsx from "clsx";
import {Empty} from "antd";
import DoctorInformationClinicDoctorDetail
    from "@/components/DoctorInformationClinicDoctorDetail/DoctorInformationClinicDoctorDetail";
import Link from "next/link";

// Динамический импорт компонентов с отключением SSR
const EmirmedSlider = dynamic(() => import('@/components/emirmedSlider/EmirmedSlider'), {ssr: false});
const AboutClinics = dynamic(() => import('@/components/aboutClinics/AboutClinics'), {ssr: false});
const InfoClinics = dynamic(() => import('@/components/infoClinics/InfoClinics'), {ssr: false});
const CustomPagination = dynamic(() => import('@/components/shared/CustomPagination'), {ssr: false});

function ClinicById() {
    const [activeItem, setActiveItem] = useState(0);
    const pathname = usePathname();
    const {state} = useStateContext();
    const {cityId} = state;
    const apiInstance = useCreateAxiosInstance();
    const clinicId = pathname?.split('/')?.[2];
    const [page, setPage] = useState(1);

    const {data, isLoading} = useQuery({
        queryKey: ['clinicById', clinicId, cityId],
        queryFn: () =>
            apiInstance
                .get<IClinicById>(
                    `patients/clinic-branches-in-city/${cityId}/clinic-branch-id/${clinicId}/`
                )
                .then((response) => response.data),
        refetchOnMount: false,
    });

    const currentDoctors = data?.doctors_list?.slice((page - 1) * 10, page * 10);

    if (isLoading) {
        return <DoctorDetailsSkeleton/>;
    }

    return (
        <div className={styles.container}>
            <EmirmedSlider data={data}/>
            <div className={styles.tabs_container}>
                <div className={styles.tabs_wrapper}>
                    {['Врачи', 'О клинике'].map((item, index) => (
                        <div
                            key={item}
                            className={clsx(styles.tabs_wrapper_item, {
                                [styles.tabs_wrapper_item_active]: activeItem === index,
                            })}
                            onClick={() => setActiveItem(index)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <>
                {activeItem === 0 ? (
                    currentDoctors?.length === 0 ? (
                        <Empty description={<>Данных нет...</>}/>
                    ) : (
                        <div className={styles.doctors}>
                            {currentDoctors
                                ?.filter(item => item?.nearest_week_work_schedule?.length > 0)
                                ?.map((item) => (
                                <DoctorInformationClinicDoctorDetail
                                    key={item.doctor_profile_id}
                                    modalFunction={() => {
                                    }}
                                    // @ts-ignore
                                    doctor={item}
                                    type={'proc'}
                                    clinicId={clinicId}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <>
                        <InfoClinics data={data?.list_of_amenities ?? []}/>
                        <AboutClinics description={data?.description ?? ''}/>
                    </>
                )}
                {activeItem === 0 && (
                    <CustomPagination setPage={setPage} totalCount={data?.doctors_list?.length ?? 0}/>
                )}
            </>
        </div>
    );
}

export default ClinicById;
