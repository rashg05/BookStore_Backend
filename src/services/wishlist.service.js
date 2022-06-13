import Wishlist from '../models/wishlist.model';
import Book from '../models/book.model';

export const addWishlist = async (params, body) => {
    const searchBook = await Book.findOne({ _id: params._id });
    if (searchBook == null) {
        throw new Error('Book does not exist')
    }
    else {
        const listPresent = await Wishlist.findOne({ userId: body.userId })
        if (listPresent) {
            let newBook = {
                bookId: searchBook._id,
                bookName: searchBook.bookName,
                description: searchBook.description,
                author: searchBook.author,
                price: searchBook.price,
            }
            listPresent.book.push(newBook);
            const listUpdated = await Wishlist.findByIdAndUpdate({_id: listPresent._id},{
                $set:{
                  book: listPresent.book
                }
            },
            {
                new: true
            });
            return listUpdated
           
        } else {
            let newlist = Wishlist.create({
                'userId': body.userId,
                'book': {
                    _id: searchBook._id,
                    bookName: searchBook.bookName,
                    description: searchBook.description,
                    author: searchBook.author,
                    price: searchBook.price,
                }
            })
            return newlist;
        }
    }
};

export const getWishlist = async (body) => {
    const data = await Wishlist.find({ userId: body.userId });
    if (data === null) {
        throw new Error("Wishlist is empty with this user")
    }
    else {
        return data;
    }
};

export const removeWishlist = async (params, body) => {
    const presentList = await Wishlist.findOne({ userId: body.userId })
    console.log(presentList)
    let book = await presentList.book.findIndex(listBook => listBook.bookId == params.bookId);
    presentList.book.splice(book, 1)
    if (book) {
        const listUpdate = await Wishlist.findByIdAndUpdate({
            _id: presentList._id
        }, {
            $set: {
                book: presentList.book,

            },
        }, { new: true });
        return listUpdate;
    } else {
        throw new Error('Book doesnt exists')
    }
}