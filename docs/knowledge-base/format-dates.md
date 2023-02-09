---
title: Format Dates in the Dimension Labels of the PivotGrid
page_title: Format Dates in PivotGrid Dimension Labels
description: "Learn how to format date values in dimension labels in the Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/format-dates, /controls/data-management/pivotgrid/how-to/appearance/format-dates
slug: howto_format_date_query_pivotgrid
tags: pivotgrid, format, dates, in, dimension, labels
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
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I control the format of the content that is rendered by the dimension labels of the PivotGrid?

## Solution

You can achieve this behavior through the implementation of a custom template in the row or in the header template.

The following example demonstrates how to format the date values of the dimension labels in the PivotGrid.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <div id="pivotgrid"></div>

    <div class="responsive-message"></div>

    <script id="rowTemplate" type="text/x-kendo-template">
      # if (member.name.indexOf("LastSupply") === 0 && member.name !== "LastSupply") { #
          #: kendo.toString(kendo.parseDate(member.caption), "d") #
      # } else { #
          #: member.caption #
      # } #
    </script>

    <script>
        $(document).ready(function () {
            var d = new Date();
            products.forEach(function(p) {
              p.LastSupply = new Date(d);
              d.setDate(d.getDate() + 1);
            });

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                columnWidth: 120,
                height: 570,
                rowHeaderTemplate: $("#rowTemplate").html(),
                dataSource: {
                    data: products,
                    schema: {
                        model: {
                            fields: {
                                ProductName: { type: "string" },
                                UnitPrice: { type: "number" },
                                UnitsInStock: { type: "number" },
                                Discontinued: { type: "boolean" },
                                LastSupply: { type: "date" },
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
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                                "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                            }
                        }
                    },
                    columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                    rows: [{ name: "Discontinued", expand: true }, { name: "LastSupply", expand: false }],
                    measures: ["Sum"]
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
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
