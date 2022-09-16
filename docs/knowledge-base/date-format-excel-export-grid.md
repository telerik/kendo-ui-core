---
title: Set Date Cell Format during Excel Export in Reorderable Grid
description: An example on how to change the format for date columns in a reorderable, dynamic Kendo UI Grid.
type: how-to
page_title: Format Date Columns Values before Exporting to Excel | Kendo UI Grid for jQuery
slug: date-format-excel-export-grid
tags: grid, excel, export, format, date, cells
ticketid: 1133130
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.913 version</td>
 </tr>
</table>

## Description

How can I change the format of a date column during the Excel export in the Kendo UI Grid?

## Solution

1. Subscribe to the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event of the Grid.
1. In the `excelExport` event handler, get all the `fields` and their `models`.
1. Based on the `model` type, push the index of the column in an array.
1. Loop through the rows and change the values and the format of the desired columns.

```dojo
<div id="grid"></div>
<script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excelExport: function(e) {
            var sheet = e.workbook.sheets[0];
            var grid = e.sender;
            var fields = grid.dataSource.options.fields;
            var fieldsModels = grid.dataSource.options.schema.model.fields;
            var columns = grid.columns;
            var dateCells = [];

            for (var i = 0; i < fields.length; i++) {
                var currentField = fields[i].field;
                var currentModel = fieldsModels[currentField];

                if (currentModel.type === "date") {
                    for (var j = 0; j < columns.length; j++) {
                        if (currentField === columns[j].field) {
                            dateCells.push(j);
                            break;
                        };
                    };
                };
            };
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];

                for (var q = 0; q < dateCells.length; q++) {
                    var cellIndex = dateCells[q];
                    var value = row.cells[cellIndex].value;
                    var newValue = new Date(value.getFullYear(), value.getMonth(), value.getDay());

                    row.cells[cellIndex].value = newValue;
                    row.cells[cellIndex].format = "yyyy-MM-dd";
                };
            };
        },
        columns: [{
                field: "name"
            },
            {
                field: "date2",
                width: 80,
                format: "{0: dd-MM-yy}"
            },
            {
                field: "age"
            },
            {
                field: "date1",
                width: 80,
                format: "{0: yy-MM-dd}"
            }
        ],
        reorderable: true,
        dataSource: {
            data: [{
                    name: "Jane Doe",
                    date2: new Date(),
                    age: 30,
                    date1: new Date()
                },
                {
                    name: "John Doe",
                    date2: new Date(),
                    age: 33,
                    date1: new Date()
                }
            ],
            schema: {
                model: {
                    fields: {
                        date1: {
                            type: "date"
                        },
                        name: {
                            type: "string"
                        },
                        date2: {
                            type: "date"
                        },
                        age: {
                            type: "number"
                        }
                    }
                }
            }
        }
    });
</script>
```

## See Also

* [Setting the Cell Format of the Grid during Excel Export](https://docs.telerik.com/kendo-ui/controls/data-management/grid/how-to/excel/cell-format)
