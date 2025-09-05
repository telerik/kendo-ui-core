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

