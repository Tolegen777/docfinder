'use client'
import React, {useState} from "react";
import styles from "./HeaderModal.module.scss";
import {Button, Form, Modal} from "antd";
import LoginForm from "@/components/Authorization/LoginForm/LoginForm";
import RegisterForm from "@/components/Authorization/RegisterForm/RegisterForm";

type DoctorModalProps = {
    open: boolean;
    setModal: () => void;
};


const HeaderModal = ({setModal, open}: DoctorModalProps) => {

    const [formType, setFormType] = useState<'login' | 'register'>('login')

    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields()
        setModal()
    }

    return (
        <Modal
            open={open}
            footer={null}
            onCancel={onClose}
            centered
        >
            {formType === 'login' ? <LoginForm form={form} onClose={onClose}/> :
                <RegisterForm
                    form={form}
                    setFormType={() => setFormType('login')}
                />}
            <div className={styles.register}>
                {formType === 'login' ? <>
                    <div>У вас нет аккаунта</div>
                    <Button
                        type={'text'}
                        style={{color: '#FF6200'}}
                        onClick={() => setFormType('register')}
                    >
                        Зарегистрироваться
                    </Button>
                </> : <>
                    <div>У меня уже есть аккаунт</div>
                    <Button
                        type={'text'}
                        style={{color: '#FF6200'}}
                        onClick={() => setFormType('login')}
                    >
                        Войти
                    </Button>
                </>}
            </div>
        </Modal>
    );
};

export default HeaderModal;
