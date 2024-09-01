export interface IGet<T> {
    count: number
    next: string
    previous: any
    results: T[]
}

export type FormInitialFieldsParamsType = {
    name: string;
    value: string | number | boolean | [] | object | null | undefined;
}

export interface IOptions {
    label: string
    value: any
}
