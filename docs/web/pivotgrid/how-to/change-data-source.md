---
title: Change data source dynamically
page_title: Change data source dynamically
description: Change data source dynamically
---

# Change data source dynamically

The example below demonstrates how to change PivotGrid data source

#### Example:

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

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
