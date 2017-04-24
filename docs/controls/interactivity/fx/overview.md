---
title: Overview
page_title: Overview | Kendo UI FX
description: "Learn how to create and set the Kendo UI Effects instances."
slug: overview_kendoui_fxeffects_widget
position: 1
---

# FX Overview

The [Kendo UI FX (Effects) instances](http://demos.telerik.com/kendo-ui/fx/expand) provide a rich, extensible, and performance-optimized toolset for element transitions.

Each effect utilizes CSS transitions if possible, with a fallback to manual property value modification in older browsers. To show and hide certain parts of the user interface (UI), you can also play animations in reverse. The Kendo UI FX utilizes the [jQuery Deferred utility](http://api.jquery.com/category/deferred-object/) for chaining and callbacks.

## Getting Started

### Initialize FX Instances

To create the Effect instances, use the `kendo.fx` jQuery selector wrapper. To create multiple effects, you can also use a single wrapper.

###### Example

    <div id="foo">
        I will be animated
    </div>

    <script>
        var effectWrapper = kendo.fx($("#foo"));
        var fadeOutEffect = effectWrapper.fadeOut();
        fadeOutEffect.play();
    </script>

You can compress the code from the previous example to a single line.

###### Example

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().play();
    </script>

## FX Library

Whenever possible, effects are hardware-accelerated through CSS transitions which makes them ideal for desktop and mobile devices. Unlike the CPU intensive JavaScript animations, animations done with CSS provide better frame rates and battery life.

Kendo UI supports the following effects:

- [FX Expand: API Reference](/api/javascript/effects/expand) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/expand)
- [FX Fade: API Reference](/api/javascript/effects/fade) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/fade)
- [FX Flip: API Reference](/api/javascript/effects/flip) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/flip)
- [FX PageTurn: API Reference](/api/javascript/effects/pageturn) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/pageturn)
- [FX SlideIn: API Reference](/api/javascript/effects/slidein) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/slidein)
- [FX Tile: API Reference](/api/javascript/effects/tile) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/tile)
- [FX Transfer: API Reference](/api/javascript/effects/transfer) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/transfer)
- [FX Zoom: API Reference](/api/javascript/effects/zoom) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/zoom)
- [FX Replace: API Reference](/api/javascript/effects/replace) and [Demo Example](http://demos.telerik.com/kendo-ui/fx/replace)

## Configuration

The Effects provide the following configuration options:

* [Specifying the direction of effects](#specify-direction)
* [Using composite effects](#use-composite-effects)

### Specify Direction

Most of the effects support several directions as shown in each respective [Kendo UI Effect demo page](http://demos.telerik.com/kendo-ui/fx/expand).

To determine the direction of the effects either:

* Specify the direction as the first parameter in the effect constructor method, or
* Call the constructor with a direction shortcut.

The following example demonstrates how to specify a direction for the desired effect. All three lines produce identical effect.

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

If the effects run on the same element, you can combine most of them.

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

If the effects run on different elements, use the [`jQuery.when`](http://api.jquery.com/jQuery.when/)) configuration.

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

* [Common FX JavaScript API Reference](/api/javascript/effects/common)
* [Replace Effects]({% slug replaceffect_fxeffects_widget %})
