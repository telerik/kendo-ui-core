---
title: Render Row Header Captions As Anchors
page_title: Render Row Header Captions As Anchors | Kendo UI PivotGrid
description: "Learn how to render a row header captino as an anchor in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/render-anchor
slug: howto_render_rowheader_captionas_anchor_pivotgrid
---

# Render Row Header Captions As Anchors

The PivotGrid allows you to render header captions as anchors.

To render column and cell caption fields as anchors, use the [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/columnheadertemplate) or the [`dataCellTemplate`](/api/javascript/ui/pivotgrid/configuration/datacelltemplate) options respectively.

To render row header caption fields as anchors, use the [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid/configuration/rowheadertemplate) option. The following example demonstrates how to achieve this behavior.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <div id="pivotgrid"></div>

    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length && member.parentName === "ProductName") { #
            <a href="https://www.telerik.com">#: member.caption #</a>
        # } else { #
            #: member.caption #
        # } #
    </script>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                rowHeaderTemplate: $("#headerTemplate").html(),
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
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                                "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                            }
                        }
                    },
                    rows: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                    columns: [{ name: "Discontinued", expand: true }],
                    measures: ["Sum"]
                }
            }).data("kendoPivotGrid");

            $("#configurator").kendoPivotConfigurator({
                dataSource: pivotgrid.dataSource,
                height: 570
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
