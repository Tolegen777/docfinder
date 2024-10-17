import Image from 'next/image';
import { useState } from 'react';
import {Spin} from "antd";

type Props = {
    src: string;
    alt: string;
    width: number;
    height: number;
    defaultSrc: string; // Дефолтное изображение
};

const ImageWithFallback = ({ src, alt, width, height, defaultSrc }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(src);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setImgSrc(defaultSrc); // При ошибке загрузки показываем дефолтное изображение
    };

    return (
        <>
            {isLoading && <Spin />} {/* Скелетон при загрузке */}
            <Image
                src={imgSrc}
                alt={alt}
                width={width}
                height={height}
                onLoad={handleLoad}
                onError={handleError}
                style={{ display: isLoading ? 'none' : 'block' }} // Прячем изображение, пока не загрузилось
            />
        </>
    );
};

export default ImageWithFallback;
