"use client";
import styles from "./emirmedslider.module.scss";
import "./emirmed.css";
import "swiper/css";
import Image from "next/image";
import emirmedimage from "@/components/svg/emirmed.svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import filialimage from "@/components/svg/filial.svg";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import arrow from "@/components/svg/arrowemimed.svg";
import Link from "next/link";
import abstract01 from "@/assets/Rectangle 129.png";
import abstract02 from "@/assets/Rectangle 130.png";
import abstract03 from "@/assets/Rectangle 131.png";
import { useState } from "react";
import mapsvg from "@/components/svg/svgMap.svg";
import timesvg from "@/components/svg/times.svg";
const EmirmedSlider = () => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "1st menu item",
    },
    {
      key: "2",
      label: "2nd menu item",
    },
    {
      key: "3",
      label: "3rd menu item",
    },
  ];

  const images = [abstract01, abstract02, abstract03];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
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
                    <Image src={emirmedimage} alt="" width={300} />
                    <h1 className={styles.title}>Медицинский центр ЭМИРМЕД</h1>
                    <span className={styles.pretitle}>Алматы</span>
                    <div className={styles.info}>
                      <span className={styles.info__grade}>9.1</span>
                      <Link href="" className={styles.info__from}>
                        5800 отзывов
                      </Link>
                    </div>
                    <div className={styles.filialbox}>
                      <Image src={filialimage} alt="" />
                      <span className={styles.filial}>Филиалов: 7</span>
                    </div>
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                      <Button className={styles.btn}>
                        ул. Розыбакиева, 37В (выше Райымбека)
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
                    <button className={styles.onlinebtn}>Онлайн запись</button>
                  </div>
                  <div className={styles.slider}>
                    <div className={styles.mainImage}>
                      <Image src={selectedImage} alt="Selected" />
                    </div>
                    <div className={styles.thumbnailContainer}>
                      {images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`Thumbnail ${index}`}
                          className={styles.thumbnail}
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.slide}>
                  <div className={styles.emirmed__content__sliders__box}>
                    <Image src={emirmedimage} alt="" width={300} />
                    <h1 className={styles.title}>Медицинский центр ЭМИРМЕД</h1>
                    <span className={styles.pretitle}>Алматы</span>
                    <div className={styles.info}>
                      <span className={styles.info__grade}>9.1</span>
                      <Link href="" className={styles.info__from}>
                        5800 отзывов
                      </Link>
                    </div>
                    <div className={styles.filialbox}>
                      <Image src={filialimage} alt="" />
                      <span className={styles.filial}>Филиалов: 7</span>
                    </div>
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                      <Button className={styles.btn}>
                        ул. Розыбакиева, 37В (выше Райымбека)
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
                    <button className={styles.onlinebtn}>Онлайн запись</button>
                  </div>
                  <div className={styles.slider}>
                    <div className={styles.mainImage}>
                      <Image src={selectedImage} alt="Selected" />
                    </div>
                    <div className={styles.thumbnailContainer}>
                      {images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={`Thumbnail ${index}`}
                          className={styles.thumbnail}
                          onClick={() => setSelectedImage(image)}
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
