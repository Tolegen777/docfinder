'use client'
import React from "react";
import {Form, Modal} from "antd";
import ClinicBookingForm from "@/components/Clinic/ClinikMookingForm/ClinicBookingForm";

type DoctorModalProps = {
    open: boolean;
    closeModal: () => void;
};


const ClinicBookingModal = ({closeModal, open}: DoctorModalProps) => {

    const [form] = Form.useForm();

    const onClose = () => {
        form.resetFields()
        closeModal()
    }

    return (
        <Modal
            open={open}
            footer={null}
            onCancel={onClose}
            centered
        >
            <ClinicBookingForm
                form={form}
                onClose={onClose}
            />
        </Modal>
    );
};

export default ClinicBookingModal;
