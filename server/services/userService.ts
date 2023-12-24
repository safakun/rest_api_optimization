import { Request, Response, NextFunction } from 'express';
import { User } from "../models/user";
import { IUser } from "../types/IUser";

export class UserService {
    async getUsers(req: Request, res: Response) {
        const count = req.query.count || 10;
        const offset = req.query.offset || 0;
        const users: IUser[] = await User.find().skip(Number(offset)).limit(Number(count));
        if (users) {
          return res.status(200).json(users)
        } else {
          return res.status(500).json({message: "Internal server error"})
        }
    }

}