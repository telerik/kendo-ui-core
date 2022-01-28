---
title: Overview
page_title: jQuery FX Documentation | FX Overview
description: "Get started with the jQuery FX by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_fxeffects_widget
position: 1
---

# FX Overview

The Kendo UI FX (Effects) instances provide a rich, extensible, and performance-optimized toolset for element transitions.

Kendo UI supports the following effects:
- [FX Expand API Reference](/api/javascript/effects/expand) and [Demo](https://demos.telerik.com/kendo-ui/fx/expand)
- [FX Fade API Reference](/api/javascript/effects/fade) and [Demo](https://demos.telerik.com/kendo-ui/fx/fade)
- [FX Flip API Reference](/api/javascript/effects/flip) and [Demo](https://demos.telerik.com/kendo-ui/fx/flip)
- [FX PageTurn API Reference](/api/javascript/effects/pageturn) and [Demo](https://demos.telerik.com/kendo-ui/fx/pageturn)
- [FX SlideIn API Reference](/api/javascript/effects/slidein) and [Demo](https://demos.telerik.com/kendo-ui/fx/slidein)
- [FX Tile API Reference](/api/javascript/effects/tile) and [Demo](https://demos.telerik.com/kendo-ui/fx/tile)
- [FX Transfer API Reference](/api/javascript/effects/transfer) and [Demo](https://demos.telerik.com/kendo-ui/fx/transfer)
- [FX Zoom API Reference](/api/javascript/effects/zoom) and [Demo](https://demos.telerik.com/kendo-ui/fx/zoom)
- [FX Replace API Reference](/api/javascript/effects/replace) and [Demo](https://demos.telerik.com/kendo-ui/fx/replace)

Whenever possible, effects are hardware-accelerated through CSS transitions which makes them ideal for desktop and mobile devices. Unlike the CPU intensive JavaScript animations, animations that are implemented with CSS provide better frame rates and battery life. To show and hide certain parts of the user interface (UI), you can also play animations in reverse. For chaining and callbacks, the Kendo UI FX utilizes the [jQuery Deferred utility](https://api.jquery.com/category/deferred-object/).

* [Demo page for FX](https://demos.telerik.com/kendo-ui/fx/expand)

## Initializing FX Instances

To create the FX instances, use the jQuery `kendo.fx` selector wrapper. To create multiple effects, you can also use a single wrapper.

    <div id="foo">
        I will be animated
    </div>

    <script>
        var effectWrapper = kendo.fx($("#foo"));
        var fadeOutEffect = effectWrapper.fadeOut();
        fadeOutEffect.play();
    </script>

You can compress the code from the previous example to a single line.

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().play();
    </script>

## Functionality and Features

* [Direction]({% slug direction_kendoui_fxeffects %})
* [Composite effects]({% slug composite_kendoui_fxeffects %})
* [Animated transitions]({% slug replaceffect_fxeffects_widget %})

## See Also

* [Basic Usage of FX (Demo)](https://demos.telerik.com/kendo-ui/fx/expand)
* [JavaScript API Reference of FX](/api/javascript/effects/common)
