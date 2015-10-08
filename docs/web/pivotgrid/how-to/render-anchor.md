---
title: Render row header caption as anchor
page_title: Render row header caption as anchor
description: Render row header caption as anchor
---

# Render row header caption as anchor

The example below demonstrates how to use [rowHeaderTemplate](/api/javascript/ui/pivotgrid#configuration-rowHeaderTemplate)
to render some of the row header caption fields as anchors. The same approach is applicable when [columnHeaderTemplate](/api/javascript/ui/pivotgrid#configuration-columnHeaderTemplate)
or [dataCellTemplate](/api/javascript/ui/pivotgrid#configuration-dataCellTemplate) options are used.

#### Example:

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <div id="pivotgrid"></div>

    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length && member.parentName === "ProductName") { #
            <a href="http://www.telerik.cok">#: member.caption #</a>
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
