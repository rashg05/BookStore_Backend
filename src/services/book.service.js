import Book from '../models/book.model';

//get all users
export const getAllBooks = async () => {
  const data = await Book.find();
  if (data.length == null) {
    throw new Error("there is no Book")
  }
  else {
    return data;
  }
};