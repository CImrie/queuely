import EventEmitter from 'events';

const MAX_ATTEMPTS_REACHED = "MAX_ATTEMPTS_REACHED";
export const FAILED = "FAILED";

class TryBuilder {
  constructor(callback) {
    this._callback = callback;
    this._notifier = new EventEmitter();
    this._attempts = 0;

    this._notifier.on(FAILED, (resolve, reject, err) => {
      if(this._attempts >= this._maxTries) {
        reject(err);
      } else {
        this.attempt();
      }
    });
  }

  using(...args) {
    this._args = args;

    return this;
  }

  times(tries = 1) {
    this._maxTries = tries;
    return this.attempt();
  }

  attempt() {
    return new Promise((resolve, reject) => {
      try {
        this._attempts++;
        resolve(this._callback(...this._args));
      } catch(err) {
        this._notifier.emit(FAILED, resolve, reject, err);
      }
    });
  }
}

export default TryBuilder;