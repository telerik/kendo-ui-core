---
title: RadialGradient
page_title: API reference for Kendo UI Drawing API RadialGradient
res_type: api
---

# kendo.drawing.RadialGradient : kendo.drawing.Gradient

Represents a radial color gradient.

#### Example - creating a radial gradient

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        // Center and radius are relative to shape size
        center: [ 0.75, 0.5 ],
        radius: 0.5,
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
The configuration of this RadialGradient.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var options = {
        center: [0.5, 0.5],
        radius: 0.8,
        stops: [
          { offset: 0, color: "#ff0000", opacity: 1 },
          { offset: 0.5, color: "#00ff00", opacity: 0.8 },
          { offset: 1, color: "#0000ff", opacity: 0.6 }
        ]
      };

      var gradient = new draw.RadialGradient(options);

      var rect = new geom.Rect([0, 0], [120, 80]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Configuration

### center `Array|kendo.geometry.Point`
The center of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.2, 0.8], // Near bottom-left corner
        radius: 0.6,
        stops: [
          { offset: 0, color: "#ffff00", opacity: 1 },
          { offset: 1, color: "#ff8800", opacity: 0.3 }
        ]
      });

      var rect = new geom.Rect([0, 0], [150, 100]);
      var path = draw.Path.fromRect(rect, {
        stroke: { color: "#ccc", width: 1 },
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

### radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.5, 0.5],
        radius: 0.3, // Small radius for concentrated gradient
        stops: [
          { offset: 0, color: "#00ffff", opacity: 1 },
          { offset: 1, color: "#0088ff", opacity: 0.2 }
        ]
      });

      var rect = new geom.Rect([0, 0], [120, 120]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

### stops `Array`
The color stops of the gradient.
Can contain either plain objects or [GradientStop](/api/javascript/drawing/gradient-stop) instances.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.5, 0.5],
        radius: 0.7,
        stops: [
          { offset: 0, color: "#ff0099", opacity: 1 },
          { offset: 0.3, color: "#9900ff", opacity: 0.9 },
          { offset: 0.7, color: "#0099ff", opacity: 0.7 },
          { offset: 1, color: "#00ff99", opacity: 0.4 }
        ]
      });

      var rect = new geom.Rect([0, 0], [140, 100]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Fields

### stops `Array`
The array of gradient color stops.
Contains [GradientStop](/api/javascript/drawing/gradient-stop) instances.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.5, 0.5],
        radius: 0.8,
        stops: [
          { offset: 0, color: "#333333", opacity: 1 },
          { offset: 1, color: "#cccccc", opacity: 0.5 }
        ]
      });

      // Access the stops field
      console.log("Number of stops:", gradient.stops.length);
      console.log("First stop color:", gradient.stops[0].color());

      var rect = new geom.Rect([0, 0], [100, 100]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Methods

### addStop
Adds a color stop to the gradient.
Inherited from [Gradient.addStop](/api/javascript/drawing/gradient#methods-addStop)

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.5, 0.5],
        radius: 0.6,
        stops: [
          { offset: 0, color: "#ff0000", opacity: 1 },
          { offset: 1, color: "#0000ff", opacity: 0.5 }
        ]
      });

      gradient.addStop(0.5, "#00ff00", 0.8);
      var newStop = gradient.stops[2];
      console.log("Added stop at offset:", newStop.options.offset);

      var rect = new geom.Rect([0, 0], [120, 80]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
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


### center
Gets or sets the center point of the gradient.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.3, 0.3],
        radius: 0.5,
        stops: [
          { offset: 0, color: "#ff6600", opacity: 1 },
          { offset: 1, color: "#ff0066", opacity: 0.3 }
        ]
      });

      // Get current center
      var currentCenter = gradient.center();
      console.log("Current center:", currentCenter.x, currentCenter.y);

      // Set new center
      gradient.center([0.7, 0.7]);
      console.log("New center set to bottom-right area");

      var rect = new geom.Rect([0, 0], [150, 100]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### center `Array|kendo.geometry.Point`
The center point of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Returns
`kendo.geometry.Point` The current radius of the gradient.


### radius
Gets or sets the radius of the gradient.

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.5, 0.5],
        radius: 0.4,
        stops: [
          { offset: 0, color: "#66ff00", opacity: 1 },
          { offset: 1, color: "#006600", opacity: 0.4 }
        ]
      });

      // Get current radius
      var currentRadius = gradient.radius();
      console.log("Current radius:", currentRadius);

      // Set new radius
      gradient.radius(0.8);
      console.log("Radius expanded to 0.8");

      var rect = new geom.Rect([0, 0], [130, 90]);
      var path = draw.Path.fromRect(rect, {
        stroke: { color: "#999", width: 1 },
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### value `Number`
The new radius of the gradient.

#### Returns
`Number` The current radius of the gradient.


### removeStop
Removes a color stop from the gradient.
Inherited from [Gradient.removeStop](/api/javascript/drawing/gradient#methods-removeStop)

#### Example

    <div id="surface" />
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var gradient = new draw.RadialGradient({
        center: [0.5, 0.5],
        radius: 0.7,
        stops: [
          { offset: 0, color: "#ff0000", opacity: 1 },
          { offset: 0.5, color: "#00ff00", opacity: 0.8 },
          { offset: 1, color: "#0000ff", opacity: 0.5 }
        ]
      });

      console.log("Initial stops count:", gradient.stops.length);

      // Remove the middle stop
      var middleStop = gradient.stops[1];
      gradient.removeStop(middleStop);
      console.log("Stops count after removal:", gradient.stops.length);

      var rect = new geom.Rect([0, 0], [110, 110]);
      var path = draw.Path.fromRect(rect, {
        stroke: null,
        fill: gradient
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

#### Parameters

##### stop `kendo.drawing.GradientStop`
The gradient color stop to remove.

