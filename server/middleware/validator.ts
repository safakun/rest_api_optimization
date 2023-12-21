import { Request, Response, NextFunction } from 'express'
const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  return [
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('age').isNumeric()
  ]
}

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any = []
  errors.array().map((err: any) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}