kendo_module({
    id: "diagram",
    name: "Diagram Layout",
    category: "diagram",
    depends: ["diagram.math"]
});
(function ($, undefined) {
    var kendo = window.kendo,
        diagram = kendo.diagram = {},
        Class = kendo.Class,
        Graph = kendo.diagram.Graph,
        Node = kendo.diagram.Node,
        Link = kendo.diagram.Link,
        deepExtend = kendo.deepExtend,
        dataviz = kendo.dataviz,
        Point = dataviz.Point2D;



    kendo.deepExtend(diagram, {
        SpringLayout: SpringLayout,
        DiagramToGraphAdapter: DiagramToGraphAdapter
    })
})
    (window.kendo.jQuery)