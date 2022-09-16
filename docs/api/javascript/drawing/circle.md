---
title: Circle
page_title: API reference for Kendo UI Drawing API Circle
res_type: api
---

# kendo.drawing.Circle : kendo.drawing.Element

Draws a circle with set geometry, fill and stroke.

#### Example - creating a circle
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 20);
        var circle = new draw.Circle(circleGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

## Constructor Parameters

### geometry `kendo.geometry.Circle`
The geometric object that defines the circle center and radius.

#### Example - creating a circle
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 20);
        var circle = new draw.Circle(circleGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### options `Object`
The configuration options.

#### Example - Log in the console the circle options object
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var circleGeometry = new geom.Circle([100, 100], 20);
      var circle = new draw.Circle(circleGeometry).stroke("red", 1);
      //press f!2 to open the console to see the logged options
      console.log(circle.options)

      var surface = draw.Surface.create($("#surface"));
      surface.draw(circle);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/configuration/clip)

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element/configuration/cursor)

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/configuration/opacity)

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element/configuration/transform)

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element/configuration/visible)

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element/methods/bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/methods/clip)

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element/methods/clippedbbox)

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
Gets or sets the circle geometry.

#### Parameters

##### value `kendo.geometry.Circle`
The new geometry to use.

#### Returns
`kendo.geometry.Circle` The current circle geometry.


### fill
Sets the shape [fill](/api/javascript/drawing/circle/configuration/fill).

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options/fields/color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Circle` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/methods/opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](/api/javascript/drawing/circle/configuration/stroke).

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options/fields/color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options/fields/width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Circle` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element/methods/transform)

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element/methods/visible)

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
