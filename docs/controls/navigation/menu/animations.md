---
title: Animations
page_title: jQuery Menu Documentation | Animations
description: "Get started with the jQuery Menu by Kendo UI and configure the animations of the widget."
slug: animations_kendoui_menu
position: 3
---

# Animations

By default, the Menu uses a slide animation to expand its subitems when the user hovers with the mouse.

Along with the animation style and delay, you can customize the animations by using the configuration properties of the Menu. You can also configure the Menu items to open on click instead of on hover.

The following example demonstrates how to change Menu animation and open behavior.

    <ul id="menu"></ul>

    <script>
        $("#menu").kendoMenu({
            animation: {
                open: { effects: "fadeIn" },
                duration: 500
            },
            openOnClick: true
        });
    </script>

## See Also

* [Using Animations in the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/animation)
* [JavaScript API Reference of the Menu](/api/javascript/ui/menu)
