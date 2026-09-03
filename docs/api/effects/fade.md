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


<div class="meta-api-description">
How do I set the fade direction in Kendo UI effects to make content appear or disappear smoothly? Set the fade animation to transition content either inward by fading in or outward by fading out, controlling the visual appearance direction during the effect application, with options to configure fade orientation explicitly as “in” for appearing content or “out” for disappearing elements. This parameter enables customizing animation flow, adjusting transitions from transparent to visible or visible to transparent states, and specifying whether elements should smoothly emerge or vanish in interface interactions. Use this to manage fade timing direction, toggle fade in/out effects, and define how UI components animate visibility changes during rendering or interaction sequences.
</div>

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


<div class="meta-api-description">
How do I set the initial opacity level for a fade-in animation in Kendo UI effects? Set or configure the initial opacity level, starting transparency, or alpha channel value for fade-in or fade-out animations by defining a numeric opacity between fully transparent (0) and fully opaque (1); control how an element's fade animation begins by specifying the starting fade alpha, initial visibility, or CSS opacity value to customize or initialize the beginning state of a fade effect, enabling precise control over the fade animation's opacity starting point for animations that smoothly transition element transparency.
</div>

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


<div class="meta-api-description">
How to set the final opacity level for a fade effect in Kendo UI? Set or adjust the final opacity level, transparency endpoint, or last fade value for animations that gradually change an element’s visibility, controlling how opaque or transparent the element appears at the end of a fade effect. Configure the ending transparency by defining a numeric fade-out or fade-in target between fully visible (1) and fully invisible (0), fine-tuning the last alpha value or final visibility percentage for user interface elements or animated transitions. This enables precise control over the concluding opacity state during animated fade sequences, letting you customize or override the ultimate transparency achieved by fade animations.
</div>

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
