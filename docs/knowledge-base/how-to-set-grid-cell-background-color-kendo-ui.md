---
title: Setting Cell Background Color in Kendo UI for jQuery Grid
description: Learn how to dynamically set the background color of Grid cells based on data source fields in Kendo UI for jQuery Grid.
type: how-to
page_title: How to Set Grid Cell Background Color Based on Data Source Field - Kendo UI for jQuery
slug: how-to-set-grid-cell-background-color-kendo-ui
tags: kendo-ui, grid, background-color, jquery, datasource, cell, databound
res_type: kb
ticketid: 1671214
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

Setting the background color of cells in the Kendo UI for jQuery Grid based on a field from the dataSource is a common requirement. This knowledge base article demonstrates how to dynamically apply background colors to the entire cell using the values from the dataSource.

This knowledge base article also answers the following questions:
- How can I apply a background color to the entire Grid cell using dataSource field values?
- How to use a dataSource field value for setting cell background color in Kendo UI for jQuery Grid?
- What is the method to dynamically change Grid cell background based on dataItem in Kendo UI for jQuery?

## Solution

To dynamically set the background color of cells in a Kendo UI for jQuery Grid, utilize a combination of column templates and the `dataBound` event. Define a class in the template element and then, during the `dataBound` event, set the background color of the cell's parent element to match the desired color.

### Setting Background Using Class and Parent Element

1. Define a class in your column template. This class will be used to identify the cells whose background color needs to be changed.

2. Use the `dataBound` event to identify these cells and set the background color of their parent elements.

```javascript
$("#grid").kendoGrid({
  dataSource: dataSource,
  dataBound: function(e){
    $(".colorChange.pink").parent().css("background-color", "pink");
    $(".colorChange.green").parent().css("background-color", "green");
    $(".colorChange.yellow").parent().css("background-color", "yellow");
  },
  pageable: true,
  toolbar: ["create"],
  columns: [
    { field: "ProductName", title: "Product Name" },
    { field: "UnitPrice", title: "Price", format: "{0:c}", width: "120px" },
    { 
      field: "UnitsInStock",
      title:"Units In Stock",
      width: "120px",
      template: "#{# <span style='background-color: #:Color#;' class='colorChange #:Color#'> #:UnitsInStock# </span> #}#"
    },
    { command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
  ],
  editable: "inline"
});
```

To see setting the background using a class and parent element in action, refer to this [Progress Kendo UI Dojo](https://dojo.telerik.com/cIMtPIZe).

### Dynamically Setting Background Based on DataSource Field

To dynamically use a field from the dataSource as the background color:

1. Add a class to your template item without specifying the background color inline.

2. During the `dataBound` event, iterate through the dataSource items, retrieve the color value from the `Color` field, and apply it to the relevant cell.

```javascript
dataBound: function(e){   
  var dataItems = e.sender.dataSource.view();
  for (var j = 0; j < dataItems.length; j++) {
    var color = dataItems[j].get("Color");
    var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
    $(row).find(".colorChange").parent().css("background-color", color);
  }   
},
```

For a practical demonstration of dynamically setting the background with a dataSource field, refer to this [Progress Kendo UI Dojo](https://dojo.telerik.com/NfFWNtWO).

## See Also
- [Column Template in Kendo UI Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template)
- [DataBound Event in Kendo UI Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
- [Styling Rows and Cells Based on Data Item Values](https://docs.telerik.com/kendo-ui/knowledge-base/style-rows-cells-based-on-data-item-values)
