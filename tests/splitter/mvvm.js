(function() {

    var dom;

    module("mvvm", {
        teardown: function() {
            dom.data("kendoSplitter").destroy();
            dom = null;
        }
    });

    test("initializes a splitter when data role is splitter", function() {
        dom = $('<div data-role="splitter"><div></div></div>');

        kendo.bind(dom);

        ok(dom.data("kendoSplitter") instanceof kendo.ui.Splitter);
    });

    test("initializes a options from data attributes", function() {
        dom = $('<div data-role="splitter" data-orientation="vertical"><div></div><div></div></div>');

        kendo.bind(dom);

        var splitter = dom.data("kendoSplitter");

        equal(splitter.options.orientation, "vertical");
    });

    test("binding splitter initialized before binding", function() {
        dom = $('<div data-orientation="vertical"><div></div><div></div></div>');

        var splitter = dom.kendoSplitter().data("kendoSplitter");

        kendo.bind(dom);

        equal(splitter.options.orientation, "vertical");
    });

    test("binding containing binding attributes", function() {
        dom = $('<div data-role="splitter"><div><span data-bind="text:text"></span></div></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        equal($.trim(dom.find("span:first").html()), "foo");
    });

    test("updating viewModel updates the content", function() {
        dom = $('<div data-role="splitter"><div><span data-bind="text:text"></span></div></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        observable.set("text", "bar");

        equal($.trim(dom.find("span:first").html()), "bar");
    });

    test("event is raised if attached as option", 1, function() {
        dom = $('<div data-role="splitter" data-bind="{ events: { resize: resizeHandler } }"><div></div></div>');

        kendo.bind(dom, {
            resizeHandler: function () {
                ok(true);
            }
        });

        dom.data("kendoSplitter").trigger("resize");
    });

    test("binding visible to true shows the splitter", function() {
        dom = $('<div data-role="splitter" data-bind="visible: visible"><div></div></div>');

        kendo.bind(dom, { visible: true });

        var splitter = dom.data("kendoSplitter");

        ok(splitter.wrapper.css("display") != "none", "splitter is visible");
    });

    test("binding visible to false hides the splitter", function() {
        dom = $('<div data-role="splitter" data-bind="visible: visible"><div></div></div>');

        kendo.bind(dom, { visible: false });

        var splitter = dom.data("kendoSplitter");

        ok(splitter.wrapper.css("display") == "none", "splitter is not visible");
    });

    test("binding invisible to true hides the splitter", function() {
        dom = $('<div data-role="splitter" data-bind="invisible: invisible"><div></div></div>');

        kendo.bind(dom, { invisible: true });

        var splitter = dom.data("kendoSplitter");

        ok(splitter.wrapper.css("display") == "none", "splitter is invisible");
    });

    test("binding invisible to false shows the splitter", function() {
        dom = $('<div data-role="splitter" data-bind="invisible: invisible"><div></div></div>');

        kendo.bind(dom, { invisible: false });

        var splitter = dom.data("kendoSplitter");

        ok(splitter.wrapper.css("display") != "none", "splitter is not invisible");
    });
})();
