---
title: Render External Content in Diagram Shapes
page_title: Render External Content in Diagram Shapes
description: "Learn how to render HTML content in Kendo UI Diagram shapes."
previous_url: /kendo-mvc/dataviz/diagram/how-to/external-content-in-shapes, /controls/diagrams-and-maps/diagram/how-to/external-content-in-shapes
slug: howto_renderexternalcontent_inshapes_diagram
tags: kendo, jquery, diagram, render, external, content, in, shapes
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

How can I render external content in the shapes of the Kendo UI for jQuery Diagram?

## Solution

The Diagram is rendered through the [Drawing API](https://docs.telerik.com/kendo-ui/framework/drawing/overview).

The shape visual templates allow you to override the rendering entirely as demonstrated in the [Basic Usage](https://demos.telerik.com/kendo-ui/diagram/index) demo. In addition to the manual drawing of the shapes, you can use the [HTML Drawing](/framework/drawing/dom-elements/overview) feature to convert existing document content into static drawings.

```dojo
    <style>
      .container {
        /* Move rendering container off-screen */
        position: absolute;
        left: -4000px;

        /* Set dimensions */
        width: 100px;
        height: 100px;
      }

      .shape {
        width: 100px;
        border: 2px solid red;
        text-align: center;
        padding-bottom: 10px;
      }

      .title {
        font-size: 20px;
        margin: 5px 0 20px 0;
      }
    </style>

    <script id="template" type="text/x-kendo-template">
      <div class="shape">
        <div class='title'>#= title #</div>
        Foo Bar
      </div>
    </script>

    <div id="diagram"></div>
    <script>
      // Import the Drawing API namespaces
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      // Compile the shape template
      var contentTemplate = kendo.template($("#template").html());

      function visualTemplate(options) {
        // Render template and bind it to the current data item
        var dataItem = options.dataItem;
        var renderElement = $("<div style='display:inline-block' />").appendTo("body");
        renderElement.html(contentTemplate(dataItem));

        // Create a new group that will hold the rendered content
        var output = new kendo.drawing.Group();
        var width = renderElement.width();
        var height = renderElement.height();
        // Create a rectangle using the renderElement dimensions to expand the group while waiting for its actual content
        var geom = new kendo.geometry.Rect([0, 0], [width, height]);
        output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 }}));

        draw.drawDOM(renderElement)
          .then(function(group) {
          /* Remove helper rectangle */
          output.clear();

          output.append(group);

          /* Clean-up */
          renderElement.remove();
        });

        var visual = new kendo.dataviz.diagram.Group();
        visual.drawingElement.append(output);

        return visual;
      }

      var data = [{
        title: "Foo",
        items: [{
          title: "Bar"
        }]
      }];

      $("#diagram").kendoDiagram({
        dataSource: {
          data: data,
          schema: {
            model: {
              children: "items"
            }
          }
        },
        layout:{
          type: "tree",
          subtype: "right"
        },
        shapeDefaults: {
          visual: visualTemplate
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
