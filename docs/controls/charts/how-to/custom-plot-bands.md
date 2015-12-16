---
title: Render custom plot bands
page_title: Custom plot bands with set thickness and title
description: Render custom plot bands with set thickness and title
---

# Render custom plot bands with set thickness and title

The Chart plot bands are somewhat limited in their customization options.

The example below demonstrates how to create our own plot bands as a custom overlay.
We can extend the techniques demonstrated here to create much more complex annotations as well.

Custom elements should be created in the [render event](http://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/chart#events-render)
to ensure they survive redraws.

For a list of all available drawing primitives see [Drawing API](http://docs.telerik.com/kendo-ui/framework/drawing/overview).

#### Example:

```html
    <div id="chart" />
    <script>
      $("#chart").kendoChart({
        valueAxis: {
          name: "valueAxis",
          min: 0,
          max: 700
        },
        categoryAxis: {
          name: "categoryAxis"
        },
        render: function(e) {
          // Locate value slot
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/chart/chart_axis#methods-slot
          var axis = e.sender.getAxis("valueAxis");
          var slot = axis.slot(650);

          // Locate category slot
          //
          // Index, will get the last slot on the right given that we have less than 1000 categories
          var categoryAxis = e.sender.getAxis("categoryAxis");
          var categorySlot = categoryAxis.slot(1000);

          // Render a line element
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var line = new kendo.drawing.Path({
            stroke: {
              color: "red",
              width: 3
            }
          });
          line.moveTo(slot.origin).lineTo([categorySlot.origin.x, slot.origin.y]);

          // Render a text element
          //
          // http://docs.telerik.com/kendo-ui/api/javascript/dataviz/drawing/text
          var labelPos = [categorySlot.origin.x - 50, slot.origin.y - 20];
          var label = new kendo.drawing.Text("MAX", labelPos, {
            fill: {
              color: "red"
            },
            font: "14px sans"
          });

          var group = new kendo.drawing.Group();
          group.append(line, label);

          // Draw on chart surface
          //
          // http://docs.telerik.com/kendo-ui/framework/drawing/overview
          e.sender.surface.draw(group);
        }
      });
    </script>
```
