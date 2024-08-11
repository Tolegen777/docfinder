"use client";

import React, {useState} from "react";
import {usePathname} from "next/navigation";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {useStateContext} from "@/contexts";
import {IClinicById} from "@/types/clinicsTypes";
import {DoctorDetailsSkeleton} from "@/components/shared/skeleton/DoctorDetailsSkeleton";
import EmirmedSlider from "@/components/emirmedSlider/EmirmedSlider";
import AboutClinics from "@/components/aboutClinics/AboutClinics";
import InfoClinics from "@/components/infoClinics/InfoClinics";
import DoctorInformation from "@/components/DoctorInformation_v2/DoctorInformation";
import CustomPagination from "@/components/shared/CustomPagination";
import styles from './styles.module.scss'
import clsx from "clsx";
import {Empty} from "antd";

function ClinicById() {
    const [activeItem, setActiveItem] = useState(1);

    const pathname = usePathname()

    const {state} = useStateContext()

    const {cityId} = state

    const apiInstance = useCreateAxiosInstance();

    const clinicId = pathname?.split('/')?.[2]

    const [page, setPage] = useState(1)

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
        return <DoctorDetailsSkeleton/>
    }


    return (
        <div className={styles.container}>
            <EmirmedSlider data={data}/>
            <div
                className={styles.tabs_wrapper}
            >
                {['Врачи', 'О клинике'].map((item, index) => <div
                    key={item}
                    className={clsx({
                        [styles.tabs_wrapper_item]: true,
                        [styles.tabs_wrapper_item_active]: activeItem === index,

                    })}
                    onClick={() => setActiveItem(index)}

                >
                    {item}
                </div>)}
            </div>
            <>
                {activeItem === 0 ? currentDoctors?.length === 0 ?
                    <Empty description={<>Данных нет...</>}/> : <div className={styles.doctors}>
                        {currentDoctors?.map(item => <DoctorInformation
                                key={item?.id}
                                modalFunction={() => {
                                }}
                                // @ts-ignore
                                doctor={item}
                            />
                        )}
                    </div> : <>
                    <InfoClinics data={data?.list_of_amenities ?? []}/>
                    <AboutClinics description={data?.description ?? ''}/>
                </>}
                {activeItem == 0 && <CustomPagination setPage={setPage} totalCount={data?.doctors_list?.length ?? 0}/>}
            </>
        </div>
    );
}

export default ClinicById;
