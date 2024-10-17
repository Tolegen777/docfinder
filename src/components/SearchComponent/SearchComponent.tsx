'use client';

import { useState, ChangeEvent } from 'react';
import { Input, Button, Spin, Empty, Drawer } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './SearchComponent.module.scss';
import { useQuery } from '@tanstack/react-query';
import useDebounce from "@/hooks/useDebounce";

interface Clinic {
    title: string;
    id: number;
}

interface Doctor {
    full_name: string;
    id: number;
}

interface Procedure {
    title: string;
    id: number;
}

interface Speciality {
    title: string;
    id: number;
}

interface Root {
    clinics: Clinic[];
    doctors: Doctor[];
    procedures: Procedure[];
    specialities: Speciality[];
}

const fetchSearchResults = async (query: string) => {
    const { data } = await axios.get<Root>(
        `https://backend.docfinder.kz/api/v1/patients/search/?query=${query}`
    );
    return data;
};

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [isDrawerVisible, setDrawerVisible] = useState(false); // Состояние для открытия/закрытия Drawer
    const debouncedQuery = useDebounce(query, 500); // Используем кастомный хук для debounce на 500 мс
    const router = useRouter();

    const { data, isLoading, isError } = useQuery<Root>({
        queryKey: ['search', debouncedQuery],
        queryFn: () => fetchSearchResults(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelect = (type: string, id: number) => {
        if (type === 'clinic') {
            router.push(`/clinics/${id}`);
        } else if (type === 'doctor') {
            router.push(`/doctors/${id}`);
        } else if (type === 'procedure') {
            router.push(`/procedures/${id}`);
        } else if (type === 'speciality') {
            router.push(`/doctor/${id}`);
        }
        setDrawerVisible(false); // Закрываем drawer после выбора
    };

    const openDrawer = () => {
        setDrawerVisible(true);
    };

    const closeDrawer = () => {
        setDrawerVisible(false);
    };

    return (
        <>
            {/* Иконка и Drawer только для мобильной версии */}
            <div className={styles.mobileSearch}>
                <SearchOutlined style={{ fontSize: '24px' }} onClick={openDrawer} />
            </div>

            <Drawer
                title="Поиск"
                placement="top"
                closable={true}
                onClose={closeDrawer}
                visible={isDrawerVisible}
                height="100%" // Занимает весь экран на мобильных устройствах
            >
                <div className={styles.searchContainer}>
                    <Input
                        placeholder="Ищите клиники, докторов, процедуры..."
                        value={query}
                        onChange={handleSearch}
                        className={styles.input}
                    />
                    {isLoading && <Spin className={styles.loadingSpinner} />}
                    {data && !isError && debouncedQuery && (
                        <div className={styles.customDropdown}>
                            <div className={styles.resultsContainer}>
                                {data.clinics.length === 0 &&
                                data.doctors.length === 0 &&
                                data.procedures.length === 0 &&
                                data.specialities.length === 0 ? (
                                    <Empty description="Ничего не найдено" />
                                ) : (
                                    <>
                                        {data.clinics.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Клиники</div>
                                                {data.clinics.map(clinic => (
                                                    <div
                                                        key={clinic.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('clinic', clinic.id)}
                                                    >
                                                        {clinic.title}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.doctors.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Доктора</div>
                                                {data.doctors.map(doctor => (
                                                    <div
                                                        key={doctor.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('doctor', doctor.id)}
                                                    >
                                                        {doctor.full_name}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.procedures.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Процедуры</div>
                                                {data.procedures.map(procedure => (
                                                    <div
                                                        key={procedure.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('procedure', procedure.id)}
                                                    >
                                                        {procedure.title}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.specialities.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Специальности</div>
                                                {data.specialities.map(speciality => (
                                                    <div
                                                        key={speciality.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('speciality', speciality.id)}
                                                    >
                                                        {speciality.title}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Drawer>

            {/* Стандартный поиск для десктопной версии */}
            <div className={styles.desktopSearch}>
                <div className={styles.searchContainer}>
                    <Input
                        placeholder="Ищите клиники, докторов, процедуры..."
                        value={query}
                        onChange={handleSearch}
                        className={styles.input}
                    />
                    <Button type="primary" className={styles.searchButton}>Найти</Button>
                    {isLoading && <Spin className={styles.loadingSpinner} />}
                    {data && !isError && debouncedQuery && (
                        <div className={styles.customDropdown}>
                            <div className={styles.resultsContainer}>
                                {data.clinics.length === 0 &&
                                data.doctors.length === 0 &&
                                data.procedures.length === 0 &&
                                data.specialities.length === 0 ? (
                                    <Empty description="Ничего не найдено" />
                                ) : (
                                    <>
                                        {data.clinics.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Клиники</div>
                                                {data.clinics.map(clinic => (
                                                    <div
                                                        key={clinic.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('clinic', clinic.id)}
                                                    >
                                                        {clinic.title}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.doctors.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Доктора</div>
                                                {data.doctors.map(doctor => (
                                                    <div
                                                        key={doctor.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('doctor', doctor.id)}
                                                    >
                                                        {doctor.full_name}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.procedures.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Процедуры</div>
                                                {data.procedures.map(procedure => (
                                                    <div
                                                        key={procedure.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('procedure', procedure.id)}
                                                    >
                                                        {procedure.title}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.specialities.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Специальности</div>
                                                {data.specialities.map(speciality => (
                                                    <div
                                                        key={speciality.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('speciality', speciality.id)}
                                                    >
                                                        {speciality.title}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchComponent;
