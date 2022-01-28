---
title: Right-Align Text
page_title: Right-Align Text | Kendo UI PivotGrid
description: "Learn how to right-align the text of data cells in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/right-aligned-text
slug: howto_right_align_text_pivotgrid
---

# Right-Align Text

The following example demonstrates how to right-align the text of data cells in a Kendo UI PivotGrid widget.

```dojo
<style>
      .k-pivot-table .k-grid-content td {
          text-align: right;
      }
</style>

<div id="example">
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                columnWidth: 200,
                height: 580,
                dataSource: {
                    type: "xmla",
                    columns: [{ name: "[Date].[Calendar]", expand: true }, { name: "[Product].[Category]" } ],
                    rows: [{ name: "[Geography].[City]" }],
                    measures: ["[Measures].[Internet Sales Amount]"],
                    transport: {
                        connection: {
                            catalog: "Adventure Works DW 2008R2",
                            cube: "Adventure Works"
                        },
                        read: "https://demos.telerik.com/olap/msmdpump.dll"
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                }
            }).data("kendoPivotGrid");

            $("#configurator").kendoPivotConfigurator({
                filterable: true,
                dataSource: pivotgrid.dataSource
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
