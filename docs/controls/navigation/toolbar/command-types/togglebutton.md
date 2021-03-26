---
title: ToggleButton
page_title: jQuery ToolBar Documentation | ToggleButton Command Type
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to configure and use the ToggleButton command type."
previous_url: /controls/navigation/toolbar/togglebutton
slug: toggle_button_toolbar_widget
---

# ToggleButton

The ToggleButton allows users to switch between two states.

To define a ToggleButton, set the `togglable` property of the button to `true`. The ToggleButton supports the same configuration options as the standard Button.

> Clicking a ToggleButton triggers the `toggle` event but does not trigger the `click` event.

The following example demonstrates how to define a ToggleButton in the ToolBar widget.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "button",
                    togglable: true,
                    text: "My ToggleButton",
                    spriteCssClass: "myIcon",
                    showIcon: "toolbar",
                    selected: true
                }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
