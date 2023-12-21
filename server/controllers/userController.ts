const CustomError = require('../error/CustomError')
import { User } from "../models/user";
import { IUser } from "../types/IUser";
import { Request, Response, NextFunction } from 'express';

class UserController {

    async getUsers(req: Request, res: Response) {
        const count = req.query.count || 10;
      //  console.log(req)
        const offset = req.query.offset || 0;
        const users = await User.find().skip(Number(offset)).limit(Number(count));
        if (users) {
          return res.status(200).json(users)
        } else {
          return res.status(500).json({message: "Internal server error"})
        }
    }

    async addUser(req: any, res: any, next: NextFunction) {
      const {name, email, age} = req.body
      if (!name || !email || !age) {
          const err = new CustomError(403, 'Name, email or age is not correct')
          return next(res.status(err.status).json({error: err.message}))
      }

      const user = await User.create({
        name, email, age
      })

      if (user) {
        return res.status(201).json(user);
      } else {
        const err = new CustomError(500, 'Internal server error')
        return next(res.status(err.status).json({error: err.message}))
      }

  }
}

module.exports = new UserController()