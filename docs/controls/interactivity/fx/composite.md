---
title: Composite Effects
page_title: jQuery FX Documentation | Composite Effects
description: "Get started with the jQuery FX by Kendo UI and use their composite effects."
slug: composite_kendoui_fxeffects
position: 3
---

# Composite Effects

Depending on the specific implementation of the effects, you can combine them.

The following example demonstrates how to combine effects which run on the same element.

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

The following example demonstrates how to combine effects which run on different elements by using the [`jQuery.when`](https://api.jquery.com/jQuery.when/) configuration.

    <div id="foo">
        I will fade out.
    </div>
    <div id="baz">
        I will also fade out.
    </div>

    <script>
        // Use the jQuery Deferred configuration to chain multiple effects.
        var eleFoo = $("#foo"),
            eleBaz = $("#baz");

        $.when(kendo.fx(eleFoo).fadeOut().play(),
                    kendo.fx(eleBaz).fadeOut().play()).then(function(){
                // This will be called when both animations are completed.
                alert("Both elements faded!");
            });
    </script>

## See Also

* [Basic Usage of FX (Demo)](https://demos.telerik.com/kendo-ui/fx/expand)
* [JavaScript API Reference of FX](/api/javascript/effects/common)
