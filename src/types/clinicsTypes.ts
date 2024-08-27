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
    id: number
    rating: number
    full_name: string
    photos_list: PhotosList2[]
    experience_years: number
    reviews: Review2[]
    reviews_count: number
    todays_work_schedule: TodaysWorkSchedule2[]
    nearest_week_work_schedule: NearestWeekWorkSchedule2[]
}

export interface PhotosList2 {
    id: number
    photo: string
    title_code: string
    created_at: string
    updated_at: string
    doctor_profile: number
}

export interface Review2 {
    reviews__id: number
    reviews__author__first_name: string
    reviews__author__last_name: string
    reviews__text: string
    reviews__rating: number
    reviews__created_at: string
}

export interface TodaysWorkSchedule2 {
    doctor_work_schedule_detailed_api_view: DoctorWorkScheduleDetailedApiView
}

export interface NearestWeekWorkSchedule2 {
    doctor_work_schedule_detailed_api_view: DoctorWorkScheduleDetailedApiView2
}
