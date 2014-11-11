(function() {
    var tolerance = 0.0001,
        dataviz = kendo.dataviz,
        toolbar,
        diagram;

    function createDiagram(options) {
        QUnit.fixture.html('<div id="canvas" />');
        diagram = $("#canvas").kendoDiagram(options).getKendoDiagram();
    }

    function createToolBar(options) {
        QUnit.fixture.html('<div id="diagram" />');
        diagram = {
            element: $("#diagram")
        };

        toolbar = new dataviz.diagram.DiagramToolBar(diagram, options || {});
    }

    // ------------------------------------------------------------
    module("ToolBar / Actions", {
        teardown: function() {
            toolbar.destroy();
        }
    });

    test("should create edit action", function () {
        createToolBar({ tools: ["edit"] });
        equal(toolbar.element.find("a").data("action"), "edit");
    });

    test("should create delete action", function () {
        createToolBar({ tools: ["delete"] });
        equal(toolbar.element.find("a").data("action"), "delete");
    });

    test("should create rotateAnticlockwise action", function () {
        createToolBar({ tools: ["rotateAnticlockwise"] });
        equal(toolbar.element.find("a").data("action"), "rotateAnticlockwise");
    });

    test("should create rotateClockwise action", function () {
        createToolBar({ tools: ["rotateClockwise"] });
        equal(toolbar.element.find("a").data("action"), "rotateClockwise");
    });

    test("should create rotateAnticlockwise action with custom step", function () {
        createToolBar({ tools: [{ type: "rotateAnticlockwise", step: 45 }] });
        equal(toolbar.element.find("a").data("step"), 45);
    });

    test("should create rotateClockwise action with custom step", function () {
        createToolBar({ tools: [{ type: "rotateClockwise", step: 45 }] });
        equal(toolbar.element.find("a").data("step"), 45);
    });
})();
