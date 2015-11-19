---
title: Free-form drawing
page_title: Free-form drawing
description: Free-form drawing
---

# Apply Transformations During Export

This example demonstrates how to implement free-form drawing surface.

## Example - Applying transformations during export
```html
    <div id="surface" style="width: 1000px; height: 1000px;border: 1px solid black;cursor: crosshair"></div>
    <script>
      var draw = kendo.drawing;

      var path = new draw.MultiPath({
        stroke: {
          width: 1,
          color: "#000"
        }
      });
      
      var element = $("#surface")
      var surface = draw.Surface.create(element);
      surface.draw(path);
      
      element.kendoTouch({
        dragstart: function (e) {
          e.event.preventDefault();
          var point = surfacePoint(e);
          path.moveTo(point.x, point.y);
        },
        drag: function (e) {
          var point = surfacePoint(e);
          path.lineTo(point.x, point.y);
        }
      });

      function surfacePoint(e) {
        e.event.preventDefault();
        var offset = element.offset();
        var x = e.touch.x.location - offset.left;
        var y = e.touch.y.location - offset.top;
        return {
          x: x,
          y: y
        };
      }
    </script>
```
