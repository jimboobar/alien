'use strict';


const Alien = require('../../src/javascript/Alien');


window.Alien = new Alien({
    inputs: {
        click: function(x, y) { console.log("Clicked at x:" + x + " y:" + y); }
    },
    events: {
        hello: function() { console.log("Hello, I'm an Alien"); }
    },
    items: {
        body: { element: document.body, x: 0.5, y: 0.95 }
    }
});
