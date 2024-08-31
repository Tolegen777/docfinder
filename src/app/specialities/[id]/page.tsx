"use client";

import dynamic from 'next/dynamic';
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useCreateAxiosInstance } from "@/hooks/useCreateAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IGet } from "@/types/common";
import { ISpecProcDoctor } from "@/types/specProcDoctorsTypes";
import { useStateContext } from "@/contexts";
import { objectToQueryParams } from "@/utils/objectToQueryParams";
import { Empty } from "antd";

// Динамический импорт компонентов с отключением SSR
const DoctorInformation = dynamic(() => import('@/components/DoctorInformation/DoctorInformation'), { ssr: false });
const DoctorsNavs = dynamic(() => import('@/components/DoctorNavs/DoctorsNavs'), { ssr: false });
const Quality = dynamic(() => import('@/components/Quality/Quality'), { ssr: false });
const CustomPagination = dynamic(() => import('@/components/shared/CustomPagination'), { ssr: false });
const Hero = dynamic(() => import('@/components/hero_v2/Hero'), { ssr: false });
const SpecProcDoctorsSkeleton = dynamic(() => import('@/components/shared/skeleton/SpecProcDoctorsSkeleton'), { ssr: false });
const SkeletonWrapper = dynamic(() => import('@/components/shared/skeleton/SkeletonWrapper'), { ssr: false });

function Doctor() {
    const pathname = usePathname();
    const apiInstance = useCreateAxiosInstance();
    const specId = pathname?.split('/')?.[2];
    const { state } = useStateContext();
    const { query, cityId } = state;
    const [page, setPage] = useState(1);
    const [forChild, setForChild] = useState<boolean | null>(null);
    const [ordering, setOrdering] = useState<string | null>(null);

    const filters = {
        for_child: forChild,
        ordering: ordering,
    };

    const { data, isLoading } = useQuery({
        queryKey: ['specDoctorsDataList', specId, query, forChild, ordering, page, cityId],
        queryFn: () =>
            apiInstance
                .get<IGet<ISpecProcDoctor>>(
                    `/patients/specialists-in-city/${cityId}/list_of_doctors_by_medical_speciality_id/${specId}/?page=${page}&${objectToQueryParams(filters)}`
                )
                .then((response) => response.data),
    });

    function toggleModal() {}

    return (
        <div style={{ marginBottom: '5pc' }}>
            <Hero />
            <DoctorsNavs
                setOrdering={setOrdering}
                setForChild={setForChild}
                forChild={forChild}
                ordering={ordering}
            />
            {isLoading && (
                <SkeletonWrapper>
                    <SpecProcDoctorsSkeleton />
                </SkeletonWrapper>
            )}
            {data?.results?.length === 0 ? (
                <Empty description={'Данных нет...'} />
            ) : (
                data?.results?.map((item) => (
                    <DoctorInformation
                        key={item?.doctor_profile_id}
                        modalFunction={toggleModal}
                        doctor={item}
                        specId={specId}
                        type={'spec'}
                    />
                ))
            )}
            <CustomPagination setPage={setPage} totalCount={data?.count ?? 0} />
            <Quality />
        </div>
    );
}

export default Doctor;
