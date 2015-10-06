---
title: Sort a dimension
page_title: Sort a dimension
description: Sort a dimension
---

# Sort a dimension

The example below demonstrates how use data source [sort](docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-sort) option to sort the result set

#### Example:

```html
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
                        read: "http://demos.telerik.com/olap/msmdpump.dll"
                    },
                    schema: {
                        type: "xmla"
                    },
                    error: function (e) {
                        alert("error: " + kendo.stringify(e.errors[0]));
                   },
                   sort: [{
                       field: "[Date].[Calendar]",
                       dir: "asc" //or desc
                   }]
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```
