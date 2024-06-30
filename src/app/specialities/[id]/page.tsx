"use client";

import React, {useState} from "react";
import DoctorInformation from "@/components/DoctorInformation/DoctorInformation";
import DoctorsNavs from "@/components/DoctorNavs/DoctorsNavs";
import Quality from "@/components/Quality/Quality";
import Hero from "@/components/hero/Hero";
import {usePathname} from "next/navigation";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {IGet} from "@/types/common";
import {ISpecDoctor} from "@/types/specialityDoctorTypes";
import {useStateContext} from "@/contexts";
import {BasketSkeleton} from "@/components/shared/skeleton/BasketSkeleton";

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname()

    const apiInstance = useCreateAxiosInstance();

    const specId = pathname?.split('/')?.[2]

    const {state} = useStateContext()

    const {query, ordering, forChild} = state

    const {data, isLoading} = useQuery({
        queryKey: ['specDoctorsDataList', specId, query, forChild, ordering],
        queryFn: () =>
            apiInstance
                .get<IGet<ISpecDoctor>>(
                    `/patients/specialists-in-city/${1}/list_of_doctors_by_medical_speciality_id/${specId}/`
                    // ?part_of_name=${query}&for_child=${forChild}&ordering=${ordering}
                )
                .then((response) => response.data),
    });

    function toggleModal() {
        setModal((prevModal) => !prevModal);
    }

    return (
        <div>
            <Hero/>
            <DoctorsNavs/>
            {isLoading && <div style={{padding: '20px 150px'}}>
                <BasketSkeleton/>
            </div>}
            {data?.results?.map(item => <DoctorInformation
                    key={item?.doctor_profile_id}
                    modalFunction={toggleModal}
                    doctor={item}
                />
            )}
            <Quality/>
        </div>
    );
}

export default Doctor;
