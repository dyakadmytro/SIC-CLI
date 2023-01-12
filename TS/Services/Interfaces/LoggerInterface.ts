
export interface LoggerInterface{
    push(data: any)

    last(): any | null

    get log()
}