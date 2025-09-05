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

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 20,
            radiusY: 30,
            startAngle: 0,
            endAngle: 90
        });
        var arc = new draw.Arc(arcGeometry);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### options `Object`
The configuration options.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 45,
            endAngle: 225
        });
        var arc = new draw.Arc(arcGeometry, {
            fill: { color: "blue" },
            stroke: { color: "red", width: 2 },
            opacity: 0.8
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
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

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 50,
            radiusY: 50,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("red", 2);

        var clipPath = new draw.Path().moveTo(80, 80).lineTo(120, 80).lineTo(120, 120).lineTo(80, 120).close();
        arc.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element/configuration/cursor)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 30,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "blue", width: 3 },
            cursor: "pointer"
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 40,
            radiusY: 25,
            startAngle: 45,
            endAngle: 315
        });
        var arc = new draw.Arc(arcGeometry, {
            fill: {
                color: "green",
                opacity: 0.7
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/configuration/opacity)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 35,
            radiusY: 35,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry, {
            fill: { color: "purple" },
            stroke: { color: "orange", width: 2 },
            opacity: 0.5
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 40,
            startAngle: 90,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: {
                color: "darkblue",
                width: 4,
                opacity: 0.8,
                dashType: "dash"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 35,
            startAngle: 0,
            endAngle: 120
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "teal", width: 3 },
            tooltip: {
                content: "Arc Shape",
                position: "top"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element/configuration/transform)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 20,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var transform = geom.transform().rotate(45, [100, 100]).scale(1.5, 1.2);
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "red", width: 2 },
            transform: transform
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element/configuration/visible)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry, {
            stroke: { color: "blue", width: 2 },
            visible: true
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Toggle visibility
        setTimeout(() => {
            arc.visible(false);
        }, 2000);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element/methods/bbox)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 40,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("green", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        var bbox = arc.bbox();
        console.log("Bounding box:", bbox);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element/methods/clip)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 50,
            radiusY: 35,
            startAngle: 45,
            endAngle: 225
        });
        var arc = new draw.Arc(arcGeometry).stroke("purple", 3);

        // Create a clipping path
        var clipPath = new draw.Path().moveTo(75, 75).lineTo(125, 75).lineTo(125, 125).lineTo(75, 125).close();
        
        // Set the clipping path
        arc.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get the current clipping path
        var currentClip = arc.clip();
        console.log("Current clip path:", currentClip);
    </script>

#### Parameters

##### clip `kendo.drawing.Path`
The element clipping path.

#### Returns
`kendo.drawing.Path` The current element clipping path.


### clippedBBox
Returns the bounding box of the element with clipping and transformations applied.
Inherited from [Element.clippedBBox](/api/javascript/drawing/element/methods/clippedbbox)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 40,
            radiusY: 40,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry).stroke("red", 2);

        // Apply clipping
        var clipPath = new draw.Path().moveTo(80, 80).lineTo(120, 80).lineTo(120, 120).lineTo(80, 120).close();
        arc.clip(clipPath);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        var clippedBBox = arc.clippedBBox();
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

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("blue", 4);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Test if arc contains specific points
        var point1 = new geom.Point(100, 85);
        var point2 = new geom.Point(150, 100);
        
        console.log("Point (100, 85) inside arc:", arc.containsPoint(point1));
        console.log("Point (150, 100) inside arc:", arc.containsPoint(point2));
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### geometry
Gets or sets the arc geometry.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 0,
            endAngle: 90
        });
        var arc = new draw.Arc(arcGeometry).stroke("orange", 3);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current geometry
        var currentGeometry = arc.geometry();
        console.log("Current geometry:", currentGeometry);

        // Set new geometry
        setTimeout(() => {
            var newGeometry = new geom.Arc([100, 100], {
                radiusX: 40,
                radiusY: 30,
                startAngle: 45,
                endAngle: 315
            });
            arc.geometry(newGeometry);
        }, 2000);
    </script>

#### Parameters

##### value `kendo.geometry.Arc`
The new geometry to use.

#### Returns
`kendo.geometry.Arc` The current arc geometry.


### fill
Sets the shape [fill](/api/javascript/drawing/arc/configuration/fill).

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 35,
            radiusY: 25,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry);

        // Set fill color and opacity
        arc.fill("lightblue", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Change fill after 2 seconds
        setTimeout(() => {
            arc.fill("pink", 0.5);
        }, 2000);
    </script>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options/fields/color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Arc` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element/methods/opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 30,
            radiusY: 30,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry)
            .fill("red")
            .stroke("blue", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current opacity
        console.log("Current opacity:", arc.opacity());

        // Set new opacity
        arc.opacity(0.3);

        // Get updated opacity
        console.log("Updated opacity:", arc.opacity());
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](/api/javascript/drawing/arc/configuration/stroke).

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 35,
            startAngle: 45,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry);

        // Set stroke color, width, and opacity
        arc.stroke("darkgreen", 4, 0.8);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Change stroke after 2 seconds
        setTimeout(() => {
            arc.stroke("red", 2, 1);
        }, 2000);
    </script>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options/fields/color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options/fields/width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options/fields/opacity) to set.

#### Returns
`kendo.drawing.Arc` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element/methods/transform)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 20,
            radiusY: 30,
            startAngle: 0,
            endAngle: 180
        });
        var arc = new draw.Arc(arcGeometry).stroke("purple", 2);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current transformation
        console.log("Current transform:", arc.transform());

        // Apply transformation
        var transform = geom.transform().rotate(45, [100, 100]).scale(1.5, 1.2);
        arc.transform(transform);

        // Get updated transformation
        console.log("Updated transform:", arc.transform());
    </script>

#### Parameters

##### transform `kendo.geometry.Transformation`
The transformation to apply to the element.

#### Returns
`kendo.geometry.Transformation` The current transformation on the element.


### visible
Gets or sets the visibility of the element.
Inherited from [Element.visible](/api/javascript/drawing/element/methods/visible)

#### Example

    <div id="surface"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arcGeometry = new geom.Arc([100, 100], {
            radiusX: 25,
            radiusY: 25,
            startAngle: 0,
            endAngle: 270
        });
        var arc = new draw.Arc(arcGeometry).stroke("teal", 3);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(arc);

        // Get current visibility
        console.log("Is visible:", arc.visible());

        // Hide the arc after 2 seconds
        setTimeout(() => {
            arc.visible(false);
            console.log("Arc hidden, visible:", arc.visible());
        }, 2000);

        // Show the arc again after 4 seconds
        setTimeout(() => {
            arc.visible(true);
            console.log("Arc shown, visible:", arc.visible());
        }, 4000);
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
