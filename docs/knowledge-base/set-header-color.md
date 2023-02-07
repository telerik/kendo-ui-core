---
title: Set the TreeMap Header Items Color
page_title: Set the Header Items Color of the TreeMap
description: "Learn how to set the Kendo UI TreeMap widget tiles color from the items."
previous_url: /controls/charts/treemap/how-to/set-header-color, /controls/charts/how-to/appearance/set-header-color
slug: howto_setheaderitemscolor_treemap
tags: chart, treemap, set, header, items, color
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Chart for jQuery</td>
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

How can I set the Kendo UI TreeMap tiles color from the items?

## Solution

Obtain the node elements in the [`dataBound`](/api/javascript/dataviz/ui/treemap/events/databound) event handler and apply the style through the [`css()`](https://api.jquery.com/css/) jQuery method.

> * When you use a [Sass-based theme]({% slug sassbasedthemes_kendoui %}), apply an additional `.k-treemap .k-treemap-title { background-color: inherit; }` style.
> * R1 2023 is the last official release of Kendo jQuery, which supports and ships [Less themes]({% slug themesandappearnce_kendoui_desktopwidgets %}) with the product.

The following example demonstrates how to set the Kendo UI TreeMap tiles color from the items.

```dojo

    <style>
      .k-treemap .k-treemap-title {
        background-color: inherit;
      }
    </style>

    <div id="treemap">
    </div>

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
* [How to Show TreeMap Tooltip]({% slug howto_showtreemaptooltip_treemap %})
