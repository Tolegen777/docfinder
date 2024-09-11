import React, {useState} from 'react';
import styles from './SpecializationAndServices.module.scss';
import {DoctorProceduresData, ISpecDoctorById, ListOfProcedure, SpecialitiesAndProcedure} from "@/types/specDoctorById";
import DoctorModal from "@/components/DoctorModal/DoctorModal";
import ClinicBookingModal from "@/components/Clinic/ClinicBookingModal/ClinicBookingModal";
import HeaderModal from "@/components/HeaderModal/HeaderModal";
import {useStateContext} from "@/contexts";

type Props = {
    specialitiesAndProcedures: SpecialitiesAndProcedure[];
    doctorProcsData: ListOfProcedure[];
    doctorProcFullData: DoctorProceduresData[];
    doctorData: ISpecDoctorById | undefined
};

const SpecializationAndServices = ({specialitiesAndProcedures, doctorProcsData, doctorData, doctorProcFullData}: Props) => {
    // const initialSpecialityId = specialitiesAndProcedures?.length > 0
    //     ? specialitiesAndProcedures[0].speciality.medical_speciality_id
    //     : null;

    const branchId = doctorData?.nearest_week_work_schedule?.find(item => item?.clinic_branch_id)?.clinic_branch_id

    const {state} = useStateContext()

    const [activeSpeciality, setActiveSpeciality] = useState<number | null>(null);
    const [activeProcedure, setActiveProcedure] = useState<{ id: number, title: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modal, setModal] = useState(false)

    const [openBookingModal, setOpenBookingModal] = useState(false)

    const handleSpecialityClick = (specialityId: number) => {
        if (specialityId !== activeSpeciality) {
            setActiveSpeciality(specialityId);
        } else {
            setActiveSpeciality(null);
        }
        setActiveProcedure(null); // Сбрасываем активную процедуру при выборе новой специальности
    };

    const handleProcedureClick = (procedureId: number, procedureTitle: string) => {
        setActiveProcedure({id: procedureId, title: procedureTitle});
        if (state?.authUser) {
            setIsModalOpen(true);
        } else {
            setOpenBookingModal(true)
        }

    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <ClinicBookingModal
                open={openBookingModal}
                closeModal={() => setOpenBookingModal(false)}
            />
            <HeaderModal setModal={() => setModal(false)} open={modal}/>
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
                    {activeSpeciality ? specialitiesAndProcedures
                        ?.find(speciality => speciality.speciality.medical_speciality_id === activeSpeciality)
                        ?.procedures.map((procedure, key) => {
                            // const isActive = procedure.doctor_procedure_id === activeProcedure?.id;
                            return (
                                <h3
                                    key={key}
                                    className={`${styles.item} ${styles.procedureItem}`}
                                    onClick={() => handleProcedureClick(procedure.doctor_procedure_id, procedure?.medical_procedure_title)}
                                >
                                    {procedure.medical_procedure_title}
                                </h3>
                            );
                        }) : doctorProcsData?.map((procedure, key) => {
                        // const isActive = procedure.id === activeProcedure?.id;
                        return <h3
                            key={key}
                            className={`${styles.item} ${styles.procedureItem}`}
                            onClick={() => handleProcedureClick(procedure.medical_procedure_id, procedure?.medical_procedure_title)}
                        >
                            {procedure.medical_procedure_title}
                        </h3>
                    })}
                </div>
            </div>

            {isModalOpen && <DoctorModal
                type={'proc'}
                procId={activeProcedure?.id as number}
                onClose={handleModalCancel}
                procLabel={activeProcedure?.title ?? ''}
                // @ts-ignore
                doctorProcData={doctorProcFullData?.find(item => item?.id === activeProcedure?.id) ?? null}
                doctorData={doctorData}
                date={null}
                visitTime={null}
                branchId={branchId ?? null}
                procs={[]}
            />}
        </div>
    );
};

export default SpecializationAndServices;
