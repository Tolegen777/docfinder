import React, {useState} from 'react';
import {Modal, Select} from 'antd';
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {cityService} from "@/utils/services/cityService";
import styles from './styles.module.scss'
import {selectOptionsParser} from "@/utils/selectOptionsParser";
import {ICity} from "@/types/cityTypes";
import {useStateContext} from "@/contexts";

type Props = {
    open: boolean,
    onClose: () => void,
}

export const CityModal = ({onClose, open}: Props) => {

    const apiInstance = useCreateAxiosInstance();

    const [selectedId, setSelectedId] = useState<number | null>(null)

    const {state} = useStateContext()

    const {cityId} = state

    const {data, isLoading} = useQuery({
        queryKey: ['citiesList'],
        queryFn: () =>
            apiInstance
                .get<ICity[]>('patients/cities/')
                .then((response) => response.data),
        refetchOnMount: false,
        enabled: !cityId?.length
    });

    const options = selectOptionsParser(data ?? [], 'title', 'id')

    const onConfirm = () => {
        if (selectedId) {
            cityService.setCityId(selectedId?.toString())
            onClose()
        }
    }

    return (
        <>
            <Modal
                title={<h2 className={styles.title}>Выберите свой город</h2>}
                loading={isLoading}
                open={open}
                onCancel={onClose}
                centered
                onOk={onConfirm}
                okText={'Сохранить'}
                cancelText={'Закрыть'}
            >
                <div className={styles.container}>
                        <Select
                            showSearch
                            placeholder={`Выберите город`}
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={options}
                            // popupMatchSelectWidth={false}
                            onChange={(value: number) => {
                                setSelectedId(value)
                            }}
                            style={{
                                minWidth: 300,
                            }}
                        />
                </div>
            </Modal>
        </>
    );
};
