---
title: Change the Pointer Cursor When Hovering a Shape or Connection in the Diagram
description: How to get rid of the hand cursor when hover over a shape or connection in a Kendo UI Diagram?
type: how-to
page_title: How to Change the Cursor on Shape or Connection Hover in the Diagram
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
We don't want to give users the impression that the Diagram is clickable, is there a way to keep the default cursor when they hover over a shape or a connection in the Kendo UI Diagram?

## Solution
There are two possible ways to approach this task.

### Change the cursor dynamically when a series or a connection is hovered
To do this, add a `mouseEnter` event handler and change the cursor of the hovered element:

```html
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

### Change the cursor when the Diagram is bound
You can access all shapes and connections in the `dataBound` event of the Diagram and change their cursor:

```html
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

## Notes
If you want to prevent any user interaction with the Diagram and display it as a static image, set `editable: false` and `selectable: false`in the widget configuration.
