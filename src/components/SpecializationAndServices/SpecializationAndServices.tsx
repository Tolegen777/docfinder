import React, { useState } from 'react';
import styles from './SpecializationAndServices.module.scss';
import { SpecialitiesAndProcedure } from "@/types/specDoctorById";
import { Button, Modal, DatePicker } from 'antd';

type Props = {
    specialitiesAndProcedures: SpecialitiesAndProcedure[];
};

const SpecializationAndServices = ({ specialitiesAndProcedures }: Props) => {
    const initialSpecialityId = specialitiesAndProcedures?.length > 0
        ? specialitiesAndProcedures[0].speciality.medical_speciality_id
        : null;

    const [activeSpeciality, setActiveSpeciality] = useState<number | null>(initialSpecialityId);
    const [activeProcedure, setActiveProcedure] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSpecialityClick = (specialityId: number) => {
        setActiveSpeciality(specialityId);
        setActiveProcedure(null); // Сбрасываем активную процедуру при выборе новой специальности
    };

    const handleProcedureClick = (procedureId: number) => {
        setActiveProcedure(procedureId);
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className={styles.section}>
                <h4 className={styles.title}>Специализации</h4>
                <div className={styles.items}>
                    {specialitiesAndProcedures?.map((el, key) => {
                        const isActive = el.speciality.medical_speciality_id === activeSpeciality;
                        return (
                            <h3
                                key={key}
                                className={`${styles.item} ${isActive ? styles.activeItem : ''}`}
                                onClick={() => handleSpecialityClick(el.speciality.medical_speciality_id)}
                            >
                                {el.speciality.medical_speciality_title}
                            </h3>
                        );
                    })}
                </div>
            </div>

            <div className={styles.section}>
                <h4 className={styles.title}>Услуги</h4>
                <div className={styles.items}>
                    {specialitiesAndProcedures
                        ?.find(speciality => speciality.speciality.medical_speciality_id === activeSpeciality)
                        ?.procedures.map((procedure, key) => {
                            const isActive = procedure.doctor_procedure_id === activeProcedure;
                            return (
                                <h3
                                    key={key}
                                    className={`${styles.item} ${styles.procedureItem} ${isActive ? styles.activeItem : ''}`}
                                    onClick={() => handleProcedureClick(procedure.doctor_procedure_id)}
                                >
                                    {procedure.medical_procedure_title}
                                </h3>
                            );
                        })}
                </div>
            </div>

            <Modal title="Записаться" open={isModalOpen} onCancel={handleModalCancel} footer={null}>
                <DatePicker showTime />
                <Button type="primary" onClick={handleModalCancel}>Записаться</Button>
            </Modal>
        </div>
    );
};

export default SpecializationAndServices;
