---
title: Apply Border Styles to TreeMap Tiles
page_title: Apply Border Styles to the TreeMap Tiles
description: "Learn how to apply border styles to the Kendo UI TreeMap tiles."
previous_url: /controls/charts/treemap/how-to/apply-border-styles, /controls/charts/how-to/appearance/apply-border-styles
slug: howto_applyborderstyles_treemap
tags: treemap, apply, border, styles
component: treemap
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI TreeMap for jQuery</td>
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

How can I apply border styles to the tiles of the TreeMap?

## Solution

The Kendo UI TreeMap widget considers the width of its container and calculates the dimensions of its tiles accordingly. If the `border-width` configuration of the tiles is changed to a value that is greater than 1px, then a negative value must be provided as a margin to compensate the update of the dimensions.

> * This approach is applicable only when you use [Less-based themes]({% slug themesandappearnce_kendoui_desktopwidgets %}).
> * R1 2023 is the last official release of Kendo jQuery, which supports and ships [Less themes]({% slug themesandappearnce_kendoui_desktopwidgets %}) with the product.

The following example demonstrates how to apply border styles to the Kendo UI TreeMap tiles.

```dojo
    <style>
      .k-treemap-tile {
        border-width: 5px;
        margin: -5px 0 0 -5px;
      }
    </style>
    <div id="treemap" style="height: 600px; font-size: 12px;"></div>
    <script>
     $("#treemap").kendoTreeMap({
       dataSource: {
         data: [{
           name: "Root",
           color: "red",
           items: [{
             name: "Group A",
             value: 1,
             color: "green",
             items: [{ name: "foo", value: 1, color: "blue" }, { name: "bar", value: 2, color: "orange"}]
           }]
         }]
       },
       valueField: "value",
       textField: "name",
       colorField: "color",
       dataBound: function (e) {
         if (e.node) {
           var element = this.findByUid(e.node.uid);
           element.css("background-color", e.node.color);
         }
       }
     });
    </script>
```

## See Also

* [TreeMap JavaScript API Reference](/api/javascript/dataviz/ui/treemap)
* [How to Set Header Items Color]({% slug howto_setheaderitemscolor_treemap %})
