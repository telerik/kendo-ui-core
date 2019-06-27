---
title: Group
page_title: Group | Kendo UI ToolBar
description: "Learn how to configure and use the Group Command Type of the Kendo UI ToolBar widget."
slug: group_toolbar_widget
position: 4
---

# Group

The ToolBar enables the user to select only one button from a group of buttons at a time.

This approach is useful when you create a group of mutually exclusive Toggle Buttons.

The following example demonstrates how to define a group of mutually exclusive Toggle Buttons.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "foo", togglable: true, group: "controlGroup" },
                { type: "button", text: "bar", togglable: true, group: "controlGroup" },
                { type: "button", text: "baz", togglable: true, group: "controlGroup" }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
