---
title: Getting Started
page_title: jQuery FX Documentation - Getting Started with the FX
description: "Get started with the jQuery FX by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_fx_component
position: 2
---

# Getting Started with the FX

This guide demonstrates how to get up and running with the Kendo UI for jQuery FX.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
<div id="foo">
    I will be faded out and zoomed out.
</div>

<script>
    var effectWrapper = kendo.fx($("#foo"));
    var fadeOutEffect = effectWrapper.fadeOut();
    fadeOutEffect.add(effectWrapper.zoomOut());
    fadeOutEffect.play();
</script>
```

## 1. Create the FX instance

To create the FX instances, use the jQuery `kendo.fx` selector wrapper.

```html
<div id="foo">
    I will be animated
</div>

<script>
    var effectWrapper = kendo.fx($("#foo"));
</script>
```

Once the basic initialization is completed, you can start applying effects to the FX. 

## 2. Apply Effects

In this step, you will apply the [`fadeOut`](/api/javascript/effects/fade) and the [`zoomOut`](/api/javascript/effects/zoom) effects.

```dojo
<div id="foo">
    I will be animated
</div>

<script>
    var effectWrapper = kendo.fx($("#foo"));
    var fadeOutEffect = effectWrapper.fadeOut(); // Apply fade out effect.
    fadeOutEffect.add(effectWrapper.zoomOut()); // Apply zoom out effect.
</script>
```
See the [FX API reference](/api/javascript/effects/common) for more available effects.

## 3. Play Effects

In this step, you will play the effects.

```dojo
<div id="foo">
    I will be faded out and zoomed out.
</div>

<script>
    var effectWrapper = kendo.fx($("#foo"));
    var fadeOutEffect = effectWrapper.fadeOut();
    fadeOutEffect.add(effectWrapper.zoomOut());
    fadeOutEffect.play(); // Play the effects.
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the FX](https://docs.telerik.com/kendo-ui/controls/fx/overview)

## See Also 

* [JavaScript API Reference of the FX](/api/javascript/effects/common)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>
