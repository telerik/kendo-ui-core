(function() {
    var root, app, shim;

    module("Mobile Shim", {
        setup: function () {
            jasmine.clock().install();
            root = QUnit.fixture;
            root.html('<div data-role="view"><div id="shim"></div></div>').wrapInner("<div />");
            this.mobileOS = kendo.support.mobileOS;
            kendo.support.mobileOS = kendo.support.detectOS("Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3");
            app = root.children().first();
        },
        teardown: function() {
            kendo.support.mobileOS = this.mobileOS;
            if (shim) {
                shim.destroy();
            }

            jasmine.clock().uninstall();
        }
    });

    test("moves to body if no application is present", 1, function(){
        kendo.mobile.application = null;
        shim = new kendo.mobile.ui.Shim(root.find("#shim"), {});
        equal(shim.shim.parent()[0], document.body);
    });

    test("defaults to current mobileOS if without Application", 1, function(){
        shim = new kendo.mobile.ui.Shim(root.find("#shim"), {});
        ok(shim.popup.options.origin == "bottom center");
    });

    test("initialized in app.pane.element", 1, function(){
        var a = new kendo.mobile.Application(app);
        jasmine.clock().tick();

        shim = new kendo.mobile.ui.Shim(root.find("#shim"), {});
        ok(shim.shim.parent()[0] == a.pane.element[0]);
        a.destroy();
    });

    test("defaults to forced application platform os", 1, function(){
        var a = new kendo.mobile.Application(app, { platform: "android" });
        jasmine.clock().tick();

        shim = new kendo.mobile.ui.Shim(root.find("#shim"), {});
        ok(shim.popup.options.origin == "center center");
        a.destroy();
    });

    test("triggers hide when popup is closed", 2, function(){
        kendo.mobile.application = null;
        shim = new kendo.mobile.ui.Shim(root.find("#shim"), { modal: false });
        shim.show();

        ok(shim.shim.is(":visible"));

        shim.popup._resize({});

        jasmine.clock().tick(1000);

        ok(!shim.shim.is(":visible"));
    });

    test("does not trigger hide from the API", 2, function(){
        kendo.mobile.application = null;
        shim = new kendo.mobile.ui.Shim(root.find("#shim"), { modal: false });

        shim.show();

        var called = false;

        shim.bind("hide", function() {
            called = true;
        });

        shim.hide();

        jasmine.clock().tick(1000);

        ok(!called);
        ok(!shim.shim.is(":visible"));
    });
})();
