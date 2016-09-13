'use strict';


const AlienInput = require('./AlienInput');


module.exports = function Alien(config) {
    const api = this,
          inputs = {},
          events = {},
          items = {};

    initConifg(config || {});

    api.addInput = addInput;
    api.addEvent = addEvent;
    api.addItem = addItem;
    api.do = onDo;
    api.run = onRun;
    api.toString = toString;

    console.error("Alien spawned!");

    /////


    function initConifg(config) {
      const cfgInputs = config.inputs || {},
            cfgEvents = config.events || {},
            cfgItems = config.items || {};

      Object.keys(cfgInputs)
        .forEach((key) => addInput(key, cfgInputs[key]));

      Object.keys(cfgEvents)
        .forEach((key) => addEvent(key, cfgEvents[key]));

      Object.keys(cfgItems)
        .forEach((key) => addItem(key, cfgItems[key]));
    }

    function addInput(adapterKey, fnInput) {
      const input = new AlienInput(fnInput);

      inputs[adapterKey] = input;
    }

    function addEvent(eventKey, event) {
      if (typeof event !== 'function') throw "not a function";

      events[eventKey] = event;
    }

    function addItem(key, item) {
      if (!(item.element || item.id)) throw "missing target";
      if (!item.x) throw "missing x-axis positioning";
      if (!item.y) throw "missing y-axis positioning";

      items[key] = item;
    }

    function onDo(adapterKey, itemKey) {
      const input = inputs[adapterKey],
            item = items[itemKey];

      input.onTarget(item);
    }

    function onRun(eventKey) {
      events[eventKey]();
    }

    function toString() {
      return [
        "I'm alive!",
        " - inputs: " + Object.keys(inputs),
        " - events: " + Object.keys(events),
        " - items: " + Object.keys(items)
      ].join('\n');
    }
};
