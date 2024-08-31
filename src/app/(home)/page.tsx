import dynamic from 'next/dynamic';

// Динамический импорт компонентов с отключением SSR
const Hero = dynamic(() => import('@/components/hero_v2/Hero'), { ssr: false });
const Reception = dynamic(() => import('@/components/reception/Reception'), { ssr: false });

export default function Home() {
    return (
        <main style={{ marginBottom: '5pc' }}>
            <Hero />
            <Reception />
        </main>
    );
}
