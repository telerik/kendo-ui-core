---
title: Change DataSource Dynamically
page_title: Change DataSource Dynamically | Kendo UI PivotGrid
description: "Learn how to change the PivotGrid data source dynamically in a Kendo UI PivotGrid widget."
slug: howto_change_datasource_dynamically_pivotgrid
---

# Change DataSource Dynamically

The example below demonstrates how to change the `DataSource` of a Kendo UI PivotGrid widget.

###### Example

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

<div id="example">
    <button id="change">Change DS</button>
    <div id="pivotgrid"></div>

    <script>
        $(document).ready(function () {
            $("#pivotgrid").kendoPivotGrid({
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
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" }
                            }
                        }
                    },
                    columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                    rows: [{ name: "Discontinued", expand: true }],
                    measures: ["Sum"]
                }
            });

            $("#change").click(function() {
              var newDS = new kendo.data.PivotDataSource({
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
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" }
                          }
                      }
                  },
                  columns: [{ name: "Discontinued", expand: true }],
                  rows: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                  measures: ["Sum"]
              });

              $("#pivotgrid").data("kendoPivotGrid").setDataSource(newDS);
            });
        });
</script>
</div>
```

## See Also

Other articles on the Kendo UI PivotGrid and how-to examples:

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
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
