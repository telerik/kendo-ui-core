---
title: Gradient
page_title: API reference for Kendo UI Drawing API Gradient
res_type: api
---

# kendo.drawing.Gradient : kendo.Class

An abstract base class representing common members of all gradients.

## Constructor Parameters

### options `Object`
The configuration of this gradient.


<div class="meta-api-description">
How to set gradient options for Kendo UI drawingapi? Configure and set up gradient visual styles and parameters during creation by passing a configuration object that controls gradient color stops, directions, transitions, blending modes, and other gradient properties for drawing or rendering components. Enable defining initial gradient attributes such as colors, opacity, stops, angles, and spread methods right at instantiation to customize and initialize gradients with desired appearance settings, supporting use cases like linear, radial, or conic gradient setups through constructor parameters. Adjust, customize, or control gradient behavior and appearance when creating graphic or canvas elements by specifying all relevant options in one configuration input.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var linearGradient = new draw.LinearGradient({
        stops: [
            { offset: 0, color: "#ff0000", opacity: 1 },
            { offset: 1, color: "#0000ff", opacity: 1 }
        ]
    });
    var surface = draw.Surface.create($("#surface"));
    var rect = new draw.Rect(new geom.Rect([10, 10], [100, 50]), {
        fill: linearGradient
    });
    surface.draw(rect);
    </script>

## Configuration

### stops `Array`
The color stops of the gradient.
Can contain either plain objects or [GradientStop](/api/javascript/drawing/gradient-stop) instances.


<div class="meta-api-description">
How to reorder color stops in a Kendo UI gradient effect? Configure and manage the color stops within a gradient effect, enabling you to set, update, reorder, customize, or define the exact positions and colors that create smooth or complex transitions in backgrounds, fills, or shading. Control gradient points by modifying the collection of color markers, whether using simple color objects or specialized stop instances, to adjust blending, intensity, placement, and order of multiple hues for precise gradient design and visual styling. Adjust color transitions, change stop locations, rearrange stop sequence, or insert new colors to tailor gradients for UI components, graphics, or any visual element requiring dynamic color blending.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var radialGradient = new draw.RadialGradient({
        stops: [
            { offset: 0, color: "#ffff00", opacity: 1 },
            { offset: 0.5, color: "#ff8000", opacity: 0.8 },
            { offset: 1, color: "#ff0000", opacity: 0.6 }
        ]
    });
    var surface = draw.Surface.create($("#surface"));
    var circle = new draw.Circle(new geom.Circle([60, 60], 40), {
        fill: radialGradient
    });
    surface.draw(circle);
    </script>

## Fields

### stops `Array`
The array of gradient color stops.
Contains [GradientStop](/api/javascript/drawing/gradient-stop) instances.


<div class="meta-api-description">
How do I reorder color stops in a Kendo UI gradient? Control and customize the sequence of color stops that define smooth or dramatic color transitions in gradients by adding, removing, reordering, or iterating through an array of stop points representing color and position pairs; configure how colors blend across the gradient by managing these intermediate points dynamically at runtime or for editing and serialization purposes, enabling precise adjustment of gradient shading, color distribution, and visual effects for backgrounds, fills, or UI elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var linearGradient = new draw.LinearGradient({
        stops: [
            { offset: 0, color: "#00ff00", opacity: 1 },
            { offset: 1, color: "#0000ff", opacity: 1 }
        ]
    });
    
    // Access the stops field
    console.log("Number of stops:", linearGradient.stops.length);
    Array.from(linearGradient.stops).forEach(function(stop, index) {
        console.log("Stop " + index + ":", stop.offset, stop.color, stop.opacity);
    });
    
    var surface = draw.Surface.create($("#surface"));
    var rect = new draw.Rect(new geom.Rect([10, 10], [80, 40]), {
        fill: linearGradient
    });
    surface.draw(rect);
    </script>

### options `kendo.drawing.OptionsStore`
The configuration options of the gradient.


<div class="meta-api-description">
How do I customize gradient settings in Kendo UI for jQuery drawingapi? Adjust and customize gradient settings including gradient type selection like linear or radial, editing color stops and their positions or offsets, controlling spread methods and applying transforms to modify orientation or scale. Enable dynamic gradient configuration after initialization, access serialization-ready properties for rendering pipelines, and fine-tune visual gradient parameters within drawing components by reading or updating options that govern gradient appearance, transitions, layout, stops, and transformation effects for graphics rendering and UI design.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var linearGradient = new draw.LinearGradient({
        stops: [
            { offset: 0, color: "#ff0080", opacity: 1 },
            { offset: 1, color: "#8000ff", opacity: 1 }
        ]
    });
    
    // Access the options field
    console.log("Gradient options:", linearGradient.options);
    console.log("Options type:", typeof linearGradient.options);
    
    var surface = draw.Surface.create($("#surface"));
    var rect = new draw.Rect(new geom.Rect([10, 10], [100, 30]), {
        fill: linearGradient
    });
    surface.draw(rect);
    </script>

## Methods

### addStop
Adds a color stop to the gradient.


<div class="meta-api-description">
How do I add color stops to a gradient in Kendo UI for jQuery? Add or insert color stops at specific positions within a gradient to control the color transitions and smooth interpolation across fills, configure gradient color points dynamically by specifying colors and offsets, update or build color gradients with precise stop placements, set intermediate colors along a gradient path for visual effects, manage or modify gradient stops composition for seamless blending between colors, define color markers in gradients to achieve smooth color shifts, customize gradient fill transitions by adding or adjusting color points, control gradient shading by positioning stops with designated colors and offsets, fine-tune color interpolation in gradients through incremental stop additions, manipulate gradient color stops for dynamic and interactive visual styling.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var linearGradient = new draw.LinearGradient({
        stops: [
            { offset: 0, color: "#ff0000", opacity: 1 },
            { offset: 1, color: "#0000ff", opacity: 1 }
        ]
    });
    
    linearGradient.addStop(0.5, "#ffff00", 0.8);
    var newStop = linearGradient.stops[2];
    console.log("Added stop:", newStop.options.offset, newStop.options.color, newStop.options.opacity);
    
    var surface = draw.Surface.create($("#surface"));
    var rect = new draw.Rect(new kendo.geometry.Rect([10, 10], [120, 50]), {
        fill: linearGradient
    });
    surface.draw(rect);
    </script>

#### Parameters

##### offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

##### color `String`
The color in any of the following formats.

| Format | Description |
| :--- | ---: |
| red | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name |
| #ff0000 | Hex RGB value |
| rgb(255, 0, 0) | RGB value |

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

##### opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`kendo.drawing.GradientStop` The new gradient color stop.


### removeStop
Removes a color stop from the gradient.


<div class="meta-api-description">
How to dynamically remove a specific color stop from a Kendo UI gradient definition? Remove or delete a specific color stop from a gradient definition to dynamically modify gradients in drawings, adjust or update gradient stop collections at runtime, eliminate particular color points or stops from gradients affecting shapes, control gradient color transitions by removing stops, and enable changing or configuring gradients by deleting existing color stops for real-time visual updates and customization in graphic rendering.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var linearGradient = new draw.LinearGradient({
        stops: [
            { offset: 0, color: "#ff0000", opacity: 1 },
            { offset: 0.5, color: "#00ff00", opacity: 1 },
            { offset: 1, color: "#0000ff", opacity: 1 }
        ]
    });
    
    console.log("Initial stops count:", linearGradient.stops.length);
    
    // Remove the middle stop
    var middleStop = linearGradient.stops[1];
    linearGradient.removeStop(middleStop);
    
    console.log("Stops count after removal:", linearGradient.stops.length);
    
    var surface = draw.Surface.create($("#surface"));
    var rect = new draw.Rect(new geom.Rect([10, 10], [100, 40]), {
        fill: linearGradient
    });
    surface.draw(rect);
    </script>

#### Parameters

##### stop `kendo.drawing.GradientStop`
The gradient color stop to remove.

