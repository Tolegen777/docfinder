import React from 'react'
import styles from './styles.module.scss'
import {Button, Divider, Form, FormInstance, Input} from "antd";
import {labelStyle} from "@/const/styles";
import {useMutation} from "@tanstack/react-query";
import {authApi} from "@/api/authApi";
import {ILoginInput} from "@/types/authTypes";
import {AxiosError} from "axios";
import {customNotification} from "@/utils/customNotification";

type FieldType = {
	email?: string;
	password?: string;
};

type Props = {
	form: FormInstance,
	setFormType: () => void
}

const RegisterForm = ({form, setFormType}: Props) => {

	const {
		mutate: onRegister,
		isPending: isLoading,
	} = useMutation({
		mutationKey: ['signIn'],
		mutationFn: authApi.registerUser,
		onSuccess: () => {
			customNotification({
				type: 'success',
				message: 'Вы успешно зарегистрировались!'
			})
			setFormType()
		},
		onError: (error: AxiosError<{ message: string }>) => {
			if (error.response && error?.response.status === 401)
				customNotification({
					type: 'error',
					message: error?.response?.data.message ?? 'Ошибка сервера'
				})
		}
	});

	const onFinish = (values: ILoginInput) => {
		onRegister(values)
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Войти в профиль пользователя</div>
			<Divider/>
			<Form
				onFinish={onFinish}
				layout="vertical"
				className={styles.container_form}
				form={form}
				clearOnDestroy
			>
				<Form.Item<FieldType>
					// @ts-ignore
					label={<span style={labelStyle}>Электронная почта</span>}
					name="email"
					rules={[
						{ required: true, message: 'Пожалуйста, введите вашу электронную почту!' },
						{ type: 'email', message: 'Пожалуйста, введите корректный email!' }
					]}
				>
					<Input size={'large'} />
				</Form.Item>

				<Form.Item<FieldType>
					// @ts-ignore
					label={<span style={labelStyle}>Пароль</span>}
					name="password"
					rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
				>
					<Input.Password size={'large'} />
				</Form.Item>
				<div className={styles.container_form_action}>
					<Button
						type="primary"
						htmlType="submit"
						size={'large'}
						disabled={isLoading}
					>
						Зарегистрироваться
					</Button>
				</div>
			</Form>
		</div>
	)
}

export default RegisterForm
