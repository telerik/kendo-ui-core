---
title: Implement Local Data Editing
page_title: Implement Local Data Editing | Kendo UI Diagram
description: "Learn how to implement editing with local data in a Kendo UI Diagram by using custom functions for the dataSource transport operations."
slug: howto_editlocaladata_diagram
---

# Implement Local Data Editing

The example below demonstrates how to implement editing with local data by using custom functions for the dataSource transport operations. This functionality is needed because assigning non-default `id` value for the new items is required so that the item is accepted as existing by the dataSource and the new shapes are displayed by the diagram.

###### Example

```html

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
      <button type="button"  class="k-button" data-bind="click:showChanges">Show changes</button>
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

Other articles on Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Change Shape Visual Elements Dynamically]({% slug howto_changeshapevisualelements_dynamically_diagram %})
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
