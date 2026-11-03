---
title: Show the Diagram at Actual Size and Keep the Shapes Centered
page_title: Show the Diagram at Actual Size and Keep the Shapes Centered - Kendo UI for jQuery
description: "Learn how to set the Kendo UI for jQuery Diagram zoom to 100% and keep its shapes centered in the viewport."
type: how-to
slug: diagram-show-actual-size-keep-centered
tags: telerik, kendo, jquery, diagram, zoom, actual size, bringIntoView, center, fit
res_type: kb
components: ["diagram"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Diagram for jQuery</td>
		</tr>
		<tr>
			<td>Version</td>
			<td>{{ site.cdnVersion }}</td>
		</tr>
	</tbody>
</table>

## Description

I fit all shapes of the Kendo UI for jQuery Diagram in the viewport by using the `bringIntoView` method. How can I add a button that sets the zoom to 100% (actual size) and keeps the shapes centered?

This KB also answers the following questions:

- Does `bringIntoView` change the zoom level of the Diagram?
- Why does the Diagram shrink when I call `bringIntoView` for all shapes?
- How can I zoom the Diagram to a given point and keep that point in place?

## Solution

The [`bringIntoView`](/api/dataviz/ui/diagram/methods/bringintoview) method and the [`zoom`](/api/dataviz/ui/diagram/methods/zoom) method behave as follows:

* `bringIntoView` changes the zoom level only when the passed items do not fit in the viewport at the current zoom. In this case, it reduces the zoom so that the items fit. It does not increase the zoom. After that, it aligns the items in the viewport, by default in the center.
* `zoom` with a `point` keeps that point at its current position in the viewport while the zoom changes. Without a `point`, the Diagram does not keep the center of the viewport. The shapes move away from the center when the zoom changes.
* The zoom is limited by the [`zoomMin`](/api/dataviz/ui/diagram/configuration/zoommin) and [`zoomMax`](/api/dataviz/ui/diagram/configuration/zoommax) options.

To show the Diagram at actual size and keep the shapes centered:

1. Call `bringIntoView` for all shapes to center them in the viewport.
1. Get the center of the shapes with the [`boundingBox`](/api/dataviz/ui/diagram/methods/boundingbox) method. Without arguments, the method returns the bounding rectangle of all shapes.
1. Call `zoom(1, { point: center })` to set the zoom to 100% around that center.

Do not call `bringIntoView` for all shapes after setting the zoom. If the shapes do not fit at 100%, `bringIntoView` reduces the zoom again.

The following example demonstrates how to fit all shapes and how to show them at actual size. The `zoomMax` option of the Diagram has a default value of `2`, so the zoom of 1 is within the allowed range.

```dojo
<button id="fit" class="k-button">Fit</button>
<button id="actual" class="k-button">Show actual size</button>
<div id="diagram" style="height: 400px; width: 600px;"></div>
<script>
  $("#diagram").kendoDiagram({
    shapes: [
      { id: "1", x: 100, y: 100, width: 120, height: 60, content: { text: "A" } },
      { id: "2", x: 1500, y: 100, width: 120, height: 60, content: { text: "B" } },
      { id: "3", x: 800, y: 900, width: 120, height: 60, content: { text: "C" } }
    ],
    connections: [
      { from: "1", to: "2" },
      { from: "2", to: "3" }
    ]
  });

  var diagram = $("#diagram").data("kendoDiagram");

  $("#fit").on("click", function() {
    diagram.bringIntoView(diagram.shapes);
  });

  $("#actual").on("click", function() {
    diagram.bringIntoView(diagram.shapes);
    diagram.zoom(1, { point: diagram.boundingBox().center() });
  });
</script>
```

## See Also

* [Diagram Overview]({% slug overview_kendoui_diagram_widget %})
* [Zoom the Diagram to a Point]({% slug howto_zoomtopoint_diagram %})
* [`bringIntoView` Method of the Diagram](/api/dataviz/ui/diagram/methods/bringintoview)
* [`zoom` Method of the Diagram](/api/dataviz/ui/diagram/methods/zoom)
* [JavaScript API Reference of the Diagram](/api/dataviz/ui/diagram)
