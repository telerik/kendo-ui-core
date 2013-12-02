(function() {
    var modalView,
        element,
        source,
        root;

    module("ModalView", {
        setup: function() {
            root = $("<div />").appendTo($('#qunit-fixture'));
            location.hash = '';
            // kendo.mobile.ui.Shim.fn.options.duration = 0;
            root.html('<div data-role="view">\
                <a id="source" data-role="button" href="#modalView" data-rel="modalview">Foo</a>\
                </div>\
                <div data-role="modalview" id="modalView">\
                Hello world!\
                </div>');
            new kendo.mobile.Application(root);
            element = root.find("[data-role=modalview]");
            source = root.find("#source");
            modalView = element.data("kendoMobileModalView");
        },

        teardown: function() {
            kendo.history.stop();
        }
    });

    function modalViewIsOpen() {
        equal(root.find(".km-shim").css("display"), "block");
    }

    function modalViewIsClosed() {
        setTimeout(function() {
            start();
            equal(root.find(".km-shim").css("display"), "none");
        }, 50);
    }

    test("Is visible when open", function() {
        modalView.open();
        modalViewIsOpen();
    });


    asyncTest("Is hidden when closed", 1, function() {
        modalView.open();
        modalView.close();
        modalViewIsClosed();
    });

    test("data-rel=modalview widget opens the modalview", 1, function() {
        root.find('[data-role=button]').trigger($.Event(kendo.support.mouseup));
        modalViewIsOpen();
    });

    module("ModalView", {
        setup: function() {
            location.hash = "";
            kendo.mobile.ui.Shim.fn.options.duration = 0;
            root.html('<div data-role="view"><a data-role="button" href="/page2.html">page2</a></div>');
            new kendo.mobile.Application(root);
        },

        teardown: function() {
            $.mockjaxClear();
        }
    });

    asyncTest("includes modal views from remote views", 1, function() {
        $.mockjax({
            url: "/page2.html",
            responseText: '<div data-role="view" id="page2">Page 2</div><div data-role="modalview" id="modalView">Hello world!</div>',
            responseTime: 0
        });

        root.find("a").trigger($.Event(kendo.support.mouseup));

        setTimeout(function() {
            start();
            equal(root.find("[data-role=modalview]").length, 1);
        }, 100);
    });

})();
