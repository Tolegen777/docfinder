"use client";

import dynamic from 'next/dynamic';
import React, {useState} from "react";
import {usePathname} from "next/navigation";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {ISpecDoctorDetailTypes} from "@/types/specDoctorDetailTypes";
import DoctorInformationClinicDoctorDetail
    from "@/components/DoctorInformationClinicDoctorDetail/DoctorInformationClinicDoctorDetail";

// Динамический импорт компонентов с отключением SSR
const Specializations = dynamic(() => import('@/components/Specializations/Specializations'), { ssr: false });
const DoctorDetailsSkeleton = dynamic(() => import('@/components/shared/skeleton/DoctorDetailsSkeleton'), { ssr: false });

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname();
    const apiInstance = useCreateAxiosInstance();
    const docId = pathname?.split('/')?.[2];

    const { data, isLoading, error } = useQuery({
        queryKey: ['specDoctorById', docId],
        queryFn: () =>
            apiInstance
                .get<ISpecDoctorDetailTypes>(
                    `patients/doctor-detail-view/${docId}/`
                )
                .then((response) => response.data),
        refetchOnMount: false,
    });

    function toggleModal() {
        setModal((prevModal) => !prevModal);
    }

    if (isLoading) {
        return <DoctorDetailsSkeleton />;
    }

    if (error) {
        return <div>Ошибка загрузки данных. Попробуйте обновить страницу.</div>;
    }

    return (
        <div>
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    marginBottom: '5pc',
                }}
            >
                <div>
                    <DoctorInformationClinicDoctorDetail
                        modalFunction={toggleModal}
                        // @ts-ignore
                        doctor={data}
                        type={'proc'}
                        isPreventDefault
                    />
                </div>
                {/*// @ts-ignore*/}
                <Specializations data={data} />
            </div>
        </div>
    );
}

export default Doctor;
