export interface Product {
    description: string,
    id: number
}

export interface Performance {
    ram: number,
    cpu: number,
    error: boolean
}

export interface ServiceResponse {
    products: Product[]
    performance: Performance
}