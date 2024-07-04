import {useEffect, useState} from 'react'
import styles from './DoctorModal.module.scss'
import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {IPatient} from "@/types/patient";
import {useStateContext} from "@/contexts";
import {ISpecDoctorById} from "@/types/specDoctorById";
import doctorIcon from '../../public/icons/doctor.svg'
import Image from "next/image";
import {Checkbox, Select} from "antd";
import {ICreateVisit} from "@/types/visitTypes";
import {customNotification} from "@/utils/customNotification";
import {DoctorSpecialityDoctorProcedure} from "@/types/specProcDoctorsTypes";

type DoctorInformationProps = {
    onClose: () => void,
    doctorData: Partial<ISpecDoctorById> | undefined,
    type: 'proc' | 'spec',
    procId: number | null,
    procLabel?: string,
    procs: DoctorSpecialityDoctorProcedure[]
    date: string,
    visitTime: {
        id: number | null,
        time: string
    },
    doctorProcData: DoctorSpecialityDoctorProcedure | null,
    branchId: number | null

}

const DoctorModal = ({
                         onClose,
                         doctorData,
                         type,
                         procId,
                         procLabel,
                         procs,
                         date,
                         visitTime,
                         doctorProcData,
                         branchId
                     }: DoctorInformationProps) => {
    const {state} = useStateContext()

    const {authUser} = state

    const [isChild, setIsChild] = useState(false)
    const [patientName, setPatientName] = useState('')
    const [phone, setPhone] = useState('')
    const [activeProcId, setActiveProcId] = useState<number | null>(procId)
    const [price, setPrice] = useState<number | null>(null)
    const [activeProc, setActiveProc] = useState<DoctorSpecialityDoctorProcedure | null>(doctorProcData)

    let options = []

    if (procId) {
        options = [{
            label: procLabel,
            value: procId
        }]
    } else {
        options = procs?.map(item => ({
            value: item?.id,
            label: item?.med_proc_info?.title
        }))
    }

    console.log(doctorData, 'DOCTORDATA')

    const {data: patientData, isLoading: patientLoading} = useQuery({
        queryKey: ['patientDetails', authUser],
        queryFn: () =>
            axiosInstanceWithTokenLogic
                .get<IPatient>(`patients/auth/patient-detail/`)
                .then((response) => response?.data),
        enabled: authUser,
        refetchOnMount: false
    });

    const {
        mutate: onCreate,
        isPending: isLoading,
    } = useMutation({
        mutationKey: ['createVisit'],
        mutationFn: (body: ICreateVisit) =>
            axiosInstanceWithTokenLogic.post(`patients/create_patient_clinic_visit/`, body),
        onSuccess: () => {
            customNotification({
                type: 'success',
                message: 'Запись успешно создана!'
            })
            onClose()
        }
    });

    useEffect(() => {
        if (patientData) {
            setPatientName(patientData?.first_name ?? '')
            setPatientName(patientData?.phone_number ?? '')

        }
    }, [patientData])

    const handleChangeSelect = (id: number) => {
        const activeProcedure = procs?.find(item => item?.id === id)
        setActiveProcId(id)
        if (activeProcedure) {
            setPrice(activeProcedure?.price?.final_price ?? null)
            setIsChild(!!activeProcedure?.price?.is_for_children)
            setActiveProc(activeProcedure)
        }
    }

    const handleBooking = () => {
        const payload: ICreateVisit = {
            patient_id: patientData?.id as number,
            doctor_id: doctorData?.doctor_profile_id as number,
            date: date,
            visit_time_id: visitTime?.id as number,
            clinic_branch_id: branchId as number,
            procedure_id: activeProcId as number,
            visit_price: price?.toString() ?? '',
            is_child: isChild,
        }
        onCreate(payload)
    }


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <div className={styles.DoctorModalImg}>
                    <Image
                        style={{
                            borderRadius: '50%'
                        }}
                        width={100}
                        height={100}
                        src={doctorIcon}
                        alt=''
                    />
                    <div className={styles.DoctorModalText}>
                        <h3 className={styles.doctorName}>
                            {doctorData?.doctor_full_name}
                        </h3>
                        <p className={styles.doctorDescription}>
                            {doctorData?.current_clinic_branch_address}
                        </p>
                    </div>
                </div>

                <div className={styles.doctorMi}>
                    {/*<div>*/}
                    {/*    <Checkbox checked={isOld} onClick={() => setIsOld(!isOld)}/>*/}
                    {/*    <h3>Взрослые пациенты</h3>*/}
                    {/*</div>*/}
                    <div>
                        <Checkbox
                            checked={isChild}
                            onClick={() => setIsChild(!isChild)}
                        />
                        <h3>Дети</h3>
                    </div>
                </div>
                <h4 className={styles.successfullyComFlexH4}>
                    Прием
                    <span className={styles.successfullyComFlexSpanMinus}>
						{activeProc?.price?.discount && activeProc?.price?.default_price}
					</span>{' '}
                    <span
                        style={{
                            color: '#ff6200'
                        }}
                    >
						{activeProc?.price?.final_price && `${activeProc?.price?.final_price} тг.`}
					</span>
                    {activeProc?.price?.discount &&
                        <span className={styles.successfullyComFlexSpanSale}>-{activeProc?.price?.discount}%</span>}
                </h4>
                <div className={styles.doctorDivTo}>
                    <h4>Специальность/процедура</h4>
                    <Select
                        onChange={(value: number) => {
                            handleChangeSelect(value)
                        }}
                        style={{minWidth: 100}}
                        // @ts-ignore
                        options={options ?? []}
                        value={activeProcId}
                        showSearch
                        popupMatchSelectWidth={false}
                        placeholder={'Выберите процеруру'}
                        disabled={type === 'proc' && !!procId}

                    />
                </div>
                <div className={styles.doctorDivTo}>
                    <h4>Дата и время</h4>
                    <h5>{date}, {visitTime?.time}</h5>
                </div>
                <input
                    type='text'
                    placeholder='Ваше имя'
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className={styles.input}
                />
                <input
                    type='text'
                    placeholder='Ваш телефон'
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={styles.input}
                />
                {/*<h5 className={styles.doctorH5In}>*/}
                {/*	На указанный вами номер будет отправлено SMS с кодом подтверждения*/}
                {/*</h5>*/}

                <hr/>
                <button
                    className={styles.bookButton}
                    onClick={handleBooking}
                >
                    Записаться
                </button>

                <p className={styles.bookP}>
                    Нажимая Записаться, я принимаю{' '}
                    <span className={styles.bookPSpan}>
						условия пользовательского соглашения, положения о защите
						персональных данных и даю свое согласие на обработку персональных
						данных.
					</span>
                </p>
            </div>
        </div>
    )
}

export default DoctorModal
