---
title: Add a Dimension to the Column Axis of the PivotGrid
page_title: Add Dimensions to PivotGrid Column Axis
description: "Learn how to use the PivotGrid API to add a new dimension to the column axis in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/add-dimention-to-column-axis, /controls/data-management/pivotgrid/how-to/dimensions/add-dimension-to-column-axis
slug: howto_add_dimension_column_axis_pivotgrid
tags: kendoui, pivotgrid, add, dimension, to, column, axis
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

How can I add a new dimension to the column axis of the Kendo UI PivotGrid?  

## Solution

The following example demonstrates how to use the [Kendo UI PivotGrid API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid) to add a new dimension to the column axis of the widget.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <button id="add">Add "ProductName"</button>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                columnWidth: 120,
                height: 570,
                dataSource: {
                    data: products,
                    schema: {
                        model: {
                            fields: {
                                ProductName: { type: "string" },
                                UnitPrice: { type: "number" },
                                UnitsInStock: { type: "number" },
                                Discontinued: { type: "boolean" },
                                CategoryName: { field: "Category.CategoryName" }
                            }
                        },
                        cube: {
                            dimensions: {
                                ProductName: { caption: "All Products" },
                                CategoryName: { caption: "All Categories" },
                                Discontinued: { caption: "Discontinued" }
                            },
                            measures: {
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" }
                            }
                        }
                    },
                    columns: [{ name: "CategoryName", expand: true }],
                    rows: [{ name: "Discontinued", expand: true }],
                    measures: ["Sum"]
                }
            }).data("kendoPivotGrid");

            $("#add").click(function() {
                var ds = pivotgrid.dataSource;
                var columns = ds.columns();

                columns.push("ProductName");

                ds.columns(columns);
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
