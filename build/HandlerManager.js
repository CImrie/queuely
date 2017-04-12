'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Job = require('./dispatchables/Job');

var _Job2 = _interopRequireDefault(_Job);

var _Event = require('./dispatchables/Event');

var _Event2 = _interopRequireDefault(_Event);

var _Trier = require('./utils/Trier');

var _Trier2 = _interopRequireDefault(_Trier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandlerManager = function () {
  function HandlerManager() {
    _classCallCheck(this, HandlerManager);

    this.handlers = {};
  }

  _createClass(HandlerManager, [{
    key: 'register',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(objectClassDefinition, handler) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(objectClassDefinition.prototype instanceof _Job2.default)) {
                  _context.next = 5;
                  break;
                }

                if (!this.handlers[objectClassDefinition.name]) {
                  _context.next = 3;
                  break;
                }

                throw new Error("Jobs can only have one registered handler.");

              case 3:

                this.handlers[objectClassDefinition.name] = handler;
                return _context.abrupt('return', this);

              case 5:
                if (!(objectClassDefinition.prototype instanceof _Event2.default)) {
                  _context.next = 9;
                  break;
                }

                if (!this.handlers[objectClassDefinition.name]) {
                  this.handlers[objectClassDefinition.name] = [];
                }

                this.handlers[objectClassDefinition.name].push(handler);
                return _context.abrupt('return', this);

              case 9:
                throw new Error("Dispatchable must be of type Job or Event from queuely/dispatchables");

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'fire',
    value: function fire(object) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var handlers = this.handlers[object.constructor.name];

      if (!handlers) {
        throw new Error("No dispatchable handler registerd for type: " + object.name);
      }

      if (!Array.isArray(handlers)) {
        handlers = [handlers];
      }

      var promises = [];

      handlers.forEach(function (handler) {
        promises.push(new Promise(function (resolve, reject) {
          return _Trier2.default.attempt(handler).using(object, resolve, reject).times(options.tries).then(function (success) {
            return resolve(success);
          }).catch(function (err) {
            return reject(err);
          });
        }));
      });

      return Promise.all(promises);
    }
  }]);

  return HandlerManager;
}();

exports.default = HandlerManager;