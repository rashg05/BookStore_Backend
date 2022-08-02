import Cart from '../models/cart.model';
import Book from '../models/book.model';

//get all users
export const addToCart = async (id, userId) => {
    const bookSearch = await Book.findOne({ _id: id });
    if (bookSearch) {

        const dataCart = await Cart.findOne({ userId: userId });
        bookSearch.quantity = 1
        let addBook = {
            bookId: bookSearch._id,
            bookName: bookSearch.bookName,
            author: bookSearch.author,
            quantity: bookSearch.quantity,
            price: bookSearch.price,
            discountPrice: bookSearch.discountPrice,
        }
        if (dataCart) { 
            dataCart.book.push(addBook)
            const updateCart = await Cart.findByIdAndUpdate({ _id: dataCart._id },
                {
                    $set: {
                        book: dataCart.book,
                        cart_total: bookSearch.quantity * bookSearch.discountPrice + dataCart.cart_total
                    }
                },
                {
                    new: true
                }
            );

            return updateCart

        } else {
            bookSearch.quantity = 1
            let newCart =
                {
                    userId: userId,
                    book: [addBook],
                    cart_total: bookSearch.quantity * bookSearch.discountPrice,
                    isPurchased: false
                }
            const createCart = await Cart.create(newCart);
            // const updateCart = getCart(userId)
            return createCart
        }

    }
    else {
        throw new Error("There is no Book with this id")
    }
};

//get cart
export const getCart = async (body) => {
    const data = await Cart.find({ userId: body.userId });
    console.log("data", data);
    if (data == null) {
        throw new Error("There is no cart with this user");
    } else {
        return data;
    }
};

//update cart
export const updateCart = async (_id, body) => {
    const presentCart = await Cart.findOne({ userId: body.userId })
    if (presentCart) {
        
        const cartBook = await presentCart.book.findIndex(book => book.bookId === _id)
        console.log('cartBook', cartBook);
        console.log('cartBook-1', presentCart.book[cartBook]);
        console.log('bookid', presentCart.book.bookId);
        console.log('bookid', _id);
        if (body.increase === true) {
            console.log("incr", body.increase);
            
            presentCart.book[cartBook].quantity += 1
            console.log("cartbook", presentCart.book[cartBook].quantity);
        } else {
            presentCart.book[cartBook].quantity -= 1
        }
        if (presentCart.book[cartBook].quantity === 0) {
            presentCart.book.splice(cartBook, 1)

            let totalPrice = 0

            const updateCart = await Cart.findByIdAndUpdate({ _id: presentCart._id },
                {
                    $set: {
                        book: presentCart.book
                    },
                    cart_total: totalPrice
                },
                {
                    new: true
                }
            )
            return updateCart
        } else {
            let TotalPrice = 0
            for (var i = 0; i < presentCart.book.length; i++) {
                TotalPrice = presentCart.book[i].discountPrice * presentCart.book[i].quantity + TotalPrice
            }

            const updateCart = await Cart.findByIdAndUpdate({ _id: presentCart._id },
                {
                    $set: {
                        book: presentCart.book
                    },
                    cart_total: TotalPrice
                },
                {
                    new: true
                }
            )
            return updateCart
        }

    }
};
//     if (cartBook) {
//         cartBook.quantity = body.quantity;
//         const updateCart = await Cart.findByIdAndUpdate({ _id: presentCart._id },
//             {
//                 $set: {
//                     book: presentCart.book
//                 }
//             },
//             {
//                 new: true
//             })
//         return updateCart
//     } else {
//         throw new Error('Book does not exist in cart')
//     }
// } else {
//     throw new Error('Cart is not present')
// }

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