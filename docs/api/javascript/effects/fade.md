---
title: FX Fade
res_type: api
---

# Fade

Fades the element in or out.
Supported directions are `in` and `out`.

#### Fading an element out
    <div id="foo">
        I will fade out
    </div>

    <script>
        kendo.fx($("#foo")).fade("out").play();
        // an alternative syntax would be
        // kendo.fx($("#foo")).fadeOut.play();
    </script>

#### Fading an element in

    <div id="foo">
        I will fade in
    </div>

    <script>
        kendo.fx($("#foo")).fade("in").play();
        // an alternative syntax would be
        // kendo.fx($("#foo")).fadeIn.play();
    </script>

## Constructor Parameters

### direction `String`

The direction of the effect. Accepted values are `"in"` or `"out"`. 

#### Example

    <div id="example">
        Direction example
    </div>
    <script>
    // Fade in
    kendo.fx($("#example")).fade("in").play();
    
    // Fade out
    kendo.fx($("#example")).fade("out").play();
    </script>

## Methods

### startValue

Sets the initial **opacity** value of the element. 
1 means the element will be fully opaque. 
0 means that the element will be fully transparent.

#### Example

    <div id="startExample">
        Start Value Example
    </div>
    <script>
    // Fade out starting from 75% opacity
    kendo.fx($("#startExample")).fade("out").startValue(0.75).play();
    </script>

#### Fading an element out, starting from 50%

    <div id="foo">
        Foo
    </div>

    <script>
        kendo.fx($("#foo")).fade("out").startValue(0.5).play();
    </script>


#### Parameters

##### value `Number`

the initial opacity value.

#### Returns

`Effect` The effect instance

### endValue

Sets the final **opacity** value of the element. 
1 means the element will be fully opaque. 
0 means that the element will be fully transparent.

#### Example

    <div id="endExample">
        End Value Example
    </div>
    <script>
    // Fade in to 25% opacity
    kendo.fx($("#endExample")).fade("in").endValue(0.25).play();
    </script>

#### Fading an element in to 50% opacity

    <div id="foo">
        Foo
    </div>

    <script>
        kendo.fx($("#foo")).fade("in").endValue(0.5).play();
    </script>


#### Parameters

##### value `Number`

the final opacity value.

#### Returns

`Effect` The effect instance
