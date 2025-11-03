import '@progress/kendo-ui/src/kendo.sortable.js';
import { asyncTest } from "../../helpers/unit/async-utils.js";

let element;
let firstEl;
let secondEl;
let thirdEl;
let keys;

function selectElement(el) {
    return element.children().eq(el);
}

function triggerKeydown(el, keyCode, ctrlKey) {
    let event = $.Event("keydown", { keyCode: keyCode, ctrlKey: ctrlKey });
    el.trigger(event);
}

describe("Sortable - Keyboard Navigation", function() {
    beforeEach(function() {
        Mocha.fixture.append(
            '<div id="sortable">' +
                '<li class="sortable">First Item</li>' +
                '<li class="sortable">Second Item</li>' +
                '<li class="sortable">Third Item</li>' +
            '</div>'
        );

        keys = kendo.keys;
        element = $("#sortable");
        element.kendoSortable({
            navigatable: true,
        });
        firstEl = selectElement(0);
        secondEl = selectElement(1);
        thirdEl = selectElement(2);
        firstEl.trigger("focus");
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        firstEl = null;
        secondEl = null;
        thirdEl = null;
        keys = null;
        element = null;
    });

    asyncTest("fires navigate event on Arrow Down", function(done) {
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("navigate", function() {
            i++;
            done(() => assert.isOk(i === 1, "navigate event fired"));
        });

        triggerKeydown(firstEl, keys.DOWN);
    });

    asyncTest("fires navigate event on Arrow Right", function(done) {
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("navigate", function() {
            i++;
            done(() => assert.isOk(i === 1, "navigate event fired"));
        });

        triggerKeydown(firstEl, keys.RIGHT);
    });

    asyncTest("fires navigate event on Arrow Up", function(done) {
        secondEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("navigate", function() {
            i++;
            done(() => assert.isOk(i === 1, "navigate event fired"));
        });

        triggerKeydown(secondEl, keys.UP);
    });

    asyncTest("fires navigate event on Arrow Left", function(done) {
        secondEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("navigate", function() {
            i++;
            done(() => assert.isOk(i === 1, "navigate event fired"));
        });

        triggerKeydown(secondEl, keys.LEFT);
    });

    asyncTest("fires navigate event on Ctrl + Arrow Down", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(secondEl, keys.LEFT, true);

        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("fires navigate event on Ctrl + Arrow Right", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(secondEl, keys.RIGHT, true);

        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("fires navigate event on Ctrl + Arrow Up", function(done) {
        secondEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(secondEl, keys.UP, true);

        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Ctrl + Arrow Left", function(done) {
        secondEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(secondEl, keys.LEFT, true);

        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("fires change event on Ctrl + Arrow Down", function(done) {
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("change", function() {
            i++;
            done(() => assert.isOk(i === 1, "change event fired"));
        });

        triggerKeydown(firstEl, keys.DOWN, true);
    });

    asyncTest("fires change event on Ctrl + Arrow Right", function(done) {
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("change", function() {
            i++;
            done(() => assert.isOk(i === 1, "change event fired"));
        });

        triggerKeydown(firstEl, keys.RIGHT, true);
    });

    asyncTest("fires change event on Ctrl + Arrow Up", function(done) {
        secondEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("change", function() {
            i++;
            done(() => assert.isOk(i === 1, "change event fired"));
        });

        triggerKeydown(secondEl, keys.UP, true);
    });

    asyncTest("fires change event on Ctrl + Arrow Left", function(done) {
        secondEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let i = 0;
        sortable.bind("change", function() {
            i++;
            done(() => assert.isOk(i === 1, "change event fired"));
        });

        triggerKeydown(secondEl, keys.LEFT, true);
    });

    asyncTest("does not fire navigate event on Arrow Down last element", function(done) {
        thirdEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(thirdEl, keys.DOWN);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Arrow Right last element", function(done) {
        thirdEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(thirdEl, keys.RIGHT);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Arrow Up first element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(firstEl, keys.UP);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Arrow Left first element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(firstEl, keys.LEFT);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Ctrl + Arrow Down last element", function(done) {
        thirdEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(thirdEl, keys.DOWN, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fires navigate event on Ctrl + Arrow Right last element", function(done) {
        thirdEl.trigger("focus");
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(thirdEl, keys.RIGHT, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Ctrl + Arrow Up first element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(firstEl, keys.UP, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire navigate event on Ctrl + Arrow Left first element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("navigate", function() {
            eventFired = true;
        });
        triggerKeydown(firstEl, keys.LEFT, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "navigate event did not fire")));
    });

    asyncTest("does not fire change event on Ctrl + Arrow Down last element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("change", function() {
            eventFired = true;
        });
        triggerKeydown(thirdEl, keys.DOWN, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "change event did not fire")));
    });

    asyncTest("does not fire change event on Ctrl + Arrow Right last element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("change", function() {
            eventFired = true;
        });
        triggerKeydown(thirdEl, keys.RIGHT, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "change event did not fire")));
    });

    asyncTest("does not fire change event on Ctrl + Arrow Up first element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("change", function() {
            eventFired = true;
        });
        triggerKeydown(firstEl, keys.UP, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "change event did not fire")));
    });

    asyncTest("does not fire change event on Ctrl + Arrow Left first element", function(done) {
        const sortable = element.data("kendoSortable");
        let eventFired = false;
        sortable.bind("change", function() {
            eventFired = true;
        });
        triggerKeydown(firstEl, keys.LEFT, true);
        setTimeout(() => done(() => assert.isOk(eventFired === false, "change event did not fire")));
    });
});