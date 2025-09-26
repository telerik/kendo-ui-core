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


<div class="meta-api-description">
Set up and customize a radial gradient during creation by specifying configuration parameters such as color stops, gradient center coordinates, radius size, focal point positioning, transformation effects like rotation or scaling, and opacity levels. This covers initializing gradient fill properties for drawing or rendering tasks, controlling visual appearance, blending, and spatial distribution of colors in circular or elliptical patterns, enabling precise gradient design, styling, and animation effects when constructing gradient objects.
</div>

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


<div class="meta-api-description">
Adjust or configure the focal point of a circular or elliptical gradient by setting the center coordinates within the shape, using normalized values from zero to one to specify the horizontal and vertical position relative to the bounding box; control where the gradient radiates from, center the radial color spread, define offset points for gradient origin, and position the gradient emphasis precisely by specifying x and y values as fractions between the top-left corner (0,0) and bottom-right corner (1,1) of the shape’s area.
</div>

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


<div class="meta-api-description">
Adjust or configure the radial gradient's size, scale, or spread inside a shape by setting how far the color radiates outward from the center toward the edges in relation to the shape's bounding box. Control the extent, radius, or distance the gradient covers to customize the gradient effect, influence visual focus, or fine-tune the gradient's coverage area within circular or elliptical shapes. This property enables scaling, expanding, shrinking, or defining the gradient's reach dynamically for various shapes and layouts to achieve precise color transitions and desired visual impact.
</div>

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


<div class="meta-api-description">
Configure and control color transitions in radial gradients by specifying an array of color stops, enabling precise placement and blending of colors at various offsets within the gradient. Customize color points using objects or gradient stop instances to set exact positions and hues, allowing fine-tuned control over gradient appearance, smoothness, and color interpolation. Manage multiple color markers to create complex radial color blends, adjust color offsets, define gradient progression, and tailor the radial gradient’s color distribution for visual effects, backgrounds, and UI designs.
</div>

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


<div class="meta-api-description">
Adjust, configure, or customize the sequence and positions of multiple color points within a circular gradient by adding, removing, reordering, or editing the collection of color stops to achieve precise radial color blending effects, gradient transitions, and smooth color shifts. Manage arrays or lists of color markers, set stop positions, control opacity and color intensity, and fine-tune the radial gradient’s visual progression by working with individual gradient stop elements to alter the pattern, colors, and stops distribution dynamically at runtime or design time.
</div>

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


<div class="meta-api-description">
Add or insert color stops dynamically to configure a radial gradient's color transitions, control stop positions, adjust blending points, and customize smooth radial fills for drawing or graphics rendering. Enable precise gradient control by appending multiple color stops, managing color mixing, setting gradient offsets, and modifying gradient stops during runtime or setup to achieve desired visual effects and smooth color blends within circular or elliptical gradients.
</div>

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


<div class="meta-api-description">
Control and configure the focal origin point of a radial gradient fill by retrieving or setting its center position, enabling adjustments to where the gradient's color radiates from within a shape or component. This includes positioning the gradient focus dynamically, modifying the starting point of the color spread, adjusting or querying the central coordinate used by radial fills, and customizing how the gradient's center aligns within the area for effects like shifting, centering, or animating the gradient origin. Whether you need to get the current center coordinates or assign a new location for the radial effect, this method supports flexible manipulation of the gradient’s core point to achieve precise visual styling, shading direction, or focus control in UI design or graphical rendering.
</div>

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


<div class="meta-api-description">
Accessing or modifying the size of a gradient's circular spread or scaling the radial pattern's extent involves retrieving the current radius or defining a new numeric value to adjust the gradient's reach and appearance. Developers often look to query the present radius dimension for calculations or dynamically set a specific radius to control the gradient's expansion, resizing, or animation, enabling precise control over how far the color transitions radiate from the center in a radial gradient effect. This includes reading the existing spread value, updating it for visual adjustments, or programmatically animating the scale of the radial gradient to achieve smooth resizing or responsive design changes.
</div>

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


<div class="meta-api-description">
Delete or eliminate a specific color stop from a radial gradient’s color stops array or collection, enabling dynamic removal, modification, or management of gradient colors and stops in runtime or after initialization; remove individual stops, control gradient color points, adjust or manipulate radial gradient segments programmatically, update or change the gradient color scheme by deleting selected gradient color stops, manage gradient color transitions by removing stops to customize or fine-tune radial color effects.
</div>

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

