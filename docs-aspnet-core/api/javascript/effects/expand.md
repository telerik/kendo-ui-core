---
title: FX Expand
---

# Expand

Expends the element from zero to its regular size.
Supported directions are `horizontal` and `vertical`.
Playing the effect in reverse will collapse the element to zero size and hide it.

## Horizontal Expand Example

    <div id="foo" style="width:200px; height: 200px; background: red;">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).expand("horizontal").play();
        // an alternative syntax would be
        // kendo.fx($("#foo")).expandHorizontal().play();
    </script>

## Vertical Expand Example

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
