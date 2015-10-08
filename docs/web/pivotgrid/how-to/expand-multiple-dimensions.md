---
title: Expand multiple dimensions
page_title: Expand multiple dimensions
description: Expand multiple dimensions
---

# Expand multiple dimensions

The example below demonstrates how to expand multiple column dimensions using widget's [dataBound](/api/javascript/ui/pivotgrid#events-dataBound) event

#### Example:

```html
<div id="example">
    <div id="configurator"></div>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var paths = [
              //Expand CY 2005 - first dimension
              ["[Date].[Calendar].[Calendar Year].&[2005]"],
              //Expand All Products under CY 2015 - second dimension
                ["[Date].[Calendar].[Calendar Year].&[2005]","[Product].[Category].[All Products]"]
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
                        read: "http://demos.telerik.com/olap/msmdpump.dll"
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
