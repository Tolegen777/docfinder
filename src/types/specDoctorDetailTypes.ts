export interface ISpecDoctorDetailTypes {
    doctor_profile_id: number
    doctor_full_name: string
    experience_years: number
    franchise_employee: string
    current_clinic_branch_title: string
    current_clinic_branch_address: string
    rating: number
    reviews: any
    reviews_count: number
    current_clinic_branch_working_hours: CurrentClinicBranchWorkingHour[]
    todays_work_schedule: TodaysWorkSchedule[]
    nearest_week_work_schedule: NearestWeekWorkSchedule[]
    list_of_specialities: ListOfSpeciality[]
    list_of_procedures: ListOfProcedure[]
    specialities_and_procedures: SpecialitiesAndProcedure[]
    cheapest_procedure_data: CheapestProcedureData
    doctor_category: string
    doctor_description: string
    doctor_photos: DoctorPhoto[]
    doctor_full_description: DoctorFullDescription
}

export interface CurrentClinicBranchWorkingHour {
    start_time: string
    start_time_id: number
}

export interface TodaysWorkSchedule {
    work_date: string
    clinic_branch: string
    clinic_branch_id: number
    working_hours: WorkingHour[]
}

export interface WorkingHour {
    start_time: string
    start_time_id: number
}

export interface NearestWeekWorkSchedule {
    work_date: string
    clinic_branch: string
    clinic_branch_id: number
    working_hours: WorkingHour2[]
}

export interface WorkingHour2 {
    start_time: string
    start_time_id: number
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

export interface CheapestProcedureData {
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
    doctor_procedure_title: string
}

export interface DoctorPhoto {
    id: number
    photo: string
    title_code: string
    created_at: string
    updated_at: string
    doctor_profile: number
}

export interface DoctorFullDescription {
    "1": N1
    "2": N2
    "3": N3
    "5": N5
    "6": N6
    "7": N7
}

export interface N1 {
    title: string
    content: string
}

export interface N2 {
    title: string
    content: string
}

export interface N3 {
    title: string
    content: string
}

export interface N5 {
    title: string
    content: string
}

export interface N6 {
    title: string
    content: string
}

export interface N7 {
    title: string
    content: string
}
