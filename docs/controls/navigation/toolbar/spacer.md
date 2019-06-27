---
title: Spacer
page_title: Spacer | Kendo UI ToolBar
description: "Learn how to configure and use the Spacer Command Type of the Kendo UI ToolBar widget."
slug: spacer_toolbar_widget
position: 8
---

# Spacer

The Spacer command type moves the tools that are declared after it to the right side of the ToolBar.

The following example demonstrates how to define a spacer.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button 1" },
                { type: "spacer" },
                { type: "button", text: "Button 2" }
            ]
        });
    </script>

You can use multiple spacers to create an equal amount of space between several tools.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button 1" },
                { type: "spacer" },
                { type: "button", text: "Button 2" },
                { type: "spacer" },
                { type: "button", text: "Button 3" }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
