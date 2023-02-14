---
title: Show a Tooltip in the TreeMap
page_title: Show a Tooltip in the TreeMap
description: "Learn how to use the Kendo UI Tooltip for the Kendo UI TreeMap tiles."
previous_url: /controls/charts/treemap/how-to/show-treemap-tooltip, /controls/charts/how-to/integration/show-treemap-tooltip
slug: howto_showtreemaptooltip_treemap
tags: chart, show, tooltip, in, treemap
component: chart
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Chart for jQuery</td>
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

How can I use the Kendo UI Tooltip for the Kendo UI TreeMap tiles?

## Solution

The following example demonstrates how to use the Kendo UI Tooltip for the Kendo UI TreeMap tiles.

```dojo
    <div id="treemap">
    </div>

    <script>
      $("#treemap").kendoTreeMap({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/content/dataviz/js/population-usa.json",
              dataType: "json"
            }
          },
          schema: {
            model: {
              children: "items"
            }
          }
        },
        valueField: "value",
        textField: "name",
        colors: [
          ["#0c81c5", "#c5dceb"], ["#3aa2de", "#d8ecf8"],
          ["#449000", "#dae9cc"], ["#76b800", "#dae7c3"],
          ["#ffae00", "#f5e5c3"], ["#ef4c00", "#f1b092"],
          ["#9e0a61", "#eccedf"]
        ]
      });
      $("#treemap").kendoTooltip({
        filter: ".k-leaf,.k-treemap-title",
        position: "top",
        content: function (e) {
          var treemap = $("#treemap").data("kendoTreeMap");
          var item = treemap.dataItem(e.target.closest(".k-treemap-tile"));
          return item.name + ": " + item.value;
        }
      });
    </script>
```

## See Also

* [TreeMap JavaScript API Reference](/api/javascript/dataviz/ui/treemap)
* [How to Set Header Items Color]({% slug howto_setheaderitemscolor_treemap %})
