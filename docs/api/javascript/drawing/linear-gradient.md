---
title: LinearGradient
page_title: API reference for Kendo UI Drawing API LinearGradient
res_type: api
---

# kendo.drawing.LinearGradient : kendo.drawing.Gradient

Represents a linear color gradient.

#### Example - creating a linear gradient

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0], // Left, top
        end: [1, 1],   // Bottom, right
        stops: [{
          offset: 0,
          color: "#f00",
          opacity: 0
        }, {
          offset: 1,
          color: "#f00",
          opacity: 0.8
        }]
      });

      var rect = new geom.Rect([
        // Origin X, Y
        0, 0
      ], [
        // Width, height
        100, 50
      ]);

      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Constructor Parameters

### options `Object`
The configuration of this LinearGradient.


<div class="meta-api-description">
Configure and control the linear gradient effect by specifying gradient parameters such as color stops, offset positions, angles or direction, and transparency levels during initialization. Enable custom gradient setups by providing a detailed configuration object that defines colors, their placements, opacity settings, and the orientation or angle of the gradient for precise rendering in drawing components. Set, customize, and fine-tune linear gradient properties upfront to achieve specific visual transitions, smooth color blending, and directional shading effects in graphic or drawing contexts. Adjust gradient stops, their offsets, and the overall gradient direction or opacity to tailor background fills, overlays, or shapes with linear color progressions when creating or instantiating linear gradients.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var options = {
        start: [0, 0],
        end: [1, 0],
        stops: [{
          offset: 0,
          color: "#0066cc"
        }, {
          offset: 1,
          color: "#66ccff"
        }]
      };

      var gradient = new draw.LinearGradient(options);
      var rect = new geom.Rect([10, 10], [200, 100]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: null
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Configuration

### stops `Array`
The color stops of the gradient.
Can contain either plain objects or [GradientStop](/api/javascript/drawing/gradient-stop) instances.


<div class="meta-api-description">
Configure the sequence and positioning of colors within a linear gradient by specifying an array of color stops, each defining a particular color and its relative position along the gradient axis. Control smooth or sharp transitions between colors, manage gradient color points as objects or gradient stop instances, set precise offsets for gradual blending effects, and customize the overall gradient flow and appearance by ordering or adjusting multiple colors along the linear path. Enable fine-tuned color segmentation, step changes, or seamless fades in linear color gradients, suitable for gradient backgrounds, buttons, or vector graphics styling.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0],
        end: [1, 1],
        stops: [
          { offset: 0, color: "#ff0000", opacity: 1 },
          { offset: 0.5, color: "#ffff00", opacity: 0.8 },
          { offset: 1, color: "#00ff00", opacity: 0.6 }
        ]
      });

      var rect = new geom.Rect([10, 10], [200, 100]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: { color: "#000000", width: 2 }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Fields

### stops `Array`
The array of gradient color stops.
Contains [GradientStop](/api/javascript/drawing/gradient-stop) instances.


<div class="meta-api-description">
Configure and control the sequence of color points in a linear gradient by setting, updating, adding, removing, or rearranging color stop positions and corresponding colors to manipulate how colors blend and transition smoothly along a gradient axis; define precise color anchors, customize gradient segments, adjust color interpolation stops, and manage an ordered collection of color markers to achieve desired visual effects with gradient stops.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0],
        end: [1, 0],
        stops: [
          { offset: 0, color: "#333333" },
          { offset: 1, color: "#cccccc" }
        ]
      });

      // Access the stops field
      console.log("Number of stops:", gradient.stops.length);
      console.log("First stop color:", gradient.stops[0].color());

      var rect = new geom.Rect([10, 10], [200, 80]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: null
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Methods

### addStop
Adds a color stop to the gradient.
Inherited from [Gradient.addStop](/api/javascript/drawing/gradient/methods/addstop)


<div class="meta-api-description">
Add or insert color stops in a linear gradient to control the exact positions and sequencing of colors within a gradient fill, enabling precise customization of color blending, smooth or sharp transitions, multi-stop color arrangements, and detailed gradient shaping for drawing or rendering graphics. This method is useful for configuring gradient color points, adjusting interpolation between colors, layering multiple color stops, setting gradient transition stops in order, and fine-tuning visual effects in vector or canvas-based drawing contexts.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0],
        end: [1, 0],
        stops: [
          { offset: 0, color: "#ff0000" },
          { offset: 1, color: "#0000ff" }
        ]
      });

      gradient.addStop(0.5, "#ffff00", 0.8);
      var newStop = gradient.stops[2];
      console.log("Added stop at offset:", newStop.options.offset);

      var rect = new geom.Rect([10, 10], [200, 80]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: null
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### offset `Number`

##### color `String`
The color of the stop.

##### opacity `Number`
The fill opacity.

#### Returns
`kendo.drawing.GradientStop` The new gradient color stop.


### end
Gets or sets the end point of the gradient.


<div class="meta-api-description">
Control or modify the direction and endpoint coordinates of a linear gradient by retrieving or setting its termination point to adjust gradient orientation, animate smooth color transitions, dynamically update gradient geometry, programmatically calculate layout boundaries based on gradient end positions, or customize the flow and angle of color blending in drawing or UI components.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0],
        end: [1, 0],
        stops: [
          { offset: 0, color: "#ff6600" },
          { offset: 1, color: "#ffcc00" }
        ]
      });

      // Get the current end point
      console.log("Current end point:", gradient.end());

      // Change the end point to create a vertical gradient
      gradient.end([0, 1]);
      console.log("New end point:", gradient.end());

      var rect = new geom.Rect([10, 10], [150, 150]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: { color: "#000000", width: 1 }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### end `Array|kendo.geometry.Point`
The end point of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Returns
`kendo.geometry.Point` The current end point of the gradient.


### start
Gets or sets the start point of the gradient.


<div class="meta-api-description">
Control, configure, or set the starting position or origin coordinates of a linear gradient fill or background, adjust where the gradient begins on a component or element, retrieve or modify the initial point from which gradient color transitions originate, enable precise starting point placement for CSS, design, or animation workflows, dynamically update or read gradient origin values during rendering, customize the gradient’s beginning location to affect visual flow or directional color blending, define or get the coordinates for the gradient start to influence how colors fade, reposition the linear gradient’s start point programmatically for responsive or interactive designs, manage or animate the entry point of color gradients in graphics or UI elements with fine control over initial coordinates.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0],
        end: [1, 1],
        stops: [
          { offset: 0, color: "#009900" },
          { offset: 1, color: "#66ff66" }
        ]
      });

      // Get the current start point
      console.log("Current start point:", gradient.start());

      // Change the start point to start from center
      gradient.start([0.5, 0.5]);
      console.log("New start point:", gradient.start());

      var rect = new geom.Rect([10, 10], [180, 120]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: { color: "#006600", width: 2 }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### start `Array|kendo.geometry.Point`
The start point of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Returns
`kendo.geometry.Point` The current start point of the gradient.


### removeStop
Removes a color stop from the gradient.
Inherited from [Gradient.removeStop](/api/javascript/drawing/gradient/methods/removestop)


<div class="meta-api-description">
delete or remove specific color stops from a linear gradient sequence in drawing or styling components, enabling dynamic modification of gradient color transitions, stops, entries, or fills at runtime; control and update gradient definitions programmatically by eliminating one or more gradient points to customize visual appearance, adjust color distributions, and refine fill effects during execution or after initialization without recreating the entire gradient structure.
</div>

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.LinearGradient({
        start: [0, 0],
        end: [1, 0],
        stops: [
          { offset: 0, color: "#ff0000" },
          { offset: 0.5, color: "#ffff00" },
          { offset: 1, color: "#0000ff" }
        ]
      });

      console.log("Initial stops count:", gradient.stops.length);

      // Remove the middle stop
      var middleStop = gradient.stops[1];
      gradient.removeStop(middleStop);
      console.log("Stops count after removal:", gradient.stops.length);

      var rect = new geom.Rect([10, 10], [200, 80]);
      var path = draw.Path.fromRect(rect, {
        fill: gradient,
        stroke: null
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### stop `kendo.drawing.GradientStop`
The gradient color stop to remove.