---
title: Show a Tooltip Only If the Text Exceeds a Certain Length
page_title: Show a Tooltip Only If the Text Exceeds a Certain Length
description: "Learn how to show a Kendo UI Tooltip only if the target text exceeds a certain length."
slug: howto_showonlyiftextexceedscertainlength_tooltip
previous_url: /controls/layout/tooltip/how-to/show-on-length-condition
tags: telerik, kendo, jquery, tooltip, show, only, if, text, exceeds, certain, length 
component: tooltip
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Tooltip for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show a Kendo UI Tooltip only if the text of the target exceeds a certain length?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="content" style="width: 500px">
      <div id="grid"></div>
    </div>

    <style>
      .k-tooltip.k-popup{
        visibility: hidden;
      }

    </style>
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>
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

* [Basic Usage of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/index)
* [Using the API of the Tooltip (Demo)](https://demos.telerik.com/kendo-ui/tooltip/api)
* [JavaScript API Reference of the Tooltip](/api/javascript/ui/tooltip)
