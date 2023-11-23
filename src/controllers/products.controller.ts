import { Request, Response, NextFunction } from "express"

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    res.send('done')
}

