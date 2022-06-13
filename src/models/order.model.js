import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
    {
    orders: [{
        bookId: {
          type: String
        },
        bookName: {
          type: String
        },
        quantity: {
          type: Number
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

export default model('Order', orderSchema);