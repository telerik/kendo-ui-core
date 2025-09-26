---
title: FX Zoom
res_type: api
---

# Zoom

Zoom the element in or out.
Supported directions are `in` and `out`.

#### Zooming an element in

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).zoom("out").play();
        // or
        // kendo.fx($("#foo")).zoomOut.play();
    </script>

#### Zooming an element out

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).zoom("out").play();
        // or
        // kendo.fx($("#foo")).zoomOut.play();
    </script>

## Constructor Parameters

### direction `String`

The direction of the effect. Accepted values are `"in"` or `"out"`.


<div class="meta-api-description">
Set or configure the zoom animation direction to control whether the effect expands by zooming in or contracts by zooming out, specifying movement preferences such as inward zoom or outward shrink, adjusting the zoom behavior on initialization, determining scaling transitions, toggling zoom growth or reduction, and enabling directional control for animation scaling from either closer or farther perspectives.
</div>

#### Example

    <div id="element">
        This element will zoom
    </div>

    <script>
        // Zoom in
        kendo.fx($("#element")).zoom("in").play();
        
        // Zoom out
        kendo.fx($("#element")).zoom("out").play();
    </script>

## Methods

### startValue

Sets the initial **scale** value of the element.
1 means the element will be displayed its real size.
2 means the element will be scaled twice.
0.1 (or less) means that the element will be zoomed out.


<div class="meta-api-description">
Configure the initial zoom scale factor to define how much an element is enlarged or reduced at the start of a zoom animation, allowing you to set, programmatically adjust, or initialize the starting magnification level with values where 1 represents actual size, values greater than 1 indicate zooming in or scaling up, and values less than 1 correspond to zooming out or scaling down, enabling precise control over the initial visual presentation, animation start point, or transformation magnitude for effects involving resizing, scaling, or zoom transitions on elements.
</div>

#### Example

    <div id="element">
        This element will start at 0.5 scale
    </div>

    <script>
        kendo.fx($("#element")).zoom("in").startValue(0.5).play();
    </script>

#### Zooming an element out, starting from 50%

    <div id="foo">
        Foo
    </div>

    <script>
        kendo.fx($("#foo")).zoom("out").startValue(0.5).play();
    </script>


#### Parameters

##### value `Number`

the initial scale value.

#### Returns

`Effect` The effect instance

### endValue

Sets the initial **scale** value of the element.
1 means the element will be displayed its real size.
2 means the element will be scaled twice.
0.1 (or less) means that the element will be zoomed out.


<div class="meta-api-description">
Set or adjust the numeric zoom scaling factor to define the element’s initial size during zoom animations, enabling precise control over zoom levels such as doubling size with scale 2, displaying original size at scale 1, or zooming out to smaller sizes like 0.1; configure, control, or customize zoom scale, magnification, scaling factor, or initial visual zoom to manage how much the element is enlarged or reduced when applying zoom effects.
</div>

#### Example

    <div id="element">
        This element will end at 2x scale
    </div>

    <script>
        kendo.fx($("#element")).zoom("in").endValue(2).play();
    </script>

#### Zooming an element in to 50% scale

    <div id="foo">
        Foo
    </div>

    <script>
        kendo.fx($("#foo")).zoom("in").endValue(0.5).play();
    </script>


#### Parameters

##### value `Number`

the final scale value.

#### Returns

`Effect` The effect instance

