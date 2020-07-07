class EventManager {
  constructor(targetElement = document) {
    this.target = targetElement;
  }

  dispatch = (eventName, payload) => {
    const event = new CustomEvent(eventName, payload);
    this.target.dispatchEvent(event, { detail: payload });
  };

  on = (eventName, handlerFunction) => {
    this.target.addEventListener(eventName, handlerFunction);
  };

  listen = (details) => {
    for(const obj of details) {
      this.target.addEventListener(obj.eventName, eventHandler);
    }
  };
}

module.exports = EventManager; 