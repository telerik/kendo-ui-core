---
title: Set the Background of MultiSelect Tags with ColorPalette from ToolTip
description: How to change the background of MultiSelect Tags using the ToolTip and ColorPalette Components
type: how-to
page_title: MultiSelect Tag Background change from ToolTip with ColorPalette 
slug: set-multiselect-background-from-tooltip-with-colorpalette
tags: multiselect, tags, change, background, color, tooltip, colorpalette
ticketid: 1487280
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.1.224</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 32bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description
Is it possible to assign a color to the MultiSelect tags from a ToolTip as we can find it in software like Asana or Trello?

## Solution
1. Add a ToolTip to the MultiSelect's container. Use the `filter` method to target the tags. 
1. Set an Html element as `content` of the ToolTip. In the Tooltip's `show` event handler initialize a ColorPalette from the Html element in the Tooltip's `content`. 
1. Capture the `change` event of the ColorPalette and set the new color as the background of the Tag that showed the Tooltip. Then `hide` the Tooltip. 

```dojo
 <div id="container">
      <select id="products"></select>
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoMultiSelect({
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          autoBind: false,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          },
          value: [
            { ProductName: "Chang", ProductID: 2 },
            { ProductName: "Uncle Bob's Organic Dried Pears", ProductID: 7 }
          ]
        });

        $("#container").kendoTooltip({
          filter: "li",
          content: "<div id='color-chooser'></div>",
          width:200,
          show:function(e){
            var sender = e.sender;
            var target = e.sender.target();
            var colorPalette = $("#color-chooser").data("kendoColorPalette");
            if(colorPalette !=undefined){
              colorPalette.destroy();
              $("#color-chooser").empty();
            }
            $("#color-chooser").kendoColorPalette({
              palette: [ "#ddd1c3", "#d2d2d2", "#746153", "#3a4c8b", "#ffcc33", "#fb455f", "#ac120f" ],
              tileSize: 30,
              change: function() {
                var colorId = this.value();
                $(target[0]).css('background', colorId);
                sender.hide();
              }
            });
          }
        });
      });
    </script>
```


## See also

* [JavaScript API Reference of the MultiSelect](api/javascript/ui/colorpalette)
* [JavaScript API Reference of the Tooltip](api/javascript/ui/tooltip)
* [JavaScript API Reference of the ColorPalette](api/javascript/ui/colorpalette)
* [jQuery css Method](https://www.w3schools.com/jquery/html_attr.asp)


