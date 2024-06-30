import {ISpeciality} from "@/types/specialityTypes";


export interface TransformedData {
    letter: string;
    items: {
        medical_speciality_title: string;
        medical_speciality_id: number;
        doctor_profiles_count: number;
    }[];
}

export function transformSpecData(data: ISpeciality[]): TransformedData[] {
    const result: { [key: string]: TransformedData } = {};

    data.forEach(item => {
        const letter = item.medical_speciality_first_letter;

        if (!result[letter]) {
            result[letter] = {
                letter: letter,
                items: []
            };
        }

        result[letter].items.push({
            medical_speciality_title: item.medical_speciality_title,
            medical_speciality_id: item.medical_speciality_id,
            doctor_profiles_count: item.doctor_profiles_count
        });
    });

    return Object.values(result);
}
