import Queuey from './Queuey';
import sync from './transports/sync';

let queue = new Queuey();
queue.use(sync());

export {
  queue
}