---
title: Implement Local Data Editing in the Diagram
page_title: Implement Local Data Editing in the Diagram
description: "Learn how to implement editing with local data in a Kendo UI Diagram by using custom functions for the dataSource transport operations."
slug: howto_editlocaladata_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/local-data-editing
tags: kendo, jquery, diagram, implement, local, data, editing
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

How can I render local data in the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to implement the editing functionality with local data by using custom functions for the `dataSource` transport operations.

You need this functionality because assigning a non-default `id` value for the new items is required in order for the item to be accepted as existing by the `dataSource` and the new shapes to be displayed by the Diagram.

```dojo

    <script>

      function localDataSource(options) {
        var id =  options.schema.model.id;
        var data = options.data;
        var newId = -1;
        var created, updated, deleted;

        var dataSource = new kendo.data.DataSource($.extend(true, {
          transport: {
            read: function(e) {
              created = {};
              updated = {};
              deleted = {};

              e.success(data || []);
            },

            update: function(e) {
              var item = e.data;
              if (!created[item[id]]) {
                updated[item[id]] = item;
              }
              e.success();
            },

            destroy: function(e) {
              var idValue = e.data[id];
              if (!created[idValue]) {
                deleted[idValue] = e.data;
              } else {
                delete created[idValue];
              }
              e.success();
            },
            create: function(e) {
              var item = e.data;
              item[id] = newId--;
              created[item[id]] = $.extend(true, {}, item);

              e.success(item);
            }
          },
        }, options));

        dataSource.getChanges = function () {
          return {
            deleted: toArray(deleted),
            created: toArray(created),
            updated: toArray(updated)
          }
        };

        return dataSource;
      }

      function toArray(changes) {
        var result = [];
        for (var id in changes) {
          result.push(changes[id]);
        }
        return result;
      }

      function createDiagram() {
        var shapesDataSource = localDataSource({
          data: [{
            "Id": 1,
            "JobTitle": "President"
          }, {
            "Id": 2,
            "JobTitle": "VP Finance",
            "Color": "#3399cc"
          }, {
            "Id": 3,
            "JobTitle": "VP Customer Relations",
            "Color": "#3399cc"
          }, {
            "Id": 4,
            "JobTitle": "VP Human Resources",
            "Color": "#3399cc"
          }],
          schema: {
            model: {
              id: "Id",
              fields: {
                Id: { type: "number", editable: false },
                JobTitle: { type: "string" },
                Color: { type: "string" }
              }
            }
          }
        });

        var connectionsDataSource = localDataSource({
          data:  [{
            "Id": 1,
            "FromShapeId": 1,
            "ToShapeId": 2
          }, {
            "Id": 2,
            "FromShapeId": 1,
            "ToShapeId": 3
          }, {
            "Id": 3,
            "FromShapeId": 1,
            "ToShapeId": 4
          }],
          schema: {
            model: {
              id: "Id",
              fields: {
                Id: { type: "number", editable: false },
                from: { from: "FromShapeId", type: "number" },
                to: { from: "ToShapeId", type: "number" },
                fromX: { from: "FromPointX", type: "number" },
                fromY: { from: "FromPointY", type: "number" },
                toX: { from: "ToPointX", type: "number" },
                toY: { from: "ToPointY", type: "number" }
              }
            }
          }
        });

        var changesViewModel = kendo.observable({
          showChanges: function () {
            var diagram = $("#diagram").data("kendoDiagram");
            this.set("shapes", diagram.dataSource.getChanges());
            this.set("connections", diagram.connectionsDataSource.getChanges());
            this.set("visible", true);
          },
          shapes: {
            deleted: [],
            created: [],
            updated: []
          },
          connections: {
            deleted: [],
            created: [],
            updated: []
          }
        });

        kendo.bind($("#changes"), changesViewModel);

        $("#diagram").kendoDiagram({
          dataSource: shapesDataSource,
          connectionsDataSource: connectionsDataSource,
          layout: {
            type: "tree",
            subtype: "tipover",
            underneathHorizontalOffset: 140
          },
          shapeDefaults: {
            visual: visualTemplate,
            content: {
              template: "#= dataItem.JobTitle #",
              fontSize: 17
            }
          },
          connectionDefaults: {
            stroke: {
              color: "#586477",
              width: 2
            }
          },
          dataBound: onDataBound
        });
      }

      $(document).ready(createDiagram);

      function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        if (dataItem.JobTitle === "President") {
          g.append(new dataviz.diagram.Circle({
            radius: 60,
            stroke: {
              width: 2,
              color: dataItem.Color || "#586477"
            },
            fill: "#e8eff7"
          }));
        } else {
          g.append(new dataviz.diagram.Rectangle({
            width: 240,
            height: 67,
            stroke: {
              width: 0
            },
            fill: "#e8eff7"
          }));

          g.append(new dataviz.diagram.Rectangle({
            width: 8,
            height: 67,
            fill: dataItem.Color,
            stroke: {
              width: 0
            }
          }));
        }

        return g;
      }

      function onDataBound(e) {
        this.bringIntoView(this.shapes);
      }
    </script>

    <div id="diagram"></div>
    <div id="changes">
      <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" data-bind="click:showChanges"><span class="k-button-text">Show changes</span></button>
      <div data-bind="visible:visible">
        Deleted Shapes:
        <div data-bind="source: shapes.deleted" data-template="shapeItemTemplate">
        </div>
        <hr />
        Created Shapes:
        <div data-bind="source: shapes.created" data-template="shapeItemTemplate">
        </div>
        <hr />
        Updated Shapes:
        <div data-bind="source: shapes.updated" data-template="shapeItemTemplate">
        </div>
        <hr />
        Deleted Connections:
        <div data-bind="source: connections.deleted" data-template="connectionItemTemplate">
        </div>
        <hr />
        Created Connections:
        <div data-bind="source: connections.created" data-template="connectionItemTemplate">
        </div>
        <hr />
        Updated Connections:
        <div data-bind="source: connections.updated" data-template="connectionItemTemplate">
        </div>
      </div>
    </div>

    <script type="text/kendo" id="shapeItemTemplate">
            <div>
                JodTitle: #:JobTitle#
      </div>
    </script>

    <script type="text/kendo" id="connectionItemTemplate">
            <div>
                #console.log(data)#
                #:FromShapeId# - #:ToShapeId#
      </div>
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
