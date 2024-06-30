export interface IGet<T> {
    count: number
    next: string
    previous: any
    results: T[]
}
