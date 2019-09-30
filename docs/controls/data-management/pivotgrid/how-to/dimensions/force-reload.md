---
title: Force Data Source Reload
page_title: Force Data Source Reload | Kendo UI PivotGrid
description: "Learn how to reload the data of the Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/force-reload
slug: howto_force_data_source_reload_pivotgrid
---

# Force Data Source Reload

The following example demonstrates how to reload the data source of the PivotGrid widget manually, starting from the initial expand state of the widget.

```dojo
<div id="example">
    <div id="forceReadButton">Force DataSource Read</div>

    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {

            $("#forceReadButton").kendoButton({
                click: function() {
                  var pivot = $("#pivotgrid").data("kendoPivotGrid");

                  reset(pivot, dataSourceConfig);
                }
            });

            function reset(pivot, config) {
              pivot.setDataSource(new kendo.data.PivotDataSource(config));
            };

            var dataSourceConfig = {
              type: "xmla",
              rows: [{ name: "[Geography].[City]" }],
              measures: ["[Measures].[Reseller Freight Cost]"],
              transport: {
                connection: {
                  catalog: "Adventure Works DW 2008R2",
                  cube: "Adventure Works"
                },
                read: "//demos.telerik.com/olap/msmdpump.dll"
              },
              schema: { type: "xmla" },
              error: function (e) { alert("error: " + kendo.stringify(e.errors[0])); }
            };

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                sortable: true,
                columnWidth: 200,
                height: 580,
                dataSource: dataSourceConfig
            }).data("kendoPivotGrid");

        });
    </script>
    <style>
      #forceReadButton {
        margin-bottom: 10px;
      }
    </style>
</div>
```

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
