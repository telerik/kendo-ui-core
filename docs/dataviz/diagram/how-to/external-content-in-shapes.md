---
title: External Content in Shapes
page_title: Render external content in shape visuals
description: Render external content in shape visuals
---

# Render External Content in Shape Visuals

This help topic demonstrates how to render HTML content in Diagram shapes.

The Diagram is rendered using the [Drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/overview).
The shape visual templates allow you to override the rendering entirely,
as illustrated in the [Basic Usage](http://demos.telerik.com/kendo-ui/diagram/index) demo.

In addition to manually drawing the shapes, you can use the [HTML Drawing](/framework/drawing/drawing-dom) feature to convert existing document content into static drawings.

This is what we'll demonstrate here by placing a chart into the diagram shapes.

#### Example - Draw external content in Diagram shape

```html
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
        var renderElement = $("<div />").appendTo("body");
        renderElement.html(contentTemplate(dataItem));

        // Create a new group that will hold the rendered content
        var output = new kendo.drawing.Group();
        draw.drawDOM(renderElement)
        .then(function(group) {
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
