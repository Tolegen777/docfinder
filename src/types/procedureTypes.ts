export interface IProcedure {
    medical_speciality_id: number
    medical_speciality_title: string
    medical_speciality_first_letter: string
    doctor_profiles_count: number
    medical_procedures_list: MedicalProceduresList[]
}

export interface MedicalProceduresList {
    medical_procedure_id: number
    medical_procedure_title: string
    medical_procedure_title_first_letter: string
    doctor_profiles_count: number
}
