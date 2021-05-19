---
title: Appearance
page_title: jQuery ToolBar Documentation | Appearance
description: "Get started with the jQuery ToolBar by Kendo UI and control its appearance."
slug: appearance_kendoui_toolbar
position: 4
---

# Appearance

The ToolBar enables you to resize it and control its rendering on mobile devices.

## Resizing

By design, the ToolBar detects changes in the viewport width and hides the overflowing controls in the command overflow popup. This feature may be disabled by setting `resizable` option to `false`. You are able to control the way a given command behaves on resizing with its `overflow` property.

> * Declare commands with `overflow: "never"` first followed by those with `overflow: "auto"`. Declare commands with `overflow: "always"` last.
> * Setting the minimum width of the ToolBar element is mandatory for preventing the ToolBar from resizing below a given width.

The following example demonstrates how to use the `overflow` property.

    <div id="toolbar" style="min-width: 240px;"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { overflow: "never", template: '<input id="search" />' },
                { overflow: "never", type: "button", text: "Never" },
                { overflow: "auto", type: "button", text: "Auto 1" },
                { overflow: "auto", type: "button", text: "Auto 2" },
                { overflow: "always", type: "button", text: "Always" }
            ]
        });
    </script>

## Mobile Rendering

The widget provides a mobile specific style options when placed within the header or footer of a mobile View. For more information on the mobile rendering feature, refer to the [demo on the ToolBar acting as an ActionBar](https://demos.telerik.com/kendo-ui/m/index#navbar/index).

The mobile view of the Toolbar exposes an additional option for aligning tools to the left or to the right side of the widget. This behavior is achieved by using the `items.align` configuration. For more information, refer to the article on [using the mobile view of the ToolBar]({% slug howto_usemobileview_toolbar %}).

## See Also

* [Resizing the ToolBar (Demo)](https://demos.telerik.com/kendo-ui/toolbar/resizing)
* [JavaScript API Reference of the ToolBar](/api/javascript/ui/toolbar)
