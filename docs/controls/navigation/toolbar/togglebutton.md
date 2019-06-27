---
title: Toggle Button
page_title: Toggle Button | Kendo UI ToolBar
description: "Learn how to configure and use the Toggle Button Command Type of the Kendo UI ToolBar widget."
slug: toggle_button_toolbar_widget
position: 3
---

# Toggle Button

The Toggle Button allows users to switch between two states.

To define a Toggle Button, set the `togglable` property of the button to `true`. The Toggle Button supports the same configuration options as the standard Button.

> Clicking a Toggle Button triggers the `toggle` event but does not trigger the `click` event.

The following example demonstrates how to define a Toggle Button in the ToolBar widget.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "button",
                    togglable: true,
                    text: "My Toggle Button",
                    spriteCssClass: "myIcon",
                    showIcon: "toolbar",
                    selected: true
                }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
