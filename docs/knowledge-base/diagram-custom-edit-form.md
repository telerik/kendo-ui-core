---
title: Use Custom Edit Form in Diagram
description: An example on how to display custom UI when editing the shapes of the Kendo UI Diagram.
type: how-to
page_title: Use Edit Form Template for Diagram Shapes | Kendo UI Diagram
slug: diagram-custom-edit-form
tags: diagram, editing, template
ticketid: 1139504
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

How can I implement custom UI for editing the Diagram shapes?

## Solution

1. Set the [`editable.shapeTemplate`](/api/javascript/dataviz/ui/diagram/configuration/editable.shapetemplate) property of the Diagram.
1. In the edit form template, use MVVM bindings to automatically apply user modifications in the edited shape data item.

> You can utilize the same approach to customize the connection edit form through the [`editable.connectionTemplate`](/api/javascript/dataviz/ui/diagram/configuration/editable.connectiontemplate) property.

The following example demonstrates how to define a `shapeTemplate` to display a DropDownList and a ColorPicker when editing the shape values of the Diagram.

```dojo
        <div id="diagram" style="height:600px;"></div>

        <script id="popup-editor" type="text/x-kendo-template">
          <h3 class="centre">Edit Shape Data</h3>
          <div class="k-edit-label">
            <label >Job title: </label>
          </div>
          <div class="k-edit-field">
            <input name="JobTitle" data-role="dropdownlist" data-bind="value: JobTitle" data-source="titles" data-text-field="JobTitle" data-value-field="JobTitle" />
          </div>
          <div class="k-edit-label">
            <label>Color: </label>
          </div>
          <div class="k-edit-field">
            <input class="k-edit-field" name="Color" data-role="colorpicker" data-bind="value: Color" />
          </div>
        </script>
        <script>
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
            var that = this;
            setTimeout(function () {
              that.bringIntoView(that.shapes);
            }, 0);
          }

          function createDiagram() {
            var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

            var shapesDataSource = {
              batch: false,
              transport: {
                read: {
                  url: serviceRoot + "/DiagramShapes",
                  dataType: "jsonp"
                },
                update: {
                  url: serviceRoot + "/DiagramShapes/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: serviceRoot + "/DiagramShapes/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: serviceRoot + "/DiagramShapes/Create",
                  dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                  }
                }
              },
              schema: {
                model: {
                  id: "id",
                  fields: {
                    id: { from: "Id", type: "number", editable: false },
                    JobTitle: { type: "string" },
                    Color: { type: "string", defaultValue: "#fff",
                            parse: function(val){
                      				return val== "" ? "#fff" : val;
														}
                           }
                  }
                }
              }
            };

            var connectionsDataSource = {
              batch: false,
              transport: {
                read: {
                  url: serviceRoot + "/DiagramConnections",
                  dataType: "jsonp"
                },
                update: {
                  url: serviceRoot + "/DiagramConnections/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: serviceRoot + "/DiagramConnections/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: serviceRoot + "/DiagramConnections/Create",
                  dataType: "jsonp"
                },
                parameterMap: function (options, operation) {
                  if (operation !== "read") {
                    return { models: kendo.stringify(options.models || [options]) };
                  }
                }
              },
              schema: {
                model: {
                  id: "id",
                  fields: {
                    id: { from: "Id", type: "number", editable: false },
                    from: { from: "FromShapeId", type: "number" },
                    to: { from: "ToShapeId", type: "number" },
                    fromX: { from: "FromPointX", type: "number" },
                    fromY: { from: "FromPointY", type: "number" },
                    toX: { from: "ToPointX", type: "number" },
                    toY: { from: "ToPointY", type: "number" }
                  }
                }
              }
            };

            $("#diagram").kendoDiagram({
              dataSource: shapesDataSource,
              connectionsDataSource: connectionsDataSource,
              editable: {
                shapeTemplate: kendo.template($("#popup-editor").html())
              },
              layout: {
                type: "layered"
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
          var titles = [{JobTitle: "Relations Manager"},
                      {JobTitle: "Accountant"},
                      {JobTitle: "Budget Analyst"},
                      {JobTitle: "Technical Support Manager"},
                      {JobTitle: "Compensation Manager"},
                      {JobTitle: "Payrol Specialist"},
                      {JobTitle: "VP Finance"},
                      {JobTitle: "VP Human Resources"},
                      {JobTitle: "VP Customer Relations"},
                      {JobTitle: "President"},];
          $(document).ready(createDiagram);
        </script>
        <style>
         .centre {
           text-align:center;
         }
        </style>
```
