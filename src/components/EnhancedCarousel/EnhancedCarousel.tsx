import React, { useState, useRef } from 'react';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import Image from 'next/image';
import { Skeleton } from 'antd';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/free-mode';

interface EnhancedCarouselProps {
    images: string[];
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({ images = [] }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const carouselRef = useRef<CarouselRef>(null);

    const handleThumbnailClick = (index: number): void => {
        carouselRef.current?.goTo(index);
        setCurrentSlide(index);
    };

    const handleSlideChange = (current: number): void => {
        setCurrentSlide(current);
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="relative rounded-xl overflow-hidden h-[600px] mb-8">
                <Carousel
                    ref={carouselRef}
                    effect="fade"
                    afterChange={handleSlideChange}
                    autoplay
                    autoplaySpeed={5000}
                >
                    {images.map((image, index) => (
                        <div key={index} className="h-[600px] relative">
                            <Image
                                src={image}
                                fill
                                priority={index === 0}
                                className="object-cover rounded-xl"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className="p-4 bg-white shadow-sm rounded-xl">
                <Swiper
                    modules={[FreeMode]}
                    spaceBetween={12}
                    slidesPerView={'auto'}
                    freeMode={true}
                    className="w-full"
                >
                    {images.length > 0 ? (
                        images.map((image, index) => (
                            <SwiperSlide key={index} className="!w-[150px] p-2">
                                <div
                                    className={clsx(
                                        'relative w-full h-24 cursor-pointer transition-all duration-300',
                                        'hover:opacity-100',
                                        currentSlide === index
                                            ? 'ring-4 ring-orange-500 rounded-lg opacity-100 scale-105'
                                            : 'ring-4 ring-gray-300 rounded-lg opacity-100 scale-105'
                                    )}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <Image
                                        src={image}
                                        fill
                                        className="object-cover rounded-lg"
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={index} className="!w-[150px]">
                                <Skeleton.Image active className="!h-24 !w-full rounded-lg" />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default EnhancedCarousel;
