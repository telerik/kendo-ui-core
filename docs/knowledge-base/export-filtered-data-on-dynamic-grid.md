---
title: Export Filtered Data to Excel in Grid with Dynamic Columns and Data Types
page_title: Export Filtered Data to Excel in Dynamic Grid - Kendo UI Grid for jQuery
description: "Learn how to export to Excel filtered data only in a Kendo UI jQuery Grid with column and data fields information which is retrieved during runtime."
slug: howto_export_filtered_data_dynamic_grid
tags: grid, export, excel, dynamic, columns, data, types
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
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I export to Excel filtered Grid data when columns and data fields information is retrieved during runtime?

> How to create a Grid with dynamic columns and data types you can learn at [this article]({% slug howto_createdynamiccolumnsdatatypes_grid %})

## Solution

1. Generate the rows to be exported based on the generated columns for the Grid.
2. Create a new [`workbook`](/api/javascript/ooxml/workbook) object and add the generated rows there.
3. Use the [`saveAs`](/api/javascript/kendo/methods/saveas) method to save the generated excel file.

```dojo
    <div id="grid" style="width:1000px;"></div>
    <button class="k-button k-button-solid-base k-button-solid k-button-md k-rounded-md" onclick="exportFilteredData()">Export filtered data</button>

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
          filterable: true,
          columns: columns,
          pageable: true,
          editable:true
        });
      }

      var columnNames;

      function generateColumns(response){
        columnNames = response["columns"];
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

      function generateRows() {
        var rows = [ {cells: [] }];
        for (let i = 0; i < columnNames.length; i++) {
          rows[0].cells.push({ value: columnNames[i] })
        }
        return rows;
      }

      function exportFilteredData() {
        var rows = generateRows();
        var data = $("#grid").data("kendoGrid").dataSource.view();

        for (var i = 0; i < data.length; i++){
          rows.push({
            cells: []
          })
          for (var c = 0; c < columnNames.length; c++){
            var colName = columnNames[c];
            rows[i+1].cells.push({ value: data[i][colName] });
          }
        }

        var workbook = new kendo.ooxml.Workbook({
          sheets: [
            {
              columns: [
                // Column settings (width).
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true },
                { autoWidth: true }
              ],
              // The title of the sheet.
              title: "Orders",
              // The rows of the sheet.
              rows: rows
            }
          ]
        });
        // Save the file as an Excel file with the xlsx extension.
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Test.xlsx"});
      }
    </script>
```

## See Also

* [Create Grids with Dynamic Columns and Data Types]({% slug howto_createdynamiccolumnsdatatypes_grid %})
* [Dynamic Aggregates in a Dynamic Grid]({% slug grid-dynamic-aggregates %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
