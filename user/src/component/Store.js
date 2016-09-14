'use strict';


module.exports = function Store(fnOnSave) {
  var api = this,
      items = {};

  validate();


  api.load = load;
  api.save = save;
  api.remove = remove;
  api.keys = keys;

  /////

  function validate() {
    if (!fnOnSave) return;
    else if (typeof fnOnSave === "function") return;
    else throw "not a function";
  }

  function load(key) {
    return items[key];
  }

  function save(key, item) {
    var old = load(key);

    items[key] = (fnOnSave ? fnOnSave(item) : item);

    return old;
  }

  function remove(key) {
    var item = onLoad(key);

    delete items[key];

    return item;
  }

  function keys() {
    return Object.keys(items);
  }
}
