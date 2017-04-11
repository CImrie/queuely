import sync from './transports/sync';
import Envelope from './Envelope';

class Queuey {
  constructor() {
    this.syncTransport = this.transport = sync();

    console.log(this.syncTransport, this.transport);
  }

  use(transport) {
    this.transport = transport;
  }

  dispatch(dispatchable) {
      return new Envelope(this, dispatchable);
  }
}

export default Queuey;