import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service'

/**
 * Controller to get all books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addToCart = async (req, res, next) => {
  try {
    const data = await cartService.addToCart(req.params.bookId, req.body.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Item sent to Cart'
    });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    // req.body.UserId = req.body.data.id;
    const data = await cartService.getCart(req.body);

    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All items in Cart fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: `${error}`
    });
  }
};

export const updateCart = async (req, res, next) => {
  try {
    console.log("paramid", req.params._id );
    const data = await cartService.updateCart(req.params._id, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Cart updated successfully'
    })
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};

export const removeCartBook = async (req, res, next) => {
  try {
   const data =  await cartService.removeCartBook(req.params, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
       data: data,
      message: 'Book in Cart deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};