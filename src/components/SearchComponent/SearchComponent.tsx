'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Input, Button, Spin, Empty, Drawer } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './SearchComponent.module.scss';
import { useQuery } from '@tanstack/react-query';
import useDebounce from "@/hooks/useDebounce";
import { RxHamburgerMenu } from 'react-icons/rx';

interface Clinic {
    title: string;
    id: number;
    city_title: string;
    city_id: number;
}

interface Doctor {
    full_name: string;
    id: number;
    city_title: string;
    city_id: number;
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
    const [userCityId, setUserCityId] = useState<number | null>(null); // Город пользователя
    const [isDrawerVisible, setDrawerVisible] = useState(false); // Состояние для открытия/закрытия Drawer
    const debouncedQuery = useDebounce(query, 500); // Используем кастомный хук для debounce на 500 мс
    const router = useRouter();

    // Получаем город пользователя из localStorage
    useEffect(() => {
        const cityId = localStorage.getItem('DOC_CLIENT_CITY_ID');
        if (cityId) {
            setUserCityId(Number(cityId));
        }
    }, []);

    const { data, isError } = useQuery<Root>({
        queryKey: ['search', debouncedQuery],
        queryFn: () => fetchSearchResults(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    // Сортировка данных: сперва показываем результаты для города пользователя
    const sortResultsByCity = (items: any[]) => {
        if (!userCityId) return items; // Если город не найден, не сортируем
        return [
            ...items.filter(item => item.city_id === userCityId), // Сначала город пользователя
            ...items.filter(item => item.city_id !== userCityId)  // Затем остальные города
        ];
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSelect = (type: string, id: number) => {
        if (type === 'clinic') {
            router.push(`/clinics/${id}`);
        } else if (type === 'doctor') {
            router.push(`/doctor/${id}`);
        } else if (type === 'procedure') {
            router.push(`/procedures/${id}`);
        } else if (type === 'speciality') {
            router.push(`/specialities/${id}`);
        }
        setQuery(''); // Очищаем инпут после выбора
        setDrawerVisible(false); // Закрываем drawer после выбора
    };

    const handleFindClick = () => {
        setQuery(''); // Очищаем инпут после нажатия на кнопку "Найти"
        // Добавьте логику, если нужно выполнить какой-то запрос при нажатии на "Найти"
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
                <RxHamburgerMenu style={{ fontSize: '24px' }} onClick={openDrawer} />
            </div>

            <Drawer
                title="Поиск"
                placement="top"
                closable={true}
                onClose={closeDrawer}
                open={isDrawerVisible}
                height="100%" // Занимает весь экран на мобильных устройствах
            >
                <div className={styles.searchContainer}>
                    <Input
                        placeholder="Ищите клиники, докторов, процедуры..."
                        value={query}
                        onChange={handleSearch}
                        className={styles.input}
                    />
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
                                                {sortResultsByCity(data.clinics).map(clinic => (
                                                    <div
                                                        key={clinic.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('clinic', clinic.id)}
                                                    >
                                                        {clinic.title} ({clinic.city_title})
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.doctors.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Доктора</div>
                                                {sortResultsByCity(data.doctors).map(doctor => (
                                                    <div
                                                        key={doctor.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('doctor', doctor.id)}
                                                    >
                                                        {doctor.full_name} ({doctor.city_title})
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
                    <div className={styles.inputContainer}>
                        <Input
                            placeholder="Начните вводить текст и находить клиники, докторов, процедуры..."
                            value={query}
                            onChange={handleSearch}
                            className={styles.input}
                        />
                        {/*<Button type="primary" className={styles.searchButton} onClick={handleFindClick}>Найти</Button>*/}
                    </div>
                    {/*{isLoading && <Spin className={styles.loadingSpinner} />}*/}
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
                                                {sortResultsByCity(data.clinics).map(clinic => (
                                                    <div
                                                        key={clinic.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('clinic', clinic.id)}
                                                    >
                                                        {clinic.title} ({clinic.city_title})
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                        {data.doctors.length > 0 && (
                                            <>
                                                <div className={styles.sectionTitle}>Доктора</div>
                                                {sortResultsByCity(data.doctors).map(doctor => (
                                                    <div
                                                        key={doctor.id}
                                                        className={styles.resultItem}
                                                        onClick={() => handleSelect('doctor', doctor.id)}
                                                    >
                                                        {doctor.full_name} ({doctor.city_title})
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
