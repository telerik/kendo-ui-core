---
title: Modify Exported Excel Files
page_title: Modify Exported Excel Files | Kendo UI PivotGrid
description: "Learn how to modify the generated Excel file from a Kendo UI PivotGrid widget so you can apply different styles and values to it."
slug: howto_modify_exported_excel_files_pivotgrid
---

# Modify Exported Excel Files

The example below demonstrates how to modify the generated `Workbook` object from a Kendo UI PivotGrid so you can apply different style and value changes.

###### Example

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

## See Also

Other articles on the Kendo UI PivotGrid and how-to examples:

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the "include" Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Integrate with Kendo UI Chart]({% slug howto_integratewith_kendoui_chart_pivotgrid %})
* [How to Make the Include fields Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [How to Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [How to Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [How to Reset Expand State]({% slug howto_reset_expand_state_pivotgrid %})
* [How to Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})

For more runnable examples on the Kendo UI PivotGrid, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
