---
title: Element
page_title: API reference for Kendo UI Drawing API Element
---

# kendo.drawing.Element : kendo.Class
An abstract base class representing common members of all drawing elements.

## Constructor Parameters

### options `Object`
The configuration of this Group.

## Configuration

### clip `kendo.drawing.Path`
The clipping path for this element.

The path instance will be monitored for changes.
It can be replaced by calling the [clip](#methods-clip) method.

> The VML surface (IE 8 and earlier) will clip to the path bounding rectangle.

#### Example - setting clipping path on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            clip: clipPath,
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### cursor `String`
The element [CSS cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

Applicable to SVG and VML outputs.

#### Example - set hand cursor on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            cursor: "pointer",
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### opacity `Number`
The element opacity.

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.

### visible `Boolean`
A flag, indicating if the element is visible.

## Fields

### options `kendo.drawing.OptionsStore`
The configuration options of the drawing element.

## Methods

### bbox
Returns the bounding box of the element with transformations applied.

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.

> The VML surface (IE 8 and earlier) will clip to the path bounding rectangle.

#### Example - setting clipping path on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circle = new draw.Circle(new geom.Circle([100, 100], 80), {
            stroke: { color: "red", width: 1 }
        });

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        circle.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

#### Example - clear clipping path
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var clipPath = new draw.Path();
        clipPath.moveTo(0, 0).lineTo(100, 100).lineTo(100, 0).close();

        var circle = new draw.Circle(new geom.Circle([80, 80], 60), {
          clip: clipPath,
          stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        setTimeout(function() {
                circle.clip(null);
        }, 2000);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.

This is the rectangle that will fit around the actual rendered element.

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping and transformations applied.


### opacity
Gets or sets the element opacity.

#### Example - setting transformation on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path();
        path.moveTo(0, 0).lineTo(100, 100);
        path.opacity(0.5);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### transform
Gets or sets the transformation of the element.

#### Example - setting transformation on an element
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path();
        path.moveTo(0, 0).lineTo(100, 100);

        path.transform(geom.transform().scale(2, 1));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

