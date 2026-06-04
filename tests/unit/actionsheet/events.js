import '@progress/kendo-ui/src/kendo.actionsheet.js';

let ActionSheet = kendo.ui.ActionSheet,
    div,
    instance;

describe("kendo.ui.ActionSheet events", function() {
    function createInstance(options) {
        instance = new ActionSheet(div, $.extend(true, {}, {
            title: "Some title",
            items: [
                { title: 'first item' },
                { title: 'second item' }
            ]
        }, options));
    }

    beforeEach(function() {
        div = $("<div></div>").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        instance.destroy();
        kendo.destroy(Mocha.fixture);
    });

    it("open event fires when action sheet is opened", function() {
        let fired = false;
        createInstance({
            open: function() { fired = true; }
        });

        instance.open();
        assert.isTrue(fired);
    });

    it("close event fires when action sheet is closed", function() {
        let fired = false;
        createInstance({
            close: function() { fired = true; }
        });

        instance.open();
        instance.close();
        assert.isTrue(fired);
    });

    it("activate event fires after action sheet is fully opened", function() {
        let fired = false;
        createInstance({
            activate: function() { fired = true; }
        });

        instance.open();
        assert.isTrue(fired);
    });

    it("deactivate event fires after action sheet is fully closed", function() {
        let fired = false;
        createInstance({
            deactivate: function() { fired = true; }
        });

        instance.open();
        instance.close();
        assert.isTrue(fired);
    });

    it("close event contains closeButton false when _closeButtonPressed is false", function() {
        let closeEvent;
        createInstance();

        instance.bind("close", function(e) { closeEvent = e; });

        instance.open();
        instance._closeButtonPressed = false;
        instance.close();
        assert.isFalse(closeEvent.closeButton);
    });

    it("item click handler fires when clicking an item", function() {
        let clicked = false;
        createInstance({
            items: [
                { title: 'clickable', click: function() { clicked = true; } }
            ]
        });

        instance.open();
        instance.wrapper.find('.k-actionsheet-item:eq(0)').trigger('click');
        assert.isTrue(clicked);
    });

    it("action sheet closes after item click by default", function() {
        createInstance();

        instance.open();
        instance.wrapper.find('.k-actionsheet-item:eq(0)').trigger('click');
        assert.isFalse(instance.visible());
    });

    it("close event contains closeButton true when _closeButtonPressed is true", function() {
        let closeEvent;
        createInstance();

        instance.bind("close", function(e) { closeEvent = e; });

        instance.open();
        instance._closeButtonPressed = true;
        instance.close();
        assert.isTrue(closeEvent.closeButton);
    });

    it("item click does not close when preventDefault is called", function() {
        createInstance({
            items: [
                { title: 'no-close', click: function(e) { e.preventDefault(); } }
            ]
        });

        instance.open();
        instance.wrapper.find('.k-actionsheet-item:eq(0)').trigger('click');
        assert.isTrue(instance.visible());
    });

    it("keydown logic can be prevented through kendoKeydown event", function() {
        let fired = false;
        createInstance({
            kendoKeydown: function(e) {
                fired = true;
                e.preventKendoKeydown = true;
            }
        });

        instance.open();
        instance.wrapper.trigger({ type: "keydown", keyCode: kendo.keys.ESC });

        assert.isTrue(fired);
    });
});
