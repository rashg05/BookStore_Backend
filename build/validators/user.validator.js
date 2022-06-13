"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegistrationValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var userRegistrationValidator = function userRegistrationValidator(req, res, next) {
  var schema = _joi["default"].object({
    fullName: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }),
    password: _joi["default"].string().min(8).max(16).required(),
    phone: _joi["default"].string().length(10).pattern(/^\d+$/).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: "Incorrect Details : ".concat(error)
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.userRegistrationValidator = userRegistrationValidator;