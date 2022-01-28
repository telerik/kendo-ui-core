---
title: Direction
page_title: jQuery FX Documentation | Direction
description: "Get started with the jQuery FX by Kendo UI and set the direction of the animation effects."
slug: direction_kendoui_fxeffects
position: 2
---

# Direction

Most of the Kendo UI effects support a set of various directions.

To determine the direction of the effects, use either of the following approaches:
* Specify the direction as the first parameter in the effect constructor method.
* Call the constructor with a direction shortcut.

The following example demonstrates how to specify a direction for the desired effect. All three lines produce an identical effect.

    <div id="foo">
        I will be animated
    </div>

    <script>
        var fadeOut1 = kendo.fx($("#foo")).fadeOut();
        var fadeOut2 = kendo.fx($("#foo")).fade("out");
        var fadeOut3 = kendo.fx($("#foo")).fade().direction("out");

        // Call .play() to run any of the above animations.
    </script>

## See Also

* [Basic Usage of FX (Demo)](https://demos.telerik.com/kendo-ui/fx/expand)
* [JavaScript API Reference of FX](/api/javascript/effects/common)
