"use client";

import dynamic from 'next/dynamic';
import React from "react";
import { usePathname } from "next/navigation";
import { useCreateAxiosInstance } from "@/hooks/useCreateAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ISpecDoctorById } from "@/types/specDoctorById";
import {ISpecDoctorDetailTypes} from "@/types/specDoctorDetailTypes";

// Динамический импорт компонентов с отключением SSR
const DoctorInformation = dynamic(() => import('@/components/DoctorInformation/DoctorInformation'), { ssr: false });
const Specializations = dynamic(() => import('@/components/Specializations/Specializations'), { ssr: false });
const DoctorDetailsSkeleton = dynamic(() => import('@/components/shared/skeleton/DoctorDetailsSkeleton'));

function Doctor() {
    const pathname = usePathname();
    const apiInstance = useCreateAxiosInstance();
    const specId = pathname?.split('/')?.[2];
    const docId = pathname?.split('/')?.[4];

    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['specDoctorById', specId, docId, cityId],
    //     queryFn: () =>
    //         apiInstance
    //             .get<ISpecDoctorById>(
    //                 `patients/specialists-in-city/${cityId}/list_of_doctors_by_medical_speciality_id/${specId}/detail_doctor_profile_information/${docId}/`
    //             )
    //             .then((response) => response.data),
    //     refetchOnMount: false,
    // });

    const { data, isLoading, error } = useQuery({
        queryKey: ['specDoctorById', specId, docId],
        queryFn: () =>
            apiInstance
                .get<ISpecDoctorDetailTypes>(
                    `patients/doctor-detail-view/${docId}/?medical_speciality_id/${specId}`
                )
                .then((response) => response.data),
        refetchOnMount: false,
    });

    function toggleModal() {}

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
                    <DoctorInformation
                        modalFunction={toggleModal}
                        // @ts-ignore
                        doctor={{
                            ...data,
                            // @ts-ignore
                            doctor_speciality_doctor_procedures: data?.doctor_procedures_data,
                        }}
                        isPreventRedirect={true}
                        specId={''}
                        type={'spec'}
                    />
                </div>
                {/*// @ts-ignore*/}
                <Specializations data={data} />
            </div>
        </div>
    );
}

export default Doctor;
