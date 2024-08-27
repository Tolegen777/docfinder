"use client";
import styles from "./emirmedslider.module.scss";
import "swiper/css";
import Image from "next/image";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Scrollbar} from "swiper/modules";
import filialimage from "@/components/svg/filial.svg";
import {Button, Dropdown} from "antd";
import arrow from "@/components/svg/arrowemimed.svg";
import Link from "next/link";
import React, {useState} from "react";
import mapsvg from "@/components/svg/svgMap.svg";
import timesvg from "@/components/svg/times.svg";
import {IClinicById} from "@/types/clinicsTypes";
import ClinicBookingModal from "@/components/Clinic/ClinicBookingModal/ClinicBookingModal";

const EmirmedSlider = ({data}: {data: IClinicById | undefined}) => {
  const items = data?.franchise_branches_in_the_city?.map(item => ({
    key: item?.id,
    label: item?.title
  }))

  const images = data?.list_of_photos?.filter((_, index) => index < 3)?.map(item => item?.photo);

  const [selectedImage, setSelectedImage] = useState(images?.[0]);

  const [openBookingModal, setOpenBookingModal] = useState(false)

  const handleBookClinic = () => {
    setOpenBookingModal(true)
  }

  return (
      <div  className={styles.container}>
        <ClinicBookingModal
            open={openBookingModal}
            closeModal={() => setOpenBookingModal(false)}
        />
        <div className={styles.emirmed}>
            <div className={styles.emirmed__content}>
              <div className={styles.emirmed__content__sliders}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    navigation
                    onSwiper={(swiper: any) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                >
                  <SwiperSlide>
                    <div className={styles.slide}>
                      <div className={styles.emirmed__content__sliders__box}>
                        <Image src={data?.photo_url ?? ''} alt="" width={300} height={40} unoptimized={true}/>
                        <h1 className={styles.title}>{data?.title}</h1>
                        <span className={styles.pretitle}>{data?.address}</span>
                        <div className={styles.info}>
                          <span className={styles.info__grade}>{data?.rating?.toFixed(2)}</span>
                          <Link href="" className={styles.info__from}>
                            {data?.reviews_count} отзывов
                          </Link>
                        </div>
                        <div className={styles.filialbox}>
                          <Image src={filialimage} alt="" unoptimized={true}/>
                          <span
                              className={styles.filial}>Филиалов: {data?.franchise_branches_in_the_city?.length}</span>
                        </div>
                        <Dropdown menu={{items}} placement="bottom" arrow>
                          <Button className={styles.btn}>
                            {data?.address}
                            <Image src={arrow} alt="" width={15} unoptimized={true}/>
                          </Button>
                        </Dropdown>
                        <div className={styles.maps}>
                          <Image src={mapsvg} alt="" unoptimized={true}/>
                          <span>На карте</span>
                        </div>
                        {data?.working_hours?.some(item => item?.is_24_hours) && <div className={styles.times}>
                          <Image src={timesvg} alt="" unoptimized={true}/>
                          <span>{'Круглосуточно'}</span>
                        </div>}
                        {data?.franchise_title === 'Эмирмед' && <div className={styles.phone_wrapper}>
                          <div className={styles.phone}>{'+7 (707) 000-01-03'}</div>
                          <div className={styles.phone}>{'+7 (727) 355-11-11'}</div>
                          <div className={styles.phone}>{'+7 (747) 000-01-03'}</div>
                        </div>}
                        <button
                            className={styles.onlinebtn}
                            onClick={handleBookClinic}
                        >
                          Онлайн запись
                        </button>
                      </div>
                      <div className={styles.slider}>
                        <div className={styles.mainImage}>
                          <Image src={selectedImage ?? ''} alt="" width={450} height={300} unoptimized={true}/>
                        </div>
                        <div className={styles.thumbnailContainer}>
                        {images?.map((image, index) => (
                              <Image
                                  key={index}
                                  src={image}
                                  alt={``}
                                  className={styles.thumbnail}
                                  onClick={() => setSelectedImage(image)}
                                  width={150}
                                  height={150}
                                  unoptimized={true}
                              />
                          ))}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
        </div>
      </div>
  );
};

export default EmirmedSlider;
