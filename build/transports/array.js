'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayTransport = function () {
  function ArrayTransport() {
    _classCallCheck(this, ArrayTransport);

    this._queues = {};
    this._defaultQueueName = 'default';
  }

  _createClass(ArrayTransport, [{
    key: 'push',
    value: function push(dispatchable) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var queue = options.queue || this._defaultQueueName;
      this.get(queue).push(dispatchable);

      return this;
    }
  }, {
    key: 'pop',
    value: function pop() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var queue = options.queue || this._defaultQueueName;
      return this.get(queue).pop();
    }
  }, {
    key: 'get',
    value: function get(queue) {
      if (!this._queues[queue]) {
        var newQueue = {};
        newQueue[queue] = [];

        this._queues[queue] = [];
      }

      return this._queues[queue];
    }
  }, {
    key: 'fail',
    value: function fail(job) {
      this.push(job, { queue: 'failed' });

      return this;
    }
  }]);

  return ArrayTransport;
}();

var array = function array() {
  return new ArrayTransport();
};

exports.default = array;