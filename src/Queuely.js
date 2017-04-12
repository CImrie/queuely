import sync from './transports/sync';
import array from './transports/array';

import Envelope from './Envelope';
import HandlerManager from './HandlerManager'

class Queuely {
  constructor() {
    this.handlers = new HandlerManager();
    this.syncTransport = sync({
      handlers: this.handlers
    });

    this.use(array());
  }

  use(transport) {
    this.transport = transport;

    return this;
  }

  dispatch(dispatchable) {
      return new Envelope(this, dispatchable);
  }

  on(dispatchableType, handler) {
      this.handlers.register(dispatchableType, handler);

      return this;
  }
}

export default Queuely;