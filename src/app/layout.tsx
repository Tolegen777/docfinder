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
            {/* Добавляем Google Tag Manager */}
            {/* Google Tag Manager */}
            <script dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-K9V3HP55');`
            }} />
            {/* End Google Tag Manager */}
            <link rel="icon" href="/favicon.png" /> {/* Фавикон */}
        </head>
        <body className={roboto.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K9V3HP55"
                    height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
            <Header />
            {children}
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
