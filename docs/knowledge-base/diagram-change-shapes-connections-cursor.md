---
title: Change the Pointer Cursor When Hovering a Shape or Connection in the Diagram
description: An example on how to get rid of the hand cursor on hovering over a shape or a connection in a Kendo UI Diagram.
type: how-to
page_title: Change Cursor on Shape or Connection Hover | Kendo UI Diagram for jQuery
slug: diagram-change-shapes-connections-cursor
tags: diagram, shape, connection
ticketid: 1137455
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

I want to provide the user with the impression that the Diagram is not clickable.

How can I keep the default cursor when the user hovers over a shape or a connection in the Diagram?

## Solution

Use either of the following approaches:

* [Change the cursor dynamically](#changing-the-cursor-dynamically)
* [Change the cursor when the Diagram is bound](#changing-the-cursor-when-the-diagram-is-bound)

To prevent user interaction and display the widget as a static image, in the configuration of the Diagram set [`editable: false`](/api/javascript/dataviz/ui/diagram/configuration/editable) and [`selectable: false`](/api/javascript/dataviz/ui/diagram/configuration/selectable).

### Changing the Cursor Dynamically

To dynamically change the cursor when a series or a connection is hovered:
1. Add a `mouseEnter` event handler.
1. Change the cursor of the hovered element.

```dojo
    <div id="diagram"></div>
    <script>
      var data = [{
        title: "Team Lead",
        colorScheme: "#1696d3",
        items: [{
          title: "Design Lead",
          colorScheme: "#ef6944",
          items: [{
            title: "UI Designer",
            colorScheme: "#ef6944"
          }]
        }, {
          title: "QA Engineer",
          colorScheme: "#ee587b",
          items: [{
            title: "QA Intern",
            colorScheme: "#ee587b"
          }]
        }, {
          title: "Senior Developer",
          colorScheme: "#75be16",
          items: [{
            title: "Developer",
            colorScheme: "#75be16"
          }]
        }]
      }];

      function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
          width: 210,
          height: 75,
          stroke: {
            width: 0
          },
          fill: {
            gradient: {
              type: "linear",
              stops: [{
                color: dataItem.colorScheme,
                offset: 0,
                opacity: 0.5
              }, {
                color: dataItem.colorScheme,
                offset: 1,
                opacity: 1
              }]
            }
          }
        }));

        g.append(new dataviz.diagram.TextBlock({
          text: dataItem.title,
          x: 65,
          y: 30,
          fill: "#fff"
        }));

        return g;
      }

      function createDiagram() {
        $("#diagram").kendoDiagram({
          dataSource: new kendo.data.HierarchicalDataSource({
            data: data,
            schema: {
              model: {
                children: "items"
              }
            }
          }),
          editable: false,
          layout: {
            type: "layered"
          },
          selectable: false,
          shapeDefaults: {
            visual: visualTemplate
          },
          connectionDefaults: {
            stroke: {
              color: "#979797",
              width: 2
            }
          },
          mouseEnter: function(e){
            if (e.item instanceof kendo.dataviz.diagram.Shape ||
                e.item instanceof kendo.dataviz.diagram.Connection) {
              e.item.options.cursor = "default";
            }
          }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
      }

      $(document).ready(createDiagram);
    </script>
```

### Changing the Cursor When the Diagram Is Bound

Access all shapes and connections in the [`dataBound`](/api/javascript/dataviz/ui/diagram/events/databound) event of the Diagram and change their cursor.

```dojo
    <div id="diagram"></div>
    <script>
      var data = [{
        title: "Team Lead",
        colorScheme: "#1696d3",
        items: [{
          title: "Design Lead",
          colorScheme: "#ef6944",
          items: [{
            title: "UI Designer",
            colorScheme: "#ef6944"
          }]
        }, {
          title: "QA Engineer",
          colorScheme: "#ee587b",
          items: [{
            title: "QA Intern",
            colorScheme: "#ee587b"
          }]
        }, {
          title: "Senior Developer",
          colorScheme: "#75be16",
          items: [{
            title: "Developer",
            colorScheme: "#75be16"
          }]
        }]
      }];

      function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
          width: 210,
          height: 75,
          stroke: {
            width: 0
          },
          fill: {
            gradient: {
              type: "linear",
              stops: [{
                color: dataItem.colorScheme,
                offset: 0,
                opacity: 0.5
              }, {
                color: dataItem.colorScheme,
                offset: 1,
                opacity: 1
              }]
            }
          }
        }));

        g.append(new dataviz.diagram.TextBlock({
          text: dataItem.title,
          x: 65,
          y: 30,
          fill: "#fff"
        }));

        return g;
      }

      function createDiagram() {
        $("#diagram").kendoDiagram({
          dataSource: new kendo.data.HierarchicalDataSource({
            data: data,
            schema: {
              model: {
                children: "items"
              }
            }
          }),
          editable: false,
          layout: {
            type: "layered"
          },
          selectable: false,
          shapeDefaults: {
            visual: visualTemplate
          },
          connectionDefaults: {
            stroke: {
              color: "#979797",
              width: 2
            }
          },
          dataBound: function(e){
            var shapes = e.sender.shapes;
            var connections = e.sender.connections;
            for(var i = 0; i < shapes.length; i++){
              shapes[i].options.cursor = "default";
            }
            for(var j = 0; j < connections.length; j++){
              connections[j].options.cursor = "default";
            }
          }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
      }

      $(document).ready(createDiagram);
    </script>
```
