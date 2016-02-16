---
title: Show Only If Text Exceeds Certain Length
page_title: Show Only If Text Exceeds Certain Length | Kendo UI Tooltip
description: "Learn how to show a Kendo UI Tooltip only if the target text exceeds a certain length."
slug: howto_showonlyiftextexceedscertainlength_tooltip
---

# Show Only If Text Exceeds Certain Length

The example below demonstrates how to show a Kendo UI Tooltip only if the text of the target exceeds a certain length.

###### Example

```html
    <div id="content" style="width: 500px">
      <div id="grid"></div>
    </div>

    <style>
      .k-tooltip.k-popup{
        visibility: hidden;
      }

    </style>
    <script src="http://demos.kendoui.com/content/shared/js/products.js"></script>
    <script>
      $(document).ready(function () {
        var dataSource = new kendo.data.DataSource({
          data: products,
          schema: {
            model: {
              fields: {
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                UnitsInStock: { type: "number" },
                Discontinued: { type: "boolean" }
              }}
          },
          pageSize: 20
        });

        var grid = $("#grid").kendoGrid({
          dataSource: dataSource,
          pageable: true,
          height: 500,
          toolbar: ["create"],
          columns: [
            { field: "ProductName", title: "Product Name", width: "100px" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "100px" }
          ],
          editable: "incell",
        }).data("kendoGrid");

        $("#grid").kendoTooltip({
          show: function(e){
            if(this.content.text().length > 40){
              this.content.parent().css("visibility", "visible");
            }
          },
          hide:function(e){
            this.content.parent().css("visibility", "hidden");
          },
          filter: "td:nth-child(1)", //this filter selects the first column cells
          position: "center",
          content: function(e){
            var dataItem = $("#grid").data("kendoGrid").dataItem(e.target.closest("tr"));
            var content = "Currently we have " + dataItem.UnitsInStock + "  " + dataItem.ProductName +"in stock";
            return content;
          }
        }).data("kendoTooltip");
      });
    </script>
```

## See Also

Other articles on Kendo UI Tooltip:

* [Tooltip JavaScript API Reference](/api/javascript/ui/tooltip)
* [How to Calculate Tooltip Content Width]({% slug howto_calculatetooltipcontentlength_tooltip %})
* [How to Show Only If Text Overflows with Ellipsis]({% slug howto_showonlyiftextoverflowswithellipsis_tooltip %})
