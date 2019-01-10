(function() {

    var dom;

    describe("mvvm", function() {
        afterEach(function() {
            dom.data("kendoSplitter").destroy();
            dom = null;
        });

        it("initializes a splitter when data role is splitter", function() {
            dom = $('<div data-role="splitter"><div></div></div>');

            kendo.bind(dom);

            assert.isOk(dom.data("kendoSplitter") instanceof kendo.ui.Splitter);
        });

        it("initializes a options from data attributes", function() {
            dom = $('<div data-role="splitter" data-orientation="vertical"><div></div><div></div></div>');

            kendo.bind(dom);

            var splitter = dom.data("kendoSplitter");

            assert.equal(splitter.options.orientation, "vertical");
        });

        it("binding splitter initialized before binding", function() {
            dom = $('<div data-orientation="vertical"><div></div><div></div></div>');

            var splitter = dom.kendoSplitter().data("kendoSplitter");

            kendo.bind(dom);

            assert.equal(splitter.options.orientation, "vertical");
        });

        it("binding containing binding attributes", function() {
            dom = $('<div data-role="splitter"><div><span data-bind="text:text"></span></div></div>');

            var observable = kendo.observable({ text: "foo" });

            kendo.bind(dom, observable);

            assert.equal($.trim(dom.find("span:first").html()), "foo");
        });

        it("updating viewModel updates the content", function() {
            dom = $('<div data-role="splitter"><div><span data-bind="text:text"></span></div></div>');

            var observable = kendo.observable({ text: "foo" });

            kendo.bind(dom, observable);

            observable.set("text", "bar");

            assert.equal($.trim(dom.find("span:first").html()), "bar");
        });

        it("event is raised if attached as option", function() {
            dom = $('<div data-role="splitter" data-bind="{ events: { resize: resizeHandler } }"><div></div></div>');

            kendo.bind(dom, {
                resizeHandler: function() {
                    assert.isOk(true);
                }
            });

            dom.data("kendoSplitter").trigger("resize");
        });

        it("binding visible to true shows the splitter", function() {
            dom = $('<div data-role="splitter" data-bind="visible: visible"><div></div></div>');

            kendo.bind(dom, { visible: true });

            var splitter = dom.data("kendoSplitter");

            assert.isOk(splitter.wrapper.css("display") != "none", "splitter is visible");
        });

        it("binding visible to false hides the splitter", function() {
            dom = $('<div data-role="splitter" data-bind="visible: visible"><div></div></div>');

            kendo.bind(dom, { visible: false });

            var splitter = dom.data("kendoSplitter");

            assert.isOk(splitter.wrapper.css("display") == "none", "splitter is not visible");
        });

        it("binding invisible to true hides the splitter", function() {
            dom = $('<div data-role="splitter" data-bind="invisible: invisible"><div></div></div>');

            kendo.bind(dom, { invisible: true });

            var splitter = dom.data("kendoSplitter");

            assert.isOk(splitter.wrapper.css("display") == "none", "splitter is invisible");
        });

        it("binding invisible to false shows the splitter", function() {
            dom = $('<div data-role="splitter" data-bind="invisible: invisible"><div></div></div>');

            kendo.bind(dom, { invisible: false });

            var splitter = dom.data("kendoSplitter");

            assert.isOk(splitter.wrapper.css("display") != "none", "splitter is not invisible");
        });
    });
}());
