---
title: Filter with 'include' operator
page_title: Filter with 'include' operator
description: Filter with 'include' operator
---

# Filter with 'include' operator

The example below demonstrates how to use 'include' operator to filter the PivotGrid widget

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
                   filter: [{
                       field: "[Date].[Calendar]",
                       operator: "in",
                       value: "[Date].[Calendar].[Calendar Year].&[2005],[Date].[Calendar].[Calendar Semester].&[2005]&[2],[Date].[Calendar].[Calendar Semester].&[2007]&[1],[Date].[Calendar].[Calendar Semester].&[2008]&[2]"
                   }]
                }
            }).data("kendoPivotGrid");
        });
    </script>
</div>
```
