---
title: Arc
page_title: API reference for methods and fields of Kendo UI Geometry Arc
res_type: api
---

# kendo.geometry.Arc

Represents an arc with set center, direction, angular range and x/y radius.

## Example - Creating an arc
        <script>
            var geom = kendo.geometry;
            var center = [10, 10];
            var arc = new geom.Arc(center, {
                radiusX: 10,
                radiusY: 5,
                startAngle: 90,
                endAngle: 270,
                anticlockwise: false
            });
        </script>

## Constructor Parameters

### center `Array|kendo.geometry.Point`
The center point of the arc


<div class="meta-api-description">
Specify or configure the central point or origin coordinates for an arc shape during creation, defining where the arc is positioned, its pivot or center of rotation, and the reference point for measuring radius and angles within drawing or graphical components. Control, set, or provide the center location as coordinate pairs, point objects, or similar data types to determine the arc’s spatial placement, shape alignment, curvature origin, and exact drawing position on canvas or graphics contexts. Adjusting this central parameter affects how the arc geometry is rendered, how radius is computed, and how angular measurements are applied for accurate visual representation.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var center = [50, 50];
    var arc = new geom.Arc(center, {
        radiusX: 20,
        radiusY: 15,
        startAngle: 0,
        endAngle: 90
    });
    console.log(arc.center); // Point at (50, 50)
    </script>

### options `Object`
The options that describe the arc


<div class="meta-api-description">
Define or customize arc shape parameters such as size, radius, position, start and end angles, curvature, and orientation when initializing an arc geometry. Set or configure arc dimensions, angles, and related geometric properties during creation to control the appearance and shape precisely. Enable specifying arc-related attributes at construction time to shape, position, and style the arc segment effectively. Adjust parameters affecting the arc's curve, radius, and placement to tailor the geometry on instantiation, supporting detailed control over arc formation from the start.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var center = [30, 30];
    var options = {
        radiusX: 25,
        radiusY: 15,
        startAngle: 45,
        endAngle: 225,
        anticlockwise: true
    };
    var arc = new geom.Arc(center, options);
    console.log(arc.startAngle); // 45
    </script>

## Fields

### anticlockwise `Boolean` *(default: false)*

A flag indicating if the arc should be drawn in clockwise or anticlockwise direction.
Defaults to clockwise direction.


<div class="meta-api-description">
Adjust or configure the arc's drawing direction to render curves in a clockwise or counterclockwise path, enabling control over rotational orientation during shape or path rendering, setting the arc to sweep forward or backward along its path, manipulating drawing flow for arcs, controlling rotation direction for geometric curves, toggling between clockwise and anticlockwise rendering modes, specifying arc traversal to be reversed or standard direction, enabling counter-rotational arc drawing, choosing the sweep direction of circular segments, and managing how the arc path is drawn in graphic or canvas operations.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var center = [40, 40];
    var arc = new geom.Arc(center, {
        radiusX: 20,
        radiusY: 20,
        startAngle: 0,
        endAngle: 180,
        anticlockwise: true
    });
    console.log(arc.anticlockwise); // true
    </script>


### center `kendo.geometry.Point`

The location of the arc center.


<div class="meta-api-description">
Configure or retrieve the central point that defines the arc’s position within a drawing or graphical layout, enabling placement, movement, or translation of the arc by specifying its midpoint coordinates. This anchor point is essential for calculating the arc’s geometry, rendering its shape accurately, and supports dynamic updates to reposition the arc or bind its location for layout adjustments, transformations, or interactive manipulations in graphical components or drawing contexts.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([60, 80], {
        radiusX: 15,
        radiusY: 10,
        startAngle: 90,
        endAngle: 270
    });
    console.log(arc.center.x); // 60
    console.log(arc.center.y); // 80
    </script>


### endAngle `Number`

The end angle of the arc in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.


<div class="meta-api-description">
Adjust, configure, or retrieve the final angle defining the sweep of a circular arc shape, specifying the end boundary of the arc in decimal degrees with clockwise measurement starting at 0° pointing right; supports setting angles beyond standard ranges by normalizing negative or over-360° values into the full circle range, enabling precise control over arc length, curvature, and segment positioning within graphical or drawing components that manipulate arc geometry dynamically.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([50, 50], {
        radiusX: 30,
        radiusY: 20,
        startAngle: 45,
        endAngle: 315
    });
    console.log(arc.endAngle); // 315
    </script>


### radiusX `Number`

The x radius of the arc.


<div class="meta-api-description">
Control or set the horizontal radius, width, or x-axis size of an elliptical or circular arc shape in graphic drawing contexts, enabling adjustment of the arc’s horizontal span, scale, or size within 2D drawing coordinates; manage or retrieve the arc’s horizontal radius parameter to shape the arc’s width, configure elliptical arcs by pairing this value with vertical radius and center coordinates, and customize arc dimensions for rendering smooth, precise curves along the x-axis in vector or canvas-based graphics.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([100, 100], {
        radiusX: 40,
        radiusY: 25,
        startAngle: 0,
        endAngle: 180
    });
    console.log(arc.radiusX); // 40
    </script>


### radiusY `Number`

The y radius of the arc.


<div class="meta-api-description">
Adjust, configure, or retrieve the vertical radius value defining the curvature height of an arc shape in graphical or drawing components, enabling control over how tall or narrow the arc appears along the y-axis, with capabilities for setting the arc's vertical stretch, scaling the arc’s height, or fine-tuning its vertical dimension during rendering or layout processes.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([80, 60], {
        radiusX: 30,
        radiusY: 50,
        startAngle: 90,
        endAngle: 360
    });
    console.log(arc.radiusY); // 50
    </script>


### startAngle `Number`

The start angle of the arc in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.


<div class="meta-api-description">
Control or specify the initial rotation angle where an arc begins drawing, set the angle in degrees with clockwise measurement starting at zero degrees pointing right, adjust the starting position of the arc by configuring or reading the rotation value, handle angles beyond standard ranges by normalizing negative or values above 360 degrees to standard positions, define or modify the start angle to rotate or align arcs precisely in graphics or drawing components, set, get, or normalize arc rotation angles measured in decimal degrees for accurate rendering placement.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([70, 70], {
        radiusX: 35,
        radiusY: 25,
        startAngle: 120,
        endAngle: 300
    });
    console.log(arc.startAngle); // 120
    </script>


## Methods

### bbox

Returns the bounding box of this arc after applying the specified transformation matrix.


<div class="meta-api-description">
Calculate or retrieve the transformed bounding box of an arc shape by applying a specified transformation matrix, enabling determination of spatial extents after scaling, rotating, or translating the arc; useful for collision detection, hit testing, clipping regions, layout computations, graphical exports, and converting arc coordinates into the transformed coordinate space to get accurate bounds under any transform configuration or geometric modification.
</div>

#### Parameters

##### matrix `kendo.geometry.Matrix`

Transformation matrix to apply.

#### Returns

`kendo.geometry.Rect` The bounding box after applying the transformation matrix.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([50, 50], {
        radiusX: 20,
        radiusY: 15,
        startAngle: 0,
        endAngle: 180
    });
    var matrix = geom.Matrix.unit();
    var boundingBox = arc.bbox(matrix);
    console.log(boundingBox); // Rect with the bounding box coordinates
    </script>


### getAnticlockwise

Gets the arc anticlockwise flag.


<div class="meta-api-description">
Determine if a curve or arc segment is oriented in a counterclockwise direction by querying its directional flag, enabling directional checks for rendering, hit-testing, geometry processing, or path adjustments; useful for controlling angle calculations, winding order, shape orientation, drawing logic, conditional path updates, and verifying arc rotation whether counterclockwise or clockwise in vector graphics, geometry utilities, or UI components that handle curved paths and segments.
</div>

#### Returns

`Boolean` The anticlockwise flag of the arc.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([40, 40], {
        radiusX: 20,
        radiusY: 20,
        startAngle: 0,
        endAngle: 90,
        anticlockwise: true
    });
    var isAnticlockwise = arc.getAnticlockwise();
    console.log(isAnticlockwise); // true
    </script>


### getCenter

Gets the arc center location.


<div class="meta-api-description">
Retrieve the central coordinates or midpoint of a curved arc shape to determine its exact center for tasks such as positioning elements, aligning graphics, performing rotations, running collision or hit-tests, calculating geometry parameters, or applying transformations. Obtain the arc’s center point location for use in rendering layouts, spatial calculations, rotational pivots, or intersection detections, enabling effective control, manipulation, and measurement of arcs within graphics or UI components.
</div>

#### Returns

`kendo.geometry.Point` The location of the arc center.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([75, 85], {
        radiusX: 25,
        radiusY: 15,
        startAngle: 45,
        endAngle: 135
    });
    var center = arc.getCenter();
    console.log(center.x); // 75
    console.log(center.y); // 85
    </script>


### getEndAngle

Gets the end angle of the arc in decimal degrees.
Measured in clockwise direction with 0 pointing "right".


<div class="meta-api-description">
Retrieve the final angle of a circular arc to determine where it ends along its path, access the end point angle for rendering arcs, perform hit-testing or spatial calculations, get the precise angular measurement in degrees moving clockwise from zero degrees on the positive x-axis, compute or analyze arc geometry endpoints, extract the arc's terminating angle for alignment or layout purposes, configure arc boundaries by fetching the endpoint angle, convert arc endpoints into usable coordinates based on the terminating degree value, and enable calculations involving arc end positions in 2D graphical contexts.
</div>

#### Returns

`Number` The end angle of the arc.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([90, 60], {
        radiusX: 30,
        radiusY: 20,
        startAngle: 30,
        endAngle: 240
    });
    var endAngle = arc.getEndAngle();
    console.log(endAngle); // 240
    </script>


### getRadiusX

Gets the x radius of the arc.


<div class="meta-api-description">
Retrieve or measure the horizontal radius of an arc shape for layout calculations, collision detection, animation scaling, or rendering adjustments by accessing the arc’s x-direction radius value from drawing geometry. Extract, query, or read the arc’s horizontal curvature dimension to configure or control arcs in graphics, shapes, or vector designs, useful for positioning, resizing, transforming, or calculating bounds in visual components and animation sequences.
</div>

#### Returns

`Number` The x radius of the arc.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([45, 55], {
        radiusX: 35,
        radiusY: 20,
        startAngle: 0,
        endAngle: 120
    });
    var radiusX = arc.getRadiusX();
    console.log(radiusX); // 35
    </script>


### getRadiusY

Gets the y radius of the arc.


<div class="meta-api-description">
Access or calculate the vertical radius of an arc shape for tasks like layout adjustments, rendering dimensions, collision detection, or measurement operations within vector graphics and drawing contexts. Retrieve, obtain, or determine the Y-axis radius value of curved geometry to assist with shape sizing, drawing calculations, arc manipulation, or graphical computations involving arcs and elliptical paths. Use this to control, measure, or analyze the vertical curvature radius in custom rendering, hit-testing, or graphical layout scenarios where precise arc dimensions are required.
</div>

#### Returns

`Number` The y radius of the arc.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([65, 45], {
        radiusX: 25,
        radiusY: 40,
        startAngle: 60,
        endAngle: 300
    });
    var radiusY = arc.getRadiusY();
    console.log(radiusY); // 40
    </script>


### getStartAngle

Gets the start angle of the arc in decimal degrees.
Measured in clockwise direction with 0 pointing "right".


<div class="meta-api-description">
Access or obtain the initial angle or starting rotation of a curved arc shape measured in degrees, enabling retrieval of the arc’s baseline orientation or start position in decimal degrees clockwise from zero degrees pointing right; useful for calculating rotations, detecting pointer hits on arc edges, adjusting layout placements, converting degrees to radians for trigonometric functions, setting or reading angular positioning, controlling segment orientation in drawings, or extracting numeric angle values for geometric computations and display alignment.
</div>

#### Returns

`Number` The start angle of the arc.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([55, 65], {
        radiusX: 28,
        radiusY: 18,
        startAngle: 150,
        endAngle: 330
    });
    var startAngle = arc.getStartAngle();
    console.log(startAngle); // 150
    </script>


### pointAt

Gets the location of a point on the arc's circumference at a given angle.


<div class="meta-api-description">
Calculate the exact coordinates of a point located on the curve of an arc by specifying an angle, enabling precise placement of markers, labels, or interaction targets along the arc line; retrieve the position for hit detection, alignment, or drawing overlays by inputting degrees or radians to get the spatial point on the arc’s perimeter in coordinate space, supporting tasks like positioning elements relative to arc shape, mapping points along curved geometry, and customizing UI components based on arc locations.
</div>

#### Parameters

##### angle `Number`

Angle in decimal degrees. Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

#### Returns

`kendo.geometry.Point` The point on the arc's circumference.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([50, 50], {
        radiusX: 30,
        radiusY: 20,
        startAngle: 0,
        endAngle: 180
    });
    var point = arc.pointAt(90);
    console.log(point.x); // x coordinate at 90 degrees
    console.log(point.y); // y coordinate at 90 degrees
    </script>


### setAnticlockwise

Sets the arc anticlockwise flag.


<div class="meta-api-description">
Control the direction in which an arc is drawn by configuring the drawing orientation to be clockwise or counterclockwise, enabling developers to set or toggle the arc's sweep direction using boolean flags, adjust path generation flow for arcs, reverse angle calculations, specify anticlockwise or clockwise rendering behaviors, and influence how geometric arcs are constructed or rendered in vector paths or graphics components through direction flags or state settings.
</div>

#### Parameters

##### value `Boolean`

The new anticlockwise value.

#### Returns

`kendo.geometry.Arc` The current arc instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([40, 40], {
        radiusX: 25,
        radiusY: 15,
        startAngle: 0,
        endAngle: 180,
        anticlockwise: false
    });
    arc.setAnticlockwise(true);
    console.log(arc.anticlockwise); // true
    </script>


### setCenter

Sets the arc center location.


<div class="meta-api-description">
Update or change the central point of an arc by assigning new coordinates or a point object to reposition and realign the arc within a drawing or graphical layout, enabling control over its placement, translation, alignment, or recalculating its geometry to modify visual rendering and spatial arrangement dynamically.
</div>

#### Parameters

##### value `kendo.geometry.Point`

The new arc center.

#### Returns

`kendo.geometry.Arc` The current arc instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([30, 30], {
        radiusX: 20,
        radiusY: 15,
        startAngle: 45,
        endAngle: 225
    });
    var newCenter = new geom.Point(80, 90);
    arc.setCenter(newCenter);
    console.log(arc.center.x); // 80
    console.log(arc.center.y); // 90
    </script>


### setEndAngle

Sets the end angle of the arc in decimal degrees.
Measured in clockwise direction with 0 pointing "right".


<div class="meta-api-description">
Adjust or configure the ending angle of a curved arc shape by specifying the desired angle in degrees, enabling control over the arc's final position, rotation, or trimming by setting the endpoint along the circumference measured clockwise from the horizontal right direction at zero degrees; this is useful for modifying or animating partial circle segments, customizing arc geometry, or dynamically updating curve endpoints through numeric angle input in decimal degrees.
</div>

#### Parameters

##### value `Number`

The new arc end angle.

#### Returns

`kendo.geometry.Arc` The current arc instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([60, 70], {
        radiusX: 30,
        radiusY: 20,
        startAngle: 0,
        endAngle: 90
    });
    arc.setEndAngle(270);
    console.log(arc.endAngle); // 270
    </script>


### setRadiusX

Sets the x radius of the arc.


<div class="meta-api-description">
Change or configure the horizontal radius or x-radius of an arc shape in drawing or graphics components, enabling dynamic resizing of the arc’s width during runtime. Set, update, control, or modify the arc’s horizontal curvature, adjust the rx value, or programmatically widen or narrow the arc geometry after it has been created. Useful for animations, interactive graphics, shape transformations, or any scenario requiring on-the-fly adjustment of arc dimensions along the x-axis.
</div>

#### Parameters

##### value `Number`

The new arc x radius.

#### Returns

`kendo.geometry.Arc` The current arc instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([50, 50], {
        radiusX: 20,
        radiusY: 15,
        startAngle: 30,
        endAngle: 150
    });
    arc.setRadiusX(45);
    console.log(arc.radiusX); // 45
    </script>


### setRadiusY

Sets the y radius of the arc.


<div class="meta-api-description">
Adjust or configure the vertical radius, height, or curvature of an arc shape by setting or updating its y-axis radius value, enabling control over the arc's vertical curve intensity, scale, or dimension within graphic or drawing components; modify, reset, or change the arc’s vertical size dynamically to influence rendering, geometry scaling, or shape appearance based on numeric input for precise control of vertical curvature effects.
</div>

#### Parameters

##### value `Number`

The new arc y radius.

#### Returns

`kendo.geometry.Arc` The current arc instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([70, 60], {
        radiusX: 25,
        radiusY: 20,
        startAngle: 60,
        endAngle: 240
    });
    arc.setRadiusY(35);
    console.log(arc.radiusY); // 35
    </script>


### setStartAngle

Sets the start angle of the arc in decimal degrees.
Measured in clockwise direction with 0 pointing "right".


<div class="meta-api-description">
Adjust, define, or configure the starting point of an arc shape by setting its initial angle in decimal degrees, where zero degrees points to the right and angles increase clockwise; control or update the arc’s start angle dynamically for rendering or manipulation by specifying a numeric value to rotate or reposition the arc’s beginning precisely, enabling customization of arc geometry, angular positioning, clockwise rotation settings, and visual segment alignment in graphical components or drawing contexts.
</div>

#### Parameters

##### value `Number`

The new arc start angle.

#### Returns

`kendo.geometry.Arc` The current arc instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var arc = new geom.Arc([80, 50], {
        radiusX: 30,
        radiusY: 25,
        startAngle: 0,
        endAngle: 180
    });
    arc.setStartAngle(45);
    console.log(arc.startAngle); // 45
    </script>
