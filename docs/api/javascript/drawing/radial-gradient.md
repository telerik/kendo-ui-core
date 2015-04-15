---
title: RadialGradient
page_title: API reference for Kendo UI Drawing API RadialGradient
---

# kendo.drawing.RadialGradient : kendo.drawing.Gradient
Represents a radial color gradient.

Note that support for radial gradients in VML is limited.
Not all configurations are guaranteed to work.

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

## Configuration

### center `Array|kendo.geometry.Point`
The center of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

### stops `Array`
The color stops of the gradient.
Can contain either plain objects or [GradientStop](gradient-stop) instances.

## Fields

### stops `Array`
The array of gradient color stops.
Contains [GradientStop](gradient-stop) instances.

## Methods

### addStop
Adds a color stop to the gradient.
Inherited from [Gradient.addStop](gradient#methods-addStop)

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

#### Parameters

##### center `Array|kendo.geometry.Point`
The center point of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Returns
`kendo.geometry.Point` The current radius of the gradient.


### radius
Gets or sets the radius of the gradient.

#### Parameters

##### value `Number`
The new radius of the gradient.

#### Returns
`Number` The current radius of the gradient.


### removeStop
Removes a color stop from the gradient.
Inherited from [Gradient.removeStop](gradient#methods-removeStop)

#### Parameters

##### stop `kendo.drawing.GradientStop`
The gradient color stop to remove.

