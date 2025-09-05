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

