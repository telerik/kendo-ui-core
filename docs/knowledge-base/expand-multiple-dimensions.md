---
title: Expand Multiple Column Dimensions in the PivotGrid
page_title: Expand Multiple PivotGrid Column Dimensions
description: "Learn how to expand multiple column dimensions by using the dataBound event in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/expand-multiple-dimensions, /controls/data-management/pivotgrid/how-to/dimensions/expand-multiple-dimensions
slug: howto_expand_multiple_column_dimensions_pivotgrid
tags: kendoui, pivotgrid, access, mdx, query
component: pivotgrid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® PivotGrid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61.0.3163.100</td>
 </tr>
</table>


## Description

How can I reset the expanding that has occurred in the PivotGrid and revert to my CMS?

## Solution

In order for the expand to properly work, set fully qualified names to the expanded tuples as shown in the following code snippet with the `[Calendar Year].&[2005]` configuration.

The following example demonstrates how to expand multiple column dimensions by using the [`dataBound`](/api/javascript/ui/pivotgrid/events/databound) event of the PivotGrid.

```dojo
<div id="example">
    <div id="configurator"></div>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var paths = [
              //Expand CY 2010 - first dimension
              ["[Date].[Calendar].[Calendar Year].&[2010]"],
              //Expand All Products under CY 2010 - second dimension
                ["[Date].[Calendar].[Calendar Year].&[2010]","[Product].[Category].[All Products]"]
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
