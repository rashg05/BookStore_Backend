import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to Log In a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const userLogIn = async (req, res, next) => {
  try {
    const data = await UserService.userLogIn(req.body);
    if (data == null) {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: '${error}'
      })
    }
    else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User logged in successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to forget a password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body.email);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "password has sent to email"
    })
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `${error}`
    })
  }
};

/**
 * Controller to reset a password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const resetPassword = async (req, res) => {
  try {

    // console.log(req.body.password);
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "password reset successfully"
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  }
};
