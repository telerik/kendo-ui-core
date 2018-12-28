---
title: Rect
page_title: API reference for Kendo UI Drawing API Rect
res_type: api
---

# kendo.drawing.Rect : kendo.drawing.Element

Draws a rectangle with set geometry, fill and stroke.

#### Example - creating a rect

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

## Constructor Parameters

### geometry `kendo.geometry.Rect`
The geometric object that defines the rectangle origin and size.

#### Example - creating a rect

    <div id="surface"></div>
    <script>
      // Import the Drawing API namespaces
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      var rectGeom = new geom.Rect([5, 5], [200, 100]);

      var rectangle = new draw.Rect(rectGeom, {
        fill: {
          color: "#33ccff"
        }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(rectangle);
    </script>

### options `Object`
The configuration options.

#### Example - creating a rect

    <div id="surface"></div>
    <script>
      // Import the Drawing API namespaces
      var geom = kendo.geometry;
      var draw = kendo.drawing;

      var rectGeom = new geom.Rect([5, 5], [200, 100]);

      var rectangle = new draw.Rect(rectGeom, {
        fill: {
          color: "#33ccff"
        }
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(rectangle);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element#methods-clippedBBox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

### containsPoint
Returns true if the shape contains the specified point.

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### geometry
Gets or sets the rectangle geometry.

#### Parameters

##### value `kendo.geometry.Rect`
The new geometry to use.

#### Returns
`kendo.geometry.Rect` The current rectangle geometry.


### fill
Sets the shape [fill](/api/javascript/drawing/rect#configuration-fill).

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Rect` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](/api/javascript/drawing/rect#configuration-stroke).

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Rect` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element#methods-visible)

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
