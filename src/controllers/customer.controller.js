import HttpStatus from 'http-status-codes';
import * as CustomerService from '../services/customer.service';

export const customerDetails = async (req, res) => {
    try {
      const data = await CustomerService.customerDetails(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED, 
        data: data,
        message: 'Customer Details added successfully'
      });
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        message: `${error}`
      });
    }
  };