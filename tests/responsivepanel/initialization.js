(function() {
    var ResponsivePanel = kendo.ui.ResponsivePanel;
    var dom;

    module("responsive panel", {
        setup: function() {
            dom = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("applies css classes", function() {
        new ResponsivePanel(dom);

        ok(dom.hasClass("k-rpanel"), "generic panel class is applied");
        ok(dom.hasClass("k-rpanel-left"), "alignment class is applied");
    });

    test("applies only orientation css class", function() {
        new ResponsivePanel(dom, { orientation: "right" });

        ok(dom.hasClass("k-rpanel-right"));
        ok(!dom.hasClass("k-rpanel-left"));
    });

    test("toggles expanded class when toggle element is clicked", function() {
        new ResponsivePanel(dom);

        var button = $("<button class='k-rpanel-toggle' />").appendTo(QUnit.fixture);

        button.trigger("click");

        ok(dom.hasClass("k-rpanel-expanded"));

        button.trigger("click");

        ok(!dom.hasClass("k-rpanel-expanded"));
    });

    test("removes expanded class when document is touched", function() {
        var panel = new ResponsivePanel(dom);

        panel.open();

        QUnit.fixture.trigger("click");

        ok(!dom.hasClass("k-rpanel-expanded"));
    });

    test("adds animation class after opening", function() {
        var panel = new ResponsivePanel(dom);

        ok(!dom.hasClass("k-rpanel-animate"));

        panel.open();

        ok(dom.hasClass("k-rpanel-animate"));
    });

    test("suppresses animation upon widget resize", function() {
        var panel = new ResponsivePanel(dom);

        panel.open();

        panel.resize();

        ok(!dom.hasClass("k-rpanel-animate"));
    });

    test("suppresses animation upon window resize", function() {
        var panel = new ResponsivePanel(dom);

        panel.open();

        $(window).trigger("resize");

        ok(!dom.hasClass("k-rpanel-animate"));
    });

    test("open method triggers open event", function() {
        var handler = spy();

        var panel = new ResponsivePanel(dom, {
            open: handler
        });

        panel.open();

        equal(handler.calls, 1);
    });

    test("open event can be prevented", function() {
        var panel = new ResponsivePanel(dom, {
            open: function(e) {
                e.preventDefault();
            }
        });

        panel.open();

        ok(!dom.hasClass("k-rpanel-expanded"));
    });

    test("close method triggers close event", function() {
        var handler = spy();

        var panel = new ResponsivePanel(dom, {
            close: handler
        });

        panel.close();

        equal(handler.calls, 1);
    });

    test("close event can be prevented", function() {
        var panel = new ResponsivePanel(dom, {
            close: function(e) {
                e.preventDefault();
            }
        });

        panel.open();
        panel.close();

        ok(dom.hasClass("k-rpanel-expanded"));
    });

    test("autoClose: false does not close panel on clicks", function() {
        var panel = new ResponsivePanel(dom, { autoClose: false });

        panel.open();

        QUnit.fixture.trigger("click");

        ok(dom.hasClass("k-rpanel-expanded"));
    });
})();
