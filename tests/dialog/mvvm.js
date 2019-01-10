(function() {
    describe("MVVM", function() {
        beforeEach(function() {


            window.openHandler = function() {
                assert.isOk(true);
            };
        });
        afterEach(function() {
            Mocha.fixture.closest("body").find(".k-dialog .k-content").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            Mocha.fixture.closest("body").find(".k-overlay").remove();


            delete window.openHandler;
        });

        it("initializes a dialog when data role is dialog", function() {
            var dom = $('<div data-role="dialog"></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoDialog") instanceof kendo.ui.Dialog);
        });

        it("initializes a options from data attributes", function() {
            var dom = $('<div data-role="dialog" data-modal="true"></div>');

            kendo.bind(dom);

            var dialog = dom.data("kendoDialog");

            assert.equal(dialog.options.modal, true);
        });

        it("initializes modal false from data attributes", function() {
            var dom = $('<div data-role="dialog" data-modal="false"></div>');

            kendo.bind(dom);

            var dialog = dom.data("kendoDialog");

            assert.equal(dialog.options.modal, false);
        });

        it("binding dialog initialized before binding", function() {
            var dom = $('<div data-modal="false"></div>');

            var dialog = dom.kendoDialog().data("kendoDialog");

            kendo.bind(dom);

            assert.equal(dialog.options.modal, false);
        });

        it("binding containing binding attributes", function() {
            var dom = $('<div data-role="dialog"><span data-bind="text:text"></span></div>');

            var observable = kendo.observable({ text: "foo" });

            kendo.bind(dom, observable);

            assert.equal($.trim(dom.find("span:first").html()), "foo");
        });

        it("updating viewModel updates the content", function() {
            var dom = $('<div data-role="dialog"><span data-bind="text:text"></span></div>');

            var observable = kendo.observable({ text: "foo" });

            kendo.bind(dom, observable);

            observable.set("text", "bar");

            assert.equal($.trim(dom.find("span:first").html()), "bar");
        });

        it("event is raised if attached as option", function() {
            var dom = $('<div data-role="dialog" data-open="openHandler"></div>');

            kendo.bind(dom);

            dom.data("kendoDialog").trigger("open");
        });

        it("binding visible to true shows the dialog", function() {
            var dom = $('<div data-role="dialog" data-bind="visible: visible"></div>');

            kendo.bind(dom, { visible: true });

            var dialog = dom.data("kendoDialog");

            assert.isOk(dialog.wrapper.css("display") != "none", "dialog is visible");
        });

        it("binding visible to false hides the dialog", function() {
            var dom = $('<div data-role="dialog" data-bind="visible: visible"></div>');

            kendo.bind(dom, { visible: false });

            var dialog = dom.data("kendoDialog");

            assert.isOk(dialog.wrapper.css("display") == "none", "dialog is not visible");
        });

        it("binding invisible to true hides the dialog", function() {
            var dom = $('<div data-role="dialog" data-bind="invisible: invisible"></div>');

            kendo.bind(dom, { invisible: true });

            var dialog = dom.data("kendoDialog");

            assert.isOk(dialog.wrapper.css("display") == "none", "dialog is invisible");
        });

        it("binding invisible to false shows the dialog", function() {
            var dom = $('<div data-role="dialog" data-bind="invisible: invisible"></div>');

            kendo.bind(dom, { invisible: false });

            var dialog = dom.data("kendoDialog");

            assert.isOk(dialog.wrapper.css("display") != "none", "dialog is not invisible");
        });

        it("bind visible through data attribute", function() {
            var dom = $('<div data-role="dialog" data-visible="false"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var dialog = dom.data("kendoDialog");

            assert.isOk(dialog.wrapper.css("display") == "none");
        });

        it("set width and height through data attribute", function() {
            var dom = $('<div data-role="dialog" data-width="212" data-height="233"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var dialog = dom.data("kendoDialog");

            assert.equal(dialog.wrapper.outerWidth(), 212);
            assert.equal(dialog.wrapper.outerHeight(), 233);
        });

        it("set content through data attribute", function() {
            var dom = $('<div data-role="dialog" data-content="echo"></div>').appendTo(Mocha.fixture);

            kendo.bind(dom, {});

            var dialog = dom.data("kendoDialog");

            assert.isOk(dialog.options.content);
            assert.equal(dialog.options.content, "echo");
        });
    });
}());
