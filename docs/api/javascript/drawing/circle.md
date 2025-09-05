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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a circle
        var circleGeometry = new geom.Circle([100, 100], 50);
        var circle = new draw.Circle(circleGeometry).stroke("red", 2).fill("lightblue");

        // Create a clipping path (rectangle)
        var clipPath = new draw.Path()
            .moveTo(75, 75)
            .lineTo(125, 75)
            .lineTo(125, 125)
            .lineTo(75, 125)
            .close();

        // Apply the clipping path to the circle
        circle.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element/configuration/cursor)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            cursor: "pointer",
            fill: { color: "lightgreen" },
            stroke: { color: "darkgreen", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 40);
        var circle = new draw.Circle(circleGeometry, {
            fill: {
                color: "orange",
                opacity: 0.7
            },
            stroke: { color: "darkorange", width: 3 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/configuration/opacity)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 35);
        var circle = new draw.Circle(circleGeometry, {
            opacity: 0.5,
            fill: { color: "purple" },
            stroke: { color: "darkpurple", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            stroke: {
                color: "blue",
                width: 4,
                opacity: 0.8,
                dashType: "dash"
            },
            fill: { color: "lightblue" }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            tooltip: {
                content: "This is a circle tooltip",
                position: "top"
            },
            fill: { color: "yellow" },
            stroke: { color: "orange", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element/configuration/transform)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 25);
        var transform = geom.transform()
            .rotate(45, [100, 100])
            .scale(1.5, 1.5, [100, 100]);

        var circle = new draw.Circle(circleGeometry, {
            transform: transform,
            fill: { color: "pink" },
            stroke: { color: "red", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element/configuration/visible)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry, {
            visible: false,
            fill: { color: "cyan" },
            stroke: { color: "darkcyan", width: 2 }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Make circle visible after 2 seconds
        setTimeout(() => {
            circle.visible(true);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element/methods/bbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).stroke("green", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Get the bounding box
        var bbox = circle.bbox();
        console.log("Bounding box:", bbox);
        console.log("Top-left:", bbox.topLeft());
        console.log("Bottom-right:", bbox.bottomRight());
    </script>


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/methods/clip)

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

        var circleGeometry = new geom.Circle([100, 100], 40);
        var circle = new draw.Circle(circleGeometry).stroke("blue", 2).fill("lightblue");

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(80, 80)
            .lineTo(120, 80)
            .lineTo(120, 120)
            .lineTo(80, 120)
            .close();

        // Set the clipping path
        circle.clip(clipPath);

        // Get the current clipping path
        var currentClip = circle.clip();
        console.log("Current clip path:", currentClip);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
    </script>


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element/methods/clippedbbox)

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 40);
        var circle = new draw.Circle(circleGeometry).stroke("red", 2).fill("pink");

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(80, 80)
            .lineTo(120, 80)
            .lineTo(120, 120)
            .lineTo(80, 120)
            .close();

        circle.clip(clipPath);

        // Get the clipped bounding box
        var clippedBBox = circle.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);
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

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).stroke("purple", 2).fill("lavender");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Test if points are inside the circle
        var point1 = new geom.Point(100, 100); // Center point
        var point2 = new geom.Point(120, 120); // Outside point

        console.log("Point (100,100) inside circle:", circle.containsPoint(point1));
        console.log("Point (120,120) inside circle:", circle.containsPoint(point2));
    </script>

### geometry
Gets or sets the circle geometry.

#### Parameters

##### value `kendo.geometry.Circle`
The new geometry to use.

#### Returns
`kendo.geometry.Circle` The current circle geometry.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 25);
        var circle = new draw.Circle(circleGeometry).stroke("orange", 2).fill("lightyellow");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Get current geometry
        var currentGeometry = circle.geometry();
        console.log("Current geometry:", currentGeometry);

        // Set new geometry after 2 seconds
        setTimeout(() => {
            var newGeometry = new geom.Circle([120, 120], 35);
            circle.geometry(newGeometry);
        }, 2000);
    </script>


### fill
Sets the shape [fill](/api/javascript/drawing/circle/configuration/fill).

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options/fields/color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Circle` The current instance to allow chaining.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).stroke("black", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Set fill color and opacity using the fill method
        circle.fill("teal", 0.6);

        // Chain multiple operations
        setTimeout(() => {
            circle.fill("gold", 0.8).stroke("darkgoldenrod", 3);
        }, 2000);
    </script>


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/methods/opacity)

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

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry)
            .stroke("navy", 2)
            .fill("skyblue");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Get current opacity
        console.log("Current opacity:", circle.opacity());

        // Set new opacity
        circle.opacity(0.5);
        console.log("New opacity:", circle.opacity());
    </script>


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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry).fill("lightcoral");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Set stroke properties using the stroke method
        circle.stroke("darkred", 4, 0.8);

        // Chain stroke with other methods
        setTimeout(() => {
            circle.stroke("blue", 2).fill("lightblue", 0.6);
        }, 2000);
    </script>


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element/methods/transform)

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

        var circleGeometry = new geom.Circle([100, 100], 25);
        var circle = new draw.Circle(circleGeometry)
            .stroke("green", 2)
            .fill("lightgreen");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Create and apply transformation
        var transform = geom.transform()
            .rotate(45, [100, 100])
            .scale(1.5, 1.5, [100, 100]);

        circle.transform(transform);

        // Get current transformation
        var currentTransform = circle.transform();
        console.log("Current transformation:", currentTransform);
    </script>


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element/methods/visible)

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

        var circleGeometry = new geom.Circle([100, 100], 30);
        var circle = new draw.Circle(circleGeometry)
            .stroke("maroon", 2)
            .fill("mistyrose");

        var surface = draw.Surface.create($("#surface"));
        surface.draw(circle);

        // Check initial visibility
        console.log("Initial visibility:", circle.visible());

        // Toggle visibility every 2 seconds
        setInterval(() => {
            var currentVisibility = circle.visible();
            circle.visible(!currentVisibility);
            console.log("Visibility changed to:", circle.visible());
        }, 2000);
    </script>
