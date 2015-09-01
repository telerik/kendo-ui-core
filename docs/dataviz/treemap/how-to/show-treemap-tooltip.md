---
title: Show treemap tooltip
page_title: Show treemap tooltip
description: Use the Kendo Tooltip for the treemap tiles
---

# Show treemap tooltip

The example below demonstrates how to use the Kendo UI Tooltip for the Kendo UI TreeMap tiles.

#### Example:

```html
    <div id="treemap">
    </div>

    <script>
      $("#treemap").kendoTreeMap({
        dataSource: {
          transport: {
            read: {
              url: "http://demos.telerik.com/kendo-ui/content/dataviz/js/population-usa.json",
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
