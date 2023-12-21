import { Request, Response, NextFunction } from 'express'

module.exports = function (err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Internal server error!"})
}