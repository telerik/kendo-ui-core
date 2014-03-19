(function() {
    var Switch = kendo.mobile.ui.Switch,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEMOVE = kendo.support.mousemove,
        MOUSEUP = kendo.support.mouseup,
        theSwitch,
        dom;

    var mouseDownEvent,
        mouseMoveEvent;

    if (kendo.support.touch) {
        mouseDownEvent = new $.Event(null, {type: MOUSEDOWN, changedTouches: [{identifier: 1, pageX: 100, pageY: 100}] });
        mouseMoveEvent = new $.Event(null, {type: MOUSEMOVE, changedTouches: [{identifier: 1, pageX: 110, pageY: 102}] });
    } else {
        mouseDownEvent = new $.Event(null, {type: MOUSEDOWN, pageX: 100, pageY: 100 });
        mouseMoveEvent = new $.Event(null, {type: MOUSEMOVE, pageX: 110, pageY: 102 });
    }

    module("switch", {
        setup: function() {
            dom = $("<input type='checkbox'/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            theSwitch.destroy();
        }
    });

    test("Switch can be initialized from input type='checkbox'", function() {
        expect(1);

        theSwitch = new Switch(dom);

        ok(theSwitch.wrapper.hasClass("km-switch"), "Should have specified CSS class");
    });

    test("Switch change the input type to checkbox", function() {
        expect(1);

        dom[0].type = "text";

        theSwitch = new Switch(dom);

        equal(dom[0].type, "checkbox");
    });

    test("Switch creates a toggle handle", function() {
        expect(1);

        theSwitch = new Switch(dom);

        equal(dom.parent().find(".km-switch-handle").length, 1);
    });

    test("Switch creates on/off labels", function() {

        theSwitch = new Switch(dom);

        equal(theSwitch.handle.children().length, 2);
        //on label
        ok(theSwitch.handle.children().eq(0).hasClass("km-switch-label-on"));
        ok(theSwitch.handle.children().eq(0).html(), "on");

        //off label
        ok(theSwitch.handle.children().eq(1).hasClass("km-switch-label-off"));
        ok(theSwitch.handle.children().eq(1).html(), "off");
    });

    test("Switch creates a container", function() {
        expect(1);

        theSwitch = new Switch(dom);

        equal(dom.parent().find(".km-switch-container").length, 1);
    });

    test("Switch creates a wrapper and background", function() {
        expect(2);

        theSwitch = new Switch(dom);

        equal(dom.parent().find(".km-switch-wrapper").length, 1);
        equal(dom.parent().find(".km-switch-background").length, 1);
    });

    asyncTest("Switch raises change event when changed", 1, function() {
        theSwitch = new Switch(dom);

        theSwitch.bind("change", function() {
            start();
            ok(true);
        });

        theSwitch._toggle(true);
    });

    test("Switch applies active state when pressed", function() {
        expect(1);

        theSwitch = new Switch(dom);

        theSwitch.handle.trigger(mouseDownEvent);
        theSwitch.handle.trigger(mouseMoveEvent);
        ok(theSwitch.handle.hasClass("km-state-active"), "has active css class");
    });

    test("Switch removes active state when depressed", function() {
        expect(1);

        theSwitch = new Switch(dom);

        theSwitch.handle.trigger(mouseDownEvent);
        theSwitch.handle.trigger(mouseMoveEvent);
        theSwitch.handle.trigger(MOUSEUP);
        ok(!theSwitch.handle.hasClass("km-state-active"), "Does not have active css class");
    });

    asyncTest("Tapping checks the switch", 1, function() {
        theSwitch = new Switch(dom);

        theSwitch.bind('change', function() {
            start();
            ok(theSwitch.element[0].checked);
        })

        theSwitch.handle.trigger(mouseDownEvent);
        theSwitch.handle.trigger(MOUSEUP);
    });

    test("Switch check the input depending on the checked option", function() {
        theSwitch = new Switch(dom, {
            checked: true
        });

        ok(theSwitch.wrapper.hasClass("km-switch-on"));
        ok(theSwitch.element[0].checked);
    });

    test("Switch returns current checked state", function() {
        theSwitch = new Switch(dom, {
            checked: true
        });

        ok(theSwitch.check());
    });

    test("Switch checks the input when check(true)", function() {
        theSwitch = new Switch(dom);

        theSwitch.check(true);

        ok(theSwitch.wrapper.hasClass("km-switch-on"));
        ok(theSwitch.element[0].checked);
    });

    test("Switch unchecks the input when check(false)", function() {
        theSwitch = new Switch(dom, {
            checked: true
        });

        theSwitch.check(false);

        ok(!theSwitch.wrapper.hasClass("km-switch-on"));
        ok(!theSwitch.element[0].checked);
    });

    test("Switch toggles to checked when toggle()", function() {
        theSwitch = new Switch(dom);

        theSwitch.toggle();

        ok(theSwitch.wrapper.hasClass("km-switch-on"));
        ok(theSwitch.element[0].checked);
    });

    test("Switch toggles to unchecked when toggle()", function() {
        theSwitch = new Switch(dom);

        theSwitch.check(true);
        theSwitch.toggle();

        ok(!theSwitch.wrapper.hasClass("km-switch-on"));
    });

    test("Switch refresh should set origin if it didn't on init", function() {
        theSwitch = new Switch(dom);

        theSwitch.wrapper.appendTo(document.body);
        theSwitch.refresh();
        theSwitch.wrapper.detach();

        ok(typeof theSwitch.origin == "number");
    });

    test("Destroying removes event handling", function() {
        theSwitch = new Switch(dom);

        theSwitch.destroy();
        theSwitch.handle.trigger(mouseDownEvent);
        theSwitch.handle.trigger(MOUSEUP);
        ok(!theSwitch.element[0].checked);
    });

    test("Disabled switch has km-state-disabled class and disabled attribute", 2, function() {
        theSwitch = new Switch(dom);

        theSwitch.enable(false);

        ok(theSwitch.wrapper.hasClass("km-state-disabled"), "has km-state-disabled class");
        ok(theSwitch.element.is(":disabled"), "has km-state-disabled class");
    });

    test("Widget understands disabled attribute", 1, function() {
        var dom = $('<input data-role="switch" type="checkbox" disabled>');

        kendo.mobile.init(dom);
        theSwitch = dom.data("kendoMobileSwitch");

        ok(theSwitch.wrapper.hasClass("km-state-disabled"), "has km-state-disabled class");
    });

    test("Enable method enables and disables the widget", 4, function() {
        theSwitch = new Switch(dom);

        theSwitch.enable(false);
        ok(theSwitch.wrapper.hasClass("km-state-disabled"), "has km-state-disabled class");
        ok(theSwitch.element.is(":disabled"), "has km-state-disabled class");

        theSwitch.enable(true);
        ok(!theSwitch.wrapper.hasClass("km-state-disabled"), "does not have km-state-disabled class");
        ok(!theSwitch.element.is(":disabled"), "has km-state-disabled class");
    });

    test("Change event of disabled switch is not rised", 0, function() {
        theSwitch = new Switch(dom);

        theSwitch.bind("change", function() {
            ok(false, "Should not raise the change event");
        });

        theSwitch.enable(false);
        theSwitch.handle.trigger(mouseDownEvent);
        theSwitch.handle.trigger(MOUSEUP);
    });

    test("Disabled switch does not change its state when pressed", 2, function() {
        theSwitch = new Switch(dom);

        theSwitch.check(true);
        theSwitch.enable(false);

        ok(theSwitch.check(), "switch is checked");

        theSwitch.handle.trigger(mouseDownEvent);
        theSwitch.handle.trigger(MOUSEUP);

        ok(theSwitch.check(), "switch is not checked");
    })

})();
