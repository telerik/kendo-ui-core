---
title: Filter the Dimensions of the PivotGrid
page_title: Filter PivotGrid Dimensions
description: "Learn how to filter a dimension in a Kendo UI PivotGrid component."
previous_url: /controls/data-management/pivotgrid/how-to/filter-dimension, /controls/data-management/pivotgrid/how-to/filtering/filter-dimension
slug: howto_filter_dimensions_pivotgrid
tags: kendoui, pivotgrid, filter, dimensions
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

How can I filter the dimensions of the PivotGrid?  

## Solution

The following example demonstrates how use the [`filter`](/api/javascript/data/datasource/configuration/filter) option of the Data Source to filter the result set.

```dojo
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
                   },
                   filter: {
                       field: "[Date].[Calendar]",
                       operator: "endswith",
                       value: "2005"
                   }
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
