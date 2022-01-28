---
title: ButtonGroup
page_title: jQuery ToolBar Documentation | ButtonGroup Command Type
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to configure and use the ButtonGroup command type."
previous_url: /controls/navigation/toolbar/buttongroup
slug: buttongroup_toolbar_widget
---

# ButtonGroup

The ButtonGroup consists of multiple button elements that are visually separated in a group.

In the command overflow popup, the ButtonGroup is rendered as a list of commands.

The following example demonstrates how to define a ButtonGroup in the ToolBar widget.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    id: "btnGroup",
                    //ButtonGroup's items accept the same appearance configuration options as the button item
                    buttons: [
                        { text: "prev", icon: "arrow-w" },
                        { text: "next", icon: "arrow-e" }
                    ]
                }
            ]
        });
    </script>

The following example demonstrates how to define a ButtonGroup with mutually exclusive options.

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    id: "btnGroup",
                    // The items of the ButtonGroup accept the same appearance configuration options as the Button control.
                    buttons: [
                        { text: "foo", togglable: true, group: "controlGroup" },
                        { text: "bar", togglable: true, group: "controlGroup" },
                        { text: "baz", togglable: true, group: "controlGroup" }
                    ]
                }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
