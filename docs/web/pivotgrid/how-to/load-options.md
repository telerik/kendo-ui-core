---
title: Re-load PivotGrid configuration options
page_title: Re-load PivotGrid configuration options
description: Re-load PivotGrid configuration options
---

# Re-load PivotGrid configuration options

The example below demonstrates how to re-load widgets options on button click. The demo uses [PivotDataSource API](http://docs.telerik.com/KENDO-UI/api/javascript/data/pivotdatasource#methods) to set the options.

#### Example:

```html
<div id="example">
    <button id="reload">Reload PivotDataSource configuration</button>
    <div id="pivotgrid"></div>

    <div class="responsive-message"></div>

    <script>
        $(document).ready(function () {
            var options = {
                columns: [{"name":["[Date].[Calendar]"],"expand":true},{"name":["[Product].[Category]"]}],
              rows: [{"name":["[Geography].[City]"]}],
              measures: [{"name":"[Measures].[Reseller Freight Cost]"}]
            };

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                sortable: true,
                columnWidth: 200,
                height: 580,
                dataSource: {
                    type: "xmla",
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
                }
            }).data("kendoPivotGrid");

            $("#reload").click(function() {
              var source = pivotgrid.dataSource;

              source.columns(options.columns);
              source.rows(options.rows);
              source.measures(options.measures);
            });
        });
    </script>
</div>
```
