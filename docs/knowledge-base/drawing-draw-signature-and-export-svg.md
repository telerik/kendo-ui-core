---
title: Draw a Signature and Export It to SVG
description: An example on how to allow the user to draw a signature and export it to SVG by using the Kendo UI Drawing API.
type: how-to
page_title: Allow Users to Sign Their Names on a Canvas and Export It to SVG | Kendo UI Spreadsheet for jQuery
slug: drawing-draw-signature-and-export-svg
tags: kendo, kendo-ui, drawing, path, geometry, svg, signature
ticketid: 1144186
res_type: kb
component: drawing
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Drawing API</td>
 </tr>
</table>

## Description

How can I allow the user to draw or sign their name on a Canvas, save it as an SVG, and undo the drawing if the user makes a mistake?

## Solution

Allow the user to draw on the screen (Canvas) and export the drawing as an SVG file by using the [Kendo Drawing API](https://docs.telerik.com/kendo-ui/framework/drawing/overview) library.

```dojo
<div id="surface-container">
  <div id="surface" style="width: 500px; height: 500px;border: 1px solid black;"></div>
</div>

<button class='export-svg k-button'>Export as SVG</button>
<button class='k-button clear'>Clear drawing</button>

<script>
  var geom = kendo.geometry;
  var Point = geom.Point;
  var draw = kendo.drawing;
  var Path = draw.Path;
  var path;

  $("#surface-container").on("mousemove", function(e) {
    if (!path) {
      return;
    }

    var offset = $(this).offset();
    var newPoint = new Point(e.pageX - offset.left, e.pageY - offset.top);

    path.lineTo(newPoint);
  }).on("mousedown", function(e) {
    path = new Path({
      stroke: {
        color: '#E4141B',
        width: 2,
        lineCap: "round",
        lineJoin: "round"
      }
    });

    var offset = $(this).offset();
    var newPoint = new Point(e.pageX - offset.left, e.pageY - offset.top);

    for (var i = 0; i < 1; i++) {
      path.lineTo(newPoint.clone().translate(i * 1, 0));
    }

    surface.draw(path);
  }).on("mouseup", function(e) {
    path = undefined;
  });

  var surface = draw.Surface.create($("#surface"));

  $(".export-svg").click(function() {
    // Convert the DOM element to a drawing using kendo.drawing.drawDOM
    kendo.drawing.drawDOM($("#surface"))
      .then(function(group) {
      // Render the result as a SVG document
      return kendo.drawing.exportSVG(group);
    })
    .done(function(data) {
      // Save the SVG document
      kendo.saveAs({
        dataURI: data,
        fileName: "signature.svg",
        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
      });
    });
  });

  $(".clear").click(function() {
    surface.clear();
  });
</script>
```

## See Also

* [API Reference of the Kendo UI Drawing Library](https://docs.telerik.com/kendo-ui/api/javascript/drawing)
