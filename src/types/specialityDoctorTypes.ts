export interface ISpecDoctor {
    doctor_speciality_id: number
    doctor_profile_id: number
    doctor_full_name: string
    medical_speciality_title: string
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
}

export interface CurrentClinicBranchWorkingHour {
    start_time: string
}

export interface TodaysWorkSchedule {
    work_date: string
    clinic_branch: string
    working_hours: WorkingHour[]
}

export interface WorkingHour {
    start_time: string
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
