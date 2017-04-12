'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sync = require('./transports/sync');

var _sync2 = _interopRequireDefault(_sync);

var _array = require('./transports/array');

var _array2 = _interopRequireDefault(_array);

var _Envelope = require('./Envelope');

var _Envelope2 = _interopRequireDefault(_Envelope);

var _HandlerManager = require('./HandlerManager');

var _HandlerManager2 = _interopRequireDefault(_HandlerManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queuey = function () {
  function Queuey() {
    _classCallCheck(this, Queuey);

    this.handlers = new _HandlerManager2.default();
    this.syncTransport = (0, _sync2.default)({
      handlers: this.handlers
    });

    this.use((0, _array2.default)());
  }

  _createClass(Queuey, [{
    key: 'use',
    value: function use(transport) {
      this.transport = transport;

      return this;
    }
  }, {
    key: 'dispatch',
    value: function dispatch(dispatchable) {
      return new _Envelope2.default(this, dispatchable);
    }
  }, {
    key: 'on',
    value: function on(dispatchableType, handler) {
      this.handlers.register(dispatchableType, handler);

      return this;
    }
  }]);

  return Queuey;
}();

exports.default = Queuey;