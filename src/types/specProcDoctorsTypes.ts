export interface ISpecProcDoctor {
    doctor_speciality_id?: number
    doctor_profile_id: number
    doctor_full_name: string
    medical_speciality_title?: string
    experience_years: number
    franchise_employee: string
    current_clinic_branch_title?: string
    current_clinic_branch_address?: string
    rating: number
    reviews_count: number
    current_clinic_branch_working_hours: CurrentClinicBranchWorkingHour[]
    todays_work_schedule: TodaysWorkSchedule[]
    nearest_week_work_schedule: NearestWeekWorkSchedule[]
    doctor_procedure_consultation_price?: DoctorProcedureConsultationPrice

    doctor_speciality_doctor_procedures?: DoctorSpecialityDoctorProcedure[]

    doctor_photos: DoctorPhoto[]

    doctor_procedure_id?: number
    medical_procedure_title?: string
    doctor_procedure_price?: DoctorProcedurePrice
    doctor_category?: string
}

export interface CurrentClinicBranchWorkingHour {
    start_time: string
    start_time_id: number
}

export interface TodaysWorkSchedule {
    work_date: string
    clinic_branch: string
    working_hours: WorkingHour[]
}

export interface WorkingHour {
    start_time: string
    start_time_id: number
    clinic_branch_id: number
}

export interface NearestWeekWorkSchedule {
    work_date: string
    clinic_branch: string
    working_hours: WorkingHour[]
}

export interface DoctorProcedureConsultationPrice {
    id: number
    is_active: boolean
    price_date: string
    default_price: number
    discount: number
    final_price: number
    is_for_children: boolean
    child_age_from?: string
    child_age_to?: string
    created_at: string
    updated_at: string
}

export interface DoctorProcedurePrice {
    id: number
    is_active: boolean
    price_date: string
    default_price: number
    discount: number
    final_price: number
    is_for_children: boolean
    child_age_from?: string
    child_age_to?: string
    created_at: string
    updated_at: string
}

export interface DoctorSpecialityDoctorProcedure {
    id: number
    med_proc_info: MedProcInfo
    is_active: boolean
    comission_amount: number
    price: Price
}

export interface MedProcInfo {
    id: number
    title: string
    slug: string
    description: string
    created_at: string
    updated_at: string
}

export interface Price {
    id: number
    is_active: boolean
    price_date: string
    default_price: number
    discount: number
    final_price: number
    is_for_children: boolean
    child_age_from?: string
    child_age_to?: string
    created_at: string
    updated_at: string
}

export interface DoctorPhoto {
    id: number
    photo: string
    title_code: string
    created_at: string
    updated_at: string
    doctor_profile: number
}
