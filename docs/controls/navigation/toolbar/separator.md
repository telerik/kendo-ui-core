---
title: Separator
page_title: Separator | Kendo UI ToolBar
description: "Learn how to configure and use the Separator Command Type of the Kendo UI ToolBar widget."
slug: separator_toolbar_widget
position: 7
---

# Separator

The Separator can act as a delimiter between the ToolBar commands.

The following example demonstrates how to define a Separator.

###### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button 1" },
                { type: "separator" },
                { type: "button", text: "Button 2" }
            ]
        });
    </script>

## See Also

* [Basic Usage of the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/index)
* [ToolBar JavaScript API Reference](/api/javascript/ui/toolbar)
