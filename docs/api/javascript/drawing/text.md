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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Hello World", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### position `kendo.geometry.Point`
The position of the text upper left corner.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(50, 30);
        var text = new draw.Text("Positioned text", position);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### options `Object`
Represents an object containing the configuration options. All of the options are available in [Configuration](/api/javascript/drawing/text#configuration).

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Styled Text", position, {
            font: "bold 16px Arial",
            fill: { color: "blue" },
            stroke: { color: "red", width: 1 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(20, 20);
        var text = new draw.Text("Clipped Text", position, {
            font: "20px Arial"
        });

        var clipPath = draw.Path.fromRect(new geom.Rect([25, 25], [80, 30]));
        text.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Clickable text", position, {
            cursor: "pointer",
            fill: { color: "blue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the text.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Filled text", position, {
            font: "18px Arial",
            fill: {
                color: "green",
                opacity: 0.8
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Semi-transparent text", position, {
            font: "16px Arial",
            fill: { color: "red" },
            opacity: 0.5
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Hover me", position, {
            font: "16px Arial",
            tooltip: {
                content: "This is a tooltip for the text"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(50, 50);
        var text = new draw.Text("Rotated text", position, {
            font: "16px Arial",
            transform: geom.transform().rotate(45, [50, 50])
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Toggle visibility", position, {
            font: "16px Arial",
            visible: false
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setTimeout(function() {
            text.visible(true);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Sample text", position, {
            font: "16px Arial"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        var bbox = text.bbox();
        console.log("Text bounding box:", bbox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("This text will be clipped", position, {
            font: "18px Arial"
        });

        var clipPath = draw.Path.fromRect(new geom.Rect([15, 15], [60, 20]));
        text.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element#methods-clippedBBox)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Clipped text", position, {
            font: "16px Arial"
        });

        var clipPath = draw.Path.fromRect(new geom.Rect([15, 15], [50, 20]));
        text.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        var clippedBBox = text.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

### containsPoint
Returns true if the shape contains the specified point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(50, 50);
        var text = new draw.Text("Click to test", position, {
            font: "16px Arial"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        $("#surface").click(function(e) {
            var offset = $(this).offset();
            var point = new geom.Point(e.pageX - offset.left, e.pageY - offset.top);
            var contains = text.containsPoint(point);
            console.log("Text contains point:", contains);
        });
    </script>

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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Dynamic fill", position, {
            font: "18px Arial"
        });

        text.fill("purple", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Fading text", position, {
            font: "18px Arial",
            fill: { color: "blue" }
        });

        text.opacity(0.3);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Outlined text", position, {
            font: "20px Arial",
            fill: { color: "white" }
        });

        text.stroke("black", 2, 1);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(80, 80);
        var text = new draw.Text("Scaled text", position, {
            font: "16px Arial"
        });

        var transformation = geom.transform().scale(1.5, 1.5);
        text.transform(transformation);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element#methods-visible)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var position = new geom.Point(10, 10);
        var text = new draw.Text("Now you see me", position, {
            font: "16px Arial"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(text);

        setTimeout(function() {
            text.visible(false);
            console.log("Text is now hidden");
        }, 2000);

        setTimeout(function() {
            text.visible(true);
            console.log("Text is now visible again");
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
