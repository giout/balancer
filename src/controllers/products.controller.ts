import { Request, Response, NextFunction } from "express"
import ProductService from "../grpc/ProductService"

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const microservice = new ProductService('localhost:4000')
    const response = await microservice.readProducts()
    res.json(response)
}

