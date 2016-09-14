'use strict';


module.exports = function AlienInput(fn) {
    var api = this;

    if (typeof fn !== "function") throw "not a function";

    api.atPos = fn;
    api.atElement = atElement;
    api.atId = atId;
    api.withinElement = withinElement;
    api.withinId = withinId;
    api.onTarget = onTarget;

    /////


    function atElement(element) {
        var rect = element.getBoundingClientRect(),
            posX = rect.left + (rect.width / 2),
            posY = rect.top + (rect.height / 2);

        api.atPos(posX, posY);
    }

    function atId(id) {
        var element = document.getElementById(id);

        if (element) atElement(element);
        else throw "missing element: " + id;
    }

    function withinElement(element, perX, perY) {
        var rect = element.getBoundingClientRect(),
            posX = rect.left + (perX * rect.width),
            posY = rect.top + (perY * rect.height);

        api.atPos(posX, posY);
    }

    function withinId(id, perX, perY) {
        var element = document.getElementById(id);

        withinElement(element, perX, perY);
    }

    function onTarget(item) {
        var element = item.element,
            id = item.id,
            x = item.x,
            y = item.y;

        if (element) withinElement(element, x, y);
        else if (id) withinId(id, x, y);
        else throw "invalid target";
    }
};
