"use client";

import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useCreateAxiosInstance } from "@/hooks/useCreateAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ISpecDoctorById } from "@/types/specDoctorById";
import { useStateContext } from "@/contexts";

// Динамический импорт компонентов с отключением SSR
const DoctorInformation = dynamic(() => import('@/components/DoctorInformation/DoctorInformation'), { ssr: false });
const Specializations = dynamic(() => import('@/components/Specializations/Specializations'), { ssr: false });
const DoctorDetailsSkeleton = dynamic(() => import('@/components/shared/skeleton/DoctorDetailsSkeleton'), { ssr: false });

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname();
    const { state } = useStateContext();
    const { cityId } = state;
    const apiInstance = useCreateAxiosInstance();
    const specId = pathname?.split('/')?.[2];
    const docId = pathname?.split('/')?.[4];

    const { data, isLoading, error } = useQuery({
        queryKey: ['procDoctorById', specId, docId, cityId],
        queryFn: () =>
            apiInstance
                .get<ISpecDoctorById>(
                    `patients/procedures-in-city/${cityId}/list_of_doctors_by_medical_procedure_id/${specId}/detail_doctor_profile_information/${docId}/`
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
                    <DoctorInformation
                        modalFunction={toggleModal}
                        // @ts-ignore
                        doctor={{
                            ...data,
                            // @ts-ignore
                            doctor_procedure_price: data?.doctor_procedure_price_object,
                        }}
                        isPreventRedirect={true}
                        type={'proc'}
                        specId={''}
                    />
                </div>
                <Specializations data={data} />
            </div>
        </div>
    );
}

export default Doctor;
