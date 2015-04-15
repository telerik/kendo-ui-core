---
title: LinearGradient
page_title: API reference for Kendo UI Drawing API LinearGradient
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

## Configuration

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


### end
Gets or sets the end point of the gradient.

#### Parameters

##### end `Array|kendo.geometry.Point`
The end point of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Returns
`kendo.geometry.Point` The current end point of the gradient.


### start
Gets or sets the start point of the gradient.

#### Parameters

##### start `Array|kendo.geometry.Point`
The start point of the gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Returns
`kendo.geometry.Point` The current start point of the gradient.


### removeStop
Removes a color stop from the gradient.
Inherited from [Gradient.removeStop](gradient#methods-removeStop)

#### Parameters

##### stop `kendo.drawing.GradientStop`
The gradient color stop to remove.

