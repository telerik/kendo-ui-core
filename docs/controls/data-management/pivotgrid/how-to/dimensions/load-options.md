---
title: Reload PivotGrid Configuration Options
page_title: Reload PivotGrid Configuration Options | Kendo UI PivotGrid
description: "Learn how to reload the configuration options of the Kendo UI PivotGrid widget on button click in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/load-options
slug: howto_reload_configuration_options_pivotgrid
---

# Reload PivotGrid Configuration Options

The following example demonstrates how to reload the configuration options of the Kendo UI PivotGrid widget on a button `click` event. To set the options, the demo uses the [PivotDataSource API](https://docs.telerik.com/kendo-ui/api/javascript/data/pivotdatasource#methods).

```dojo
<div id="example">
    <button id="reload">Reload PivotDataSource configuration</button>
    <div id="pivotgrid"></div>

    <div class="responsive-message"></div>

    <script>
        $(document).ready(function () {
            var options = {
              columns: [{"name":["[Date].[Calendar]"],"expand":true},{"name":["[Product].[Category]"]}],
              rows: [{"name":["[Geography].[City]"]}],
              measures: [{"name":"[Measures].[Reseller Freight Cost]"}],
              filter: {
                "logic":"and",
                "filters":[{
                  "field":"[Date].[Calendar]",
                  "operator":"in",
                  "value":"[Date].[Calendar].[Calendar Year].&[2006],[Date].[Calendar].[Calendar Year].&[2008]"
                }]
              }
            };

            var dataSourceConfig = {
              type: "xmla",
              transport: {
                connection: {
                  catalog: "Adventure Works DW 2008R2",
                  cube: "Adventure Works"
                },
                read: "https://demos.telerik.com/olap/msmdpump.dll"
              },
              schema: {
                type: "xmla"
              },
              error: function (e) {
                alert("error: " + kendo.stringify(e.errors[0]));
              }
            };

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                sortable: true,
                columnWidth: 200,
                height: 580,
                dataSource: dataSourceConfig
            }).data("kendoPivotGrid");

            $("#reload").click(function() {
              var newOptions = $.extend({}, dataSourceConfig, options);
              var newSource = new kendo.data.PivotDataSource(newOptions);

              pivotgrid.setDataSource(newSource);
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
