---
title: FX Expand
res_type: api
---

# Expand

Expends the element from zero to its regular size.
Supported directions are `horizontal` and `vertical`.
Playing the effect in reverse will collapse the element to zero size and hide it.

#### Horizontal Expand Example

    <div id="foo" style="width:200px; height: 200px; background: red;">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).expand("horizontal").play();
        // an alternative syntax would be
        // kendo.fx($("#foo")).expandHorizontal().play();
    </script>

#### Vertical Expand Example

    <div id="foo" style="width:200px; height: 200px; background: red;">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).expand("vertical").play();
        // an alternative syntax would be
        // kendo.fx($("#foo")).expandVertical().play();
    </script>

## Constructor Parameters

### direction `String`

The direction in which the element will be expanded. Either `horizontal` or `vertical`.


<div class="meta-api-description">
How do I control the direction of expansion in Kendo UI effects? Control and configure the expansion animation axis by specifying whether the effect should grow or collapse horizontally or vertically, enabling smooth transitions that animate either the element’s width or height based on developer preference; set and customize expansion direction for UI components by choosing horizontal expansion to manipulate width or vertical expansion to adjust height, ensuring flexible layout animations along a single axis for expanding or collapsing interfaces.
</div>

#### Example

    <div id="element" style="width:200px; height: 200px; background: blue;">
        Element to expand
    </div>

    <script>
        // Expand horizontally
        kendo.fx($("#element")).expand("horizontal").play();
        
        // Or expand vertically
        // kendo.fx($("#element")).expand("vertical").play();
    </script>
