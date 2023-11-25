import { Request, Response, NextFunction } from "express"
import ProductService from "../grpc/ProductService"

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    const microservice = new ProductService('localhost:4000')
    res.json(microservice.readProducts())
}

