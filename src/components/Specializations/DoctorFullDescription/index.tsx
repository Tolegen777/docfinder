import React from 'react';
import {Card, Empty} from 'antd';
import styles from './styles.module.scss';
import {IDoctorFullDescription} from "@/types/specDoctorById";

const DoctorFullDescription = ({ doctorFullDescription }: {doctorFullDescription: IDoctorFullDescription}) => {
    return (
        <div className={styles.container}>
            {doctorFullDescription ? Object.entries(doctorFullDescription)?.map(([key, description]) => (
                <Card key={key} className={styles.card}>
                    <h3 className={styles.title}>{description?.title}</h3>
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: description?.content }}
                    />
                </Card>
            )) : <Empty description={<>Данных нет...</>} />}
        </div>
    );
};

export default DoctorFullDescription;
