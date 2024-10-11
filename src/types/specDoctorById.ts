import {IReview} from "@/types/visitTypes";
import {NewNearestWeekWorkSchedule} from "@/types/specProcDoctorsTypes";

export interface ISpecDoctorById {
    doctor_speciality_id: number;
    doctor_profile_id: number;
    doctor_full_name: string;
    medical_speciality_id: number;
    medical_speciality_title: string;
    experience_years: number;
    franchise_employee: string;
    current_clinic_branch_title: string;
    current_clinic_branch_address: string;
    rating: number;
    reviews: IReview[]
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
    doctor_procedures_data: DoctorProceduresData[];
    doctor_full_description?: IDoctorFullDescription

    new_nearest_week_work_schedule?: NewNearestWeekWorkSchedule[]
}

export interface DoctorProceduresData {
    id: number;
    med_proc_info: MedProcInfo;
    is_active: boolean;
    comission_amount: number;
    price: DoctorProcedureConsultationPrice;
}

export interface MedProcInfo {
    title: string;
    id: number;
    description: string;
    slug: string;
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
    start_time_id: number
}

export interface TodaysWorkSchedule {
    work_date: string
    clinic_branch: string
    working_hours: WorkingHour[]
    clinic_branch_id: number;
}

export interface WorkingHour {
    start_time: string
    start_time_id: number
}

export interface NearestWeekWorkSchedule {
    work_date: string
    clinic_branch: string
    clinic_branch_id?: number
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
    doctor_procedure_title: string;
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

export interface IDoctorFullDescription {
    [key: string]: {
    title: string;
    content: string;
}
}
