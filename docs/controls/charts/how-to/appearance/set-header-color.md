---
title: Set TreeMap Header Items Color
page_title: Set Header Items Color | Kendo UI TreeMap
description: "Learn how to set the Kendo UI TreeMap widget tiles color from the items."
previous_url: /controls/charts/treemap/how-to/set-header-color
slug: howto_setheaderitemscolor_treemap
---

# Set Header Items Color

The following example demonstrates how to set the Kendo UI TreeMap tiles color from the items.

```dojo

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
