---
title: Create Flowchart from Local Data Using Kendo UI Diagram
description: How to create a flowchart from local data for shapes and connections using Kendo UI Diagram
type: how-to
page_title: Create a Flowchart Using Kendo UI Diagram
slug: diagram-create-flowchart
position: 
tags: diagram, flowchart
ticketid: 1147424
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1.117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Diagram</td>
	</tr>
</table>


## Description
I want to create a [flowchart](https://en.wikipedia.org/wiki/Flowchart) and use JSON or local data to bind the shapes. 

## Solution
You can create data sets for the Diagram shapes and connections and a client-side function that maps this data to shape and connection properties. 

Some of the flowchart shapes are available as pre-defined shape [types](/api/javascript/dataviz/diagram/shape#configuration-type) in the Diagram. You can define the rest of the shapes using a [Path](/api/javascript/dataviz/diagram/path) object.

The following example shows a simple flowchart implementation using a common function to generate all shapes.

```html
    <div id="diagram"></div>

    <script>
      $('document').ready(function () {

        var diagram = $("#diagram").kendoDiagram({

          connectionDefaults: {
            endCap: {
              type: 'ArrowEnd',
              fill: {
                color: "#222222"
              }
            },
            hover: {
              stroke: {
                color: "#02DA10",
                fill: "#02DA10"
              }
            }
          }
        }).getKendoDiagram();


        function createShape(options) {
          var shapeOptions = {
            id: options.id,
            x: options.positionX,
            y: options.positionY,
            width: options.width || 100,
            height: options.height || 50,
            type: options.type,
            path: options.path || undefined,
            content: {
              text: options.textData || undefined,
              color: options.textData.length> 15? 'transparent' : '#fff'
            },
            fill: options.fillColor || '#0088CC'
          };

          var shape = new kendo.dataviz.diagram.Shape(shapeOptions);

          return shape;
        }
        
        var data = [{
          'id': 1,
          'textData': 'Start',
          'type': 'circle',
          'positionX': 424.5,
          'positionY': 20,
          'fillColor': 'green',
          'width': 50
        },{
          'id': 2,
          'textData': 'State 1',
          'type': 'rectangle',
          'positionX': 400,
          'positionY': 125,
          'height': 100,
          'width': 100,
          'path': 'M 50 0 100 50 50 100 0 50 Z'
        },{
          'id': 3,
          'textData': 'Completed?',
          'type': 'circle',
          'positionX': 399.5,
          'positionY': 290
        }];
        
        var connectionsData = [{
        	'fromShapeId': 1,
          'toShapeId': 2
        },{
        	'fromShapeId': 2,
          'toShapeId': 3
        },{
        	'fromShapeId': 3,
          'toShapeId': 1
        }];
        
        for(var i = 0; i < data.length; i++) {
        	diagram.addShape(createShape(data[i]));
        }
        
        for(var j = 0; j < connectionsData.length; j++){
          var sourceShape = diagram.getShapeById(connectionsData[j].fromShapeId);
          var targetShape = diagram.getShapeById(connectionsData[j].toShapeId);
        	diagram.connect(sourceShape, targetShape);
        }
      });
    </script>
```

## See Also

* [Diagram Builder Example](https://demos.telerik.com/kendo-ui/html5-diagram-sample-app) - this demo shows how to create custom shapes in the Diagram
* [Diagram Model Fields](/controls/diagrams-and-maps/diagram/editing#model-fields) - see a full list of the shape and connection properties in the Diagram