---
title: Add an Image to the Diagram Shape Template
page_title: Show Images in the Shape Template - jQuery Diagram
description: Learn how to add an image to the shape template of the Kendo UI for jQuery Diagram component.
type: how-to
slug: add-image-in-diagram-shape-template
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Diagram for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I include images in the Diagram shapes?

## Solution

To achieve the desired scenario, use either of the available approaches:

* [Use the `height` and `width` definitions](#using-the-height-and-width).
* [Use the `Image` setting](#using-the-image-setting).

### Using the Height and Width

The following example demonstrates how to implement the suggested approach.

```dojo

<style>
      .container {
        /* Move the rendering container off-screen. */
        position: absolute;
        left: -4000px;

        /* Set the dimensions. */
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
        <img height="100px" width="100px" src='https://demos.telerik.com/aspnet-mvc/content/dataviz/diagram/people/antonio.jpg' />
        Foo Bar
      </div>
    </script>

    <div id="diagram"></div>
    <script>
      // Import the Drawing API namespaces.
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      // Compile the shape template.
      var contentTemplate = kendo.template($("#template").html());

      function visualTemplate(options) {
        // Render the template and bind it to the current data item.
        var dataItem = options.dataItem;
        var renderElement = $("<div style='display:inline-block' />").appendTo("body");
        renderElement.html(contentTemplate(dataItem));

        // Create a new group that will hold the rendered content.
        var output = new kendo.drawing.Group();
        var width = renderElement.width();
        var height = renderElement.height();
        // Create a rectangle by using the renderElement dimensions to expand the group while waiting for its actual content.
        var geom = new kendo.geometry.Rect([0, 0], [width, height]);

        output.append(new kendo.drawing.Rect(geom, { stroke: { width: 0 }}));

        draw.drawDOM(renderElement)
          .then(function(group) {
          /* Remove the helper rectangle. */
          output.clear();

          output.append(group);

          /* Clean up. */
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

### Using the Image Setting

The following example shows how to implement the desired scenario by using the [`kendo.dataviz.diagram.Image`](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/diagram/image) setting.

```dojo

<style>
      .container {
        /* Move the rendering container off-screen. */
        position: absolute;
        left: -4000px;

        /* Set the dimensions. */
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
        <img src='https://demos.telerik.com/aspnet-mvc/content/dataviz/diagram/people/antonio.jpg' />
        Foo Bar
      </div>
    </script>

    <div id="diagram"></div>
    <script>
      // Import the Drawing API namespaces.
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      // Compile the shape template.
      var contentTemplate = kendo.template($("#template").html());

      function visualTemplate(options) {
            var dataviz = kendo.dataviz;
            var g = new dataviz.diagram.Group();
            var dataItem = options.dataItem;

            g.append(new dataviz.diagram.Image({
                source: "../content/dataviz/diagram/people/antonio.jpg",
                x: 3,
                y: 3,
                width: 68,
                height: 68
            }));

            return g;
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

* [Overview of the Kendo UI for jQuery Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [Using the API of the jQuery Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/api)
* [JavaScript API Reference of the jQuery Diagram](/api/javascript/ui/diagram)
* [jQuery Diagram Product Page](https://www.telerik.com/kendo-jquery-ui/diagram)
