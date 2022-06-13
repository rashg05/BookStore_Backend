import express from 'express';
import * as orderController from '../controllers/order.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/add_order', userAuth, orderController.orderItem);

export default router;