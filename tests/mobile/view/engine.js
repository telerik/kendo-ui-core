(function() {
    var viewEngine,
        root;

    function hidden(selector) {
        ok(!root.find(selector).is(":visible"));
    }

    function visible(selector) {
        equal(root.find(selector).css("display"), "flex");
    }

    function view(selector) {
        ok(root.find(selector).data("kendoView"));
    }

    ////////////////////////////////////////////////////////////////////
    module("view engine view showing", {
        setup: function() {
            window.viewEngineSuccess = function(e) {
                ok(true);
            }
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "text/html";
            root = $("<div />").appendTo(QUnit.fixture);
            root.html('<div data-role="view" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>').show();
            viewEngine = new kendo.mobile.ViewEngine({
                container: root
            });
        },
        teardown: function() {
            kendo.destroy(root);
            viewEngine.destroy();
            window.viewEngineSuccess = null;
            $.mockjaxClear();
        }
    });

    test("hides child views", 2, function() {
        hidden("#foo");
        hidden("#bar");
    });

    test("shows given view", 2, function() {
        viewEngine.bind("viewShow", function() {
            visible("#foo");
            hidden("#bar");
        });

        viewEngine.showView("#foo");
    });


    test("shown view is visible during init event", 1, function() {
        window.checkVisible = function(e) {
            equal(e.view.element.css("display"), "flex");
        }
        root.html('<div data-role="view" data-init="checkVisible" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>').show();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        viewEngine.showView("#foo");
    });

    test("shown view triggers show event", 1, function() {
        root.html('<div data-role="view" data-show="viewEngineSuccess" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>').show();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        viewEngine.showView("#foo");
    });

    test("prevent default on before show event handler does not display view", 1, function() {
        root.html('<div data-role="view" data-before-show="kendo.preventDefault" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>').show();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        viewEngine.showView("#foo");
        hidden($("#foo"));
    });

    test("prevent default on before hide event handler does not hide view", 2, function() {
        root.html('<div data-role="view" id="foo">Foo</div><div data-role="view" data-before-hide="kendo.preventDefault" id="bar">Bar</div>').show();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        viewEngine.showView("#bar");
        viewEngine.showView("#foo");
        hidden($("#foo"));
        visible($("#bar"));
    });

    test("after show is triggered after the view transition is finished", 1, function() {
        root.html('<div data-role="view"id="foo">Foo</div><div data-after-show="viewEngineSuccess" data-role="view" id="bar">Bar</div>').show();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        viewEngine.showView("#foo");
        viewEngine.showView("#bar");
    });

    test("hidden view triggers hide event", 1, function() {
        root.html('<div data-role="view" data-hide="viewEngineSuccess" id="foo">Foo</div><div data-role="view" id="bar">Bar</div>').show();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        viewEngine.showView("#foo");
        viewEngine.showView("#bar");
    });

    asyncTest("Shows remote view", 2, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<body><div data-role="view" id="page2">Page 2</div></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.find("#page2").length, 1, "Remote view is inserted in the application DOM element");
            equal(e.view.element[0], root.find("#page2")[0]);
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("Works with safari/cordova local file quirk", 2, function() {
        $.mockjax({
            url: "page2.html",
            status: 0,
            responseText: '<body><div data-role="view" id="page2">Page 2</div></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.find("#page2").length, 1, "Remote view is inserted in the application DOM element");
            equal(e.view.element[0], root.find("#page2")[0]);
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("If view is missing, treats body contents as the view", 2, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<body><span>Foo</span></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.find("[data-url='page2.html']").length, 1, "Remote view is inserted in the application DOM element");
            equal(e.view.contentElement().html(), '<span>Foo</span>');
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("Treats generict HTML content as the view", 2, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<span>Foo</span><span>Bar</span>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.find("[data-url='page2.html']").length, 1, "Remote view is inserted in the application DOM element");
            equal(e.view.contentElement().html(), '<span>Foo</span><span>Bar</span>');
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("Show remote view with URL params", 2, function() {
        $.mockjax({
            url: "page2.html?foo=bar",
            responseText: '<body><div data-role="view" id="page2">Page 2</div></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.has("#page2").length, 1, "Remote view is inserted in the application DOM element");
            equal(e.view.element[0], root.find("#page2")[0]);
        });

        viewEngine.showView("page2.html?foo=bar");
    });

    asyncTest("Reuses remote view once loaded", 1, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<body><div data-role="view" id="page2">Page 2</div></body>'
        });

        var view,
            callback3 = function(e) {
                start();
                equal(view, e.view);
            },
            callback2 = function(e) {
                viewEngine.one("viewShow", callback3);
                viewEngine.showView("page2.html");
            },
            callback1 = function(e) {
                view = e.view;
                viewEngine.one("viewShow", callback2);
                viewEngine.showView("#foo");
            };

        viewEngine.one("viewShow", callback1);
        viewEngine.showView("page2.html");
    });

    asyncTest("Reloads remote view if reload configuration is set", 1, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<body><div data-reload="true" data-role="view" id="page2">Page 2</div></body>'
        });

        var view,
            callback3 = function(e) {
                start();
                notEqual(view, e.view);
            },
            callback2 = function(e) {
                viewEngine.one("viewShow", callback3);
                viewEngine.showView("page2.html");
            },
            callback1 = function(e) {
                view = e.view;
                viewEngine.one("viewShow", callback2);
                viewEngine.showView("#foo");
            };

        viewEngine.one("viewShow", callback1);
        viewEngine.showView("page2.html");
    });

    asyncTest("Reuses remote view with different parameters", 1, function() {
        var responseText =  '<body><div data-role="view" id="page2">Page 2</div></body>';
        $.mockjax({
            url: "page2.html?id=2",
            responseText: responseText
        });

        $.mockjax({
            url: "page2.html?id=1",
            responseText: responseText
        });

        var view,
            callback3 = function(e) {
                start();
                equal(view, e.view);
            },

            callback2 = function(e) {
                viewEngine.one("viewShow", callback3);
                viewEngine.showView("page2.html?id=2");
            },

            callback1 = function(e) {
                view = e.view;
                viewEngine.one("viewShow", callback2);
                viewEngine.showView("#foo");
            };

        viewEngine.one("viewShow", callback1);
        viewEngine.showView("page2.html?id=1");
    });

    asyncTest("Loads multiple remote views", 2, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<body><div data-role="view" id="page2">Page 2</div></body><div data-role="view" id="page3">Page 3</div></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.has("#page3").length, 1, "Secondary remote view is inserted in the application DOM element");
            equal(e.view.element[0], root.find("#page2")[0]);
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("Deals with various newline characters when loading remote view", 2, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<html><head></head><body><div id="page2" data-role="view">View\n\u000a\u000a\u000d\u2028\u2029</div></body>\r\n</html>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.has("#page2").length, 1, "Remote view is inserted in the application DOM element");
            equal(e.view.element[0], root.find("#page2")[0]);
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("remote asset loading injects scripts, styles and layouts", 3, function() {
        $.mockjax({
            url: "page2.html",
            responseText: '<body><div data-role="view" id="page2">Page 2</div></body><style id="remoteStyle"></style><script id="remoteScript">window.scriptInjected = true;</script><div data-role="layout" data-id="remoteLayout" /></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            equal(root.find("#remoteStyle").length, 1, "Style is injected");
            ok(viewEngine.layouts["remoteLayout"], "Layout is injected");
            ok(window.scriptInjected, "Script is injected");
        });

        viewEngine.showView("page2.html");
    });

    asyncTest("remote layout widgets bind to remote js event handlers", 1, function() {

        $.mockjax({
            url: "page2.html",
            responseText: '<body><div data-role="view" id="page2" data-layout="remoteLayout">Page 2</div></body><style ' +
                'id="remoteStyle"></style><script id="remoteScript">function foo() { ok(true); }</scr' +
                'ipt><div data-role="layout" data-id="remoteLayout"><div data-role="header"><a data-role="button" data-click="foo" id="remoteButton">Foo</a></div></div></body>'
        });

        viewEngine.bind("viewShow", function(e) {
            start();
            tap(root.find("#remoteButton"));
        });

        viewEngine.showView("page2.html");
    });

    test("shows default view if no url passed", 2, function() {
        viewEngine.bind("viewShow", function() {
            visible("#foo");
            hidden("#bar");
        });

        viewEngine.showView("");
    });

    test("provides url params to the view", 1, function() {
        viewEngine.bind("viewShow", function(e) {
            equal(e.view.params["foo"], "bar");
        });

        viewEngine.showView("#foo?foo=bar", undefined, { foo: "bar" });
    });

    test("recognizes url as a local view when  url params are present", 1, function() {
        viewEngine.bind("viewShow", function(e) {
            equal(e.view.params["foo"], "bar");
        });

        viewEngine.showView("foo?foo=bar&baz=qux", undefined, { foo: "bar", baz: "qux" });
    });

    asyncTest("hides given view", 4, function() {
        viewEngine.bind("viewShow", function() {
            visible("#foo");
            hidden("#bar");
            viewEngine.unbind("viewShow");

            viewEngine.bind("viewShow", function() {
                start();
                visible("#bar");
                hidden("#foo");
            });

            viewEngine.showView("#bar");
        });

        viewEngine.showView("#foo");
    });

    ////////////////////////////////////////////////////////////////////
    module("view engine layout management", {
        setup: function() {
            root = $("<div />");
            root.html('<div data-role="view" data-layout="bar" id="foo">Foo</div>' +
            '<div data-role="view" data-layout="bar" id="dor">Dor</div>' +
            '<div data-role="layout" data-id="bar"><div data-role="header" id="layoutHeader">Foo</div>' +
            '<div data-role="footer" id="layoutFooter">Foo</div></div>').show();

            viewEngine = new kendo.mobile.ViewEngine({ container: root });
        },

        teardown: function() {
            viewEngine.destroy();
            $.mockjaxClear();
        }
    });

    test("applies layout to view", 1, function() {
        viewEngine.bind("viewShow", function(e) {
            equal(e.view.layout, viewEngine.layouts["bar"]);
        });

        viewEngine.showView("");
    });

    test("empty string as a layout means no layout", function() {
        root.html('<div data-role="view" id="page1" data-layout="">Page 1</div> ' +
              '<div data-role="layout" data-id="foo"><div data-role="footer">footer</div></div>'
          ).show();

          viewEngine.destroy();
          viewEngine = new kendo.mobile.ViewEngine({ container: root, layout: "foo" });

        viewEngine.bind("viewShow", function(e) {
            equal(e.view.layout, null);
        });

        viewEngine.showView("");
    });

    test("preserves layout between views", 2, function() {
        viewEngine.showView("");
        viewEngine.bind("viewShow", function(e) {
            ok(e.view.element.find("#layoutHeader")[0]);
            ok(e.view.element.find("#layoutFooter")[0]);
        });
        viewEngine.showView("#dor");
    });

    ////////////////////////////////////////////////////////////////////
    module("view engine default layout", {
        setup: function() {
            root = $("<div />");
            root.html('<div data-role="view" id="foo">Foo</div>' +
            '<div data-role="view" data-layout="baz" id="dor">dor</div>' +
            '<div data-role="layout" data-id="bar" />' +
            '<div data-role="layout" data-id="baz" />').show();

          viewEngine = new kendo.mobile.ViewEngine({ container: root, layout: "bar" });
        },

        teardown: function() {
            viewEngine.destroy();
            $.mockjaxClear();
        }
    });

    test("applies layout to view", 1, function() {
        viewEngine.bind("viewShow", function(e) {
            equal(e.view.layout, viewEngine.layouts["bar"]);
        });

        viewEngine.showView("");
    });

    test("respects view layout data attribute", 1, function() {
        viewEngine.bind("viewShow", function(e) {
            equal(e.view.layout, viewEngine.layouts["baz"]);
        });

        viewEngine.showView("dor");
    });

    test("Uses platform specific layouts", 1, function() {
        kendo.mobile.application = { os: { name: "ios" } };

        root.html('<div data-role="view" id="page1">Page 1</div> \
        <div data-role="layout" data-platform="ios" data-id="foo"><div data-role="footer">footer</div></div> \
        <div data-role="layout" data-platform="android" data-id="foo"><div data-role="footer">footer</div></div> \
        ').show();

        viewEngine.destroy();
        viewEngine = new kendo.mobile.ViewEngine({ container: root });

        equal(viewEngine.layouts["foo"].element.data("platform"), "ios");
        kendo.mobile.application = null;
    });
})();
