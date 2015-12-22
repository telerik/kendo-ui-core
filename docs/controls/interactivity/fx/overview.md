---
title: Overview
---
# Kendo UI FX Overview

Kendo UI FX provides a rich, extensible and performance-optimized toolset for element transitions.
Each effect utilizes CSS tranisions if possible, with a fallback to manual property value modification in older browsers. Animations can be played in reverse which is very convenient for showing and hiding certain parts of the UI.
Kendo FX uitilizes [jQuery Deffered utility](http://api.jquery.com/category/deferred-object/) for chaining/callbacks.

This document provides an overview of the Kendo UI FX library. [Please refer to the FX API docs for complete API details.](/api/framework/fx/common)

## Getting Started

Kendo UI Effect instances are created through the `kendo.fx` jQuery selector wrapper. A single wrapper can be used to create multiple effects.

    <div id="foo">
        I will be animated
    </div>

    <script>
        var effectWrapper = kendo.fx($("#foo"));
        var fadeOutEffect = effectWrapper.fadeOut();
        fadeOutEffect.play();
    </script>

The code above can also be compressed to a single line:

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).fadeOut().play();
    </script>

## Specifying Effect Direction

Most of the effects support several directions (check the respective effect page for details). Direction can be specified either as the first parameter in the effect constructor method, or by calling the constructor with direction shortcut.
The following three lines will produce identical effects:

    <div id="foo">
        I will be animated
    </div>

    <script>
        var fadeOut1 = kendo.fx($("#foo")).fadeOut();
        var fadeOut2 = kendo.fx($("#foo")).fade("out");
        var fadeOut3 = kendo.fx($("#foo")).fade().direction("out");

        //Call .play() to run any of the above animations
    </script>

## Composite effects

Most of the effects can be combined, provided that they run on the same element (for running effects on different elements, use [jQuery.when](http://api.jquery.com/jQuery.when/)).

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

Example working with multiple elements:

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

## Available Effects

The Kendo UI FX library currently supports the following effects:

- [Expand](/api/framework/fx/expand)
- [Fade](/api/framework/fx/fade)
- [Flip](/api/framework/fx/flip)
- [PageTurn](/api/framework/fx/pageturn)
- [SlideIn](/api/framework/fx/slidein)
- [Tile](/api/framework/fx/tile)
- [Transfer](/api/framework/fx/transfer)
- [Zoom](/api/framework/fx/zoom)
- [Replace](/api/framework/fx/replace)

When possible, effects are hardware accelerated via CSS transitions, making them ideal for desktop and mobile devices. Unlike CPU intensive JavaScript animations, animations done with CSS can provide better framerates and battery life.

