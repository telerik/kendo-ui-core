---
title: Modify exported Excel file
page_title: Modify exported Excel file
description: Modify exported Excel file
---

# Modify exported Excel file

The example below demonstrates how to modify the generated `Workbook` object in order to apply different style/value changes.

#### Example:

```html
<div id="example">
    <div id="pivotgrid"></div>
    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                excel: {
                    fileName: "Kendo UI PivotGrid Export.xlsx",
                    proxyURL: "//demos.telerik.com/kendo-ui/service/export",
                    filterable: true
                },
                excelExport: function(e) {
                  var sheet = e.workbook.sheets[0];
                  var rows = sheet.rows;
                  var rowIdx, colIdx, cells, cell;

                  for (rowIdx = 0; rowIdx < rows.length; rowIdx++) {
                    if (rows[rowIdx].type === "data") {
                      cells = rows[rowIdx].cells;

                      for (colIdx = sheet.freezePane.colSplit; colIdx < cells.length; colIdx++) {
                        cell = cells[colIdx];

                        cell.background = "#aabbcc";
                        cell.value = kendo.toString(cell.value, "c");
                      }
                    }
                  }
                },
                dataCellTemplate: $("dataCellTemplate").html(),
                filterable: true,
                sortable: true,
                columnWidth: 200,
                height: 580,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
                    rows: [{ name: "[Geography].[City]" }],
                    measures: ["[Measures].[Reseller Freight Cost]"],
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: "//demos.telerik.com/olap/msmdpump.dll"
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                }
            }).data("kendoPivotGrid");

            $("#export").click(function() {
                pivotgrid.saveAsExcel();
            });
        });
    </script>
</div>
```
