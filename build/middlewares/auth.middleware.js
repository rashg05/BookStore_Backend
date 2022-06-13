"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordAuth = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
// export const userAuth = async (req, res, next) => {
//   try {
//     let bearerToken = req.header('token');
//     if (!bearerToken)
//       throw {
//         code: HttpStatus.BAD_REQUEST,
//         message: 'Authorization token is required'
//       };
//     const { user } = await jwt.verify(bearerToken, process.env.KEY);
//     req.body.admin_user_id = user.email;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
var passwordAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearerToken;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            bearerToken = req.header('token');
            console.log("my token ", bearerToken);

            if (bearerToken) {
              _context.next = 5;
              break;
            }

            throw {
              code: _httpStatusCodes["default"].BAD_REQUEST,
              message: 'Authorization token is required'
            };

          case 5:
            _jsonwebtoken["default"].verify(bearerToken, process.env.MY_SECRET_KEY, function (err, verifiedtoken) {
              if (err) {
                console.log("not token");
                throw {
                  code: _httpStatusCodes["default"].BAD_REQUEST,
                  message: 'Authorization token is incorrect'
                };
              } else {
                req.body.admin_user_id = verifiedtoken.id;
                console.log(verifiedtoken);
                next();
              }
            });

            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function passwordAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.passwordAuth = passwordAuth;