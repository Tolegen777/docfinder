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
import {objectToQueryParams} from "@/utils/objectToQueryParams";
import CustomPagination from "@/components/shared/CustomPagination";
import {SkeletonWrapper} from "@/components/shared/skeleton/SkeletonWrapper";

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname()

    const apiInstance = useCreateAxiosInstance();

    const specId = pathname?.split('/')?.[2]

    const {state} = useStateContext()

    const {query, cityId} = state

    const [page, setPage] = useState(1)

    const [forChild, setForChild] = useState<boolean | null>(null)
    const [ordering, setOrdering] = useState<string | null>(null)

    const filters = {
        for_child: forChild,
        ordering: ordering
    }

    const {data, isLoading} = useQuery({
        queryKey: ['specDoctorsDataList', specId, query, forChild, ordering, page, cityId],
        queryFn: () =>
            apiInstance
                .get<IGet<ISpecProcDoctor>>(
                    `/patients/specialists-in-city/${cityId}/list_of_doctors_by_medical_speciality_id/${specId}/?page=${page}&${objectToQueryParams(filters)}`
                )
                .then((response) => response.data),
    });

    function toggleModal() {
        setModal((prevModal) => !prevModal);
    }

    return (
        <div style={{marginBottom: '5pc'}}>
            <Hero/>
            <DoctorsNavs
                setOrdering={setOrdering}
                setForChild={setForChild}
                forChild={forChild}
                ordering={ordering}
            />
            {isLoading && <SkeletonWrapper>
                <SpecProcDoctorsSkeleton/>
            </SkeletonWrapper>}
            {data?.results?.map(item => <DoctorInformation
                    key={item?.doctor_profile_id}
                    modalFunction={toggleModal}
                    doctor={item}
                    specId={specId}
                    type={'spec'}
                />
            )}
            <CustomPagination setPage={setPage} totalCount={data?.count ?? 0}/>
            <Quality/>
        </div>
    );
}

export default Doctor;
