(function() {
    var modalView,
        element,
        source,
        app,
        root;

    module("ModalView", {
        setup: function() {
            kendo.effects.disable();
            root = $("<div />").appendTo($('#qunit-fixture'));
            location.hash = '';
            // kendo.mobile.ui.Shim.fn.options.duration = 0;
            root.html('<div data-role="view">\
                <a id="source" data-role="button" href="#modalView" data-rel="modalview">Foo</a>\
                </div>\
                <div data-role="modalview" id="modalView">\
                Hello world!\
                </div>');
            app = new kendo.mobile.Application(root);
            element = root.find("[data-role=modalview]");
            source = root.find("#source");
            modalView = element.data("kendoMobileModalView");
        },

        teardown: function() {
            kendo.effects.enable();
            app.destroy();
            kendo.history.stop();
        }
    });

    test("Is visible when open", function() {
        modalView.open();
        equal(root.find(".km-shim").css("display"), "block");
    });


    test("Is hidden when closed", 1, function() {
        modalView.open();
        modalView.close();
        equal(root.find(".km-shim").css("display"), "none");
    });

    test("data-rel=modalview widget opens the modalview", 1, function() {
        root.find('[data-role=button]').trigger($.Event(kendo.support.mouseup));
        equal(root.find(".km-shim").css("display"), "block");
    });

    module("ModalView remote loading", {
        setup: function() {
            location.hash = "";
            kendo.mobile.ui.Shim.fn.options.duration = 0;
            root = $("<div />").appendTo($('#qunit-fixture'));
            root.html('<div data-role="view"><a data-role="button" href="/page2.html">page2</a></div>');
            app = new kendo.mobile.Application(root);
        },

        teardown: function() {
            app.destroy();
            kendo.history.stop();
            location.hash = "";
            $.mockjaxClear();
        }
    });

    asyncTest("includes modal views from remote views", 1, function() {
        $.mockjax({
            url: "/page2.html",
            responseText: '<div data-role="view" id="pagepage">Page 2</div><div data-role="modalview" id="modalView">Hello world!</div>',
            responseTime: 0
        });

        root.find("a").trigger($.Event(kendo.support.mouseup));

        setTimeout(function() {
            start();
            equal(root.find("[data-role=modalview]").length, 1);
        }, 100);
    });
})();
