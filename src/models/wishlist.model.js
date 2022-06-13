import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema(
  {
    userId: {
      type: String
    },
    book: [{
      bookId: {
        type: String
      },
      description: {
        type: String
      },
      bookName: {
        type: String
      },
      author: {
        type: String
      },
      price: {
        type: Number
      }
    }]
  },
  {
    timestamps: true
  }
);

export default model('Wishlist', wishlistSchema);