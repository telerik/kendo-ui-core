---
title: Reload PivotGrid Configuration Options
page_title: Reload PivotGrid Configuration Options | Kendo UI PivotGrid
description: "Learn how to reload the configuration options of the Kendo UI PivotGrid widget on button click in a Kendo UI PivotGrid widget."
slug: howto_reload_configuration_options_pivotgrid
---

# Reload PivotGrid Configuration Options

The example below demonstrates how to reload the configuration options of the Kendo UI PivotGrid widget on a button `click` event. To set the options, the demo uses the [PivotDataSource API](http://docs.telerik.com/KENDO-UI/api/javascript/data/pivotdatasource#methods).

###### Example

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
                read: "http://demos.telerik.com/olap/msmdpump.dll"
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

Other articles on the Kendo UI PivotGrid and how-to examples:

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the "include" Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Integrate with Kendo UI Chart]({% slug howto_integratewith_kendoui_chart_pivotgrid %})
* [How to Make the Include fields Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [How to Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [How to Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [How to Reset Expand State]({% slug howto_reset_expand_state_pivotgrid %})
* [How to Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})

For more runnable examples on the Kendo UI PivotGrid, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
