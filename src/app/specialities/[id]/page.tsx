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
import {ISpecProcDoctor} from "@/types/specProcDoctorsTypes";
import {useStateContext} from "@/contexts";
import {SpecProcDoctorsSkeleton} from "@/components/shared/skeleton/SpecProcDoctorsSkeleton";
import {cityService} from "@/utils/services/cityService";

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname()

    const apiInstance = useCreateAxiosInstance();

    const cityId = cityService.getCityId()

    const specId = pathname?.split('/')?.[2]

    const {state} = useStateContext()

    const {query, ordering, forChild} = state

    const {data, isLoading} = useQuery({
        queryKey: ['specDoctorsDataList', specId, query, forChild, ordering],
        queryFn: () =>
            apiInstance
                .get<IGet<ISpecProcDoctor>>(
                    `/patients/specialists-in-city/${cityId}/list_of_doctors_by_medical_speciality_id/${specId}/`
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
            {isLoading && <div>
                <SpecProcDoctorsSkeleton/>
            </div>}
            {data?.results?.map(item => <DoctorInformation
                    key={item?.doctor_profile_id}
                    modalFunction={toggleModal}
                    doctor={item}
                    specId={specId}
                    type={'spec'}
                />
            )}
            <Quality/>
        </div>
    );
}

export default Doctor;