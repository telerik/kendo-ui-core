---
title: Move Diagram Shapes with Arrow Keys
page_title: Move Diagram Shapes by Using Arrow Keys
description: "Learn how to move the shapes of a Kendo UI Diagram by pressing the keyboard arrow keys."
slug: howto_move_shapes_with_arrow_keys
previous_url: /controls/diagrams-and-maps/diagram/how-to/move-shapes-on-key-press
tags: kendo, jquery, diagram, move, shapes, with, arrow, keys
component: diagram
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Diagram for jQuery</td>
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

How can I enable the `Arrow` keys to move the shapes of the Kendo UI for jQuery Diagram?

## Solution

To achieve this behavior:

1. Handle the `load` event of the Diagram and check whether the selected item is a shape.
2. If the clicked object is a shape, assign a handler to the standard `keyPress` event of the `window` object.
3. To move the shape depending on the pressed key, use the `bounds()` method of the `Shape`.

```dojo

    <div id="diagram" style="height: 250px"></div>
    <script>
        var Point = kendo.dataviz.diagram.Point;
        $("#diagram").kendoDiagram({
            layout: {
                type: "tree",
                subtype: "right"
            },

            shapes: [
                { id: "1" },
                { id: "2" }
            ],
            connections: [
                {
                    from: "1",
                    to: "2"
                }
            ],
            click: attachMoveHandler
        });

        function attachMoveHandler(e) {
            var shape = e.item;

            if (shape instanceof kendo.dataviz.diagram.Shape) {
                if (!shape.from) {
                    $(window).keydown(moveShape);
                }
            }
        }
        function moveShape(event) {
            if (event.keyCode > 40 || event.keyCode < 37)
                return;

            var diagram = $("#diagram").getKendoDiagram();
            var shapes = diagram.select();

            if (event.keyCode && shapes) {

                for (var i = 0; i < shapes.length; i++) {
                    var bounds = shapes[i].bounds();

                    var x = bounds.x;
                    var y = bounds.y;
                    switch (event.keyCode) {
                        case 37:
                            bounds.x = bounds.x - 5;
                            break;
                        case 39:
                            bounds.x = bounds.x + 5;
                            break;
                        case 38:
                            bounds.y = bounds.y - 5;
                            break;
                        case 40:
                            bounds.y = bounds.y + 5;
                            break;
                    }
                    shapes[i].bounds(bounds);
                }
            }
        }
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Pan with Mouse Wheel]({% slug howto_pan_with_mouse_wheel %})
* [How to Drag and Drop on Existing Shapes]({% slug howto_draganddrop_onshapes_diagram %})
