---
title: "effects "
page_title: API reference for Kendo UI Effects
res_type: api
component: effects
---

# kendo.effects

Collection of effects/animation related utilities.

## Methods

### box
Calculates the offset and dimensions of the given element


<div class="meta-api-description">
How do I get an element's precise position and dimensions using the box effect in Kendo UI? Calculate or retrieve an element’s precise position, offset, width, height, and bounding box dimensions for layout adjustments, coordinate computations, animation timing, and dynamic placement control by measuring its rendered size and location, enabling developers to get exact metrics for positioning, sizing, animation anchors, or responsive design calculations within effects or UI transformations.
</div>

#### Parameters

##### element `HTMLElement`
The element to calculate dimensions for.

#### Returns
`Object` An object with top, left, width and height fields in pixels.

#### Example
    <div id="foo" style="position: absolute; top:10px; left: 10px; height: 200px; width: 200px"></div>
    <script>
        var fooBox = kendo.effects.box($("#foo"));
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(fooBox); // { top: 10, left: 10, width: 200, height: 200 }
    </script>


### fillScale
Determines the fill scale factor based on two elements' boxes.


<div class="meta-api-description">
How to calculate the scale factor to resize an element to fit within another's bounding box in Kendo UI for jQuery? Calculate the scale factor to resize one element so it completely fills another's bounding box, determine the numeric ratio between widths and heights of two objects, compute the uniform scaling value to stretch or shrink an element to fit within or cover another element’s dimensions, obtain the single scalar multiplier for transform or resize operations based on bounding box comparisons, control image or object scaling for containment or coverage by measuring size proportions and aspect ratios, configure scale calculations for responsive design or dynamic sizing to ensure proper fill without distortion.
</div>

#### Parameters

##### firstElement`HTMLElement`
The first element.

##### secondElement`HTMLElement`
The second element.

#### Returns
`Number` The fill scale for the two elements.

#### Example
    <div id="foo" style="position: absolute; top:10px; left: 10px; height: 200px; width: 200px"></div>
    <div id="bar" style="position: absolute; top:10px; left: 10px; height: 100px; width: 50px"></div>
    <script>
        var fooBox = kendo.effects.box($("#foo"));
        var barBox = kendo.effects.box($("#bar"));

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.effects.fillScale(barBox, fooBox)); // 0.25;
    </script>

### fitScale
Determines the fit scale factor based on two elements' boxes.


<div class="meta-api-description">
How do I calculate the scale factor to resize an element to fit inside another container while maintaining its aspect ratio? Calculate or determine the scale factor to resize an element to fit perfectly inside another while maintaining aspect ratio by comparing bounding boxes or rectangles; find the multiplier needed to scale down or up an object so it fits within a target container or boundary, enabling responsive resizing, proportional scaling, aspect ratio preservation, element transformation, or sizing adjustments based on container dimensions or box comparisons; obtain numeric scaling values for adjusting size, fitting content, or configuring transformations that keep visual proportions intact when fitting one shape, image, or component inside another.
</div>

#### Parameters

##### firstElement`HTMLElement`
The first element.

##### secondElement`HTMLElement`
The second element.

#### Returns
`Number` The fit scale for the two elements.

#### Example

    <div id="foo" style="position: absolute; top:10px; left: 10px; height: 200px; width: 200px"></div>
    <div id="bar" style="position: absolute; top:10px; left: 10px; height: 100px; width: 50px"></div>
    <script>
        var fooBox = kendo.effects.box($("#foo"));
        var barBox = kendo.effects.box($("#bar"));

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.effects.fitScale(barBox, fooBox)); // 0.5;
    </script>

### transformOrigin
Determines the transform origin point based on two elements' boxes. The method is primarily used in zoom/transfer effects.


<div class="meta-api-description">
How do I set the transform origin for scaling animations in Kendo UI? Calculate or set the pivot point for animations involving scaling, zooming, or movement by determining the transform origin based on comparing bounding rectangles of source and target elements; control where zoom or translate effects anchor, customize animation focal points, align transitions precisely between elements, and compute coordinates for CSS transform-origin to ensure smooth and accurate visual effects during element transformations or motion.
</div>

#### Parameters

##### firstElement`HTMLElement`
The first element.

##### secondElement`HTMLElement`
The second element.

#### Returns
`Object` An object with x and y fields that represent the transform origin point.

#### Example

    <div id="foo" style="position: absolute; top:10px; left: 10px; height: 200px; width: 200px; border: 1px solid red;">foo</div>
    <div id="bar" style="position: absolute; top:60px; left: 60px; height: 100px; width: 100px; border: 1px solid blue;">bar</div>
    <script>
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(kendo.effects.transformOrigin(kendo.effects.box("#bar"), kendo.effects.box("#foo"))); // x: 101, y: 101
    </script>

