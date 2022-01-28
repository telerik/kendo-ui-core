---
title: Show Tooltip with Data Cell Information
page_title: Show Tooltip with Data Cell Information | Kendo UI PivotGrid
description: "Learn how to display a tooltip hint on hover a data cell element in a Kendo UI PivotGrid widget."
previous_url: /controls/data-management/pivotgrid/how-to/tooltip-hint
slug: howto_show_tooltip_withdata_cellinformation_pivotgrid
---

# Show Tooltip with Data Cell Information

The following example demonstrates how to display a tooltip hint when users hover a data cell element in a Kendo UI PivotGrid widget.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
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

* [PivotGrid JavaScript API Reference](/api/javascript/ui/pivotgrid)
* [How to Change Data Source Dynamically]({% slug howto_change_datasource_dynamically_pivotgrid %})
* [How to Drill Down Navigation Always Starting from Root Tuple]({% slug howto_drill_down_navigation_startingfrom_root_tuple_pivotgrid %})
* [How to Expand Multiple Column Dimensions]({% slug howto_expand_multiple_column_dimensions_pivotgrid %})
* [How to Filter by Using the include Operator]({% slug howto_use_include_operator_pivotgrid %})
