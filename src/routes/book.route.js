import express from "express";
import * as bookController from '../controllers/book.controller';

const router = express.Router();

//route to get all books
router.get('/all', bookController.getAllBooks);

export default router;