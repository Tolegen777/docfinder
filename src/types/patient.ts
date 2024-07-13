export interface IPatientDefault {
  first_name: string | null
  last_name: string | null
  patronymic_name: string
  birth_date: any
  iin_number: string | null
  phone_number: string | null
}

export interface IPatient extends IPatientDefault{
  id: number
  email: string
}
