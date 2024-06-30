import React from 'react';
import { Dropdown } from "antd";
import Image from "next/image";
import styles from './styles.module.scss';
import icon from "@/components/svg/procedures.svg";
import {MedicalProceduresList} from "@/types/procedureTypes";

export interface DropdownProps {
    title: string;
    procs: MedicalProceduresList[];
}

const ProcsDropdown = ({title, procs }: DropdownProps) => {
    const items = procs?.map(item => ({
        key: item?.medical_procedure_id,
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                {item?.medical_procedure_title}
            </a>
        ),
    }));

    return (
        <div>
            <Dropdown menu={{ items }} overlayClassName={styles.container} trigger={['click']}>
                <div className={styles.card}>
                    <div className={styles.card_item}>
                        <Image src={icon} alt="" className={styles.image} />
                        <span className={styles.text}>{title}</span>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};

export default ProcsDropdown;
