// app/components/SearchComponent.tsx
'use client';

import React, {useState, useEffect} from 'react';
import {Input} from 'antd';
import useDebounce from '@/hooks/useDebounce';
import styles from './styles.module.scss';
import {useStateContext} from "@/contexts";

const CustomSearchInput = () => {
    const {dispatch} = useStateContext();

    const [inputValue, setInputValue] = useState<string>('');
    const debouncedValue = useDebounce(inputValue, 300);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' && debouncedValue?.length) {
            dispatch({type: 'SET_CLINIC_QUERY', payload: ''});
        }
        setInputValue(e.target.value);

    };

    // Вызываем dispatch для сохранения debouncedValue в контекст
    useEffect(() => {
        if (debouncedValue?.length) {
            dispatch({type: 'SET_CLINIC_QUERY', payload: debouncedValue});
        }
    }, [debouncedValue]);

    return (
        <div className={styles.searchContainer}>
            <Input.Search
                placeholder="Введите текст для поиска..."
                value={inputValue}
                onChange={handleInputChange}
                className={styles.searchInput}
                allowClear
                size={"large"}
            />
        </div>
    );
};

export default CustomSearchInput;
