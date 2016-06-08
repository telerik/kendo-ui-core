---
title: Render Row Header Caption As Anchor
page_title: Render Row Header Caption As Anchor | Kendo UI PivotGrid
description: "Learn how to render a row header captino as an anchor in a Kendo UI PivotGrid widget."
slug: howto_render_rowheader_captionas_anchor_pivotgrid
---

# Render Row Header Caption As Anchor

The example below demonstrates how to use [`rowHeaderTemplate`](/api/javascript/ui/pivotgrid#configuration-rowHeaderTemplate) to render some of the row header caption fields as anchors.

Apply the same approach when [`columnHeaderTemplate`](/api/javascript/ui/pivotgrid#configuration-columnHeaderTemplate) or [`dataCellTemplate`](/api/javascript/ui/pivotgrid#configuration-dataCellTemplate) options are used.

###### Example

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <div id="pivotgrid"></div>

    <script id="headerTemplate" type="text/x-kendo-tmpl">
        # if (!member.children.length && member.parentName === "ProductName") { #
            <a href="http://www.telerik.cok">#: member.caption #</a>
        # } else { #
            #: member.caption #
        # } #
    </script>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                rowHeaderTemplate: $("#headerTemplate").html(),
                columnWidth: 120,
                height: 570,
                dataSource: {
                    data: products,
                    schema: {
                        model: {
                            fields: {
                                ProductName: { type: "string" },
                                UnitPrice: { type: "number" },
                                UnitsInStock: { type: "number" },
                                Discontinued: { type: "boolean" },
                                CategoryName: { field: "Category.CategoryName" }
                            }
                        },
                        cube: {
                            dimensions: {
                                ProductName: { caption: "All Products" },
                                CategoryName: { caption: "All Categories" },
                                Discontinued: { caption: "Discontinued" }
                            },
                            measures: {
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                                "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                            }
                        }
                    },
                    rows: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                    columns: [{ name: "Discontinued", expand: true }],
                    measures: ["Sum"]
                }
            }).data("kendoPivotGrid");

            $("#configurator").kendoPivotConfigurator({
                dataSource: pivotgrid.dataSource,
                height: 570
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
