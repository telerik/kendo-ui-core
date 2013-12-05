(function() {
    var Tabstrip = kendo.mobile.ui.TabStrip,
        dom,
        tabstrip;

    function click(dom) {
        dom.trigger("mousedown");
        dom.trigger("mouseup");
        dom.trigger("click");
    }

    module("mobile tabstrip", {
        setup: function() {
            dom = $('<nav> \
                    <a href="foo" id="foo">foo</a> \
                    <a href="#bar" id="bar" data-icon="genius">bar</a> \
                    <a href="baz" id="baz"><img  />bar</a> \
                    <a href="#qux?foo=bar" id="qux">qux query str</a> \
                </nav>');
            tabstrip = new Tabstrip(dom);
        },

        teardown: function() {
            tabstrip.destroy();
        }
    });

    test("name is Tabstrip", function() {
        equal(Tabstrip.fn.options.name, "TabStrip", "Name is properly set");
    });

    test("creates html structure", function() {
        ok(dom.find("a>.km-text")[0], "text span is created");
        ok(dom.find("a>.km-icon")[0], "icon span is created");
    });

    test("raises select event when clicked", function() {
        expect(2);
        var button = dom.find("#bar");

        tabstrip.bind("select", function(e) {
            ok(true, "raises the select event");
            equal(e.item[0], button[0], "passes the clicked item in the event");
        });

        click(button);
    });

    test("marks first button as active by default", function() {
        ok(dom.find("#foo").is(".km-state-active"));
    });

    test("marks current button as active", function() {
        var button = dom.find("#bar").eq(0);
        click(button);
        ok(button.is(".km-state-active"));
    });

    test("removes previous button active state", function() {
        var button = dom.find("#foo");
        click(button);
        click($("#bar", dom));
        ok(!button.is(".km-state-active"));
    });

    test("allows user selection by index", function() {
        dom = $('<nav><a href="foo" id="foo">foo</a><a href="bar" id="bar">bar</a></nav>');
        tabstrip.destroy();
        tabstrip = new Tabstrip(dom, {selectedIndex: 1});
        ok(dom.find("#bar").is(".km-state-active"));
    });

    test("applies icon class if data attribute provided", function() {
        ok(dom.find("#bar span:first-child").is(".km-genius"), "bar tab has km-tab-icon-genius class");
    });

    test("applies image class on image if present", function() {
        ok(dom.find("#baz img").is(".km-image"), "baz tab img has km-image class");
        ok(!dom.find("#baz").find(".km-icon")[0], "baz does not create icon span");
    });

    test("ignores repeated clicks on the same button", function() {
        var button = dom.find("#foo");

        tabstrip.bind("select", function() {
            ok(false, "select event is not called");
        });

        click(button);
        ok(button.is(".km-state-active"), "button is active");
    });

    test("switches to the button with the given url", function() {
        tabstrip.switchTo("bar");
        ok(dom.find("#bar").is(".km-state-active"), "button is active");
        ok(!dom.find("#foo").is(".km-state-active"), "previous button is not active");
    });

    test("switches to the button with the anchor url", function() {
        tabstrip.switchTo("#bar");
        ok(dom.find("#bar").is(".km-state-active"), "button is active");
    });

    test("switches to the button with the given full url", function() {
        tabstrip.switchByFullUrl("qux?foo=bar");
        ok(dom.find("#qux").is(".km-state-active"), "button is active");
        ok(!dom.find("#foo").is(".km-state-active"), "previous button is not active");
    });

    test("switches to the button with the anchor url (query string params)", function() {
        var dom = $('<nav><a href="#foo">foo</a><a href="#foo?bar=baz">foo</a><a href="#foo?bar=qux">foo</a><a href="foo.html?bar=qux">foo</a></nav>');
        tabstrip.destroy();
        tabstrip = new Tabstrip(dom, {selectedIndex: 0});

        tabstrip.switchByFullUrl("#foo?bar=baz");
        ok(tabstrip.element.find("a").eq(1).is(".km-state-active"), "button is active");
        ok(!tabstrip.element.find("a").eq(0).is(".km-state-active"), "previous button is not active");

        tabstrip.switchByFullUrl("foo.html?bar=qux");
        ok(tabstrip.element.find("a").eq(3).is(".km-state-active"), "button is active");

        tabstrip.switchByFullUrl("#foo");
        ok(tabstrip.element.find("a").eq(0).is(".km-state-active"), "method works without query string parameters");
    });

    test("switches to the button with the same url path", function() {
        tabstrip.switchTo("#qux");
        ok(dom.find("#qux").is(".km-state-active"), "button is active");
    });

    test("switches to the button by zero based index", function() {
        tabstrip.switchTo(3);
        ok(dom.find("#qux").is(".km-state-active"), "button is active");
    });

    test("does not deselect current button if non-existent url", function() {
        tabstrip.switchTo("#none");
        ok(dom.find("#foo").is(".km-state-active"), "button is active");
    });

    test("badge method sets a badge where there is none", function() {
        var dom = $('<nav data-role="tabstrip"><a href="foo" id="foo">foo</a><a href="bar" id="bar">bar</a></nav>');
        kendo.mobile.init(dom);

        dom.data("kendoMobileTabStrip").badge("a:first", 5);

        ok(dom.find("a:first span.km-badge").html() == "5");
        kendo.destroy(dom);
    });

    test("badge attribute init and badge method gets a badge by tab number or tab selector", function() {
        var dom = $('<nav data-role="tabstrip"><a href="foo" id="foo" data-badge="3">foo</a><a href="bar" id="bar">bar</a></nav>');
        kendo.mobile.init(dom);
        var tabstrip = dom.data("kendoMobileTabStrip");

        ok(tabstrip.badge(0) == tabstrip.badge("a:first"));
        kendo.destroy(dom);
    });

    test("badge method removes the badge if passed false", function() {
        var dom = $('<nav data-role="tabstrip"><a href="foo" id="foo" data-badge="3">foo</a><a href="bar" id="bar">bar</a></nav>');
        kendo.mobile.init(dom);
        var tabstrip = dom.data("kendoMobileTabStrip");

        tabstrip.badge(0, false);
        ok(!dom.find(".km-badge")[0]);
        kendo.destroy(dom);
    });

    test("badge method gets the badge value if no arguments", function() {
        var dom = $('<nav data-role="tabstrip"><a href="foo" id="foo">foo</a><a href="bar" id="bar">bar</a></nav>');
        kendo.mobile.init(dom);
        var tabstrip = dom.data("kendoMobileTabStrip");

        tabstrip.badge("a:last", 6);

        ok(tabstrip.badge("a:last") == "6");
        kendo.destroy(dom);
    });
})();
