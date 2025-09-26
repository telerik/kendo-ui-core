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


<div class="meta-api-description">
Configure the animation's entry direction to control whether an element slides in from the left, right, top, or bottom, specifying movement orientation for slide-in effects during instantiation. Enable setting slide directions such as left, right, up, or down to determine how an element animates into view, ideal for creating sliding entrances or directional motion in UI animations. Adjust or specify the movement vector of sliding animations at construction time to control where content appears from or moves toward, supporting various orientation strings to customize the slide-in effect directionality.
</div>

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

