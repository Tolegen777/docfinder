'use client'
import arrowdrop from '@/components/svg/dropdownarrow.svg'
import logo from '@/components/svg/logo.svg'
import {Button, Dropdown, Spin} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import {MdClose} from 'react-icons/md'
import {RxHamburgerMenu} from 'react-icons/rx'
import HeaderModal from '../HeaderModal/HeaderModal'
import styles from './header.module.scss'
import {useCreateAxiosInstance} from "@/hooks/useCreateAxiosInstance";
import {cityService} from "@/utils/services/cityService";
import {ICity} from "@/types/cityTypes";
import {useQuery} from "@tanstack/react-query";

function Header() {
    const apiInstance = useCreateAxiosInstance();
    const cityId = cityService.getCityId()

    const [isopen, setisopen] = useState(false)
    const [modal, setModal] = useState(false)

    const [activeCityId, setActiveCityId] = useState(cityId)

    const {data, isLoading} = useQuery({
        queryKey: ['citiesList'],
        queryFn: () =>
            apiInstance
                .get<ICity[]>('patients/cities/')
                .then((response) => response.data),
        refetchOnMount: false,
    });

    function modalFunction() {
        if (modal) {
            setModal(false)
        } else {
            setModal(true)
        }
    }

    const handleSetId = (id: number) => {
        if (id) {
            cityService.setCityId(id?.toString())
            setActiveCityId(id?.toString())
        }
    }

    const cityTitle = data?.find(item => item?.id?.toString() === activeCityId)?.title


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
                            <RxHamburgerMenu
                                size={25}
                                className={styles.burgermenu}
                                onClick={() => setisopen(true)}
                            />
                            <input
                                className={styles.headerInut}
                                placeholder='Врачи, Услуги, Клиники'
                            />
                            <button className={styles.btn}>найти</button>
                            <div
                                className={
                                    isopen
                                        ? styles.headerBurgermenu
                                        : styles.headerBurgermenuclose
                                }
                            >
                                <input
                                    className={styles.BurgermenuInut}
                                    placeholder='Врачи, Услуги, Клиники'
                                />
                                <button className={styles.Burgermenubtn}>найти</button>
                                <MdClose size={28} onClick={() => setisopen(false)}/>
                            </div>
                        </div>
                        <div className={styles.leftside}>
                            {isLoading ? <Spin/> : <Dropdown menu={{items}} placement='bottomLeft' arrow>
                                <Button className={styles.leftsidedrop}>
                                    {cityTitle ?? 'Выберите город'} <Image src={arrowdrop} alt=''/>
                                </Button>
                            </Dropdown>}
                            <button onClick={modalFunction} className={styles.leftsidebtn}>
                                Войти
                            </button>
                            <div
                                style={{
                                    display: modal ? 'block' : 'none'
                                }}
                            >
                                <HeaderModal setModal={modalFunction}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
