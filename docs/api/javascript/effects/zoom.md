---
title: FX Zoom
---

# Zoom

Zoom the element in or out.
Supported directions are `in` and `out`.

## Zooming an element in

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).zoom("out").play();
        // or
        // kendo.fx($("#foo")).zoomOut.play();
    </script>

## Zooming an element out

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

## Methods

### startValue

Sets the initial **scale** value of the element.
1 means the element will be displayed its real size.
2 means the element will be scaled twice.
0.1 (or less) means that the element will be zoomed out.

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

