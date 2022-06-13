import express from 'express';
import * as customerController from '../controllers/customer.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.put('/edit_user', userAuth, customerController.customerDetails);

export default router;