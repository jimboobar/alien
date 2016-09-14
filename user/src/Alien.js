'use strict';


var Store = require('./component/Store'),
    AlienInput = require('./AlienInput');


function onSaveInput(fnInput) {
  return new AlienInput(fnInput);
}

function onSaveItem(item) {
  if (!(item.element || item.id)) throw "missing target";
  else if (!item.x) throw "missing x-axis positioning";
  else if (!item.y) throw "missing y-axis positioning";
  else return item;
}

function onSaveScript(fn) {
  if (typeof fn === 'function') return fn;
  else throw "not a function";
}


module.exports = function Alien(config) {
    var api = this,
        inputStore = new Store(onSaveInput),
        itemStore = new Store(onSaveItem),
        scriptStore = new Store(onSaveScript);

    initConifg(config || {});

    api.inputs = inputStore;
    api.items = itemStore;
    api.scripts = scriptStore;
    api.do = onDo;
    api.run = onRun;
    api.toString = toString;

    console.error("Alien spawned!");

    /////


    function initConifg(config) {
      var cfgInputs = config.inputs || {},
          cfgItems = config.items || {},
          cfgScripts = config.scripts || {};

      Object.keys(cfgInputs)
        .forEach(function(key) {
          inputStore.save(key, cfgInputs[key]);
        });

      Object.keys(cfgItems)
        .forEach(function(key) {
          itemStore.save(key, cfgItems[key]);
        });

      Object.keys(cfgScripts)
        .forEach(function(key) {
          scriptStore.save(key, cfgScripts[key]);
        });
    }

    function onDo(keyInput, keyItem) {
      var input = inputStore.load(keyInput),
          item = itemStore.load(keyItem);

      input.onTarget(item);
    }

    function onRun(keyScript) {
      scriptStore.load(keyScript)();
    }

    function toString() {
      return [
        "I'm alive!",
        " - inputs.: " + inputStore.keys(),
        " - items..: " + itemStore.keys(),
        " - scripts: " + scriptStore.keys(),
        ""
      ].join('\n');
    }
};
