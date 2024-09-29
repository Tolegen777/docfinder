import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button, Divider, Form, FormInstance } from 'antd';
import { labelStyle } from '@/const/styles';
import { useMutation } from '@tanstack/react-query';
import { customNotification } from '@/utils/customNotification';
import MaskedInput from 'antd-mask-input';
import { useCreateAxiosInstance } from "@/hooks/useCreateAxiosInstance";

type FieldType = {
	patient_phone_number?: string;
	referring_page_url?: string;
};

type Props = {
	form: FormInstance<any>;
	onClose: () => void;
};

const ClinicBookingForm = ({ form, onClose }: Props) => {
	const apiInstance = useCreateAxiosInstance();
	const [currentUrl, setCurrentUrl] = useState<string>('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
		}
	}, []);

	const {
		mutate: onBook,
		isPending: isLoading,
	} = useMutation({
		mutationKey: ['signIn'],
		mutationFn: (body: FieldType) =>
			apiInstance.post(`patients/create_fast_patient_clinic_visit_record/`, body),
		onSuccess: () => {
			customNotification({
				type: 'success',
				message: 'Вы успешно записались!',
			});
			onClose();
		},
	});

	const onFinish = (values: FieldType) => {
		const payload = {
			patient_phone_number: values?.patient_phone_number,
			referring_page_url: currentUrl,
		};
		onBook(payload);
	};


	return (
		<div className={styles.container}>
			<div className={styles.header}>Записаться в клинику</div>
			<Divider />
			<Form
				onFinish={onFinish}
				layout="vertical"
				className={styles.container_form}
				form={form}
				clearOnDestroy
			>
				<Form.Item<FieldType>
					// @ts-ignore
					label={<span style={labelStyle}>Номер телефона</span>}
					name="patient_phone_number"
					rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона!' }]}
					initialValue="+7"
				>
					<MaskedInput mask="+70000000000" size={'large'} defaultValue="+7" />
				</Form.Item>
				<div className={styles.container_form_action}>
					<Button
						type="primary"
						htmlType="submit"
						size={'large'}
						disabled={isLoading}
					>
						Записаться
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default ClinicBookingForm;
