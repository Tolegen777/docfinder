'use client'
import React from "react";
import styles from "./styles.module.scss";
import {useQuery} from "@tanstack/react-query";
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {IProcedure} from "@/types/procedureTypes";
import ProcsDropdown from "../shared/ProcsDropdown";
import {SpecProcsSkeleton} from "@/components/shared/skeleton/SpecProcsSkeleton";

function Procedures() {

    const apiInstance = useCreateAxiosInstance();

    const {data, isLoading} = useQuery({
        queryKey: ['proceduresDataList'],
        queryFn: () =>
            apiInstance
                .get<IProcedure[]>('patients/procedures-in-city/1/')
                .then((response) => response.data),
        refetchOnMount: false,
    });

    if (isLoading) {
        return <SpecProcsSkeleton/>
    }

    return (
        <>
            <div className={styles.procedure}>
                <div className="container">
                    <div className={styles.content}>
                        <div className={styles.procedures}>
                            <div className={styles.cards}>
                                {data?.map((item, index) =>
                                    <ProcsDropdown key={`${item?.medical_speciality_id} ${index}`}
                                                   procs={item?.medical_procedures_list ?? []}
                                                   title={item?.medical_speciality_title}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Procedures;
