import dynamic from 'next/dynamic';

// Динамический импорт с отключением SSR (Server-Side Rendering)
const PartnerSegmentsCreateUpdaterForm = dynamic(() => import('@/components/Profile/ProfileUpdateForm/ProfileUpdateForm'), { ssr: false });
const PatientVisits = dynamic(() => import('@/components/Profile/PatientVisits/PatientVisits'), { ssr: false });

export default function Profile() {
    return (
        <div>
            <PartnerSegmentsCreateUpdaterForm />
            <PatientVisits />
        </div>
    );
}
