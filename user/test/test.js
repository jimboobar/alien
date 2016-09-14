'use strict';


var Alien = require('../src/Alien');


window.Alien = new Alien({
    inputs: {
        click: function(x, y) { console.log("Clicked at x:" + x + " y:" + y); }
    },
    items: {
        body: { element: document.body, x: 0.5, y: 0.95 }
    },
    scripts: {
        hello: function() { console.log("Hello, I'm an Alien"); }
    }
});

window.Alien.inputs.save('touch', function(x, y) {
  console.log("Touched at x:" + x + " y:" + y);
});
