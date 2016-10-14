---
title: Modify the Undo-Redo Stack
page_title: Modify the Undo-Redo Stack | Kendo UI Diagram
description: "Learn how to add custom actions to the undo-redo stack of the Kendo UI Diagram."
slug: howto_modify_undoredo_stack
---

# Modify the Undo-Redo Stack

The example below demonstrates how to add custom actions to the undo-redo stack of the Diagram to cover custom interactions such as changing the color of the shape.

To achieve this behavior, follow the main steps below:

1. Handle the event that triggers the change. For example, the `click` event of the button in this how-to example.
2. Declare a custom `Unit` class by using the `init`, `undo`, and `redo` methods.
3. Create an instance of this class.
4. Add the applied modification to the `UndoRedoService` of the Diagram.

###### Example

```html

    <input type="button" value="Undo" onclick="undoChange(); return false;">
    <input type="button" value="Redo" onclick="redoChange(); return false;">
    <div id="diagram" style="height: 400px"></div>
    <input type="button" class="k-primary" value="Change shape color" onclick="changeShape(); return false;">
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

Other articles on the Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})

For more runnable examples on the Kendo UI Diagram, browse the [**How To** documentation folder]({% slug howto_changeshapevisualelements_dynamically_diagram %}).
