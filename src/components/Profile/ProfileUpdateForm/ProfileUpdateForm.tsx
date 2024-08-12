'use client'
import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Form, Skeleton} from 'antd';
import {FormInitialFieldsParamsType} from "@/types/common";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {IPatient, IPatientDefault} from "@/types/patient";
import {useStateContext} from "@/contexts";
import {changeFormFieldsData} from "@/utils/changeFormFieldsData";
import styles from './styles.module.scss'
import Image from "next/image";
import patientIcon from './../../../public/posters/patient.png'
import FormInput from "@/components/shared/FormInput";
import FormInputNumber from "@/components/shared/FormInputNumber";
import FormMaskedInput from "@/components/shared/FormMaskedInput";
import {formatDateToString} from "@/utils/date/formatDateToString";
import {datePickerFormatter} from "@/utils/date/datePickerFormatter";
import {customNotification} from "@/utils/customNotification";

const initialValues = [
    {
        name: 'first_name',
        value: ''
    },
    {
        name: 'last_name',
        value: ''
    },
    {
        name: 'patronymic_name',
        value: ''
    },
    {
        name: 'birth_date',
        value: ''
    },
    {
        name: 'iin_number',
        value: ''
    },
    {
        name: 'phone_number',
        value: ''
    },
];


type Props = {

}
export const PartnerSegmentsCreateUpdaterForm = (props: Props) => {
    const {} = props;

    const {state} = useStateContext()

    const {authUser} = state

    const queryClient = useQueryClient();

    const [form] = Form.useForm();

    const [initialFields, setInitialFields] = useState<FormInitialFieldsParamsType[]>(initialValues)

    const {data: patientData, isFetching: patientLoading} = useQuery({
        queryKey: ['patientDetails', authUser],
        queryFn: () =>
            axiosInstanceWithTokenLogic
                .get<IPatient>(`patients/auth/patient-detail/`)
                .then((response) => response?.data),
        enabled: authUser,
        refetchOnMount: false
    });

    useEffect(() => {
        if (patientData) {
            setInitialFields(changeFormFieldsData<object>(initialValues, {
                ...patientData,
                birth_date: patientData?.birth_date ? datePickerFormatter(patientData?.birth_date) : ''
            }))
        }
    }, [patientData])

    const {
        mutate: onUpdatePatient,
        isPending: isUpdateLoading,
    } = useMutation({
        mutationKey: ['updatePatientDetails'],
        mutationFn: (body: IPatientDefault) => {
            return axiosInstanceWithTokenLogic.put(`patients/auth/patient-update/`, body)
        },
        onSuccess: () => {
            customNotification({
                type: 'success',
                message: 'Данные успешно изменены!'
            })
            queryClient.invalidateQueries({queryKey: ['patientDetails']});
        },
    });

    const formFields = [
        {
            name: 'first_name',
            element: <FormInput placeholder="Введите имя"/>,
            label: 'Имя',
        },
        {
            name: 'last_name',
            element: <FormInput placeholder="Введите фамилию"/>,
            label: 'Фамилия',
        },
        {
            name: 'patronymic_name',
            element: <FormInput placeholder="Введите отчество"/>,
            label: 'Отчество',
        },
        {
            name: 'birth_date',
            element: <DatePicker
                placeholder="Выберите дату рождения"
                format="YYYY-MM-DD"
                style={{width: '100%', background: '#EFEFEF'}}
                size={"large"}
            />,
            label: 'Дата рождения',
        },
        {
            name: 'iin_number',
            element: <FormInputNumber
                placeholder="Введите ИИН"
                style={{width: '100%'}}
            />,
            label: 'ИИН',
        },
        {
            name: 'phone_number',
            element: <FormMaskedInput
                mask="+0 000 000 00 00"
                placeholder="Введите номер телефона"
                style={{width: '100%'}}
            />,
            label: 'Номер телефона',
        },
    ];

    const handleSubmit = (data: IPatientDefault) => {
        console.log(data, 'DD')
        const payload = {
            ...data,
            birth_date: formatDateToString(data?.birth_date?.$d ?? null)
        }
        console.log(payload, 'PAY')
        onUpdatePatient(payload)
    }

    if (patientLoading) {
        return <div className={styles.loader}>
            <Skeleton avatar paragraph={{ rows: 6 }} active />
        </div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
              Мой профиль
            </div>
            <div className={styles.content}>
                <div className={styles.avatar}>
                    <Image
                        src={patientIcon}
                        alt={''}
                        width={200}
                        height={230}
                        quality={100}
                        unoptimized={true}
                    />
                </div>
                <div className={styles.form}>
                    <Form
                        fields={initialFields}
                        form={form}
                        layout="vertical"
                        onFinish={value => handleSubmit(value)}
                    >
                        <div className={styles.form_field}>
                            {formFields.map(field => (
                                <Form.Item key={field.name} name={field.name}>
                                    {field.element}
                                </Form.Item>
                            ))}
                        </div>
                        <div className={styles.form_action}>
                            <Button
                                disabled={isUpdateLoading}
                                type={"primary"}
                                size={"large"}
                                onClick={form.submit}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
