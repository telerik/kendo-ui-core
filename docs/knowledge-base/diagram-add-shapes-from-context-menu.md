---
title: Load shape from context menu in the Diagram
description: An example on how to dynamically add shapes to a Kendo UI Diagram using a context menu.
type: how-to
page_title: Create shapes dynamically with ContextMenu | Kendo UI Diagram for jQuery
slug: diagram-add-shapes-from-context-menu
tags: diagram, shape, connection, dynamically, add, contextMenu, flowchart, context, menu
ticketid: 1363741
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

I want to use the context menu over shapes to create a chain of dynamic options on `select`. The newly created shape should be connected to the parent shape. How can I dynamically create a flowchart diagram with different connected shapes?

## Solution

1. Create an option in the `visualTemplate` function for all the dynamic shapes that can be added
1. Include them in the ContextMenu dataSource
1. On `select`of the context menu, use the Kendo UI Diagram dataSource to add the new items and connections. Doing that, the Kendo UI Diagram will use the existing visualTemplate function, instead of creating complex shape and connection adding logic.

```dojo
    <p>Use the context menu over shapes to create a chain of dynamic options</p>
    <ul id="menu">
    </ul>

    <div id="diagram"></div>

    <script>
      function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        if (dataItem.eventType === "Start") {
          g.append(new dataviz.diagram.Circle({
            radius: 60,
            stroke: {
              width: 2,
              color: dataItem.color || "#586477"
            },
            fill: {
              gradient: {
                type: "linear",
                stops: [{
                  color: '#75be16',
                  offset: 0,
                  opacity: 0.5
                }, {
                  color: '#75be16',
                  offset: 1,
                  opacity: 1
                }]
              }
            }
          }));
        } else if (dataItem.eventType === "Event") {
          g.append(new dataviz.diagram.Circle({
            radius: 60,
            stroke: {
              width: 2,
              color: dataItem.color || "#586477"
            },
            fill: {
              gradient: {
                type: "linear",
                stops: [{
                  color: '#ee587b',
                  offset: 0,
                  opacity: 0.5
                }, {
                  color: '#ee587b',
                  offset: 1,
                  opacity: 1
                }]
              }
            },
            height: 50,
            width: 100
          }));
        } else if (dataItem.eventType === "Subscriber") {
          g.append(new dataviz.diagram.Rectangle({
            width: 100,
            height: 100,
            stroke: {
              width: 0
            },
            fill: {
              gradient: {
                type: "linear",
                stops: [{
                  color: '#ef6944',
                  offset: 0,
                  opacity: 0.5
                }, {
                  color: '#ef6944',
                  offset: 1,
                  opacity: 1
                }]
              }
            }
          }));
        } else if (dataItem.eventType === "Yes") {
          g.append(new dataviz.diagram.Circle({
            width: 70,
            height: 50,
            stroke: {
              width: 0
            },
            fill: "green"
          }));
        } else if (dataItem.eventType === "No") {
          g.append(new dataviz.diagram.Circle({
            width: 70,
            height: 50,
            stroke: {
              width: 0
            },
            fill: "orange",
            fontColor: "#fff"
          }));
        } else if (dataItem.eventType === "Text") {
          g.append(new dataviz.diagram.TextBlock({
            text: dataItem.eventType,
            color: "#000",
            fontSize: 16
          }));
        } else if (dataItem.eventType === "View") {
          g.append(new dataviz.diagram.Image({
            source: "http://sitedevel.com/wp-content/uploads/2015/04/logo_kendoui_solo.png",
            x: 3,
            y: 3,
            width: 100,
            height: 100
          }));
        } else if (dataItem.eventType === "Plugin") {
          g.append(new dataviz.diagram.Rectangle({
            width: 240,
            height: 67,
            stroke: {
              width: 0
            },
            fill: {
              gradient: {
                type: "linear",
                stops: [{
                  color: '#1696d3',
                  offset: 0,
                  opacity: 0.5
                }, {
                  color: '#1696d3',
                  offset: 1,
                  opacity: 1
                }]
              }
            }
          }));
        } else {
          g.append(new dataviz.diagram.Rectangle({
            width: 240,
            height: 67,
            stroke: {
              width: 0
            },
            fill: dataItem.color || "#e8eff7"
          }));

          g.append(new dataviz.diagram.Rectangle({
            width: 8,
            height: 67,
            fill: dataItem.color,
            stroke: {
              width: 0
            }
          }));
        }

        return g;
      }

      function onDataBound(e) {
        var that = this;
        setTimeout(function () {
          that.bringIntoView(that.shapes);
        }, 0);
      }

      var thisDataSource = [{
        "id": 1,
        "eventType": "Start",
        x:50,
        y:100,
        color:"green"
      }];

      var titles = [{eventType: "Start"},
                    {eventType: "View"},
                    {eventType: "Event"},
                    {eventType: "Subscriber"},
                    {eventType: "Plugin"},
                    {eventType: "Yes"},
                    {eventType: "No"}];

      var DomainModel = [{Id: "1", Name: "Model 1"},
                         {Id: "2", Name: "Model 2"},
                         {Id: "3", Name: "Model 3"},
                         {Id: "4", Name: "Model 4"}];

      var thisDataConnection = [];

      var shapesDataSource = {
        batch: false,
        data: thisDataSource,
        onShapeTextChange: function (ev) {
          console.log("onTextShapeChanged:" + ev);
        },
        schema: {
          model: {
            id: "id",
            fields: {
              id: { type: "number", editable: false},
              eventType: { type: "string" },
              color: { type: "string" },
              name: { type: "string" },
              x: { type: "number"},
              y: { type: "number"}
            }
          }
        }
      };

      var connectionsDataSource = {
        batch: false,
        data: thisDataConnection,
        change1: function (data) {
          //console.log(data);
          if (data.action === 'itemchange' && data.field === 'toY') {
            var getLength = thisDataConnection.length;
            var getThisInpt = data.items;
            var itemToPush = getThisInpt[0];
            if (itemToPush.eventType !== '') {
              itemToPush.id = getLength + 1;
              itemToPush.FromShapeId = itemToPush.from;
              itemToPush.ToShapeId = itemToPush.to;

              thisDataConnection.push(itemToPush);
              //console.log(JSON.stringify(thisDataConnection));
            }
          }
        },
        schema: {
          model: {
            id: "id",
            fields: {
              id: {from: "Id", type: "number", editable: false},
              from: {from: "FromShapeId", type: "number"},
              to: {from: "ToShapeId", type: "number"},
              fromX: {from: "FromPointX", type: "number"},
              fromY: {from: "FromPointY", type: "number"},
              toX: {from: "ToPointX", type: "number"},
              toY: {from: "ToPointY", type: "number"}
            }
          }
        }
      };

      $("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: false,
        editable: {
          tools: false
        },
        shapeDefaults: {
          visual: visualTemplate,
          content: {
            template: "#= dataItem.eventType !== 'View'? dataItem.eventType : '' #",
            fontSize: 17
          }
        },
        connectionDefaults: {
          stroke: {
            color: "#586477",
            width: 2
          },
          type: "polyline",
          startCap: "FilledCircle",
          endCap: "ArrowEnd"
        },
        dataBound: onDataBound
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.bringIntoView(diagram.shapes);

      var contextDataItem;

      $("#menu").kendoContextMenu({
        target: "#diagram",
        filter: "g",
        dataSource: [{ text: "Start"},
                     {text: "View"},
                     {text: "Event"},
                     {text: "Subscriber"},
                     {text: "Plugin"},
                     {text: "Yes"},
                     {text: "No"}],
        open: function (e) {
          if (e.event) {
            try {
              var shapes = diagram.shapes;
              var connections = diagram.connections;
              var point = diagram.documentToModel(new kendo.dataviz.diagram.Point(e.event.pageX, e.event.pageY));

              //Cancel the menu opening when the target is a connection
              for (var i = connections.length - 1; i >= 0; i--) {
                if (connections[i].bounds().contains(point)) {
                  e.preventDefault();
                }
              }
              //Find the target shape
              for (var i = shapes.length - 1; i >= 0; i--) {
                if (shapes[i].bounds().contains(point)) {
                  contextDataItem = shapes[i].dataItem;
                  break;
                }
              }
            } catch (e) {
              alert(e);
            }
          }
        },
        select: function (e) {    
          var selectedShape = diagram.getShapeByModelId(contextDataItem.id);
          var newShapeId = thisDataSource.length +=1;
          diagram.dataSource.add({
            x: contextDataItem.x + selectedShape.options.width + 50, 
            y: contextDataItem.y ,
            eventType: $(e.item).text(),
            id: newShapeId
          });

          diagram.connectionsDataSource.add({
            from: contextDataItem.id,
            to: newShapeId
          });

          diagram.refresh();           
        }
      });
    </script>
```

## See Also

* [Show Context Menu over Shapes]({% slug howto_show_context_menu_over_shapes %})