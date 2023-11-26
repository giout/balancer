import { ServiceResponse } from "./service"

export interface PerformanceData {
    name: string,
    freeRam: number,
    freeCpu: number,
    processes: number,
    time: number,
    error: boolean
}

export interface ThreadResponse {
    name: string
    response: ServiceResponse
}