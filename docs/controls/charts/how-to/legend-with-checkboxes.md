---
title: Display checkboxes next to legend items
page_title: Display checkboxes next to legend items
description: Display checkboxes next to legend items
---

# Display checkboxes next to legend items

The example below demonstrates how to customize the appearance of legend items.

The [legend item visual](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#configuration-legend.item.visual) can be overridden to render custom text, images and shapes.
For a list of all available drawing primitives see [Drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/overview).

We'll draw a checkbox that will match the visible state of the series.
The checkbox will be represented using an [Unicode Ballot Box symbol](https://en.wikipedia.org/wiki/Checkbox#Unicode)

#### Example:

```html
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        legend: {
          item: {
            visual: function (e) {
              var color = e.options.markers.background;
              var labelColor = e.options.labels.color;

              // Define the target dimensions for the legend item
              var rect = new kendo.geometry.Rect([0, 0], [100, 50]);

              // A layout will hold the checkbox and the default visual
              //
              // http://docs.telerik.com/kendo-ui/api/javascript/drawing/layout
              var layout = new kendo.drawing.Layout(rect, {
                spacing: 5,
                alignItems: "center"
              });

              // Cheat a bit by rendering the checkbox using the Unicode ballot symbol
              //
              // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
              var cbSymbol = e.active ? "☑" : "☐";
              var cb = new kendo.drawing.Text(cbSymbol, [0, 0], {
                fill: {
                  color: labelColor
                },
                font: "14px sans-serif"
              });

              // This will give us the default box + text
              var defaultVisual = e.createVisual();

              // Reflow them together
              layout.append(cb, defaultVisual);
              layout.reflow()

              return layout;
            }
          }
        },
        series: [
          { name: "Series 1", data: [1, 2, 3] },
          { name: "Series 2", data: [3, 4, 5] }
        ]
      });
    </script>
```
