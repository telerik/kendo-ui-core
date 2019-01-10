(function() {
    var dom;

    describe('panelbar MVVM', function () {
        beforeEach(function() {
            Mocha.fixture.html('<script type="text/x-kendo-template" id="template"><li>${text}</li></script>');
            Mocha.fixture.html('<script type="text/x-kendo-template" id="textTemplate">${text}</script>');
        });
        afterEach(function() {
            kendo.destroy(dom);
        });

    it("initializes a panelbar when data role is panelbar", function() {
        dom = $('<div data-role="panelbar"></div>');

        kendo.bind(dom);

        assert.isOk(dom.data("kendoPanelBar") instanceof kendo.ui.PanelBar);
    });

    it("initializes a options from data attributes", function() {
        dom = $('<div data-role="panelbar" data-expand-mode="single"></div>');

        kendo.bind(dom);

        var panelbar = dom.data("kendoPanelBar");

        assert.equal(panelbar.options.expandMode, "single");
    });

    it("binding panelbar initialized before binding", function() {
        dom = $('<div data-expand-mode="single"></div>');

        dom.kendoPanelBar();

        kendo.bind(dom);

        assert.equal(dom.data("kendoPanelBar").options.expandMode, "single");
    });

    it("binding containing binding attributes", function() {
        dom = $('<div data-role="panelbar"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        assert.equal($.trim(dom.find("span:first").html()), "foo");
    });

    it("updating viewModel updates the content", function() {
        dom = $('<div data-role="panelbar"><span data-bind="text:text"></span></div>');

        var observable = kendo.observable({ text:"foo" });

        kendo.bind(dom, observable);

        observable.set("text", "bar");

        assert.equal($.trim(dom.find("span:first").html()), "bar");
    });

    it("source binding is skipped if set to target element", function() {
        dom = $('<ul id="container" data-template="textTemplate" data-bind="source:items"></ul>');

        var observable = kendo.observable({ items: [{text: "foo"}, {text:"bar" }] });

        kendo.bind(dom, observable);
        dom.kendoPanelBar();
        assert.equal(dom.children().length, 2)
    });

    it("event is raised if attached as option", function() {
        window.panelBarExpand = function() {
            assert.isOk(true);
        }

        dom = $('<div data-role="panelbar" data-expand="panelBarExpand"></div>');

        kendo.bind(dom);

        dom.data("kendoPanelBar").trigger("expand");
    });


    it("binding visible to true shows the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: true });

        var panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") != "none", "panelbar is visible");
    });

    it("binding visible to false hides the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: false });

        var panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") == "none", "panelbar is not visible");
    });

    it("binding invisible to true hides the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: true });

        var panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") == "none", "panelbar is invisible");
    });

    it("binding invisible to false shows the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: false });

        var panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") != "none", "panelbar is not invisible");
    });
    });
}());
