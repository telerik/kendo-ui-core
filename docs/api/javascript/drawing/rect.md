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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a rect
        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Create a clipping path
        var clipPath = new draw.Path().moveTo(10, 10).lineTo(90, 10).lineTo(90, 90).lineTo(10, 90).close();

        // Apply the clipping path
        rect.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "red" },
            cursor: "pointer"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: {
                color: "#ff6600",
                opacity: 0.8
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "blue" },
            opacity: 0.5
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            stroke: {
                color: "green",
                width: 3,
                opacity: 0.9
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "purple" },
            tooltip: {
                content: "This is a rectangle"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "orange" }
        });

        // Apply rotation transformation
        var transform = geom.transform().rotate(45, [50, 50]);
        rect.transform(transform);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry, {
            fill: { color: "red" },
            visible: false
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);

        // Make it visible after 2 seconds
        setTimeout(function() {
            rect.visible(true);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Get the bounding box
        var bbox = rect.bbox();
        console.log("Bounding box:", bbox.topLeft(), bbox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("red");

        // Create and set a clipping path
        var clipPath = new draw.Path().moveTo(20, 20).lineTo(80, 20).lineTo(80, 80).lineTo(20, 80).close();
        rect.clip(clipPath);

        // Get the current clipping path
        var currentClip = rect.clip();
        console.log("Current clip path:", currentClip);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element#methods-clippedBBox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Apply clipping
        var clipPath = new draw.Path().moveTo(60, 60).lineTo(120, 60).lineTo(120, 120).lineTo(60, 120).close();
        rect.clip(clipPath);

        // Get the clipped bounding box
        var clippedBBox = rect.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox.topLeft(), clippedBBox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### containsPoint
Returns true if the shape contains the specified point.

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("green");

        // Check if points are inside the rectangle
        var point1 = new geom.Point(75, 75); // Inside
        var point2 = new geom.Point(25, 25); // Outside

        console.log("Point 1 inside:", rect.containsPoint(point1)); // true
        console.log("Point 2 inside:", rect.containsPoint(point2)); // false

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>

### geometry
Gets or sets the rectangle geometry.

#### Parameters

##### value `kendo.geometry.Rect`
The new geometry to use.

#### Returns
`kendo.geometry.Rect` The current rectangle geometry.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("purple");

        // Get current geometry
        var currentGeom = rect.geometry();
        console.log("Current geometry:", currentGeom.topLeft(), currentGeom.size);

        // Set new geometry
        var newGeometry = new geom.Rect([50, 50], [150, 75]);
        rect.geometry(newGeometry);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### fill
Sets the shape [fill](/api/javascript/drawing/rect#configuration-fill).

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Rect` The current instance to allow chaining.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry);

        // Set fill color and opacity
        rect.fill("red", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("blue");

        // Set opacity
        rect.opacity(0.6);

        // Get current opacity
        var currentOpacity = rect.opacity();
        console.log("Current opacity:", currentOpacity);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("yellow");

        // Set stroke color, width, and opacity
        rect.stroke("black", 3, 0.8);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([50, 50], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("cyan");

        // Apply scale and rotation transformation
        var transform = geom.transform().scale(1.5, 1.5).rotate(30, [100, 100]);
        rect.transform(transform);

        // Get current transformation
        var currentTransform = rect.transform();
        console.log("Current transformation:", currentTransform);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);
    </script>


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element#methods-visible)

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rectGeometry = new geom.Rect([0, 0], [100, 100]);
        var rect = new draw.Rect(rectGeometry).fill("magenta");

        // Set visibility
        rect.visible(true);

        // Get current visibility
        var isVisible = rect.visible();
        console.log("Is visible:", isVisible);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(rect);

        // Toggle visibility after 2 seconds
        setTimeout(function() {
            rect.visible(!rect.visible());
        }, 2000);
    </script>
