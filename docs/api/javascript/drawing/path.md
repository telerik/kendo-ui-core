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


<div class="meta-api-description">
Set or customize the initial configuration of a drawing path by specifying geometry, drawing commands, stroke styles, fill colors, opacity levels, transformations, custom attributes, and behavior settings during the creation of a vector or canvas drawing component. This option enables control over path initialization parameters to define appearance, shape, visual effects, and interactive properties right at instantiation, supporting use cases like setting line styles, applying transformations, configuring fills and strokes, and embedding custom metadata or behavior controls within newly created drawing elements.
</div>

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


<div class="meta-api-description">
Convert arcs into editable or renderable path curves for drawing by generating path segments from arc shapes or parameters, enabling seamless transformation of circular or elliptical arc geometries into vector drawing paths. This conversion supports rendering curved segments derived from arcs, facilitates manipulating arc shapes as path curves, allows editing of arc-based drawings, and enables serialization or modification by translating arc definitions into drawable vector paths within graphics or drawing components. Use this method to create path data that follows arc contours for applications requiring precise control over curved geometry representation and manipulation in vector-based graphics environments.
</div>

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


<div class="meta-api-description">
Generate a path by connecting an ordered list of coordinate points with straight line segments to create polylines or multi-segment shapes, enabling programmatic construction of continuous paths from arrays of x,y positions, configuring drawing sequences that trace points in order, setting up paths from point collections, and building linked line paths for vector graphics or shape outlines.
</div>

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


<div class="meta-api-description">
Generate a geometric path that outlines a rectangular area by configuring or creating a shape that follows the exact edges of a given rectangle, enabling rendering, hit detection, or exporting by tracing straight line segments along the rectangle’s boundaries; this method or function is used to convert rectangle coordinates or dimensions into a drawable vector path with precise angular corners, supporting use cases like drawing frames, defining clickable regions, or exporting rectangular outlines as shapes.
</div>

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


<div class="meta-api-description">
Convert or import SVG path strings into drawable vector shapes by parsing SVG Path Data commands such as moveto, lineto, horizontal and vertical lines, cubic and quadratic Bézier curves, smooth curves, arcs, and closepath instructions, enabling you to translate and manipulate complex SVG geometry into rendering commands for shape construction, shape updates, or dynamic path generation within graphics or vector drawing applications.
</div>

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


<div class="meta-api-description">
Control, define, or set a clipping region, mask, or shape to restrict or constrain the visible area of a drawing path or graphic element, enabling masking effects, clipping boundaries, or partial rendering of shapes by specifying clipping paths or regions, and adjusting how elements are cropped or limited within visual contours or masks for precise rendering control and customized layout visibility.
</div>

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


<div class="meta-api-description">
Set or customize the mouse cursor appearance when hovering over a drawing path or graphical element to enhance user interaction, including options like pointer, move, grab, or default cursors, enabling control over hover states, pointer affordances, and user feedback during drag, select, or clickable actions on visual components within a drawing or canvas environment.
</div>

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


<div class="meta-api-description">
Control and customize the interior appearance of vector shapes by setting fill colors, opacity levels, gradients, and pattern fills; adjust fill styling to define the shape’s solid color, transparent areas, multi-color gradients, or repeated textures, enabling styling configurations at initialization or dynamically to style shapes with defined fill options that affect how enclosed areas render visually within graphic or drawing components.
</div>

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


<div class="meta-api-description">
Adjust the transparency or visibility of a graphic path by configuring its opacity level, controlling how see-through or solid the drawing appears with values ranging from fully transparent to completely opaque; this setting influences the path's transparency intensity, blending, alpha level, and overall visual prominence in rendering, enabling effects such as fading, dimming, or highlighting specific vector shapes by setting opacity between zero and one.
</div>

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


<div class="meta-api-description">
Control the outline appearance of a shape by configuring stroke color, thickness, opacity, dash or solid line styles, and other border details to customize how a path’s edge is drawn in vector graphics or drawing components. Adjust and style the shape’s boundary by setting stroke properties like outline color intensity, line width scaling, transparency levels, dashed or continuous line patterns, and edge decorations to achieve specific visual effects. Enable fine-tuning of the path’s border styling including customizable stroke attributes such as color codes, pixel widths, opacity percentages, and stroke dash arrays to modify thickness, style, and visibility of the shape’s contour. Manage the stroke configuration that affects path outlines for creating custom borders, shadows, highlights, or sketches by adjusting relevant graphic parameters related to the perimeter line. Define and tune the graphical outline of vector shapes by manipulating stroke settings to set precise color fills, weight dimensions, opacity thresholds, and repeated dash sequences for enhanced visual presentation in drawings or UI elements.
</div>

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


<div class="meta-api-description">
Customize hover text, tooltip content, popups, and tooltip behavior for vector paths or shapes, controlling display options such as custom labels, rich text, templates, positioning on hover or focus, appearance styling, and show or hide triggers within drawing components or graphical elements, enabling configuration of interactive informational overlays that appear when users mouse over or tap on drawn paths or shapes.
</div>

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


<div class="meta-api-description">
Adjust, set, or configure geometric modifications like translation, rotation, scaling, skewing, or matrix-based transforms to alter a vector path’s position, orientation, size, or shape within a drawing or graphical component. Enable movement shifts, angle rotations, resizing, distortion, or combined matrix transformation controls for path elements, supporting initialization settings and runtime updates to manage layout, alignment, or visual adjustments in graphic rendering and UI vector manipulation contexts.
</div>

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


<div class="meta-api-description">
Control the display status of a drawing path by toggling its visibility to show or hide it, enabling or disabling rendering on the canvas and determining whether the path is interactive for hit-testing and affects layout calculations. Adjust the visibility flag to manage the presence of the graphical element in the user interface, control whether it is drawn or excluded during rendering cycles, and configure its participation in event detection or spatial arrangement, supporting use cases for conditional rendering, dynamic UI updates, layer management, and interactive element control.
</div>

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


<div class="meta-api-description">
Manipulate and control vector shapes by accessing and modifying the collection of path segments within a drawing component, enabling you to dynamically read, iterate through, add, remove, reorder, or update individual geometric segments to alter the shape, structure, or geometry of the path during runtime or after initialization. This supports tasks like editing vector outlines, customizing shapes programmatically, managing segment sequences, and adjusting path contours for real-time drawing updates, shape transformations, or interactive graphic modifications.
</div>

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


<div class="meta-api-description">
Calculate or retrieve the axis-aligned bounding rectangle that fully contains a shape or path after all transformations like translation, rotation, scaling, and skewing are applied, enabling measurement of the visual dimensions and position of vector graphics elements for purposes such as hit-testing, collision detection, clipping regions, layout alignment, exporting geometry data, or determining rendered size and coordinates in a transformed coordinate space.
</div>

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


<div class="meta-api-description">
Configure, apply, retrieve, update, or remove clipping masks and clip paths to control element rendering boundaries by setting or getting shape-based clip regions that constrain visual output to specified paths, enabling precise clipping behavior for graphical elements, mask adjustments, path-based rendering limits, clip region management, or inspecting current clipping states in vector graphics or drawing contexts.
</div>

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


<div class="meta-api-description">
Retrieve the final visible bounding rectangle of a path after applying all clipping regions and transformations to determine the exact on-screen area it occupies, enabling calculations for hit testing, collision detection, layout positioning, rendering boundaries, or graphic export dimensions. This method helps identify precise clipped bounds of vector shapes for interactive elements, visual overlays, or spatial computations in graphics programming, facilitating accurate measurement and control of the displayed drawable region adjusted by any clipping masks or coordinate changes.
</div>

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


<div class="meta-api-description">
Close the current vector drawing path by connecting the last point to the first point to create a closed shape essential for filling, hit-testing, stroking, exporting, or performing boolean geometry operations; configure paths to automatically link endpoints with straight segments when missing, finalize open subpaths into closed loops for shape completion, enable shape closure in vector graphics workflows, set path closure for rendering complete filled polygons, and control how open paths become sealed shapes for accurate interactive hit detection and geometric calculations.
</div>

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


<div class="meta-api-description">
Check if a specific coordinate or point lies within a shape’s boundaries, enabling hit testing, collision detection, or interactive input recognition such as mouse clicks, touch events, or pointer locations inside graphical paths. This functionality helps identify whether a given position falls inside a vector path, shape area, or drawn contour, supporting use cases like user interaction, selecting or activating visual elements, detecting overlaps with drawn objects, and spatial queries on complex shapes. It can be configured to analyze points against any drawable path or geometry to confirm containment or intersection for interactive graphics, UI elements, or game development hit areas.
</div>

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


<div class="meta-api-description">
Create or extend vector paths by adding smooth cubic Bézier curves defined through two control points and a destination point, enabling detailed shape construction, curved segments, and complex outlines; use this method to draw cubic or approximate quadratic Bézier curves by configuring control handles for intricate path manipulation, custom curve drawing, or precise vector graphics path control within drawing APIs.
</div>

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


<div class="meta-api-description">
Set or update the fill appearance of a shape or path by configuring its fill style, color, pattern, gradient, or opacity; adjust or customize the visual fill properties dynamically or at runtime to control the shape’s interior rendering, apply solid fills, gradient fills, image fills, or transparency settings, and modify how shapes are visually filled in your drawing, shape layer, or vector graphic environment with flexible fill options.
</div>

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


<div class="meta-api-description">
Draw or extend vector shapes by adding straight line segments from the current drawing point to specific absolute coordinates, using commands that connect points with x and y values to create linear paths; this method lets developers configure, set, or control precise line segments within a path, enabling construction of complex shapes by linking points sequentially, supporting path updates for further drawing instructions such as moving the cursor, adding curves, arcs, or closing shapes in a vector graphics system.
</div>

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


<div class="meta-api-description">
Reset the current shape or path by clearing all previous points and repositioning the starting point to specific absolute coordinates using a function that moves the drawing cursor to a new location defined by x and y values, effectively setting the origin for further drawing commands or segments and enabling control over where the next lines or shapes begin within a graphical canvas or coordinate system.
</div>

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


<div class="meta-api-description">
Control the transparency level of vector shapes by configuring the opacity to adjust how see-through or solid a drawing path appears when rendering. Retrieve the current transparency value or dynamically change it at runtime to make entire shape outlines and fills more or less transparent, blending stroke and fill opacity with overall element opacity. Enable precise visual layering by setting or getting the opacity value on drawing elements, influencing how rendered graphics combine transparency effects. Adjust, update, or query the alpha level for shape rendering to achieve effects like fading, overlay control, or visibility tuning of path strokes and fills in graphics programming.
</div>

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


<div class="meta-api-description">
Adjust or modify the outline styling of a shape by configuring its stroke color, thickness, dash patterns, or line style, enabling dynamic updates to shape borders and edges; control and set the path’s contour appearance, update stroke properties on existing shapes, customize outline visuals such as solid or dashed lines, and apply new stroke configurations to change how the shape’s perimeter is drawn or rendered after creation.
</div>

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


<div class="meta-api-description">
Adjust, set, or retrieve the geometric transformation applied to a drawing path including rotation, scaling, translation, or matrix-based manipulation to control positioning and appearance, enabling programmatic updates or animations that affect rendering, hit testing, grouping, and layout of vector shapes; supports reading the current transform or applying new transformation objects or matrices to dynamically modify path geometry and spatial properties within graphical elements.
</div>

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


<div class="meta-api-description">
Control, toggle, set, or retrieve the visibility status of a drawing path or graphic element on the canvas, including enabling or disabling its display, checking if it is currently shown or hidden, managing its visibility state programmatically, updating rendering based on visible or invisible conditions, and handling show/hide functionality for paths or shapes within drawing surfaces or graphical interfaces.
</div>

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
