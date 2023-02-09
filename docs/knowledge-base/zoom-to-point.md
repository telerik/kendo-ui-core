---
title: Zoom to Predefined Diagram Points
page_title: Zoom to Predefined Diagram Points
description: "Learn how to programmatically zoom to a certain point in the Kendo UI Diagram."
slug: howto_zoomtopoint_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/zoom-to-point
tags: kendo, jquery, diagram, zoom, to, predefined, points
component: diagram
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Diagram for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I zoom the Kendo UI for jQuery Diagram to a predefined point?

## Solution

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
