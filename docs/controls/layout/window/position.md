---
title: Positioning
page_title: jQuery Window Documentation | Positioning
description: "Get started with the jQuery Window by Kendo UI, learn how to position and drag the widget and also how to constrain its movement within containers."
slug: positiondrag_window
position: 3
---

# Positioning

The Window enables you to [set its position](#positioning) and [constrain its movement within containers](#constraining-the-movement).

## Getting Started

Normally, a Window is opened after user interaction and is expected to be centered instead of located next to the HTML element which was used to define its content. You can initialize the widget as non-visible and configure it to open when needed.

The following example demonstrates how to center and open the Window on a button click. If its content is [loaded through AJAX]({% slug content_window %}#loading-content-with-ajax), the centering occurs after request is complete.

    <div id="window">
        Content of the Window
    </div>
    <button id="openButton">Open Window</button>

The following example demonstrates how to initialize and center the Window, and configure the button `click` action.

    $(document).ready(function(){
        $("#window").kendoWindow({
            width: 200,
            height: 200,
            title: "Centered Window",
            visible: false
        }).data("kendoWindow");
    });

    $("#openButton").click(function(){
        var win = $("#window").data("kendoWindow");
        win.center().open();
    });

## Constraining the Movement

The Window provides the [`draggable.containment`](/api/javascript/ui/window/configuration/draggable.containment) option which you can use to constrain the movement of the widget inside a container element. The `containment` option overrides the `appendTo` setting and attaches the Window to the specified DOM element. To position the `containment` element, use the `relative`, `absolute`, or `fixed` CSS rules. For a complete example, refer to the [demo on constraining the movement of the Window within containers](https://demos.telerik.com/kendo-ui/window/constrain-movement).

The following example demonstrates how to create a modal Window and constrain its movement inside a DOM element.

```dojo
    <style>
        #container {
            position: relative;
            width: 500px;
            height: 500px;
            border: 1px solid grey;
        }
    </style>

    <div id="container">
        <div id="window">
            <p>Alvar Aalto is one of the greatest names in modern architecture and design.
                Glassblowers at the iittala factory still meticulously handcraft the legendary vases
                that are variations on one theme, fluid organic shapes that let the end user decide the use.
            </p>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            $("#window").kendoWindow({
                width: "300px",
                height: "200px",
                draggable: {
                    containment: "#container"
                }
            });
        });
    </script>
```

## See Also

* [Constraining the Movement of the Window (Demo)](https://demos.telerik.com/kendo-ui/window/constrain-movement)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
