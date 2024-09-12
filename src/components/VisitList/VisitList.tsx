'use client'
import React, {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {Button, Form, Input, List, Modal, Rate, Spin} from 'antd';
import styles from './VisitList.module.scss';
import {customNotification} from "@/utils/customNotification";
import {IVisit} from "@/components/Profile/PatientVisits/PatientVisits";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {ICreateReview} from "@/types/visitTypes";

type Props = {
    doctorId: number | null,
    visits: IVisit[],
    isLoading: boolean,
}

const VisitList = ({doctorId, visits, isLoading}: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<IVisit | null>(null);
    const [form] = Form.useForm(); // Используем хук useForm для управления формой

    const { mutate: onCreateReview, isPending: isCreateLoading } = useMutation({
        mutationKey: ['createReview'],
        mutationFn: (body: ICreateReview) => {
            return axiosInstanceWithTokenLogic.post(
                `patients/doctor-detail-view/${doctorId}/my-visits/${selectedVisit?.id}/reviews/`,
                body
            );
        },
        onSuccess: () => {
            customNotification({
                type: 'success',
                message: 'Отзыв успешно отправлен!',
            });
            setIsModalVisible(false);
            form.resetFields(); // Очистка полей формы при успешном создании отзыва
        },
    });

    const handleLeaveReview = (visit: IVisit) => {
        setSelectedVisit(visit);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedVisit(null);
        form.resetFields(); // Очистка полей формы при закрытии модального окна
    };

    const handleFinish = (values: ICreateReview) => {
        const payload = {
            text: values.text,
            rating: values.rating,
            is_reply: false,
            parent_comment: null
        };
        onCreateReview(payload);
    };

    return (
        <div className={styles.visitListContainer}>
            {isLoading ? (
                <Spin size="large" />
            ) : (
                <List
                    dataSource={visits}
                    renderItem={(visit) => (
                        <List.Item>
                            <div className={styles.visitItem}>
                                <div>
                                    <div>Дата посещения: {visit.date}</div>
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => handleLeaveReview(visit)}
                                >
                                    Оставить отзыв
                                </Button>
                            </div>
                        </List.Item>
                    )}
                />
            )}

            <Modal
                title="Оставить отзыв"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleFinish} layout="vertical">
                    <Form.Item
                        label="Текст отзыва"
                        name="text"
                        rules={[{ required: true, message: 'Введите текст отзыва' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        label="Рейтинг"
                        name="rating"
                        rules={[{ required: true, message: 'Выберите рейтинг' }]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isCreateLoading}>
                            Отправить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default VisitList;
