---
title: Modify Exported Excel Files
page_title: Modify Exported Excel Files | Kendo UI PivotGrid
description: "Learn how to modify the generated Excel file from a Kendo UI PivotGrid widget so you can apply different styles and values to it."
previous_url: /controls/data-management/pivotgrid/how-to/modify-exported-excel
slug: howto_modify_exported_excel_files_pivotgrid
---

# Modify Exported Excel Files

You can apply different style and value changes to a Kendo UI PivtoGrid exported to Excel by modifying the generated `Workbook` object.

The following example demonstrates how to achieve this behavior.

```dojo
<div id="example">

    <button id="export">Export</button>
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

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
