import { PanelBarHelpers } from '../../helpers/unit/panelbar-utils.js';
import '@progress/kendo-ui/src/kendo.binder.js';

let dom;

describe('panelbar MVVM', function() {
    beforeEach(function() {

    });
    afterEach(function() {
        kendo.destroy(dom);
        PanelBarHelpers.destroy();
    });

    it("initializes a panelbar when data role is panelbar", function() {
        dom = $('<div data-role="panelbar"></div>');

        kendo.bind(dom);

        assert.isOk(dom.data("kendoPanelBar") instanceof kendo.ui.PanelBar);
    });

    it("initializes a options from data attributes", function() {
        dom = $('<div data-role="panelbar" data-expand-mode="single"></div>');

        kendo.bind(dom);

        let panelbar = dom.data("kendoPanelBar");

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

        let observable = kendo.observable({ text: "foo" });

        kendo.bind(dom, observable);

        assert.equal(dom.find("span:first").html().trim(), "foo");
    });

    it("updating viewModel updates the content", function() {
        dom = $('<div data-role="panelbar"><span data-bind="text:text"></span></div>');

        let observable = kendo.observable({ text: "foo" });

        kendo.bind(dom, observable);

        observable.set("text", "bar");

        assert.equal(dom.find("span:first").html().trim(), "bar");
    });

    it("event is raised if attached as option", function() {
        window.panelBarExpand = function() {
            assert.isOk(true);
        };

        dom = $('<div data-role="panelbar" data-expand="panelBarExpand"></div>');

        kendo.bind(dom);

        dom.data("kendoPanelBar").trigger("expand");
    });


    it("binding visible to true shows the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: true });

        let panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") != "none", "panelbar is visible");
    });

    it("binding visible to false hides the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="visible: visible"></div>');

        kendo.bind(dom, { visible: false });

        let panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") == "none", "panelbar is not visible");
    });

    it("binding invisible to true hides the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: true });

        let panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") == "none", "panelbar is invisible");
    });

    it("binding invisible to false shows the panelbar", function() {
        dom = $('<div data-role="panelbar" data-bind="invisible: invisible"></div>');

        kendo.bind(dom, { invisible: false });

        let panelbar = dom.data("kendoPanelBar");

        assert.isOk(panelbar.wrapper.css("display") != "none", "panelbar is not invisible");
    });

    it("binding to HDS in observable object", function() {
        let viewModel = new kendo.observable({
            panelbarData: new kendo.data.HierarchicalDataSource({
                data: [
                    {
                        text: "Storage", items: [
                            { text: "Wall Shelving" },
                            { text: "Floor Shelving" },
                            { text: "Kids Storage" }
                        ]
                    },
                    {
                        text: "Lights", items: [
                            { text: "Ceiling" },
                            { text: "Table" },
                            { text: "Floor" }
                        ]
                    }
                ]
            })
        });

        let panelbar = PanelBarHelpers.fromOptions({
            dataSource: viewModel.panelbarData
        });

        assert.equal(panelbar.find(".k-panelbar-item").length, 2);
    });
});
