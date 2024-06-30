import React, {useState} from 'react';
import {Button, Modal, Select} from 'antd';
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {IProcedure} from "@/types/procedureTypes";
import {cityService} from "@/utils/services/cityService";
import styles from './styles.module.scss'
import {selectOptionsParser} from "@/utils/selectOptionsParser";

type Props = {
    open: boolean,
    onClose: () => void,
}

export const CityModal = ({onClose, open}: Props) => {

    const apiInstance = useCreateAxiosInstance();

    const [selectedId, setSelectedId] = useState<number | null>(null)

    const {data, isLoading} = useQuery({
        queryKey: ['citiesList'],
        queryFn: () =>
            apiInstance
                .get<IProcedure[]>('patients/cities/')
                .then((response) => response.data),
        refetchOnMount: false,
    });

    const options = selectOptionsParser(data, '', '')

    const onConfirm = () => {
        if (selectedId) {
            cityService.setCityId(selectedId?.toString())
        }
    }

    return (
        <>
            <Modal
                title={<h2 className={styles.title}>Выберите свой город</h2>}
                loading={isLoading}
                open={open}
                onCancel={onClose}
                width={600}
                centered
            >
                <div className={styles.container}>
                    <div>
                        <Select
                            showSearch
                            placeholder={`Выберите город`}
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={options}
                            popupMatchSelectWidth={false}
                            onChange={(value: number) => {
                                setSelectedId(value)
                            }}
                        />
                    </div>
                    <Button
                        onClick={() => onConfirm()}
                        disabled={!selectedId}
                    >
                        Сохранить
                    </Button>
                </div>
            </Modal>
        </>
    );
};
