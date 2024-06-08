import {EventEmitter} from 'fbemitter';

class EventProvider {
  eventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  addListener({eventName, callback}) {
    this.eventEmitter.addListener(eventName, callback);
  }

  emit({eventName, payload}) {
    this.eventEmitter.emit(eventName, payload);
  }

  removeAllListeners({eventName}) {
    this.eventEmitter.removeAllListeners(eventName);
  }
}

const eventProvider = new EventProvider();

Object.freeze(eventProvider);

export default eventProvider;
