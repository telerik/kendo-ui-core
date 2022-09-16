---
title: Add Image in Diagram Shape Template
description: How to Add Image in Diagram Shape Template
type: how-to
page_title: How to Add Image in Diagram Shape Template | Kendo UI Diagram for jQuery
slug: add-image-in-diagram-shape-template
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Diagram for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

These samples demonstrate how you can include images in Diagram shapes.

## Solution 1

Using height and width:

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
        <img height="100px" width="100px" src='https://demos.telerik.com/aspnet-mvc/content/dataviz/diagram/people/antonio.jpg' />
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

## Solution 2

Using [kendo.dataviz.diagram.Image](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/diagram/image)

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
        <img src='https://demos.telerik.com/aspnet-mvc/content/dataviz/diagram/people/antonio.jpg' />
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
