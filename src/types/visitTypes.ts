export interface ICreateVisit {
    patient_id: number
    doctor_id: number
    date: string
    visit_time_id: number
    clinic_branch_id: number
    procedure_id: number
    visit_price: string
    is_child: boolean
}

export interface ICreateReview {
    text: string,
    rating: number
}

