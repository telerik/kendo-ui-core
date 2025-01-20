import '@progress/kendo-ui/src/kendo.actionsheet.js';

let ActionSheet = kendo.ui.ActionSheet,
    div,
    instance;


describe("kendo.ui.ActionSheet API", function() {
    function createInstance(options) {
        instance = new ActionSheet(div, $.extend(true, {}, {
            title: "Some title",
            items: [
                {
                    title: 'first item',
                },
                {
                    title: 'second item'
                }
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

    it("open method shows the action sheet", function() {
        createInstance();

        instance.open();
        assert.isOk(instance.element.is(':visible'));
    });

    it("first element should be focused after open", function() {
        createInstance();

        instance.open();
        assert.isOk($(document.activeElement).is('.k-actionsheet-item'));
    });

    it("close method hides the action sheet", function() {
        createInstance();

        instance.open();
        assert.isOk(instance.element.is(':visible'));
        instance.close();
        assert.isOk(instance.element.not(':visible'));
    });
});

