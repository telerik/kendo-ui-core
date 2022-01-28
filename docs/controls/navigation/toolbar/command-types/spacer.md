---
title: Spacer
ppage_title: jQuery ToolBar Documentation | Spacer Command Type
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to configure and use the Spacer command type."
previous_url: /controls/navigation/toolbar/spacer
slug: spacer_toolbar_widget
---

# Spacer

The Spacer command type moves the tools that are declared after it to the right side of the ToolBar.

The following example demonstrates how to define a spacer.

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
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
