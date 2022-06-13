import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('token');
    console.log('new token', bearerToken);
    if (!bearerToken) {

      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    }
    console.log('my key lies here', process.env.KEY);

    const user = jwt.verify(bearerToken, process.env.KEY);
    console.log('here user lies', user);

    req.body.userId = user.email;
    next();
  } catch (error) {
    next(error);
  }
};

export const passwordAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('token')
    console.log("my token ", bearerToken);
    if (!bearerToken) {

      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'

      };
    }
    jwt.verify(bearerToken, process.env.MY_SECRET_KEY, (err, verifiedtoken) => {
      if (err) {
        console.log("not token");
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is incorrect'
        };
      }
      else {
        // req.body.userId = verifiedtoken.id;
        req.body.userId = verifiedtoken.id; 
        console.log(verifiedtoken);
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
