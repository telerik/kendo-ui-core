---
title: Group
page_title: jQuery ToolBar Documentation | Group Command Type
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to configure and use the Group command type."
previous_url: /controls/navigation/toolbar/group
slug: group_toolbar_widget
---

# Group

The ToolBar enables the user to select only one button from a group of buttons at a time.

This approach is useful when you create a group of mutually exclusive Toggle Buttons.

The following example demonstrates how to define a group of mutually exclusive Toggle Buttons.

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
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
