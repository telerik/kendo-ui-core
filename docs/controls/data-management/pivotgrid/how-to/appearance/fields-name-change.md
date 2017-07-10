---
title: Change PivotGrid Field Names
page_title: Change PivotGrid Field Names | Kendo UI PivotGrid
description: "Learn how to change the field names in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/fields-name-change
slug: howto_change_pivotgrid_fields_names_pivotgrid
position: 1
---

# Change PivotGrid Field Names

It is possible to modify and control the content that is rendered by the field names of the Kendo UI PivotGrid widget.

The following example demonstrates how to change the text displayed by the **[Date].[Calendar]** and **[Product].[Category]** fields in a PivotGrid.

###### Example

```html
<div id="example">
    <div id="configurator"></div>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                columnWidth: 200,
                height: 580,
                dataBound: function() {                          
                  var fields = this.columnFields.add(this.rowFields).add(this.measureFields);

                  fields.find(".k-button")
                  	.each(function(_, item) {
                    	item = $(item);
                    	var text = item.data("name").split(".").slice(-1) + "";

                    	item.contents().eq(0).replaceWith(text);
                  	});
                },
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
                    }
                }
            }).data("kendoPivotGrid");                   
        });
    </script>
    <style>
        #pivotgrid
        {
            display: inline-block;
            vertical-align: top;
            width: 70%;
        }               
    </style>
</div>
```

## See Also

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Access MDX Query]({% slug howto_access_mdx_query_pivotgrid %})
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand the Include fields TreeView]({% slug howto_expand_include_fields_treeview_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
* [How to Format Dates in Dimension Labels]({% slug howto_format_date_query_pivotgrid %})
* [How to Integrate with Kendo UI Chart]({% slug howto_integratewith_kendoui_chart_pivotgrid %})
* [How to Make the Include fields Window Modal]({% slug howto_make_include_fields_window_modal_pivotgrid %})
* [How to Modify Measure Tag Captions]({% slug howto_modify_measure_tag_captions_pivotgrid %})
* [How to Reload PivotGrid Configuration Options]({% slug howto_reload_configuration_options_pivotgrid %})
* [How to Reset Expand State]({% slug howto_reset_expand_state_pivotgrid %})
* [How to Show Tooltip with Data Cell Information]({% slug howto_show_tooltip_withdata_cellinformation_pivotgrid %})
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})

For more runnable examples on the Kendo UI PivotGrid, browse its **How To** documentation folder.
