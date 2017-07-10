---
title: Arc
page_title: API reference for Kendo UI Drawing API Arc
res_type: api
---

# kendo.drawing.Arc : kendo.drawing.Element
Draws an arc with set geometry, fill and stroke.

#### Example - creating an arc
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 10,
            radiusY: 10,
            startAngle: 45,
            endAngle: 135
        });
        var arc = new draw.Arc(arcGeometry).stroke("red", 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

## Constructor Parameters

### geometry `kendo.geometry.Arc`
The geometric object that defines the arc parameters.

### options `Object`
The configuration options.

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](element#configuration-clip)

### cursor `String`
The element cursor.
Inherited from [Element.cursor](element#configuration-cursor)

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](element#configuration-opacity)

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](element#configuration-transform)

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](element#configuration-visible)

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](element#methods-bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](element#methods-clip)

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](element#methods-clippedBBox)

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
Gets or sets the arc geometry.

#### Parameters

##### value `kendo.geometry.Arc`
The new geometry to use.

#### Returns
`kendo.geometry.Arc` The current arc geometry.


### fill
Sets the shape [fill](#configuration-fill).

#### Parameters

##### color `String`
The [fill color](fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Arc` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](#configuration-stroke).

#### Parameters

##### color `String`
The [stroke color](stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Arc` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](element#methods-transform)

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](element#methods-visible)

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
