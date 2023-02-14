---
title: Implement Free-Form Drawing with the Drawing Library
page_title: Implement Free-Form Drawing with the Drawing API Library
description: "Learn how to implement a free-form drawing surface while working with the Kendo UI Drawing API."
slug: howto_freeformdrawing_drawingapi
previous_url: /framework/drawing/how-to/free-form-drawing
tags: telerik, kendo, jquery, drawing, api, library, enable, implement, free, drawing
component: drawing
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Drawing API</td>
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

How can I enable free drawing when working with the Kendo UI Drawing API library?

## Solution

The following example demonstrates how to implement a free-form drawing surface while working with the Kendo UI Drawing API.

```dojo
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

* [JavaScript API Reference: kendo.drawing.surface](/api/javascript/drawing/surface)
* [JavaScript API Reference: kendo.geometry.Transformation](/api/javascript/geometry/transformation)
