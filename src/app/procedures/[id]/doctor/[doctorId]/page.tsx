"use client";

import React, {useState} from "react";
import DoctorInformation from "@/components/DoctorInformation/DoctorInformation";
import {usePathname} from "next/navigation";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import Specializations from "@/components/Specializations/Specializations";
import DoctorModal from "@/components/DoctorModal/DoctorModal";
import {ISpecDoctorById} from "@/types/specDoctorById";
import {cityService} from "@/utils/services/cityService";

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname()

    const cityId = cityService.getCityId()

    console.log(pathname, 'PAT')

    const apiInstance = useCreateAxiosInstance();

    const specId = pathname?.split('/')?.[2]
    const docId = pathname?.split('/')?.[4]

    const {data, isLoading} = useQuery({
        queryKey: ['procDoctorById', specId, docId],
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

    return (
        <div>
            <div
                style={{
                    background: 'white',
                    width: '100%'
                }}
            >
                <div>
                    <DoctorInformation modalFunction={toggleModal} doctor={data} isPreventRedirect={true} type={'spec'} specId={''} />
                </div>
                <Specializations data={data} />
            </div>
            <div
                style={{
                    display: modal ? 'block' : 'none'
                }}
            >
                <DoctorModal setModal={toggleModal} />
            </div>
        </div>
    );
}

export default Doctor;
