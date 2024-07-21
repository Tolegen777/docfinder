"use client";
import React from "react";
import styles from "./styles.module.scss";
import {IProcedure} from "@/types/procedureTypes";
import ProcsDropdown from "../shared/ProcsDropdown";
import {SpecProcsSkeleton} from "@/components/shared/skeleton/SpecProcsSkeleton";
import {Empty} from "antd";

type Props = {
    data: IProcedure[];
    isLoading: boolean;
};

function Procedures({data, isLoading}: Props) {
    if (isLoading) {
        return <SpecProcsSkeleton/>;
    }

    if (data?.length === 0) {
        return <Empty description={<>Данных нет...</>}/>
    }

    return (
        <div className={styles.container}>
            {data?.map((item, index) => (
                <ProcsDropdown
                    key={`${item?.medical_speciality_id} ${index}`}
                    procs={item?.medical_procedures_list ?? []}
                    title={item?.medical_speciality_title}
                />
            ))}
        </div>
    );
}

export default Procedures;
