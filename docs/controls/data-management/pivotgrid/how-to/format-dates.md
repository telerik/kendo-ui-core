---
title: Format Dates in Dimension Labels
page_title: Format Dates in Dimension Labels | Kendo UI PivotGrid
description: "Learn how to format date values in dimension labels in the Kendo UI PivotGrid widget."
slug: howto_format_date_query_pivotgrid
---

# Format Dates in Dimension Labels

The example below demonstrates how to format date values in the dimension labels in the Kendo UI PivotGrid widget.

###### Example

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <div id="pivotgrid"></div>

    <div class="responsive-message"></div>

    <script id="rowTemplate" type="text/x-kendo-template">
      # if (member.name.indexOf("LastSupply") === 0 && member.name !== "LastSupply") { #
          #: kendo.toString(kendo.parseDate(member.caption), "d") #
      # } else { #
          #: member.caption #
      # } #
    </script>

    <script>
        $(document).ready(function () {
            var d = new Date();
            products.forEach(function(p) {
              p.LastSupply = new Date(d);
              d.setDate(d.getDate() + 1);
            });

            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                columnWidth: 120,
                height: 570,
                rowHeaderTemplate: $("#rowTemplate").html(),
                dataSource: {
                    data: products,
                    schema: {
                        model: {
                            fields: {
                                ProductName: { type: "string" },
                                UnitPrice: { type: "number" },
                                UnitsInStock: { type: "number" },
                                Discontinued: { type: "boolean" },
                                LastSupply: { type: "date" },
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
                    columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                    rows: [{ name: "Discontinued", expand: true }, { name: "LastSupply", expand: false }],
                    measures: ["Sum"]
                }
            }).data("kendoPivotGrid");
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
