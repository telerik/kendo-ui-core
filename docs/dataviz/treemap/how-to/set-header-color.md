---
title: Set header items color
page_title: Set header items color
description: Set header items color
---

# Set header items color

The example below demonstrates how to set the Kendo UI TreeMap tiles color from the items.

#### Example:

```html

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
