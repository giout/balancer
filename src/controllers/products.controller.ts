import { Request, Response, NextFunction } from "express"
import ProductServiceCnn from "../grpc/ProductServiceCnn"
import Balancer from "../balancing/Balancer"

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    /* const microservice = new ProductService('localhost:4000')
    const response = await microservice.readProducts()
    res.json(response) */

    // inicia un nuevo hilo
    const balancer = new Balancer()
    res.end()
}

