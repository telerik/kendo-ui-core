---
title: Path
page_title: API reference for Kendo UI Drawing API Path
res_type: api
---

# kendo.drawing.Path : kendo.drawing.Element

Represents a path consisting of linear or cubic Bézier curve segments.

#### Example - draw a path

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 200)
            .curveTo([100, 100], [250, 100], [250, 200])
            .lineTo(100, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

## Constructor Parameters

### options `Object`
The configuration options.

#### Example - create and draw a path

    <div id="surface" style="width: 250px; height: 165px;"></div>
    <script>
      var draw = kendo.drawing;

      // Initialize a path using an options object
      var path = new draw.Path({
        stroke: {
          color: "#9999b6",
          width: 2
        },
        fill: {
          color: "#33ccff"
        },
        opacity: 0.5,
        cursor: "pointer"
      });

      // Describe the path
      path.moveTo(0, 0)
        .lineTo(150, 0).lineTo(150, 65).lineTo(0, 65)
        .close();

      // Draw the path on a drawing surface
      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
    </script>

## Class Methods

### fromArc
Create a curve from the given arc.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var arc = new geom.Arc([100, 100], {
            startAngle: 0,
            endAngle: 90,
            radiusX: 50,
            radiusY: 50
        });

        var path = draw.Path.fromArc(arc, {
            stroke: {
                color: "#ff6358",
                width: 3
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### arc `kendo.geometry.Arc`
The source arc to trace.

##### options `Object` *optional*
The [configuration](/api/javascript/drawing/path#configuration) options for the path.

#### Returns
`kendo.drawing.Path` The newly constructed path.

### fromPoints
Create a straight path from the given points.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var points = [
            new geom.Point(50, 50),
            new geom.Point(150, 100),
            new geom.Point(200, 50),
            new geom.Point(250, 150)
        ];

        var path = draw.Path.fromPoints(points, {
            stroke: {
                color: "#2ecc71",
                width: 2
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### points `Array`
Array of [kendo.geometry.Point](/api/javascript/geometry/point) objects or [x, y] arrays.

##### options `Object` *optional*
The [configuration](/api/javascript/drawing/path#configuration) options for the path.

#### Returns
`kendo.drawing.Path` The newly constructed path.


### fromRect
Create a straight path from the given rectangle.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([50, 50], [150, 100]);

        var path = draw.Path.fromRect(rect, {
            stroke: {
                color: "#9b59b6",
                width: 2
            },
            fill: {
                color: "#ecf0f1"
            }
        });

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### rect `kendo.geometry.Rect`
The source rectangle to trace.

##### options `Object` *optional*
The [configuration](/api/javascript/drawing/path#configuration) options for the path.

#### Returns
`kendo.drawing.Path` The newly constructed path.


### parse

Parses a path encoded in [SVG Path Data format](https://www.w3.org/TR/SVG/paths.html#PathData).

#### Example - Parse an SVG path
    <div id="container"></div>
    <script>
        var draw = kendo.drawing;
        var surface = draw.Surface.create($("#container"));

        var svgPath = "M 60,5.5 C 54.204,5.5 49.5,10.204 49.5,16 C 49.5,20.823785 52.753189,24.8962 57.1875,26.125 L 57.1875,30.1875 L 42.28125,30.1875 L 42.28125,35.125 L 57.1875,35.125 L 55.40625,100.3125 L 54.5,100.15625 L 47.46875,98.71875 L 40.8125,96.53125 L 34.78125,93.03125 L 29.1875,88.625 L 33.0625,84.75 L 17.46875,72.34375 L 21.03125,96.78125 L 26.34375,91.8125 L 30.28125,95.5 L 35.78125,100.03125 L 41.75,103.625 L 48.40625,105.875 L 55.40625,107.40625 L 56.125,114.84375 L 63.1875,114.84375 L 63.90625,107.78125 L 69.9375,106.625 L 76.65625,104.4375 L 82.90625,101.03125 L 88.5,96.6875 L 93.6875,91.8125 L 99,97.125 L 102.53125,72.34375 L 86.59375,85.09375 L 90.84375,89 L 89.71875,89.78125 L 83.8125,93.78125 L 77.59375,97.0625 L 70.875,99.1875 L 63.90625,100.6875 L 62.84375,35.125 L 77.75,35.125 L 77.75,30.1875 L 62.5,29.8125 L 62.5,26.1875 C 67.091818,25.066065 70.5,20.935656 70.5,16 C 70.5,10.204 65.796,5.5 60,5.5 z M 60,11 C 62.76,11 65,13.24 65,16 C 65,18.76 62.76,21 60,21 C 57.24,21 55,18.76 55,16 C 55,13.24 57.24,11 60,11 z";
        var path = draw.Path.parse(svgPath, {
            stroke: {
                color: "red",
                width: 1
            }
        });

        surface.draw(path);
    </script>

#### Parameters

##### svgPath `String`
The path encoded in [SVG Path Data format](https://www.w3.org/TR/SVG/paths.html#PathData).

##### options `Object` *optional*
The [configuration](/api/javascript/drawing/path#configuration) options for the path.

#### Returns
`kendo.drawing.MultiPath` A path matching the supplied SVG data.

## Configuration

### clip `kendo.drawing.Path`
The element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#configuration-clip)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(50, 50)
            .lineTo(150, 50)
            .lineTo(150, 150)
            .lineTo(50, 150)
            .close();

        // Create the main path
        var path = new draw.Path({
            clip: clipPath,
            stroke: {
                color: "#e74c3c",
                width: 3
            }
        })
        .moveTo(0, 100)
        .lineTo(200, 100);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### cursor `String`
The element cursor.
Inherited from [Element.cursor](/api/javascript/drawing/element#configuration-cursor)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path({
            cursor: "pointer",
            stroke: {
                color: "#3498db",
                width: 3
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### fill `kendo.drawing.FillOptions`
The fill options of the shape.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path({
            fill: {
                color: "#f39c12",
                opacity: 0.7
            },
            stroke: {
                color: "#e67e22",
                width: 2
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 50)
        .lineTo(125, 200)
        .close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### opacity `Number`
The element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#configuration-opacity)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path({
            opacity: 0.5,
            stroke: {
                color: "#2c3e50",
                width: 4
            },
            fill: {
                color: "#1abc9c"
            }
        })
        .moveTo(50, 100)
        .lineTo(150, 50)
        .lineTo(200, 150)
        .close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### stroke `kendo.drawing.StrokeOptions`
The stroke options of the shape.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path({
            stroke: {
                color: "#e74c3c",
                width: 5,
                lineCap: "round",
                lineJoin: "round",
                dashType: "dash"
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 50)
        .lineTo(200, 200)
        .lineTo(50, 200)
        .close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### tooltip `kendo.drawing.TooltipOptions`
The tooltip options of the shape.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path({
            tooltip: {
                content: "This is a drawing path"
            },
            stroke: {
                color: "#9b59b6",
                width: 3
            }
        })
        .moveTo(50, 100)
        .lineTo(200, 100);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### transform `kendo.geometry.Transformation`
The transformation to apply to this element.
Inherited from [Element.transform](/api/javascript/drawing/element#configuration-transform)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var transform = geom.transform()
            .rotate(45, [125, 125])
            .scale(1.2, 1.2);

        var path = new draw.Path({
            transform: transform,
            stroke: {
                color: "#34495e",
                width: 3
            },
            fill: {
                color: "#ecf0f1"
            }
        })
        .moveTo(75, 75)
        .lineTo(175, 75)
        .lineTo(175, 175)
        .lineTo(75, 175)
        .close();

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

### visible `Boolean`
A flag, indicating if the element is visible.
Inherited from [Element.visible](/api/javascript/drawing/element#configuration-visible)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var visiblePath = new draw.Path({
            visible: true,
            stroke: {
                color: "#27ae60",
                width: 3
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 50);

        var hiddenPath = new draw.Path({
            visible: false,
            stroke: {
                color: "#e74c3c",
                width: 3
            }
        })
        .moveTo(50, 100)
        .lineTo(200, 100);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(visiblePath);
        surface.draw(hiddenPath); // This won't be visible
    </script>

## Fields

### segments `Array`
A collection of the path [segments](/api/javascript/drawing/segment).

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(50, 50)
            .lineTo(150, 50)
            .curveTo([200, 100], [200, 150], [150, 200])
            .lineTo(50, 200)
            .close();

        // Access and log the segments
        console.log("Path has " + path.segments.length + " segments");
        for (var i = 0; i < path.segments.length; i++) {
            console.log("Segment " + i + ":", path.segments[i]);
        }

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

## Methods

### bbox
Returns the bounding box of the element with transformations applied.
Inherited from [Element.bbox](/api/javascript/drawing/element#methods-bbox)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(50, 50)
            .lineTo(200, 100)
            .lineTo(150, 200)
            .close();

        var bbox = path.bbox();
        console.log("Bounding box:", bbox);
        console.log("Top-left:", bbox.topLeft());
        console.log("Size:", bbox.size);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with transformations applied.


### clip
Gets or sets the element clipping path.
Inherited from [Element.clip](/api/javascript/drawing/element#methods-clip)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(50, 50)
            .lineTo(200, 50)
            .lineTo(200, 200)
            .lineTo(50, 200)
            .close();

        // Create a circular clipping path
        var clipPath = new draw.Path()
            .arc(125, 125, 75, 0, 360)
            .close();

        // Apply the clipping path
        path.clip(clipPath);

        console.log("Current clip path:", path.clip());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
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

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(50, 50)
            .lineTo(200, 50)
            .lineTo(200, 200)
            .lineTo(50, 200)
            .close();

        // Create a clipping path
        var clipPath = new draw.Path()
            .moveTo(75, 75)
            .lineTo(175, 75)
            .lineTo(175, 175)
            .lineTo(75, 175)
            .close();

        path.clip(clipPath);

        var clippedBBox = path.clippedBBox();
        console.log("Clipped bounding box:", clippedBBox);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Returns
`kendo.geometry.Rect` The bounding box of the element with clipping transformations applied.


### close
Closes the path by linking the current end point with the start point.

#### Example - Draw a closed path

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 200)
            .curveTo([100, 100], [250, 100], [250, 200]);

        // The following commands are interchangable
        path.close();
        path.lineTo(100, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.

### containsPoint
Returns true if the shape contains the specified point.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path({
            fill: {
                color: "#3498db",
                opacity: 0.5
            },
            stroke: {
                color: "#2980b9",
                width: 2
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 50)
        .lineTo(125, 200)
        .close();

        var testPoint = new geom.Point(125, 100);
        var contains = path.containsPoint(testPoint);
        console.log("Point (125, 100) is inside path:", contains);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### point `kendo.geometry.Point`
The point that should be checked.

#### Returns
`Boolean` value indicating if the shape contains the point.

### curveTo
Draws a cubic Bézier curve (with two control points).

A quadratic Bézier curve (with one control point) can be plotted by making the control point equal.

#### Example - Draw a curved path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(100, 200)
            .curveTo([100, 100], [250, 100], [250, 200])
            .lineTo(100, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### controlOut `Array|kendo.geometry.Point`
The first control point for the curve.

##### controlIn `Array|kendo.geometry.Point`
The second control point for the curve.

##### endPoint `Array|kendo.geometry.Point`
The curve end point.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### fill
Sets the shape [fill](/api/javascript/drawing/path#configuration-fill).

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(50, 50)
            .lineTo(200, 50)
            .lineTo(125, 200)
            .close();

        // Set fill using the fill method
        path.fill("#e74c3c", 0.7);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### color `String`
The [fill color](/api/javascript/drawing/fill-options#fields-color) to set.

##### opacity `Number` *optional*
The [fill opacity](/api/javascript/drawing/fill-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### lineTo
Draws a straight line to the specified absolute coordinates.

#### Example - Draw a straight path
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path()
            .moveTo(100, 200);

        // The following commands are interchangeable
        path.lineTo(200, 200);
        path.lineTo([200, 200]);
        path.lineTo(new geom.Point(200, 200));

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### x `Number|Array|kendo.geometry.Point`
The line end X coordinate or a Point/Array with X and Y coordinates.

##### y `Number` *optional*
The line end Y coordinate.

Optional if the first parameter is a Point/Array.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### moveTo
Clears all existing segments and moves the starting point to the specified absolute coordinates.

#### Example - Set the path start coordinates
    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path();

        // The following commands are interchangeable
        path.moveTo(100, 200);
        path.moveTo([100, 200]);
        path.moveTo(new geom.Point(100, 200));

        path.lineTo(200, 200);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### x `Number|Array|kendo.geometry.Point`
The starting X coordinate or a Point/Array with X and Y coordinates.

##### y `Number` *optional*
The starting Y coordinate.

Optional if the first parameter is a Point/Array.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### opacity
Gets or sets the element opacity.
Inherited from [Element.opacity](/api/javascript/drawing/element#methods-opacity)

If set, the stroke and fill opacity will be multiplied by the element opacity.

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path({
            fill: {
                color: "#2ecc71"
            },
            stroke: {
                color: "#27ae60",
                width: 2
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 50)
        .lineTo(125, 200)
        .close();

        // Set opacity using the opacity method
        path.opacity(0.5);

        console.log("Current opacity:", path.opacity());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### opacity `Number`
The element opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Returns
`Number` The current element opacity.


### stroke
Sets the shape [stroke](/api/javascript/drawing/path#configuration-stroke).

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path = new draw.Path()
            .moveTo(50, 50)
            .lineTo(200, 50)
            .lineTo(200, 200)
            .lineTo(50, 200)
            .close();

        // Set stroke using the stroke method
        path.stroke("#e74c3c", 5, 0.8);

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path);
    </script>

#### Parameters

##### color `String`
The [stroke color](/api/javascript/drawing/stroke-options#fields-color) to set.

##### width `Number` *optional*
The [stroke width](/api/javascript/drawing/stroke-options#fields-width) to set.

##### opacity `Number` *optional*
The [stroke opacity](/api/javascript/drawing/stroke-options#fields-opacity) to set.

#### Returns
`kendo.drawing.Path` The current instance to allow chaining.


### transform
Gets or sets the transformation of the element.
Inherited from [Element.transform](/api/javascript/drawing/element#methods-transform)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var path = new draw.Path({
            stroke: {
                color: "#9b59b6",
                width: 3
            },
            fill: {
                color: "#ecf0f1"
            }
        })
        .moveTo(50, 50)
        .lineTo(150, 50)
        .lineTo(150, 150)
        .lineTo(50, 150)
        .close();

        // Apply transformation using the transform method
        var transformation = geom.transform()
            .rotate(45, [100, 100])
            .scale(1.5, 1.5);

        path.transform(transformation);

        console.log("Current transformation:", path.transform());

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
Inherited from [Element.visible](/api/javascript/drawing/element#methods-visible)

#### Example

    <div id="surface" style="width: 250px; height: 250px;"></div>
    <script>
        var draw = kendo.drawing;

        var path1 = new draw.Path({
            stroke: {
                color: "#27ae60",
                width: 3
            }
        })
        .moveTo(50, 50)
        .lineTo(200, 50);

        var path2 = new draw.Path({
            stroke: {
                color: "#e74c3c",
                width: 3
            }
        })
        .moveTo(50, 100)
        .lineTo(200, 100);

        // Hide the second path using the visible method
        path2.visible(false);

        console.log("Path1 visible:", path1.visible());
        console.log("Path2 visible:", path2.visible());

        var surface = draw.Surface.create($("#surface"));
        surface.draw(path1);
        surface.draw(path2); // This won't be visible
    </script>

#### Parameters

##### visible `Boolean`
A flag indicating if the element should be visible.

#### Returns
`Boolean` true if the element is visible; false otherwise.
