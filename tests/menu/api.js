(function() {
    var isRaised, isOpenRaised, isCloseRaised, isSelectRaised, selected;

     function getRootItem(index) {
         return $('#Menu1').find('> .k-item > .k-link').eq(index)
     }

     function getMenu() {
         return $("#Menu1").data("kendoMenu");
     }

     //handlers
     function Open() {
         isOpenRaised = true;
     }

     function Close() {
         isCloseRaised = true;
     }

     function Select() {
         selected++;
         isSelectRaised = true;
     }


     var onLoadMenu;

     function Load() {
         isRaised = true;
         onLoadMenu = getMenu();
     }


    var menu,
        CLICK = kendo.support.touch ? "touchend" : "click";

    module("Menu / ClientSideAPI", {
        setup: function () {
            QUnit.fixture.html(__html__['tests/menu/api-fixture.html']);
            $("#Menu1").kendoMenu({ animation: false, select: Select, open: Open, close: Close, hoverDelay: 0, popupCollision: "flip" });
            menu = getMenu();
        },

        teardown: function() {
            $("#Menu1").data('kendoMenu').destroy();
        }
    });

    test('click method should set handled flag and select event is only fired once', function() {
        var link = getRootItem(7);
        var isCalled = false;

        var e = { target: link[0], stopPropagation: function () {}, preventDefault: function () {} };

        selected = 0;
        menu._click(e);

        ok(e.handled);
        ok(selected == 1);
    });

    asyncTest('hovering root item opens it and raises open event', function() {
        var item = getRootItem(1).parent();

        menu._mouseenter({ currentTarget: item[0], delegateTarget: menu.element[0] });

        setTimeout(function () {
            ok(isOpenRaised);
            start();
        }, 1);
    });

    asyncTest('leaving root item closes it and raises close event', 1, function() {
        var item = getRootItem(1).parent();

        menu._mouseleave({ currentTarget: item[0] });

        setTimeout(function () {
            start();
            ok(isCloseRaised);
        }, 700);
    });

    test('clicking should raise select event', function() {
        var link = getRootItem(2);

        isSelectRaised = false;

        link.trigger(CLICK);

        ok(isSelectRaised);
    });

    test('clicking on sub item should close the menu', function() {
        var link = getRootItem(1);

        menu._mouseenter({currentTarget: link[0]});

        var e = { stopPropagation: function () {}, preventDefault: function () {} };

        link.trigger(CLICK);

        ok(link.parent().is(":visible"));
    });

    asyncTest('open should open item even if disabled', function() {
        var item = getRootItem(6).parent();

        menu.disable(item);
        menu.open(item);

        setTimeout(function () {
            ok(item.find('.k-group').is(":visible"));
            start();
        }, 1);
    });

    asyncTest('open should apply max-height and overflow styles to group UL', function() {
        var item = getRootItem(1).parent(),
            ul = item.find(".k-group");

        menu.open(item);

        setTimeout(function () {
            var maxHeightStyle = parseInt(ul.css("max-height"), 10),
                overflowStyle = ul.css("overflow"),
                windowHeight = parseInt($(window).height(), 10);

            ok(!isNaN(maxHeightStyle));
            equal(overflowStyle, "auto");
            equal(maxHeightStyle, windowHeight);
            start();
        }, 1);
    });

    asyncTest('open should not apply max-height and overflow styles to group UL if it has children groups', function() {
        var item = getRootItem(0).parent(),
            ul = item.find(".k-group").css({maxHeight: 1, overflow: "auto"});

        menu.open(item);

        setTimeout(function () {
            var maxHeightStyle = parseInt(ul.css("max-height"), 10),
                overflowStyle = ul.css("overflow");

            ok(isNaN(maxHeightStyle));
            notEqual(overflowStyle, "auto");
            start();
        }, 1);
    });

    test('clicking should not open item if disabled', function() {
        var item = getRootItem(4).parent();

        menu.disable(item);

        item.children(".k-link").trigger(CLICK);

        ok(!item.find('.k-group').is(":visible"));
    });

    test('disable method should disable enabled item', function() {
        var item = getRootItem(2).parent();

        menu.disable(item);

        ok(item.hasClass('k-state-disabled'));
    });

    test('enable method should enable disabled item', function() {
        var item = getRootItem(3).parent();

        menu.enable(item);

        ok(item.hasClass('k-state-default'));
    });

    asyncTest('configure with popupCollision overrides the default', function() {
        var item = getRootItem(3).parent();

        menu.open(item);

        setTimeout(function () {
            ok(item.find(".k-group").eq(0).data("kendoPopup").options.collision == "flip");
            start();
        }, 1);
    });

    test('setOptions resets the animation', function() {
        var m = new kendo.ui.Menu("<div />");

        ok(!("effects" in m.options.animation.open));

        m.setOptions({ animation: false });

        ok("effects" in m.options.animation.open);
        ok(kendo.size(m.options.animation.open.effects) == 0);
        m.destroy();
    });

    test('setOptions resets the dataSource object', function() {
        var m = new kendo.ui.Menu("<div />", { dataSource: [ { text: "Item 1" } ] });

        ok(m.element.find("li").text() == "Item 1");

        m.setOptions({ dataSource: [ { text: "Changed" } ] });

        ok(m.element.find("li").text() == "Changed");
        m.destroy();
    });

    test("Element with class k-icon doesn't get removed in an item", function () {
        var m = new kendo.ui.Menu("<ul><li><span class='k-icon'></span></li></ul>");

        ok(m.element.find(".k-icon")[0]);
        m.destroy();
    });

    test("Add dynamic item with cssClass", function () {
        var m = new kendo.ui.Menu("<ul></ul>");

        m.append({ text: "test", cssClass: "cssClass" });

        ok(m.element.find(".cssClass")[0]);
        m.destroy();
    });

    test("Adding dynamic content element renders properly on root and inner levels", function () {
        var m = new kendo.ui.Menu("<ul></ul>");

        m.append([
            {
                text: "Item 1",
                content: "Item 1 Content"
            },
            {
                text: "Item 2",
                items: [
                    {
                        text: "Sub Item 1",
                        content: "Sub Item 1 Content"
                    }
                ]
            }
        ]);

        ok(m.element.children("li:first").children("div.k-content")[0]);
        ok(m.element.find("> li:last > ul > li:first").children("div.k-content")[0]);
        m.destroy();
    });

    test("Adding dynamic contentUrl element renders contents on root and inner levels", function () {
        var m = new kendo.ui.Menu("<ul></ul>");

        m.append([
            {
                text: "Item 1",
                contentUrl: "AjaxView1.html"
            },
            {
                text: "Item 2",
                items: [
                    {
                        text: "Sub Item 1",
                        contentUrl: "AjaxView2.html"
                    }
                ]
            }
        ]);

        ok(m.element.children("li:first").children("div.k-content")[0]);
        ok(m.element.find("> li:last > ul > li:first").children("div.k-content")[0]);
        m.destroy();
    });
})();

