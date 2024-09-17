export interface IClinics {
    id: number
    title: string
    description: string
    address: string
    latitude: number
    longitude: number
    city_id: number
    city_title: string
    list_of_amenities: ListOfAmenity[]
    rating: number
    reviews_count: number
    photo_url: string
    franchise_title: string
    list_of_photos: ListOfPhoto[]
    franchise_photos: FranchisePhoto[]
    working_hours: WorkingHour[]
    franchise_branches_in_the_city: FranchiseBranchesInTheCity[]
}




export interface IClinicById {
    id: number
    title: string
    description: string
    address: string
    latitude: number
    longitude: number
    city_id: number
    city_title: string
    list_of_amenities: ListOfAmenity[]
    rating: number
    reviews_count: number
    photo_url: string
    franchise_title: string
    list_of_photos: ListOfPhoto[]
    franchise_photos: FranchisePhoto[]
    working_hours: WorkingHour[]
    franchise_branches_in_the_city: FranchiseBranchesInTheCity[]
    clinic_branch_doctors_list: ClinicBranchDoctorsList
    doctors_list: DoctorsList[]
}

export interface ListOfAmenity {
    id: number
    amenity_title: string
    amenity_description: string
    amenity_id: string
    clinic_branch: number
    amenity: number
}

export interface ListOfPhoto {
    id: number
    photo: string
    title_code: string
    created_at: string
    updated_at: string
    branch: number
    is_main?: boolean
}

export interface FranchisePhoto {
    id: number
    photo: string
    title_code: string
    created_at: string
    updated_at: string
    franchise: number
}

export interface WorkingHour {
    is_24_hours?: boolean;
    id: number
    day_of_week: string
    open_time: string
    close_time: string
    created_at: string
    updated_at: string
    branch: number
}

export interface FranchiseBranchesInTheCity {
    title: string
    id: number
}

export interface ClinicBranchDoctorsList {
    count: number
    next: string
    previous: any
    results: Result[]
}

export interface Result {
    id: number
    rating: number
    full_name: string
    photos_list: PhotosList[]
    experience_years: number
    reviews: Review[]
    reviews_count: number
    todays_work_schedule: TodaysWorkSchedule[]
    nearest_week_work_schedule: NearestWeekWorkSchedule[]
}

export interface PhotosList {
    id: number
    photo: string
    title_code: string
    created_at: string
    updated_at: string
    doctor_profile: number
}

export interface Review {
    reviews__id: number
    reviews__author__first_name: string
    reviews__author__last_name: string
    reviews__text: string
    reviews__rating: number
    reviews__created_at: string
}

export interface TodaysWorkSchedule {
    doctor_work_schedule_detailed_api_view: DoctorWorkScheduleDetailedApiView
}

export interface DoctorWorkScheduleDetailedApiView {
    clinic_branch: string
    clinic_branch_id: number
    doctor_profile_short_name: string
    doctor_profile_full_name: string
    doctor_profile_id: number
    doctor_work_schedule_id: number
    work_date: string
    working_hours_list: WorkingHoursList[]
}

export interface WorkingHoursList {
    code: string
    doctor_availability: boolean
    start_time: string
    time_slot_id: number
    reserved: boolean
    patient_clinic_visit_id?: number
    panel_colour: string
}

export interface NearestWeekWorkSchedule {
    doctor_work_schedule_detailed_api_view: DoctorWorkScheduleDetailedApiView2
}

export interface DoctorWorkScheduleDetailedApiView2 {
    clinic_branch: string
    clinic_branch_id: number
    doctor_profile_short_name: string
    doctor_profile_full_name: string
    doctor_profile_id: number
    doctor_work_schedule_id: number
    work_date: string
    working_hours_list: WorkingHoursList2[]
}

export interface WorkingHoursList2 {
    code: string
    doctor_availability: boolean
    start_time: string
    time_slot_id: number
    reserved: boolean
    patient_clinic_visit_id?: number
    panel_colour: string
}


export interface DoctorsList {
    cheapest_procedure_data?: Cheapestproceduredatum;
    current_clinic_branch_address?: string;
    current_clinic_branch_title?: string;
    current_clinic_branch_working_hours: Currentclinicbranchworkinghour[];
    doctor_category: string;
    doctor_description: string;
    doctor_full_description?: Doctorfulldescription;
    doctor_full_name: string;
    doctor_photos: Doctorphoto[];
    doctor_procedure_consultation_price?: Cheapestproceduredatum;
    doctor_procedures_data: (Doctorproceduresdatum | Doctorproceduresdata2)[];
    doctor_profile_id: number;
    experience_years: number;
    franchise_employee: string;
    list_of_procedures: Listofprocedure[];
    list_of_specialities: Listofspeciality[];
    nearest_week_work_schedule: Nearestweekworkschedule[];
    rating: number;
    reviews?: any;
    reviews_count: number;
    specialities_and_procedures: (Specialitiesandprocedure | Specialitiesandprocedures2 | Specialitiesandprocedures3)[];
    todays_work_schedule: Nearestweekworkschedule[];
}

interface Specialitiesandprocedures3 {
    speciality: Speciality;
    procedures: Procedure[];
}

interface Specialitiesandprocedures2 {
    speciality: Speciality;
    procedures: any[];
}

interface Specialitiesandprocedure {
    speciality: Speciality;
    procedures: Procedure[];
}

interface Procedure {
    doctor_procedure_id: number;
    medical_procedure_id: number;
    medical_procedure_title: string;
}

interface Speciality {
    doctor_speciality_object_id: number;
    is_active: boolean;
    medical_speciality_id: number;
    medical_speciality_title: string;
}

interface Nearestweekworkschedule {
    work_date: string;
    clinic_branch: string;
    clinic_branch_id: number;
    working_hours: Currentclinicbranchworkinghour[];
}

interface Listofspeciality {
    medical_speciality_title: string;
    medical_speciality_id: number;
}

interface Listofprocedure {
    medical_procedure_title: string;
    medical_procedure_id: number;
}

interface Doctorproceduresdata2 {
    id: number;
    med_proc_info: Medprocinfo;
    is_active: boolean;
    comission_amount: number;
    price?: Cheapestproceduredatum;
}

interface Doctorproceduresdatum {
    id: number;
    med_proc_info: Medprocinfo;
    is_active: boolean;
    comission_amount: number;
    price: Cheapestproceduredatum;
}

interface Medprocinfo {
    title: string;
    id: number;
    description: string;
    slug: string;
}

interface Doctorphoto {
    id: number;
    photo: string;
    title_code: string;
    created_at: string;
    updated_at: string;
    doctor_profile: number;
}

interface Doctorfulldescription {
    '2': _2;
    '4': _2;
    '5': _2;
    '1'?: _2;
    '6'?: _2;
    '3'?: _2;
}

interface _2 {
    title: string;
    content: string;
}

interface Currentclinicbranchworkinghour {
    start_time: string;
    start_time_id: number;
}

interface Cheapestproceduredatum {
    id: number;
    is_active: boolean;
    price_date: string;
    default_price: number;
    discount: number;
    final_price: number;
    is_for_children: boolean;
    child_age_from: string;
    child_age_to: string;
    created_at: string;
    updated_at: string;
    doctor_procedure_title: string;
}

