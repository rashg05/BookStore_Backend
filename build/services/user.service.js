"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRegistration = exports.userLogIn = exports.resetPassword = exports.getAllUsers = exports.forgetPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mailer = require("../utils/mailer");

//get all users
var getAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].find();

          case 2:
            data = _context.sent;

            if (!(data.length == null)) {
              _context.next = 7;
              break;
            }

            throw new Error("there is no user");

          case 7:
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getAllUsers() {
    return _ref.apply(this, arguments);
  };
}(); //create new user


exports.getAllUsers = getAllUsers;

var userRegistration = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var saltRounds, hashPass, existCheck, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            saltRounds = 10;
            _context2.next = 3;
            return _bcrypt["default"].hash(body.password, saltRounds);

          case 3:
            hashPass = _context2.sent;
            body.password = hashPass;
            _context2.next = 7;
            return _user["default"].findOne({
              email: body.email
            });

          case 7:
            existCheck = _context2.sent;

            if (!(existCheck != null)) {
              _context2.next = 12;
              break;
            }

            throw new Error("User Exist");

          case 12:
            _context2.next = 14;
            return _user["default"].create(body);

          case 14:
            data = _context2.sent;
            return _context2.abrupt("return", data);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function userRegistration(_x) {
    return _ref2.apply(this, arguments);
  };
}(); //get single user


exports.userRegistration = userRegistration;

var userLogIn = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, validPassword, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _user["default"].findOne({
              email: body.email
            });

          case 2:
            data = _context3.sent;

            if (!(data != null)) {
              _context3.next = 15;
              break;
            }

            validPassword = _bcrypt["default"].compareSync(body.password, data.password);
            console.log(body.password);
            console.log(data.password);

            if (!validPassword) {
              _context3.next = 12;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              email: data.email,
              id: data._id
            }, process.env.KEY);
            return _context3.abrupt("return", token);

          case 12:
            throw new Error('password does not match');

          case 13:
            _context3.next = 16;
            break;

          case 15:
            throw new Error('User not Registered');

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function userLogIn(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.userLogIn = userLogIn;

var forgetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var storedData, token, generateMail;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(body);
            _context4.next = 3;
            return _user["default"].findOne({
              email: body
            });

          case 3:
            storedData = _context4.sent;

            if (!(storedData.email != null)) {
              _context4.next = 11;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              "email": storedData.email,
              "id": storedData._id
            }, process.env.MY_SECRET_KEY);
            generateMail = (0, _mailer.sendingMailTo)(storedData.email, token);
            console.log("Generated mail ", generateMail);
            return _context4.abrupt("return", generateMail);

          case 11:
            throw new Error("email is not registered");

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function forgetPassword(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports.forgetPassword = forgetPassword;

var resetPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var hash, resetPass;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(body);
            hash = _bcrypt["default"].hashSync(body.password, 10);
            body.password = hash;
            _context5.next = 5;
            return _user["default"].findByIdAndUpdate({
              _id: body.admin_user_id
            }, body, {
              "new": true
            });

          case 5:
            resetPass = _context5.sent;
            return _context5.abrupt("return", resetPass);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function resetPassword(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.resetPassword = resetPassword;