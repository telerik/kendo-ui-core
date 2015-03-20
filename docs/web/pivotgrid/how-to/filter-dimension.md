---
title: Filter a dimension
page_title: Filter a dimension
description: Filter a dimension
---

# Filter a dimension

The example below demonstrates how use the data source [filter](docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-filter) option to filter the result set

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
                   filter: {
                       field: "[Date].[Calendar]",
                       operator: "endswith",
                       value: "2005"
                   }
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```
