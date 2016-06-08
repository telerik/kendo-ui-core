---
title: Show Tooltip with Data Cell Information
page_title: Show Tooltip with Data Cell Information | Kendo UI PivotGrid
description: "Learn how to display a tooltip hint on hover a data cell element in a Kendo UI PivotGrid widget."
slug: howto_show_tooltip_withdata_cellinformation_pivotgrid
---

# Show Tooltip with Data Cell Information

The example below demonstrates how to display a tooltip hint when users hover a data cell element in a Kendo UI PivotGrid widget.

###### Example

```html
<script src="http://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
<div id="example">

<div id="pivotgrid"></div>

<script id="template" type="text/x-kendo-template">
<div>
    <div>Rows: #:rowText#</div>
    <div>Columns: #:columnText#</div>
    <div>Value: #:value ? value : "N/A" #</div>
</div>
</script>

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
                            Discontinued: { caption: "All Discontinued" }
                        },
                        measures: {
                            "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" }
                        }
                    }
                },
                rows: [{ name: "CategoryName", expand: true }, { name: "ProductName" } ],
                columns: [{ name: "Discontinued", expand: true }],
                measures: ["Sum"]
            }
        });

      $(".k-grid-content").kendoTooltip({
        filter: "td",
        content: toolTip,
        width: 400,
        height: 100,
        position: "top"
      });

       $(".k-grid-content").click(toolTip);

      function toolTip(e) {
         var target = $(e.target);
         var grid = $("#pivotgrid").getKendoPivotGrid();

         var cellInfo = grid.cellInfoByElement(target);

         return kendo.template($("#template").html())({
            rowText: generateName(cellInfo.rowTuple),
            columnText: generateName(cellInfo.columnTuple),
            value: cellInfo.dataItem.fmtValue
         });
      }

      function generateName(tuple) {
        var text = "";
        var members = tuple.members;

        for (var idx = 0, length = members.length; idx < length; idx++) {
          text += members[idx].name;

          if (members[idx + 1]) {
            text += "->";
          }
        }

        return text;
      }
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
* [How to Translate PivotConfigurator Field Items]({% slug howto_translate_pivotconfigurator_messages_pivotgrid %})

For more runnable examples on the Kendo UI PivotGrid, browse its [**How To** documentation folder]({% slug howto_add_dimension_column_axis_pivotgrid %}).
