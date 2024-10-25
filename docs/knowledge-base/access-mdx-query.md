---
title: Access MDX Query in the PivotGrid
page_title: Access MDX Query in the PivotGrid - jQuery PivotGrid
description: "Learn how to access a MultiDimensional eXpressions (MDS) query in a Kendo UI PivotGrid component."
previous_url: /controls/data-management/pivotgrid/how-to/access-mdx-query, /controls/data-management/pivotgrid/how-to/dimensions/access-mdx-query
slug: howto_access_mdx_query_pivotgrid
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

How can I override the DataSource generated query in a Kendo UI PivotGrid?  

## Solution

To achieve this behavior, access the generated [MDX Query](https://en.wikipedia.org/wiki/MultiDimensional_eXpressions), as demonstrated in the following example.

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
                        read: "https://demos.telerik.com/olap/msmdpump.dll",
                      parameterMap: function(options, type) {
                        var query = kendo.data.transports.xmla.fn.options.parameterMap(options, type);

                        //Modify the query here if needed.

                        return query;
                      }
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                    }
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```

## See Also

* [JavaScript API Reference of the jQuery PivotGrid](/api/javascript/ui/pivotgrid)
* [Change the Data Source of the PivotGrid Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [Drill Down Navigation Always Starting from PivotGrid Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [Expand Multiple PivotGrid Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [Filter PivotGrid by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
