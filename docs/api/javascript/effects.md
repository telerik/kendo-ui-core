---
title: effects
page_title: API reference for Kendo UI Effects
---

# kendo.effects

Collection of effects/animation related utilities.

## Methods

### box
Calculates the offset and dimensions of the given element

#### Parameters

##### element `HTMLElement`
The element to calculate dimensions for.

#### Returns
`Object` An object with top, left, width and height fields in pixels.

#### Example
    <div id="foo" style="position: absolute; top:10px; left: 10px; height: 200px; width: 200px"></div>
    <script>
        var fooBox = kendo.effects.box($("#foo"));
        console.log(fooBox); // { top: 10, left: 10, width: 200, height: 200 }
    </script>


### fillScale
Determines the fill scale factor based on two elements' boxes.

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

        console.log(kendo.effects.fillScale(barBox, fooBox)); // 0.25;
    </script>

### fitScale
Determines the fit scale factor based on two elements' boxes.

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

        console.log(kendo.effects.fitScale(barBox, fooBox)); // 0.5;
    </script>

### transformOrigin
Determines the transform origin point based on two elements' boxes. The method is primarily used in zoom/transfer effects.

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
        console.log(kendo.effects.transformOrigin(kendo.effects.box("#bar"), kendo.effects.box("#foo"))); // x: 101, y: 101
    </script>

