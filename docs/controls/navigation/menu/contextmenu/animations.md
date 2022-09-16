---
title: Animations
page_title: jQuery ContextMenu Documentation | Animations
description: "Get started with the jQuery ContextMenu by Kendo UI and configure the animations of the widget."
slug: animations_kendoui_contextmenu
position: 3
---

# Animations

By default, the ContextMenu uses a slide animation to expand subitems on a mouse hover event.

Along with the animation style and delay, you can customize the animations by using the configuration properties of the Menu. You can also configure the Menu items to open on click instead of on hover. The ContextMenu can also be configured to use a different `open` event from the default `contextmenu` (right-click).

The following example demonstrates how to change ContextMenu animation and open behavior.

    <ul id="context-menu">
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
    <script>
        $("#context-menu").kendoContextMenu({
            animation: {
                open: { effects: "fadeIn" },
                duration: 500
            },
            showOn: "click"
        });
    </script>

## See Also

* [Basic Usage of the ContextMenu (Demo)](https://demos.telerik.com/kendo-ui/menu/context-menu)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
