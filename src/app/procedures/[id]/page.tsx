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
import {useStateContext} from "@/contexts";
import {SpecProcDoctorsSkeleton} from "@/components/shared/skeleton/SpecProcDoctorsSkeleton";
import {ISpecProcDoctor} from "@/types/specProcDoctorsTypes";
import CustomPagination from "@/components/shared/CustomPagination";
import {objectToQueryParams} from "@/utils/objectToQueryParams";

function Doctor() {
    const [modal, setModal] = useState<boolean>(false);

    const pathname = usePathname()

    const apiInstance = useCreateAxiosInstance();

    const procId = pathname?.split('/')?.[2]

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
        queryKey: ['specDoctorsDataList', procId, query, forChild, ordering, page, cityId],
        queryFn: () =>
            apiInstance
                .get<IGet<ISpecProcDoctor>>(
                    `/patients/procedures-in-city/${cityId}/list_of_doctors_by_medical_procedure_id/${procId}/?page=${page}&${objectToQueryParams(filters)}`
                )
                .then((response) => response.data),
        enabled: !!cityId
    });

    function toggleModal() {
        setModal((prevModal) => !prevModal);
    }

    return (
        <div>
            <Hero/>
            <DoctorsNavs
                setOrdering={setOrdering}
                setForChild={setForChild}
                forChild={forChild}
                ordering={ordering}
            />
            {isLoading && <div style={{padding: '20px 150px'}}>
                <SpecProcDoctorsSkeleton/>
            </div>}
            {data?.results?.map(item => <DoctorInformation
                    key={item?.doctor_profile_id}
                    modalFunction={toggleModal}
                    doctor={item}
                    specId={procId}
                    type={'proc'}
                />
            )}
            <CustomPagination setPage={setPage} totalCount={data?.count ?? 0}/>
            <Quality/>
        </div>
    );
}

export default Doctor;
