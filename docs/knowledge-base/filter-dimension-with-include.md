---
title: Filter the PivotGrid by Using the include Operator
page_title: Filter PivotGrid Using the include Operator
description: "Learn how to use the include operator to filter the data in a Kendo UI PivotGrid component."
previous_url: /controls/data-management/pivotgrid/how-to/filter-dimension-with-include, /controls/data-management/pivotgrid/how-to/filtering/filter-dimension-with-include
slug: howto_use_include_operator_pivotgrid
tags: kendoui, pivotgrid, filter, using, the, include, operator
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

How can I filter the data in a Kendo UI PivotGrid widget by using the `include` operator?

## Solution

The following example demonstrates how to achieve this behavior.

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
                   filter: [{
                       field: "[Date].[Calendar]",
                       operator: "in",
                       value: "[Date].[Calendar].[Calendar Year].&[2005],[Date].[Calendar].[Calendar Semester].&[2005]&[2],[Date].[Calendar].[Calendar Semester].&[2007]&[1],[Date].[Calendar].[Calendar Semester].&[2008]&[2]"
                   }]
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
