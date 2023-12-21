const CustomError = require('../error/CustomError')
import { User } from "../models/user";
import { IUser } from "../types/IUser";


class UserController {

    async getUsers(req: any, res: any) {
        const count = req.params.count || 10;
        const offset = req.params.offset || 0;
        const users = await User.find().skip(Number(offset)).limit(Number(count));
        if (users) {
          return res.status(200).json(users)
        } else {
          return res.status(500).json({message: "Internal server error"})
        }
    }

    async addUser(req: any, res: any, next: any) {
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


      // const candidate = await User.findOne({where: {email}})
      // if (candidate) {
      //     const err = new CustomError(403, 'Пользователь с таким email уже существует')
      //     return next(res.status(err.status).json({error: err.message}))
      // }
      // const hashPassword = await bcrypt.hash(password, 5)
      // const user = await User.create({email, role, password: hashPassword})
      // const token = generateJwt(user.id, user.email, user.role)
      // return res.json({token})
  }
}

module.exports = new UserController()