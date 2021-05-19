(function() {
    describe("MVVM", function() {
        beforeEach(function() {
            $.mockjax({ url: "echo", responseText: "echo!" });

            window.openHandler = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            Mocha.fixture
                .closest("body")
                .find(".k-window-content")
                .each(function(idx, element) {
                    $(element)
                        .data("kendoWindow")
                        .destroy();
                });
            Mocha.fixture
                .closest("body")
                .find(".k-overlay")
                .remove();

            delete window.openHandler;
        });

        it("initializes a window when data role is window", function() {
            var dom = $('<div data-role="window"></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoWindow") instanceof kendo.ui.Window);
        });

        it("initializes a options from data attributes", function() {
            var dom = $('<div data-role="window" data-modal="true"></div>');

            kendo.bind(dom);

            var win = dom.data("kendoWindow");

            assert.equal(win.options.modal, true);
        });

        it("binding window initialized before binding", function() {
            var dom = $('<div data-modal="true"></div>');

            var win = dom.kendoWindow().data("kendoWindow");

            kendo.bind(dom);

            assert.equal(win.options.modal, true);
        });

        it("binding containing binding attributes", function() {
            var dom = $(
                '<div data-role="window"><span data-bind="text:text"></span></div>'
            );

            var observable = kendo.observable({ text: "foo" });

            kendo.bind(dom, observable);

            assert.equal(dom.find("span:first").html().trim(), "foo");
        });

        it("updating viewModel updates the content", function() {
            var dom = $(
                '<div data-role="window"><span data-bind="text:text"></span></div>'
            );

            var observable = kendo.observable({ text: "foo" });

            kendo.bind(dom, observable);

            observable.set("text", "bar");

            assert.equal(dom.find("span:first").html().trim(), "bar");
        });

        it("event is raised if attached as option", function() {
            var dom = $(
                '<div data-role="window" data-open="openHandler"></div>'
            );

            kendo.bind(dom);

            dom.data("kendoWindow").trigger("open");
        });

        it("binding visible to true shows the window", function() {
            var dom = $(
                '<div data-role="window" data-bind="visible: visible"></div>'
            );

            kendo.bind(dom, { visible: true });

            var window = dom.data("kendoWindow");

            assert.isOk(
                window.wrapper.css("display") != "none",
                "window is visible"
            );
        });

        it("binding visible to false hides the window", function() {
            var dom = $(
                '<div data-role="window" data-bind="visible: visible"></div>'
            );

            kendo.bind(dom, { visible: false });

            var window = dom.data("kendoWindow");

            assert.isOk(
                window.wrapper.css("display") == "none",
                "window is not visible"
            );
        });

        it("binding invisible to true hides the window", function() {
            var dom = $(
                '<div data-role="window" data-bind="invisible: invisible"></div>'
            );

            kendo.bind(dom, { invisible: true });

            var window = dom.data("kendoWindow");

            assert.isOk(
                window.wrapper.css("display") == "none",
                "window is invisible"
            );
        });

        it("binding invisible to false shows the window", function() {
            var dom = $(
                '<div data-role="window" data-bind="invisible: invisible"></div>'
            );

            kendo.bind(dom, { invisible: false });

            var window = dom.data("kendoWindow");

            assert.isOk(
                window.wrapper.css("display") != "none",
                "window is not invisible"
            );
        });

        it("bind visible through data attribute", function() {
            var dom = $(
                '<div data-role="window" data-visible="false"></div>'
            ).appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var window = dom.data("kendoWindow");

            assert.isOk(window.wrapper.css("display") == "none");
        });

        it("set width and height through data attribute", function() {
            var dom = $(
                '<div data-role="window" data-width="144" data-height="233"></div>'
            ).appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var window = dom.data("kendoWindow");

            assert.equal(window.wrapper.outerWidth(), 144);
            assert.closeTo(window.wrapper.outerHeight(), 233, 1);
        });

        it("set content through data attribute", function() {
            var dom = $(
                '<div data-role="window" data-content="echo"></div>'
            ).appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var window = dom.data("kendoWindow");

            assert.isOk(window.options.content);
            assert.equal(window.options.content.url, "echo");
        });

        it("set appendTo through data attribute", function() {
            var dom = $(
                '<div data-role="window" data-append-to="#bar"></div><div id="bar"></div>'
            ).appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var window = dom.data("kendoWindow");

            assert.isOk($.contains($("#bar")[0], window.element[0]));
        });
    });
})();
