import Job from './dispatchables/Job'
import Event from './dispatchables/Event'
import Trier from './utils/Trier';

class HandlerManager {
  constructor() {
    this.handlers = {};
    this.classMap = {};
  }

  async register(objectClassDefinition, handler) {
    if(objectClassDefinition.prototype instanceof Job) {
      if(this.handlers[objectClassDefinition.name]) {
        throw new Error("Jobs can only have one registered handler.");
      }

      this.classMap[objectClassDefinition.name] = objectClassDefinition.prototype;
      this.handlers[objectClassDefinition.name] = handler;
      return this;
    }

    if(objectClassDefinition.prototype instanceof Event) {
      if(!this.handlers[objectClassDefinition.name]) {
        this.handlers[objectClassDefinition.name] = [];
      }

      this.classMap[objectClassDefinition.name] = objectClassDefinition.prototype;
      this.handlers[objectClassDefinition.name].push(handler);
      return this;
    }

    throw new Error("Dispatchable must be of type Job or Event from queuely/dispatchables");
  }

  fire(object, options = {}) {
    let handlers = this.handlers[object.constructor.name];

    if(!handlers) {
      throw new Error("No dispatchable handler registerd for type: " + object.constructor.name);
    }

    if(!Array.isArray(handlers)) {
      handlers = [handlers];
    }

    let promises = [];

    handlers.forEach(handler => {
      promises.push(new Promise((resolve, reject) => {
        return Trier
          .attempt(handler)
          .using(object, resolve, reject)
          .times(options.tries)
          .then(success => resolve(success))
          .catch(err => reject(err))
          ;
      }));
    });

    return Promise.all(promises);
  }
}

export default HandlerManager;