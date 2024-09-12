"use client";

import React from "react";
import {useQuery} from "@tanstack/react-query";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {Table, Spin, Alert, Descriptions, Skeleton} from "antd";
import styles from "./styles.module.scss";
import {formatDateTime} from "@/utils/date/formateDate";
import clsx from "clsx";

export interface IVisit {
    id: number;
    date: string;
    visit_price?: string;
    approved_by_clinic: boolean;
    approved: boolean;
    paid: boolean;
    is_child: boolean;
    note: string;
    created_at: string;
    updated_at: string;
    patient: number;
    doctor: number;
    visit_time: number;
    clinic_branch: number;
    procedure: number;
    visit_status: number;
}

const columns = [
    {
        title: "Дата",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Цена",
        dataIndex: "visit_price",
        key: "visit_price",
        render: (text: string) => (text ? text : "N/A"),
    },
    {
        title: "Одобрено клиникой",
        dataIndex: "approved_by_clinic",
        key: "approved_by_clinic",
        render: (approved: boolean) => (approved ? "Да" : "Нет"),
    },
    {
        title: "Одобрено",
        dataIndex: "approved",
        key: "approved",
        render: (approved: boolean) => (approved ? "Да" : "Нет"),
    },
    {
        title: "Оплачено",
        dataIndex: "paid",
        key: "paid",
        render: (paid: boolean) => (paid ? "Да" : "Нет"),
    },
    {
        title: "Ребенок",
        dataIndex: "is_child",
        key: "is_child",
        render: (is_child: boolean) => (is_child ? "Да" : "Нет"),
    },
    {
        title: "Заметка",
        dataIndex: "note",
        key: "note",
    },
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        render: (date: string) => (formatDateTime({
            isoDateTime: date
        })),
    },
    {
        title: "Дата обновления",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (date: string) => (formatDateTime({
            isoDateTime: date
        })),

    },
];

const PatientVisits = () => {
    const {data, isLoading} = useQuery({
        queryKey: ["patientVisits"],
        queryFn: () =>
            axiosInstanceWithTokenLogic
                .get<IVisit[]>(`patients/auth/patient-visits/`)
                .then((response) => response.data),
    });

    if (isLoading) return <div className={clsx({
        [styles.container]: true,
        [styles.loader]: true,

    })}>
        <Skeleton active />
        <Skeleton active />
    </div>;

    return (
        <section className={styles.container}>
            <div className={styles.tableWrapper}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    className={styles.desktopTable}
                    scroll={{x: '100%'}}
                    bordered
                />
            </div>
            <div className={styles.mobileWrapper}>
                {data?.map((visit) => (
                    <Descriptions
                        key={visit.id}
                        title={`Визит ID: ${visit.id}`}
                        bordered
                        column={{xxl: 1, xl: 2, lg: 3, md: 2, sm: 1, xs: 1}}
                        className={styles.description}
                        contentStyle={{background: '#EFEFEF'}}
                    >
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Дата</div>}
                            span={1}
                        >
                            {visit.date}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Цена</div>}
                            span={1}
                        >
                            {visit.visit_price || "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Одобрено клиникой</div>}
                            span={1}
                        >
                            {visit.approved_by_clinic ? "Да" : "Нет"}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Одобрено</div>}
                            span={1}
                        >
                            {visit.approved ? "Да" : "Нет"}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Оплачено</div>}
                            span={1}
                        >
                            {visit.paid ? "Да" : "Нет"}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Ребенок</div>}
                            span={1}
                        >
                            {visit.is_child ? "Да" : "Нет"}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Заметка</div>}
                            span={1}
                        >
                            {visit.note}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Дата создания</div>}
                            span={1}
                        >
                            {formatDateTime({
                                isoDateTime: visit?.created_at ?? ''
                            })}
                        </Descriptions.Item>
                        <Descriptions.Item
                            label={<div className={styles.descLabel}>Дата обновления</div>}
                            span={1}
                        >
                            {formatDateTime({
                                isoDateTime: visit?.updated_at ?? ''
                            })}
                        </Descriptions.Item>
                    </Descriptions>
                ))}

            </div>
        </section>
    );
};

export default PatientVisits;
