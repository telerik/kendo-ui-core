---
title: Implement Free-Form Drawing
page_title: Implement Free-Form Drawing | Kendo UI Drawing API
description: "Learn how to implement a free-form drawing surface while working with the Kendo UI Drawing API."
slug: howto_freeformdrawing_drawingapi
---

# Implement Free-Form Drawing

The example below demonstrates how to implement a free-form drawing surface while working with the Kendo UI Drawing API.

###### Example

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

## See Also

Other articles and how-to examples on Kendo UI Drawing API:

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
* [PDF Options JavaScript API Reference](/api/javascript/drawing/pdfoptions)
* [Overview of the Drawing API]({% slug overview_kendoui_drawingapi %})
* [How to Apply Transformations During Export]({% slug howto_applytransformationsduringexport_drawingapi %})
* [How to Embed Font Awesome in Exported PDF]({% slug howto_embedfontawesome_inexportedpdf_drawingapi %})
