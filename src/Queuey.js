class Queuey {
  constructor() {
    this._transport = null;
  }

  use(transport) {
    this._transport = transport;
  }

  dispatch(dispatchable) {
    // create a new envelope
    // give self to the envelope
    // only dispatch when call now() or toBackground() on it.
  }
}

export default Queuey;