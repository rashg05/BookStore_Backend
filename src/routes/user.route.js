import express from 'express';
import * as userController from '../controllers/user.controller';
import { userRegistrationValidator } from '../validators/user.validator';
import { passwordAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', userController.getAllUsers);

//route to create a new user
router.post('/register', userRegistrationValidator, userController.userRegistration);

// // for login
router.post('/login', userController.userLogIn);

// for forget password
router.post('/forget', userController.forgetPassword);

//for reset password
router.put('/reset', passwordAuth, userController.resetPassword)

export default router;
