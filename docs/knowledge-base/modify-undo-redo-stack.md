---
title: Modify the Undo-Redo Stack in the Diagram
page_title: Modify the Undo-Redo Stack in the Diagram
description: "Learn how to add custom actions to the undo-redo stack of the Kendo UI Diagram."
slug: howto_modify_undoredo_stack
previous_url: /controls/diagrams-and-maps/diagram/how-to/modify-undo-redo-stack
tags: kendo, jquery, diagram, modify, undo, redo, stack
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

How can I add custom actions to the undo-redo stack of the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to add custom actions to the undo-redo stack of the Diagram to cover custom interactions such as changing the color of the shape.

To achieve this behavior:

1. Handle the event that triggers the change. For example, the `click` event of the button in this how-to example.
2. Declare a custom `Unit` class by using the `init`, `undo`, and `redo` methods.
3. Create an instance of this class.
4. Add the applied modification to the `UndoRedoService` of the Diagram.

```dojo

    <input type="button" value="Undo" onclick="undoChange(); return false;" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
    <input type="button" value="Redo" onclick="redoChange(); return false;" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">
    <div id="diagram" style="height: 400px"></div>
    <input type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" value="Change shape color" onclick="changeShape(); return false;">
    <script>
        var diagram = $("#diagram").kendoDiagram({
            shapes: [
                {
                    id: "1"
                }
            ]
        }).data("kendoDiagram");

        function changeShape() {
            var prevColor = diagram.shapes[0].options.fill.color;
            diagram.shapes[0].redraw({ fill: { color: "#FF3333" } });

            var changeColorUnit = new ChangeColorUnit(diagram.shapes[0], prevColor);
            diagram.undoRedoService.add(changeColorUnit, false);
        }

        function undoChange() {
            diagram.undo();
        }

        function redoChange() {
            diagram.redo();
        }

        var ChangeColorUnit = kendo.Class.extend({
            init: function (shape, prevColor) {
                this.shape = shape;
                this.prevColor = prevColor;
                this.currColor = shape.options.fill.color;
            },
            undo: function () {
                this.shape.redraw({ fill: { color: this.prevColor } });
            },
            redo: function () {
                this.shape.redraw({ fill: { color: this.currColor } });
            }
        });
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
