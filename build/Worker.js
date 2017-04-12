'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RUNNING_JOBS_COUNT_CHANGED = 'RUNNING_JOBS_COUNT_CHANGED';

var Worker = function () {
  function Worker(queuely) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Worker);

    this._queuely = queuely;
    this._transport = options.transport || queuely.transport;
    this._handlers = queuely.handlers;
    this._queue = options.queue;
    this._concurrency = options.concurrency || 1;
    this._runningJobs = 0;
    this._interval = options.interval || 1000;
    this._timer = setInterval(function () {}, this._interval);
    this._running = false;
    this._notifier = new _events2.default();
    this._successReporter = options._successReporter || function () {};
    this._errorReporter = options.errorReporter || function () {};

    // Listen to concurrency changes and respond appropriately.
    this._notifier.on(RUNNING_JOBS_COUNT_CHANGED, function (before, after) {
      // If met maximum concurrency, pause the worker
      if (after >= _this._concurrency) {
        _this.pause();
      }

      // If a job has finished in some way and there are resource available
      // try to start another job
      if (before > after && after < _this._concurrency && _this._running) {
        _this.startNextJob();
      }
    });
  }

  _createClass(Worker, [{
    key: 'start',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var i, started;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._running = true;

                // Initialise running jobs up to max.
                i = 0;

              case 2:
                if (!(i < this._concurrency - this.runningJobs)) {
                  _context.next = 11;
                  break;
                }

                _context.next = 5;
                return this.startNextJob();

              case 5:
                started = _context.sent;

                if (started) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('break', 11);

              case 8:
                i++;
                _context.next = 2;
                break;

              case 11:

                // Set appropriate timer instance so that can be flexibly paused to maintain concurrency.
                this._timer = setInterval(this.startNextJob.bind(this), this._interval);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _ref.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: 'pause',
    value: function pause() {
      clearInterval(this._timer);
    }
  }, {
    key: 'stop',
    value: function stop() {
      this._running = false;
      this.pause();
    }
  }, {
    key: 'markJobAsStoppedProcessing',
    value: function markJobAsStoppedProcessing(job) {
      if (this.runningJobs > 0) {
        this.runningJobs--;
      }
    }
  }, {
    key: 'markJobCompleted',
    value: function markJobCompleted(job) {
      this.markJobAsStoppedProcessing(job);
      this._successReporter(job);
    }
  }, {
    key: 'markJobFailed',
    value: function markJobFailed(job, err) {
      this._transport.fail(job, err);
      this._errorReporter(err, job);
    }
  }, {
    key: 'runJob',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(job) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:

                this._handlers.fire(job).then(function () {
                  _this2.markJobCompleted(job);
                }).catch(function (err) {
                  _this2.markJobFailed(job, err);
                });

                return _context2.abrupt('return', true);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function runJob(_x2) {
        return _ref2.apply(this, arguments);
      }

      return runJob;
    }()
  }, {
    key: 'startNextJob',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var job;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.runningJobs >= this._concurrency)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return');

              case 2:
                job = this._transport.pop({ queue: this._queue });

                if (!job) {
                  _context3.next = 8;
                  break;
                }

                this.runningJobs++;
                _context3.next = 7;
                return this.runJob(job);

              case 7:
                return _context3.abrupt('return', _context3.sent);

              case 8:
                return _context3.abrupt('return', false);

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function startNextJob() {
        return _ref3.apply(this, arguments);
      }

      return startNextJob;
    }()
  }, {
    key: 'runningJobs',
    set: function set(number) {
      var before = this._runningJobs;
      this._runningJobs = number;
      this._notifier.emit(RUNNING_JOBS_COUNT_CHANGED, before, this._runningJobs);
    },
    get: function get() {
      return this._runningJobs;
    }
  }]);

  return Worker;
}();

exports.default = Worker;