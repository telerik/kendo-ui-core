---
title: Expand Multiple Column Dimensions
page_title: Expand Multiple Column Dimensions | Kendo UI PivotGrid
description: "Learn how to expand multiple column dimensions by using the dataBound event in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/expand-multiple-dimensions
slug: howto_expand_multiple_column_dimensions_pivotgrid
---

# Expand Multiple Column Dimensions

You might need to reset the expanding that has occurred and revert to your CMS.

In order for the expand to properly work, set fully qualified names to the expanded tuples as shown in the following code snippet with the `[Calendar Year].&[2005]` configuration.

The following example demonstrates how to expand multiple column dimensions by using the [`dataBound`](/api/javascript/ui/pivotgrid/events/databound) event of the PivotGrid.

```dojo
<div id="example">
    <div id="configurator"></div>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var paths = [
              //Expand CY 2005 - first dimension
              ["[Date].[Calendar].[Calendar Year].&[2005]"],
              //Expand All Products under CY 2015 - second dimension
                ["[Date].[Calendar].[Calendar Year].&[2005]","[Product].[Category].[All Products]"]
            ];

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
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
                        read: "https://demos.telerik.com/olap/msmdpump.dll"
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                },
                dataBound: function() {
                  var path = paths.shift();
                  if (path) {
                    this.dataSource.expandColumn(path);
                  }
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Integrate with Kendo UI Chart]({% slug howto_integratewith_kendoui_chart_pivotgrid %})
