---
title: FX SlideIn
res_type: api
---

# SlideIn

Slides the element to its original position in the specified direction, using the element width or height as an offset.
Playing the effect in reverse will slide the element out of its position.

#### Sliding an element in

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).slideIn("left").play();
        // or
        // kendo.fx($("#foo")).slideInLeft.play();
    </script>

## Constructor Parameters

### direction

The direction to which the sliding will occur.  Supported directions are `left`, `right`, `up` and `down`.

#### Example

    <div id="foo">
        I will slide in from different directions
    </div>

    <script>
        // Slide in from left
        kendo.fx($("#foo")).slideIn("left").play();
        
        // Slide in from right
        // kendo.fx($("#foo")).slideIn("right").play();
        
        // Slide in from up
        // kendo.fx($("#foo")).slideIn("up").play();
        
        // Slide in from down
        // kendo.fx($("#foo")).slideIn("down").play();
    </script>

## Sliding an element up

    <div id="foo">
        I will be animated
    </div>

    <script>
        kendo.fx($("#foo")).slideIn("up").play();
    </script>

