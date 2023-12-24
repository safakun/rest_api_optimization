import express from 'express'
import { createLog } from '../middleware/logger';
const router = express.Router()
const userController = require('../controllers/userController')
const { userValidationRules, validate } = require('../middleware/validator')

router.get('/', createLog, userController.getUsers);
router.post('/add', userValidationRules(), validate, userController.addUser);

module.exports = router