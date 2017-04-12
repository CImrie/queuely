import TryBuilder from './TryBuilder';

class Trier {
  constructor() {

  }

  static attempt(callback) {
    return new TryBuilder(callback);
  }
}

export default Trier;