---
title: ButtonGroup
page_title: ButtonGroup | Kendo UI ToolBar
description: "Learn how to configure and use the ButtonGroup Command Type of the Kendo UI ToolBar widget."
slug: buttongroup_toolbar_widget
position: 6
---

# ButtonGroup

The ButtonGroup consists of multiple button elements that are visually separated in a group.

In the command overflow popup, the ButtonGroup is rendered as a list of commands.

The following example demonstrates how to define a ButtonGroup in the ToolBar widget.

###### Example

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

###### Example

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
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
