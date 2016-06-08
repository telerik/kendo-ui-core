---
title: Force Data Source Reload
page_title: Force Data Source Reload | Kendo UI PivotGrid
description: "Learn how to reload the data of the Kendo UI PivotGrid widget."
slug: howto_force_data_source_reload_pivotgrid
---

# Force Data Source Reload

The example below demonstrates how to reload the data source of the PivotGrid widget manually, starting from the initial expand state of the widget.

###### Example

```html
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
