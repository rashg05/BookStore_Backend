import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service';


export const orderItem = async (req, res) => {
  try {
    const data = await OrderService.orderItem(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED, 
      data: data,
      message: 'Order is placed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.CONFLICT).json({
      code: HttpStatus.CONFLICT,
      message: `${error}`
    });
  }
};