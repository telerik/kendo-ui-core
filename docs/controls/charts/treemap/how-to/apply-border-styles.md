---
title: Apply Border Styles to Tiles
page_title: Apply Border Styles to Tiles | Kendo UI TreeMap
description: "Learn how to apply border styles to the Kendo UI TreeMap tiles."
slug: howto_applyborderstyles_treemap
---

# Apply Border Styles to Tiles

The Kendo UI TreeMap widget considers the width of its container and calculates the dimensions of its tiles accordingly. If the `border-width` configuration of the tiles is changed to a value that is greater than 1px, then a negative value must be provided as a margin to compensate the update of the dimensions.

The example below demonstrates how to apply border styles to the Kendo UI TreeMap tiles.

###### Example

```html
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

Other articles and how-to examples on Kendo UI TreeMap:

* [TreeMap JavaScript API Reference](/api/javascript/dataviz/ui/treemap)
* [How to Set Header Items Color]({% slug howto_setheaderitemscolor_treemap %})
