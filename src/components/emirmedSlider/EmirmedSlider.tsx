"use client";
import styles from "./emirmedslider.module.scss";
import "./emirmed.css";
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
      <>
        <ClinicBookingModal
            open={openBookingModal}
            closeModal={() => setOpenBookingModal(false)}
        />
        <div className={styles.emirmed}>
          <div className="container">
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
                        <Image src={data?.photo_url ?? ''} alt="" width={300} height={40} />
                        <h1 className={styles.title}>{data?.title}</h1>
                        <span className={styles.pretitle}>{data?.address}</span>
                        <div className={styles.info}>
                          <span className={styles.info__grade}>{data?.rating?.toFixed(2)}</span>
                          <Link href="" className={styles.info__from}>
                            {data?.reviews_count} отзывов
                          </Link>
                        </div>
                        <div className={styles.filialbox}>
                          <Image src={filialimage} alt="" />
                          <span className={styles.filial}>Филиалов: {data?.franchise_branches_in_the_city?.length}</span>
                        </div>
                        <Dropdown menu={{ items }} placement="bottom" arrow>
                          <Button className={styles.btn}>
                            {data?.address}
                            <Image src={arrow} alt="" width={15} />
                          </Button>
                        </Dropdown>
                        <div className={styles.maps}>
                          <Image src={mapsvg} alt="" />
                          <span>На карте</span>
                        </div>
                        <div className={styles.times}>
                          <Image src={timesvg} alt="" />
                          <span>На карте</span>
                        </div>
                        <button
                            className={styles.onlinebtn}
                            onClick={handleBookClinic}
                        >
                          Онлайн запись
                        </button>
                      </div>
                      <div className={styles.slider}>
                        <div className={styles.mainImage}>
                          <Image src={selectedImage ?? ''} alt="" width={450} height={300}  />
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
      </>
  );
};

export default EmirmedSlider;
