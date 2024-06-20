---
title: Create Grids with Dynamic Columns and Data Types
page_title: Dynamic Columns and Data Types - Kendo UI for jQuery Data Grid
description: "Learn how to create a Kendo UI jQuery Grid with column and data fields information which is retrieved during runtime."
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
  <td>Progress® Kendo UI® Grid for jQuery</td>
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

In some cases, the server returns a response with different fields and values depending on user input or another external variable. Thus, the developer doesn't know what columns and fields will be available in the Grid, nor what the type of these fields will be.

This article showcases how to dynamically generate the Kendo UI Grid by using the response data and without knowing the names and types of the columns and fields.

## Solution

1. Prefetch the dynamic Grid data by making an `ajax` request to the server.
1. Create the [`dataSource.model`](/api/javascript/data/datasource/configuration/schema#schemamodel) by using the first record in the response as a sample.
1. Create the Grid [`columns`](/api/javascript/ui/grid/configuration/columns) by using the names of the fields returned in the server response.
1. Generate the Grid by using the model and columns that were created in the previous two steps.

```dojo

    <div id="grid" style="width:1000px;"></div>

    <script>
      var isDateField =[];
      $.ajax({
        url: "https://run.mocky.io/v3/fe25d379-099c-4e04-b26b-5f0453e43ef4",
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
* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
