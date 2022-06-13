import Cart from '../models/cart.model';
import Book from '../models/book.model';

//get all users
export const addToCart = async (id, userId) => {
    const bookSearch = await Book.findOne({ _id: id });
    if (bookSearch) {
        
        const dataCart = await Cart.findOne({ userId: userId });
        if (dataCart) {
            bookSearch.quantity = 1
            let addBook = {
                bookId: bookSearch._id,
                bookName: bookSearch.bookName,
                author: bookSearch.auther,
                quantity: bookSearch.quantity,
                price: bookSearch.price,
            }
            dataCart.book.push(addBook)
            const updateCart = await Cart.findByIdAndUpdate({ _id: dataCart._id },
                {
                    $set: {
                        book: dataCart.book,
                        cart_total: bookSearch.quantity * bookSearch.price
                    }
                },
                {
                    new: true
                }
            );

            return updateCart

        } else {
            bookSearch.quantity = 1
            let newCart = new Cart(
                {
                    userId: userId,
                    addBook: {
                        bookId: bookSearch._id,
                        bookName: bookSearch.bookName,
                        author: bookSearch.auther,
                        quantity: bookSearch.quantity,
                        price: bookSearch.price,
                    },
                    cart_total: bookSearch.quantity * bookSearch.price
                })
            const createCart = await newCart.save();
            return createCart
        }

    }
    else {
        throw new Error("There is no Book")
    }
};

//get cart
export const getCart = async (body) => {
    const data = await Cart.find({ userId: body.userId });
    if (data == null) {
        throw new Error("There is no cart with this user");
    } else {
        return data;
    }
};

//update cart
export const updateCart = async (params, body) => {
    const presentCart = await Cart.findOne({ userId: body.userId })
    if (presentCart) {
        const cartBook = await presentCart.book.find(book => book._id == params._id)
        if (cartBook) {
            cartBook.quantity = body.quantity;
            const updateCart = await Cart.findByIdAndUpdate({ _id: presentCart._id },
                {
                    $set: {
                        book: presentCart.book
                    }
                },
                {
                    new: true
                })
            return updateCart
        } else {
            throw new Error('Book does not exist in cart')
        }
    } else {
        throw new Error('Cart is not present')
    }
};

export const removeCartBook = async (params, body) => {
    const presentCart = await Cart.findOne({ userId: body.userId })
    let book = await presentCart.book.findIndex(cartBook => cartBook._id == params._id);
    presentCart.book.splice(book, 1)
    
    if (book) {
        const cartUpdate = await Cart.findByIdAndUpdate({
            _id: presentCart._id
        },
        {
            $set: {
                book: presentCart.book,
            },
        },
        {
            new: true
        });
        return cartUpdate
    } else {
        throw new Error('Book does not exist in cart')
    }
}