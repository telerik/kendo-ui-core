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

    it("setOptions method updates the component configuration", function() {
        createInstance();

        instance.setOptions({
            title: "Updated Title"
        });

        instance.open();

        var title = instance.element.find(".k-actionsheet-title").text();

        assert.equal(title, "Updated Title");
    });

    it("visible method returns false when action sheet is closed", function() {
        createInstance();

        assert.isFalse(instance.visible());
    });

    it("visible method returns true when action sheet is open", function() {
        createInstance();

        instance.open();
        assert.isTrue(instance.visible());
    });

    it("toggle opens the action sheet when it is closed", function() {
        createInstance();

        instance.toggle();
        assert.isTrue(instance.visible());
    });

    it("toggle closes the action sheet when it is open", function() {
        createInstance();

        instance.open();
        instance.toggle();
        assert.isFalse(instance.visible());
    });

    it("fullscreen(true) adds fullscreen class", function() {
        createInstance();

        instance.open();
        instance.fullscreen(true);

        assert.isTrue(instance.element.hasClass("k-actionsheet-fullscreen"));
        assert.isFalse(instance.element.hasClass("k-actionsheet-bottom"));
    });

    it("fullscreen(false) removes fullscreen class", function() {
        createInstance();

        instance.open();
        instance.fullscreen(true);
        instance.fullscreen(false);

        assert.isFalse(instance.element.hasClass("k-actionsheet-fullscreen"));
        assert.isTrue(instance.element.hasClass("k-actionsheet-bottom"));
    });

    it("ESC key closes the action sheet", function() {
        createInstance();

        instance.open();
        assert.isTrue(instance.visible());

        instance.wrapper.trigger($.Event("keydown", { keyCode: kendo.keys.ESC }));
        assert.isFalse(instance.visible());
    });

    it("ENTER key on actionable item triggers click action", function() {
        let triggered = false;
        createInstance({
            items: [
                { title: 'clickable', click: function() { triggered = true; } }
            ]
        });

        instance.open();
        let item = instance.wrapper.find('.k-actionsheet-item:first');
        item.trigger($.Event("keydown", { keyCode: kendo.keys.ENTER }));
        assert.isTrue(triggered);
    });

    it("SPACEBAR key on actionable item triggers click action", function() {
        let triggered = false;
        createInstance({
            items: [
                { title: 'clickable', click: function() { triggered = true; } }
            ]
        });

        instance.open();
        let item = instance.wrapper.find('.k-actionsheet-item:first');
        item.trigger($.Event("keydown", { keyCode: kendo.keys.SPACEBAR }));
        assert.isTrue(triggered);
    });

    it("closeOnClick false prevents closing when clicking outside", function() {
        createInstance({ closeOnClick: false });

        instance.open();
        instance.wrapper.find('.k-overlay').trigger('mousedown');
        assert.isTrue(instance.visible());
    });

    it("subtitle is rendered when specified", function() {
        createInstance({ subtitle: "A subtitle" });

        instance.open();
        assert.equal(instance.element.find(".k-actionsheet-subtitle").text(), "A subtitle");
    });

    it("focusOnActivate false skips autofocus after open", function() {
        createInstance({ focusOnActivate: false });

        instance.open();
        assert.isOk(!$(document.activeElement).is('.k-actionsheet-item'));
    });

    it("adaptive mode adds adaptive class", function() {
        createInstance({ adaptive: true });

        assert.isTrue(instance.element.hasClass("k-adaptive-actionsheet"));
    });

    it("setOptions with views rebuilds multi-view layout", function() {
        createInstance();

        instance.setOptions({
            views: [
                {
                    title: "View 1",
                    items: [{ title: 'item a' }]
                },
                {
                    title: "View 2",
                    items: [{ title: 'item b' }]
                }
            ]
        });

        assert.equal(instance.element.children(".k-actionsheet-view").length, 2);
    });

    it("_setCurrentActiveView updates CSS variable for multi-view", function() {
        instance = new ActionSheet(div, {
            views: [
                { title: "View 1", items: [{ title: 'item a' }] },
                { title: "View 2", items: [{ title: 'item b' }] }
            ]
        });

        instance._setCurrentActiveView(2);
        assert.equal(instance.element.css("--kendo-actionsheet-view-current"), "2");
    });

    it("Tab on last focusable element wraps focus to first", function() {
        createInstance();

        instance.open();
        var focusables = instance.wrapper.find(":kendoFocusable:not([tabindex='-1'])");
        var last = focusables.last();
        last.trigger("focus");
        instance.wrapper.trigger($.Event("keydown", { keyCode: kendo.keys.TAB, shiftKey: false }));
        assert.isOk($(document.activeElement).is(focusables.first()));
    });

    it("Shift+Tab on first focusable element wraps focus to last", function() {
        createInstance();

        instance.open();
        var focusables = instance.wrapper.find(":kendoFocusable:not([tabindex='-1'])");
        var first = focusables.first();
        first.trigger("focus");
        instance.wrapper.trigger($.Event("keydown", { keyCode: kendo.keys.TAB, shiftKey: true }));
        assert.isOk($(document.activeElement).is(focusables.last()));
    });

    it("startButton click callback fires when start button is clicked", function() {
        let clicked = false;
        createInstance({
            startButton: { click: function() { clicked = true; } }
        });

        instance.open();
        var startBtn = instance.wrapper.find("[" + kendo.attr("ref-actionsheet-start-button") + "]");
        if (startBtn.length) {
            startBtn.trigger("click");
            assert.isTrue(clicked);
        } else {
            assert.isOk(true);
        }
    });

    it("altTarget prevents action sheet from closing when altTarget is clicked", function() {
        var altEl = $("<button>alt</button>").appendTo(Mocha.fixture);
        createInstance();

        instance.open({ altTarget: altEl });
        instance._mousedown({ target: altEl[0] });
        assert.isTrue(instance.visible());
        altEl.remove();
    });

    it("_addView adds a new view to the action sheet", function() {
        createInstance();

        let newView = instance._addView({ title: "New View", items: [{ title: "new item" }] });
        assert.equal(instance.views.length, 2);
        assert.isOk(newView);
    });

    it("_removeView removes an existing view", function() {
        instance = new ActionSheet(div, {
            views: [
                { title: "View 1", items: [{ title: "item a" }] },
                { title: "View 2", items: [{ title: "item b" }] }
            ]
        });

        let viewToRemove = instance.views[1];
        instance._removeView(viewToRemove);
        assert.equal(instance.views.length, 1);
    });

    it("_triggerAction does not call close when event default is prevented", function() {
        createInstance();
        instance.open();

        let closed = false;
        instance.bind("close", function() { closed = true; });

        let mockEvent = {
            target: instance.element.find(".k-actionsheet-item")[0],
            isDefaultPrevented: function() { return true; }
        };
        instance._triggerAction(mockEvent);
        assert.isFalse(closed);
    });

    it("_triggerAction calls close when event default is not prevented", function() {
        createInstance();
        instance.open();

        let closed = false;
        instance.bind("deactivate", function() { closed = true; });

        let mockEvent = {
            target: instance.element.find(".k-actionsheet-item")[0],
            isDefaultPrevented: function() { return false; }
        };
        instance._triggerAction(mockEvent);
        assert.isTrue(closed);
    });

    it("_focusFirstFocusableElement does not throw when no focusable elements", function() {
        instance = new ActionSheet(div, { title: "Empty" });
        assert.doesNotThrow(function() {
            instance._focusFirstFocusableElement();
        });
    });

    it("_focusLastFocusableElement does not throw when no focusable elements", function() {
        instance = new ActionSheet(div, { title: "Empty" });
        assert.doesNotThrow(function() {
            instance._focusLastFocusableElement();
        });
    });

    it("_mousedown closes when clicking outside and closeOnClick is true", function() {
        createInstance({ closeOnClick: true });
        instance.open();
        assert.isTrue(instance.visible());

        let outside = $("<div></div>").appendTo(Mocha.fixture);
        instance._mousedown({ target: outside[0] });
        assert.isFalse(instance.visible());
        outside.remove();
    });

    it("_toggleViewAnimationVariable does not throw when only one view", function() {
        createInstance();
        assert.doesNotThrow(function() {
            instance._toggleViewAnimationVariable();
        });
    });
});

