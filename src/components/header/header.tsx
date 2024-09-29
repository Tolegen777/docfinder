'use client'
import arrowdrop from '@/components/svg/dropdownarrow.svg'
import logo from '@/components/svg/logo.svg'
import {Button, Dropdown, MenuProps, Spin} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
// import {MdClose} from 'react-icons/md'
// import {RxHamburgerMenu} from 'react-icons/rx'
import HeaderModal from '../HeaderModal/HeaderModal'
import styles from './header.module.scss'
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {cityService} from "@/utils/services/cityService";
import {ICity} from "@/types/cityTypes";
import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosInstanceWithTokenLogic} from "@/api/axiosInstanceWithTokenLogic";
import {useStateContext} from "@/contexts";
import {IPatient} from "@/types/patient";
import {resetService} from "@/utils/services/resetService";
import {authApi} from "@/api/authApi";
import {useRouter} from "next/navigation";
import {EditOutlined} from "@ant-design/icons";

function Header() {
    const apiInstance = useCreateAxiosInstance();

    const router = useRouter()

    const {state, dispatch} = useStateContext()

    const {authUser, cityId} = state

    const [isopen, setisopen] = useState(false)
    const [modal, setModal] = useState(false)

    const {
        mutate: onLogout,
    } = useMutation({
        mutationKey: ['signout'],
        mutationFn: authApi.signOutUser,
    });

    const {data, isLoading} = useQuery({
        queryKey: ['citiesList'],
        queryFn: () =>
            apiInstance
                .get<ICity[]>('patients/cities/')
                .then((response) => response.data),
        refetchOnMount: false,
    });

    const {data: patientData, isFetching: patientLoading} = useQuery({
        queryKey: ['patientDetails', authUser],
        queryFn: () =>
            axiosInstanceWithTokenLogic
                .get<IPatient>(`patients/auth/patient-detail/`)
                .then((response) => response?.data),
        enabled: authUser,
        refetchOnMount: false
    });

    const userDropDownItems: MenuProps['items'] = [
        {
            key: '1',
            label: `Почта: ${patientData?.email ?? '-'}`,
            disabled: true
        },
        {
            key: '2',
            label: `Имя: ${patientData?.first_name ?? '-'}`,
            disabled: true
        },
        {
            key: '3',
            label: `Фамилия: ${patientData?.last_name ?? '-'}`,
            disabled: true
        },
        {
            key: '4',
            label: `Отчество: ${patientData?.patronymic_name ?? '-'}`,
            disabled: true
        },
        {
            key: '5',
            label: `Дата рождения: ${patientData?.birth_date ?? '-'}`,
            disabled: true
        },
        {
            key: '6',
            label: `ИИН: ${patientData?.iin_number ?? '-'}`,
            disabled: true
        },
        {
            key: '7',
            label: `Телефон: ${patientData?.phone_number ?? '-' }`,
            disabled: true
        },
        {
            key: '8',
            label: 'Редактировать',
            onClick: () => {
                router.push('/profile')
            },
            icon: <EditOutlined />
        },
        {
            key: '9',
            danger: true,
            label: 'Выйти',
            onClick: () => {
                resetService();
                onLogout();
            }
        }
    ];

    const cityTitle = data?.find(item => item?.id?.toString() === cityId)?.title

    const handleSetId = (id: number) => {
        if (id) {
            cityService.setCityId(id?.toString())
            dispatch({
                type: 'SET_CITY_ID',
                payload: id?.toString()
            })
        }
    }


    const items = data?.map((item: ICity) => ({
        key: item?.id,
        label: <div onClick={() => handleSetId(item?.id)}>{item?.title}</div>
    })) ?? []

    return (
        <>
            <header className={styles.header}>
                <div className='container'>
                    <div className={styles.content}>
                        <div className={styles.rigthside}>
                            <Link href='/' className={styles.logo}>
                                <Image src={logo} alt=''/>
                            </Link>
                            {/*<RxHamburgerMenu*/}
                            {/*    size={25}*/}
                            {/*    className={styles.burgermenu}*/}
                            {/*    onClick={() => setisopen(true)}*/}
                            {/*/>*/}
                            {/*<input*/}
                            {/*    className={styles.headerInut}*/}
                            {/*    placeholder='Врачи, Услуги, Клиники'*/}
                            {/*/>*/}
                            {/*<button className={styles.btn}>найти</button>*/}
                            {/*<div*/}
                            {/*    className={*/}
                            {/*        isopen*/}
                            {/*            ? styles.headerBurgermenu*/}
                            {/*            : styles.headerBurgermenuclose*/}
                            {/*    }*/}
                            {/*>*/}
                            {/*    <input*/}
                            {/*        className={styles.BurgermenuInut}*/}
                            {/*        placeholder='Врачи, Услуги, Клиники'*/}
                            {/*    />*/}
                            {/*    <button className={styles.Burgermenubtn}>найти</button>*/}
                            {/*    <MdClose size={28} onClick={() => setisopen(false)}/>*/}
                            {/*</div>*/}
                        </div>
                        <div className={styles.leftside}>
                            {isLoading ? <Spin/> : <Dropdown
                                menu={{items}}
                                placement='bottomLeft'
                                arrow
                                trigger={['click']}
                            >
                                <Button className={styles.leftsidedrop}>
                                    {cityTitle ?? 'Выберите город'} <Image src={arrowdrop} alt=''/>
                                </Button>
                            </Dropdown>}
                            {!authUser ? <button
                                onClick={() => setModal(true)}
                                className={styles.leftsidebtn}
                            >
                                Войти
                            </button> : patientLoading ? <Spin/> : <Dropdown
                                menu={{items: userDropDownItems}}
                                arrow
                                trigger={['click']}
                            >
                                <Button className={styles.leftsidedrop} style={{color: '#ff6200', fontSize: '16px'}}>
                                    {patientData?.first_name ?? patientData?.email ?? patientData?.phone_number}
                                </Button>
                            </Dropdown>}
                            <HeaderModal setModal={() => setModal(false)} open={modal}/>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
