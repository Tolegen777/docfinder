// layout.tsx
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import './globals.scss';
import { Lato } from 'next/font/google';
import Providers from "@/utils/providers";

// Динамический импорт Header и Footer для оптимизации загрузки
const Header = dynamic(() => import('@/components/header/header'));
const Footer = dynamic(() => import('@/components/footer/Footer'));

// Настройка шрифта Lato
const roboto = Lato({
    weight: ['400', '700'], // Используйте только необходимые веса
    subsets: ['latin'], // Убедитесь, что используете только нужные наборы символов
    style: ['normal'], // Оптимизация стилей
    display: 'swap', // Быстрая загрузка шрифта
    adjustFontFallback: false, // Отключение fallback для улучшения производительности
});

export const metadata: Metadata = {
    title: "Docfinder",
    description: "Платформа для онлайн-записи на прием к врачам.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <head>
            <link rel="icon" href="/favicon.png" /> {/* Добавьте этот тег для отображения фавикона */}
        </head>
        <body className={roboto.className}>
        <Providers>
            <Header />
            {children}
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
