import express from "express";
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to post to cart
router.post('/add_cart_item/:bookId', userAuth, cartController.addToCart);

//route to get a single note by their user id
router.get('/get_cart_item', userAuth, cartController.getCart);

// //route to update quantity of cart
router.put('/cart_item_quantity/:_id', userAuth, cartController.updateCart);

//route to remove book from cart
router.delete('/remove_cart_item/:_id', userAuth, cartController.removeCartBook);

export default router;