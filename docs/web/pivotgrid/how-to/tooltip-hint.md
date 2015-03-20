---
title: Show tooltip with data cell information
page_title: Show tooltip with data cell information
description: Show tooltip with data cell information
---

# Show tooltip with data cell information

The example below demonstrates how to display a tooltip hint when hover PivotGrid data cell element

#### Example:

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
