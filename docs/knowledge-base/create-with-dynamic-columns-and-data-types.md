---
title: Create Grids with Dynamic Columns and Data Types
page_title: Dynamic Columns and Data Types | Kendo UI Grid for jQuery
description: "An example on how to create a Kendo UI jQuery Grid with column and data fields information which is retrieved during runtime."
previous_url: /controls/data-management/grid/how-to/create-with-dynamic-columns-and-data-types, /controls/data-management/grid/how-to/various/create-with-dynamic-columns-and-data-types, /controls/data-management/grid/how-to/binding/create-with-dynamic-columns-and-data-types
slug: howto_createdynamiccolumnsdatatypes_grid
tags: grid, create, dynamic, columns, data, types
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create a Kendo UI jQuery Grid with column and data fields information which is retrieved during runtime?

## Solution

The following example demonstrates how to create a Grid with column and data-field information that is retrieved during runtime.

```dojo

    <div id="grid" style="width:1000px;"></div>

    <script>
      var isDateField =[];
      $.ajax({
        url: "https://www.mocky.io/v2/5835e736110000020e0c003c",
        dataType: "jsonp",
        success: function(result) {
          generateGrid(result);
        }
      });

      function generateGrid(response) {
        var model = generateModel(response);
        var columns = generateColumns(response);

        var grid = $("#grid").kendoGrid({
          dataSource: {
            transport:{
              read:  function(options){
                options.success(response.data);
              }
            },
            pageSize: 5,
            schema: {
              model: model
            }
          },
          columns: columns,
          pageable: true,
          editable:true
        });
      }

      function generateColumns(response){
        var columnNames = response["columns"];
        return columnNames.map(function(name){
          return { field: name, format: (isDateField[name] ? "{0:D}" : "") };
        })
      }

      function generateModel(response) {

        var sampleDataItem = response["data"][0];

        var model = {};
        var fields = {};
        for (var property in sampleDataItem) {
          if(property.indexOf("ID") !== -1){
            model["id"] = property;
          }
          var propType = typeof sampleDataItem[property];

          if (propType === "number" ) {
            fields[property] = {
              type: "number",
              validation: {
                required: true
              }
            };
            if(model.id === property){
              fields[property].editable = false;
              fields[property].validation.required = false;
            }
          } else if (propType === "boolean") {
            fields[property] = {
              type: "boolean"
            };
          } else if (propType === "string") {
            var parsedDate = kendo.parseDate(sampleDataItem[property]);
            if (parsedDate) {
              fields[property] = {
                type: "date",
                validation: {
                  required: true
                }
              };
              isDateField[property] = true;
            } else {
              fields[property] = {
                validation: {
                  required: true
                }
              };
            }
          } else {
            fields[property] = {
              validation: {
                required: true
              }
            };
          }
        }

        model.fields = fields;

        return model;
      }
    </script>
```

## See Also

* [Dynamic Aggregates in a Dynamic Grid]({% slug grid-dynamic-aggregates %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
