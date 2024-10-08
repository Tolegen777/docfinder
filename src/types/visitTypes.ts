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

export interface IReview {
    id: number
    author_name: string
    text: string
    rating: number
    is_reply: boolean
    parent_comment: any
    visit_id: number
    created_at: string
    updated_at: string
    author__last_name: string
    author__first_name: string
}
