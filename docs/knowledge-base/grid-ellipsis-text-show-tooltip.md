---
title: Show Ellipsis for Long Content and Display Tooltip on Hover
description: An example on how to show ellipsis in the Kendo UI Grid cells which render long content.
type: how-to
page_title: Show Ellipsis for Long Content and Display Tooltip on Hover | Kendo UI Grid
slug: grid-ellipsis-text-show-tooltip
tags: grid, ellipsis, tooltip, long, text, content
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

How can I show ellipsis in the Grid cells where the text does not fit the specified width and display the full content in a tooltip when the user hovers over the cell?

## Solution

The following example illustrates how to achieve the functionality.

```dojo
<div id="grid"></div>
<style>
  #grid{
    width:300px;
  }
</style>
<script>
  var grid = null;

  $(document).ready(function () {
    var dataSource = new kendo.data.DataSource({
      data: [
        {ID:1 ,Text: "Integer arcu odio, egestas nec pretium sit amet, aliquet vel nibh. Aliquam ac ante fringilla, consectetur erat at, dapibus est. Pellentesque facilisis iaculis neque, in auctor eros fringilla ut. Proin sit amet aliquet lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer porttitor vel neque ac dapibus. Nullam bibendum, velit quis tristique placerat, nibh ante vulputate sem, vel sodales tellus felis nec mi. In hac habitasse platea dictumst. Suspendisse in lacus nec ligula elementum interdum. Mauris at bibendum elit. Mauris dignissim, quam quis blandit rutrum, nunc nulla porttitor eros, eget volutpat magna nulla eu massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce consectetur blandit est ut commodo. Vestibulum vel tellus a purus accumsan venenatis."},
        {ID:2 ,Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "},
        {ID:3 ,Text: " Duis ut nulla eget lectus posuere tempor. "},
        {ID:4 ,Text: ""},
        {ID:5 ,Text: " Duis ut"}
      ],
      schema: {
        model: {
          fields: {
            ID: { type: "number" },
            Text: { type: "string" }
          }}
      },
      pageSize: 20
    });

    grid = $("#grid").kendoGrid({
      dataSource: dataSource,
      scrollable: true,
      filterable: true,
      columns: [
        { field: "ID", width: "50px" },
        { field: "Text", width: "200px", attributes: {
          style: 'white-space: nowrap '
        }  }]
    }).data("kendoGrid");

    $("#grid").kendoTooltip({
      filter: "td:nth-child(2)", //this filter selects the second column's cells
      position: "right",
      content: function(e) {
        var dataItem = $("#grid").data("kendoGrid").dataItem(e.target.closest("tr"));
        var content = dataItem.Text;

        if(content.length > 10){
          return content;
        }else{
          return "";
        }
      },
      show: function(e){
        if(this.content.text() !=""){
          $('[role="tooltip"]').css("visibility", "visible");
        }

      },
      hide: function(){
        $('[role="tooltip"]').css("visibility", "hidden");
      }
    }).data("kendoTooltip");
  });
</script>
```

## See Also

* [API Reference of Kendo UI Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [API Reference of Kendo UI Tooltip](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
