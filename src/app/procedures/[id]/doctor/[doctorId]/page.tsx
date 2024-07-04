"use client";

import React, {useState} from "react";
import DoctorInformation from "@/components/DoctorInformation/DoctorInformation";
import {usePathname} from "next/navigation";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import Specializations from "@/components/Specializations/Specializations";
import {ISpecDoctorById} from "@/types/specDoctorById";
import {useStateContext} from "@/contexts";
import {DoctorDetailsSkeleton} from "@/components/shared/skeleton/DoctorDetailsSkeleton";

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname()

    const {state} = useStateContext()

    const {cityId} = state

    const apiInstance = useCreateAxiosInstance();

    const specId = pathname?.split('/')?.[2]
    const docId = pathname?.split('/')?.[4]

    const {data, isLoading} = useQuery({
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
        return <DoctorDetailsSkeleton/>
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
                    <DoctorInformation
                        modalFunction={toggleModal}
                        // @ts-ignore
                        doctor={data}
                        isPreventRedirect={true}
                        type={'spec'}
                        specId={''}
                    />
                </div>
                <Specializations data={data} />
            </div>
            <div
                style={{
                    display: modal ? 'block' : 'none'
                }}
            >
                {/*<DoctorModal setModal={toggleModal} type={} />*/}
            </div>
        </div>
    );
}

export default Doctor;
