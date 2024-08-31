import styles from './styles.module.scss';
import React from 'react';
import Image from 'next/image';
import {CustomSkeleton} from "@/components/shared/skeleton/CustomSkeleton";
import userIcon from '../../../../public/icons/user.svg'

const DoctorDetailsSkeleton = () => {
    const items = [
        {
            width: 100,
            height: 40,
        },
        {
            width: 120,
            height: 40,
        },
        {
            width: 140,
            height: 40,
        },
        {
            width: '100%',
            height: 60,
        },
    ];

    return (
        <div className={styles.container}>
                <div className={styles.container_card}>
                    <div className={styles.container_card_img}>
                        <Image
                            src={userIcon}
                            alt={''}
                            height={60}
                            width={60}
                        />
                    </div>
                    <div className={styles.container_card_content}>
                        <div className={styles.container_card_content_info}>
                            <div
                                className={
                                    styles.container_card_content_info_main
                                }
                            >
                                {items.map((item, index) => (
                                    <CustomSkeleton
                                        key={index}
                                        width={item?.width}
                                        height={item?.height}
                                        borderRadius={5}
                                    />
                                ))}
                            </div>
                            <div
                                className={
                                    styles.container_card_content_info_btn
                                }
                            >
                                <CustomSkeleton
                                    width={20}
                                    height={20}
                                    borderRadius={5}
                                />
                            </div>
                        </div>
                        <div
                            className={
                                styles.container_card_content_description
                            }
                        >
                            <CustomSkeleton
                                width={'100%'}
                                height={80}
                                borderRadius={5}
                            />
                        </div>
                    </div>
                </div>
            <div className={styles.container_specs}>
                <CustomSkeleton
                    width={'200px'}
                    height={30}
                    borderRadius={5}
                />
                {[1,2,3,4].map(item => <div key={item} className={styles.container_specs_item}>
                    {[1, 2, 3].map(item => <CustomSkeleton
                        key={item}
                        width={'100%'}
                        height={40}
                        borderRadius={5}
                    />)}
                </div>)}
            </div>
        </div>
    );
};

export default DoctorDetailsSkeleton
