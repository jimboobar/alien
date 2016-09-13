'use strict';


module.exports = function AlienInput(fn) {
    const api = this;

    if (typeof fn !== "function") throw "not a function";

    api.atPos = fn;
    api.atElement = atElement;
    api.atId = atId;
    api.withinElement = withinElement;
    api.withinId = withinId;
    api.onTarget = onTarget;

    /////


    function atElement(element) {
        const rect = element.getBoundingClientRect(),
              posX = rect.left + (rect.width / 2),
              posY = rect.top + (rect.height / 2);

        api.atPos(posX, posY);
    }

    function atId(id) {
        const element = document.getElementById(id);

        if (!element) console.error("missing element: " + id);

        atElement(element);
    }

    function withinElement(element, perX, perY) {
        const rect = element.getBoundingClientRect(),
              posX = rect.left + (perX * rect.width),
              posY = rect.top + (perY * rect.height);

        api.atPos(posX, posY);
    }

    function withinId(id, perX, perY) {
        const element = document.getElementById(id);

        withinElement(element, perX, perY);
    }

    function onTarget(target) {
        const element = target.element,
              id = target.id,
              x = target.x,
              y = target.y;

        if (!(element || id)) throw "invalid target";

        if (element) withinElement(element, x, y);
        else withinId(id, x, y);
    }
};
