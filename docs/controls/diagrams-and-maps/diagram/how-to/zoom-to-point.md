---
title: Zoom to Predefined Points
page_title: Zoom to Predefined Points | Kendo UI Diagram
description: "Learn how to programmatically zoom to a certain point in the Kendo UI Diagram."
slug: howto_zoomtopoint_diagram
---

# Zoom to Predefined Points

The following example demonstrates how to zoom the Diagram to a predefined point.

```dojo

    <button id="zoomIn">+</button>
    <button id="zoomOut">-</button>

    <div id="diagram"></div>

    <script>
      $(document).ready(function () {
        $("#diagram").kendoDiagram();

        var diagram = $("#diagram").data("kendoDiagram");

        var diagramNS = kendo.dataviz.diagram;
        var shape1 = diagram.addShape(new diagramNS.Shape({x: 120, y: 120, fill: "red", content: { text: "Test Shape" }}));

        $("#zoomIn").on("click", function () {
          var zoom = $("#diagram").data("kendoDiagram").zoom();
          $("#diagram").data("kendoDiagram").zoom(zoom + 0.1,
                                                  {point: new diagramNS.Point(100, 100)});
        });

        $("#zoomOut").on("click", function () {
          var zoom = $("#diagram").data("kendoDiagram").zoom();
          $("#diagram").data("kendoDiagram").zoom(zoom - 0.1,
                                                  {point: new diagramNS.Point(100, 100)});
        });
      });
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
