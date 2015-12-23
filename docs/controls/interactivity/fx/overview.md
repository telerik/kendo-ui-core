---
title: Overview
page_title: Overview | Kendo UI FX
description: "Learn how to create and set the Kendo UI Effects instances."
slug: overview_kendoui_fxeffects_widget
position: 1
---

# FX Overview

The [Kendo UI FX (Effects) instances](http://demos.telerik.com/kendo-ui/fx/expand) provide a rich, extensible, and performance-optimized toolset for element transitions. Each effect utilizes CSS transitions if possible, with a fallback to manual property value modification in older browsers. Animations can be played in reverse, which is very convenient for showing and hiding certain parts of the user interface (UI). Kendo FX uitilizes the [jQuery Deffered utility](http://api.jquery.com/category/deferred-object/) for chaining and callbacks.

## Getting Started

### Initialize FX Instances

Kendo UI Effect instances are created through the `kendo.fx` jQuery selector wrapper, as demonstrated in the example below. A single wrapper can be used to create multiple effects.

###### Example

    <div id="foo">
        I will be animated
    </div>

    <script>
        var effectWrapper = kendo.fx($("#foo"));
        var fadeOutEffect = effectWrapper.fadeOut();
        fadeOutEffect.play();
    </script>

The code above can also be compressed to a single line.

###### Example

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().play();
    </script>

## Configuration

### Apply Available Effects

The Kendo UI FX library supports the following effects:

- [FX Expand: API Reference](/api/javascript/effects/expand) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/expand)
- [FX Fade: API Reference](/api/javascript/effects/fade) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/fade)
- [FX Flip: API Reference](/api/javascript/effects/flip) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/flip)
- [FX PageTurn: API Reference](/api/javascript/effects/pageturn) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/pageturn)
- [FX SlideIn: API Reference](/api/javascript/effects/slidein) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/slidein)
- [FX Tile: API Reference](/api/javascript/effects/tile) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/tile)
- [FX Transfer: API Reference](/api/javascript/effects/transfer) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/transfer)
- [FX Zoom: API Reference](/api/javascript/effects/zoom) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/zoom)
- [FX Replace: API Reference](/api/javascript/effects/replace) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/replace)

When possible, effects are hardware accelerated via CSS transitions, making them ideal for desktop and mobile devices. Unlike CPU intensive JavaScript animations, animations done with CSS can provide better frame-rates and battery life.

### Specify Direction

Most of the effects support several directions as shown in each respective [Kendo UI Effect demo page](http://demos.telerik.com/kendo-ui/fx/expand). Direction can be specified either as the first parameter in the effect constructor method, or by calling the constructor with direction shortcut.

The example below demonstrates how to specify a direction for the desired effect. Note that the three lines produce identical effects.

###### Example

    <div id="foo">
        I will be animated
    </div>

    <script>
        var fadeOut1 = kendo.fx($("#foo")).fadeOut();
        var fadeOut2 = kendo.fx($("#foo")).fade("out");
        var fadeOut3 = kendo.fx($("#foo")).fade().direction("out");

        //Call .play() to run any of the above animations
    </script>

### Use Composite Effects

Most of the effects can be combined, provided that they run on the same element, as demonstrated in the example below.

For running effects on different elements, use [`jQuery.when`](http://api.jquery.com/jQuery.when/)).

###### Example

    <div id="foo">
        I will be faded out and zoomed out.
    </div>

    <script>
        var effectWrapper = kendo.fx($("#foo"));
        var fadeOutEffect = effectWrapper.fadeOut();
        fadeOutEffect.add(effectWrapper.zoomOut());
        fadeOutEffect.play();
        // Calling reverse will zoom in and fade in.
    </script>

The example below works with multiple elements.

###### Example

    <div id="foo">
        I will fade out.
    </div>
    <div id="baz">
        I will also fade out.
    </div>

    <script>
        //Use jQuery Deferred to chain multiple effects
        var eleFoo = $("#foo"),
            eleBaz = $("#baz");

        $.when(kendo.fx(eleFoo).fadeOut().play(),
                    kendo.fx(eleBaz).fadeOut().play()).then(function(){
                //This will be called when both animations are done
                alert("Both elements faded!");
            });
    </script>

## See Also

Other articles on Kendo UI FX instances:

* [Common FX JavaScript API Reference](/api/javascript/effects/common)
* [Replace Effects]({% slug replaceffect_fxeffects_widget %})
