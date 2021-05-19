---
title: Separator
page_title: jQuery ToolBar Documentation | Separator Command Type
description: "Get started with the jQuery ToolBar by Kendo UI and learn how to configure and use the Separator command type."
previous_url: /controls/navigation/toolbar/separator
slug: separator_toolbar_widget
---

# Separator

The Separator can act as a delimiter between the ToolBar commands.

The following example demonstrates how to define a Separator.

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
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
