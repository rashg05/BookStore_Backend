import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//to create a wishlist
router.post('/add_wishlist/:_id', userAuth, wishlistController.addWishlist);

//to get all items of wishlist
router.get('/get_wishlist', userAuth,  wishlistController.getWishlist);

//to delete wishlist items
router.put('/remove_wishlist/:bookId', userAuth, wishlistController.removeWishlist)

export default router;