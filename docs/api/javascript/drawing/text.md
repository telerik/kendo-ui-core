---
title: Text
page_title: API reference for methods and fields of Kendo UI Drawing Text
res_type: api
---

# kendo.drawing.Text : kendo.drawing.Element

Draws a single line of text at the given position.

#### Example - creating a text
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Foo", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

## Constructor Parameters

### content `String`
The content of the text. Special characters are not supported.

### position `kendo.geometry.Point`
The position of the text upper left corner.

### options `Object`
Represents an object containing the configuration options. All of the options are available in [Configuration](/api/javascript/drawing/text#configuration).

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)

### fill `kendo.drawing.FillOptions`
The fill options of the text.

### font `String`
The font to use for rendering the text.
Accepts the standard [CSS font syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/font#Syntax).

Examples of valid font values:
* Size and family: "2em 'Open Sans', sans-serif"
* Style, size and family: "italic 2em 'Open Sans', sans-serif"

#### Example - setting the font for a text

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var geom = kendo.geometry;

      var position = new geom.Point(10, 10);
      var text = new draw.Text("Foo", position, {
        font: "italic 18px 'Open Sans', sans-serif"
      });

      var surface = draw.Surface.create($("#surface"));
      surface.draw(text);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)

### stroke `kendo.drawing.StrokeOptions`
The [stroke options](/api/javascript/drawing/stroke-options/) of the text.

#### Example - set the stroke option of the Text

    <div id="container"></div>
    <script>
        var svg = kendo.drawing.Surface.create($("#container"), { type: "svg" });
        var text = new kendo.drawing.Text("Some Text", [100, 100], {
            stroke: {
                color: '#E4141B',
                dashType: "dash"
            }
        })
        svg.draw(text);
    </script>

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

### content
Gets or sets the text content.

#### Example - change content
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setInterval(function() {
            text.content(kendo.toString(new Date(), "T"));
        }, 1000);
    </script>

#### Parameters

##### value `String`
The new text content to set.

#### Returns
`String` The current content of the text.


### fill
Sets the text [fill](/api/javascript/drawing/text#configuration-fill).

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Text` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### position
Gets or sets the position of the text upper left corner.

#### Example - change position
    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Foo", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setTimeout(function() {
            text.position([20, 20]);
        }, 1000);
    </script>

#### Parameters

##### value `kendo.geometry.Point`
The new position of the text upper left corner.

#### Returns
`kendo.geometry.Point` The current position of the text upper left corner.


### stroke
Sets the text [stroke](/api/javascript/drawing/text#configuration-stroke).

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Text` The current instance to allow chaining.


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
