(function() {

var Calendar = kendo.ui.Calendar,
    instance,
    div;

describe("kendo.ui.Calendar selection", function () {
    beforeEach(function() {

        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    $.fn.press = function(x, y, ctrlKey, metaKey) {
        return triggerEvent(this, "mousedown", {
            pageX: x,
            pageY: y,
            ctrlKey: ctrlKey,
            metaKey: metaKey
        });
    };

    $.fn.move = function(x, y, ctrlKey, metaKey) {
        return triggerEvent(this, "mousemove", {
            pageX: x,
            pageY: y,
            ctrlKey: ctrlKey,
            metaKey: metaKey
        });
    };

    $.fn.tap = function(info) {
        return triggerEvent(this, "click", info);
    };

    $.fn.release = function(info) {
        info = $.extend({}, info);
        return triggerEvent(this, "mouseup", info);
    };

    function triggerEvent(element, type, info) {
        element.trigger($.Event(type, info));

        return element;
    };

    it("disabled dates are not selected with drag to select", function() {
        instance = new Calendar(div, {
            selectable: "multiple",
            disableDates: ["we"]
        }),
        selectable = instance.selectable,
        firstSelectee = $(instance.element.find("tr:eq(2) td:has(.k-link)")[0]),
        secondSelectee = instance.element.find("tr:eq(3) td:has(.k-link)").last(),
        position = secondSelectee.offset();

        firstSelectee.tap().press().move(position.left, position.top).release();

        assert.isOk(instance.element.find("td.k-state-selected").length);
        assert.isOk(!instance.element.find("td.k-state-selected.k-state-disabled").length);
    });

    });
}());
