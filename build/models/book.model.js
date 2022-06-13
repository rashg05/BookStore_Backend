"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var bookSchema = new _mongoose.Schema({
  description: {
    type: String
  },
  discountPrice: {
    type: Number
  },
  bookImage: {
    type: String
  },
  admin_user_id: {
    type: String
  },
  bookName: {
    type: String
  },
  author: {
    type: String
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Book', bookSchema);

exports["default"] = _default;