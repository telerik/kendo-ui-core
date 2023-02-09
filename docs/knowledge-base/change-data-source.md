---
title: Change the DataSource of the PivotGrid Dynamically
page_title: Change the PivotGrid DataSource Dynamically
description: "Learn how to change the PivotGrid data source dynamically in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/change-data-source, /controls/data-management/pivotgrid/how-to/dimensions/change-data-source
slug: howto_change_datasource_dynamically_pivotgrid
tags: kendoui, pivotgrid, change, data, source, dynamically
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

How can I dynamically change the data source of a Kendo UI PivotGrid?  

## Solution

The following example demonstrates how to dynamically change the data source of a Kendo UI PivotGrid widget.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <button id="change">Change DS</button>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            $("#pivotgrid").kendoPivotGrid({
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
                    columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                    rows: [{ name: "Discontinued", expand: true }],
                    measures: ["Sum"]
                }
            });

            $("#change").click(function() {
              var newDS = new kendo.data.PivotDataSource({
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
                  columns: [{ name: "Discontinued", expand: true }],
                  rows: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                  measures: ["Sum"]
              });

              $("#pivotgrid").data("kendoPivotGrid").setDataSource(newDS);
            });
        });
</script>
</div>
```

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Integrate with Kendo UI Chart]({% slug howto_integratewith_kendoui_chart_pivotgrid %})
