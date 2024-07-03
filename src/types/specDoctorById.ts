export interface ISpecDoctorById {
    doctor_speciality_id: number
    doctor_profile_id: number
    doctor_full_name: string
    medical_speciality_id: number
    experience_years: number
    franchise_employee: string
    current_clinic_branch_title: string
    current_clinic_branch_address: string
    rating: number
    reviews: Review[]
    reviews_count: number
    current_clinic_branch_working_hours: CurrentClinicBranchWorkingHour[]
    todays_work_schedule: TodaysWorkSchedule[]
    nearest_week_work_schedule: NearestWeekWorkSchedule[]
    doctor_procedure_consultation_price: DoctorProcedureConsultationPrice
    list_of_specialities: ListOfSpeciality[]
    list_of_procedures: ListOfProcedure[]
    specialities_and_procedures: SpecialitiesAndProcedure[]
    doctor_category: string
    doctor_description: string
}

export interface Review {
    reviews__id: number
    reviews__author__first_name: string
    reviews__author__last_name: string
    reviews__text: string
    reviews__rating: number
    reviews__created_at: string
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
    working_hours: WorkingHour2[]
}

export interface WorkingHour2 {
    start_time: string
}

export interface DoctorProcedureConsultationPrice {
    id: number
    is_active: boolean
    price_date: string
    default_price: number
    discount: number
    final_price: number
    is_for_children: boolean
    child_age_from: string
    child_age_to: string
    created_at: string
    updated_at: string
}

export interface ListOfSpeciality {
    medical_speciality_title: string
    medical_speciality_id: number
}

export interface ListOfProcedure {
    medical_procedure_title: string
    medical_procedure_id: number
}

export interface SpecialitiesAndProcedure {
    speciality: Speciality
    procedures: Procedure[]
}

export interface Speciality {
    doctor_speciality_object_id: number
    is_active: boolean
    medical_speciality_id: number
    medical_speciality_title: string
}

export interface Procedure {
    doctor_procedure_id: number
    medical_procedure_id: number
    medical_procedure_title: string
}