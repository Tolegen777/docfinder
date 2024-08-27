import React from 'react';
import {Carousel} from 'antd';
import styles from './styles.module.scss';
import BannerItem from "@/components/Clinic/AppBanner/BannerItem";

type Props = {
    data: Array<string> | undefined;
};

const AppBanner = ({data}: Props) => {
    return (
        <div>
            <Carousel
                className={styles.sliderContainer}
                fade
                autoplay
                // arrows
            >
                {data?.map((item, index) => (
                    <BannerItem
                        key={index}
                        backgroundImg={item}
                    />
                ))}
            </Carousel>
        </div>
    );
};

export default AppBanner;
