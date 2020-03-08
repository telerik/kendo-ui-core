---
title: Highlight Selected Shapes in Diagram
description: An example on how to change the color of selected shapes in order to highlight them.
type: how-to
page_title: Change the Color of Selected Shapes | Kendo UI Diagram for jQuery
slug: diagram-highlight-selected-shapes
tags: diagram, selection, shapes
ticketid: 1338877
res_type: kb
component: diagram
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Diagram</td>
 </tr>
</table>


## Description

How can I change the color of shapes in the Diagram when the user performs selection?

## Solution

1. Use a custom shape visual that sets a different color to the shape on condition that it is currently selected.

  	```
      function visualTemplate(data) {
          var diagram = kendo.dataviz.diagram;
          var g = new diagram.Group({
              autoSize: true
          });

          var r = new diagram.Rectangle({
              width : 100,
              height: 80,
              fill: this.isSelected ? "limegreen" : data.fill.color
          });
          g.append(r);

          return g;
      }
  	```

    The shape visual is applied through the [`shapeDefaults.visual`](/api/javascript/dataviz/ui/diagram/configuration/shapedefaults.visual) property.

1. Handle the [`select` event](/api/javascript/dataviz/ui/diagram/events/select) and trigger a redraw of the Diagram shapes.

  	```
      select: function(e) {
          var shapes = this.shapes;
          for(var i = 0; i < shapes.length; i++){
              shapes[i].redrawVisual();
          }
      }
  	```

The following example demonstrates how to change the background of the selected shapes in the Diagram to green.

```dojo
    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        selectable: {
          key: "shift"
        },
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          x: 100,
          y: 100
        }, {
          id: "2",
          content: {
            text: "Tuesday"
          },
          x: 250,
          y: 100
        }, {
          id: "3",
          content: {
            text: "Wednesday"
          },
          x: 350,
          y: 250
        }],
        connections: [{
          from: "1",
          to: "2"
        },{
          from: "2",
          to: "3"
        }],
        connectionDefaults: {
          endCap: "ArrowEnd"
        },
        shapeDefaults: {
          visual: visualTemplate
        },
        select: function(e){
          var shapes = this.shapes;
          for(var i = 0; i < shapes.length; i++){
            shapes[i].redrawVisual();
          }
        }
      });
      function visualTemplate(data) {
        var diagram = kendo.dataviz.diagram;
        var g = new diagram.Group({
          autoSize: true
        });

        var r = new diagram.Rectangle({
          width : 100,
          height: 80,
          fill: this.isSelected ? "limegreen" : data.fill.color
        });
        g.append(r);

        return g;
      }
    </script>
```
