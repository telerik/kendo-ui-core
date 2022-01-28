---
title: Animations
page_title: jQuery PanelBar Documentation | Animations
description: "Get started with the jQuery PanelBar by Kendo UI and control its animations."
slug: animations_kendoui_panelbar
position: 4
---

# Animations

By default, the PanelBar uses animations to expand and reveal its subitems when an item header is clicked.

You can modify these animations through the `open` and `close` animation properties. You can also configure the PanelBar to render a single opened panel at a time.

The following example demonstrates how to change the PanelBar animation and its `expandMode` behavior.

    <ul id="panelbar"></ul>

    <script>
        $("#panelBar").kendoPanelBar({
            animation: {
                open : { effects: "fadeIn" }
            },
            expandMode: "single"
        });
    </script>

## See Also

* [Using Animations in the PanelBar (Demo)](https://demos.telerik.com/kendo-ui/panelbar/animation)
* [JavaScript API Reference of the PanelBar](/api/javascript/ui/panelbar)
