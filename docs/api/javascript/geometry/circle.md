---
title: Circle
page_title: API reference for methods and fields of Kendo UI Geometry Circle
res_type: api
---

# kendo.geometry.Circle

A circle with set center and radius.

## Example - Creating a circle
        <script>
            var geom = kendo.geometry;
            var center = new geom.Point(10, 10);
            var rect = new geom.Circle(center, 20);
        </script>

## Example - Creating a circle (short syntax)
        <script>
            var geom = kendo.geometry;
            var rect = new geom.Circle([10, 10], 20);
        </script>

## Constructor Parameters

### center `Array|kendo.geometry.Point`
The center point of the circle


<div class="meta-api-description">
Set or configure the placement of a circle by defining its central point coordinates during the creation or initialization phase, enabling precise positioning, alignment, or spatial calculations within a drawing or graphical coordinate system. Specify the origin, anchor point, or center location at construction to control where the circle appears, supporting tasks like geometry setup, layout design, or coordinate-based manipulation right when the shape is instantiated. This central positioning can be adjusted or set to establish reference points for calculations, alignments, or graphical layout from the start of the circle’s lifecycle.
</div>

#### Example - Set circle's coordinates

    <div id="diagram"></div>
    <script>
      let diagram = jQuery("#diagram").kendoDiagram({
        dataSource: [
          { id: 1, name: "Node 1", title: "One" },
          { id: 2, name: "Node 2", title: "Two" },
          { id: 3, name: "Node 3", title: "Three" },
          { id: 4, name: "Node 4", title: "End" }
        ],
        connectionsDataSource: [
          { id: 1, from: 1, to: 2, name: "Connection 1" },
          { id: 2, from: 2, to: 3, name: "Connection 2" },
          { id: 3, from: 3, to: 4, name: "Connection 3" }
        ],
        layout: {
          type: "tree",
          subtype: "right"
        },
        editable: {
          tools: false
        },
        shapeDefaults: {
          visual: function (options) {
            var r = new kendo.dataviz.diagram.Circle({
              radius: 40,
              center: { x: 40, y: 15}
            });
            return r;
          },
          fill: { color: "transparent" },
          stroke: { color: "black", width: 1 },
          hover: {
            fill: "Orange",
          }
        },
        connectionDefaults: {
          type: "polyline",
          editable: {
            tools: false,
          },
          endCap: {
            type: "ArrowEnd",
          },
          stroke: {
            width: 2,
          },
          content: {
            template: "#= name#",
            fontSize: 10,
          }
        },
      }).data("kendoDiagram");
    </script>

### radius `Number`
The radius of the circle


<div class="meta-api-description">
Set or configure the size, scale, or extent of a circle shape by specifying the radius value that determines the distance from the circle’s center point to its outer edge; control the circle’s dimensions during creation or initialization, adjust the circular boundary or circumference based on a non-negative numeric parameter, define how large or small the circular geometry appears within drawing or graphic components, and customize the radius setting to influence rendering size, shape scaling, or spatial footprint in vector or graphical contexts.
</div>

#### Example - Set circle's radius

    <div id="diagram"></div>
    <script>
      let diagram = jQuery("#diagram").kendoDiagram({
        dataSource: [
          { id: 1, name: "Node 1", title: "One" },
          { id: 2, name: "Node 2", title: "Two" },
          { id: 3, name: "Node 3", title: "Three" },
          { id: 4, name: "Node 4", title: "End" }
        ],
        connectionsDataSource: [
          { id: 1, from: 1, to: 2, name: "Connection 1" },
          { id: 2, from: 2, to: 3, name: "Connection 2" },
          { id: 3, from: 3, to: 4, name: "Connection 3" }
        ],
        layout: {
          type: "tree",
          subtype: "right"
        },
        editable: {
          tools: false
        },
        shapeDefaults: {
          visual: function (options) {
            var r = new kendo.dataviz.diagram.Circle({
              radius: 45,
              center: { x: 40, y: 15}
            });
            return r;
          },
          fill: { color: "transparent" },
          stroke: { color: "black", width: 1 },
          hover: {
            fill: "Orange",
          }
        },
        connectionDefaults: {
          type: "polyline",
          editable: {
            tools: false,
          },
          endCap: {
            type: "ArrowEnd",
          },
          stroke: {
            width: 2,
          },
          content: {
            template: "#= name#",
            fontSize: 10,
          }
        },
      }).data("kendoDiagram");
    </script>

## Fields

### center `kendo.geometry.Point`

The location of the circle center.


<div class="meta-api-description">
Control the position or placement of a circle shape by specifying its central point coordinates, center location, or origin within a drawing or graphic component. Configure the circle’s location using coordinate pairs such as x and y values, a point object, or any positional data that defines the circle’s midpoint or centroid. Enable setting, adjusting, or moving where the circle is rendered by defining the exact center point or focal position, supporting various coordinate formats or spatial references to precisely place the circle in a 2D drawing context.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([10, 10], 20);
    console.log(circle.center); // Point {x: 10, y: 10}
    
    // Access center coordinates
    console.log(circle.center.x); // 10
    console.log(circle.center.y); // 10
    </script>


### radius `Number`

The radius of the circle.


<div class="meta-api-description">
Adjust or retrieve the distance from the center point to the edge of a circular shape by configuring or accessing its size parameter, controlling the circle's dimensions dynamically within drawing or graphical components. Enable runtime updates or queries of the circle's radius, set or modify the radius value to scale the circle smoothly, and use this measurement to influence layout, rendering, or interaction boundaries in coordinate-based systems. The radius represents the linear measure defining the circle's spatial extent, useful for geometry calculations, size adjustments, and visual representation changes in graphics or UI frameworks.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([10, 10], 25);
    console.log(circle.radius); // 25
    
    // Create circle with different radius
    var largeCircle = new geom.Circle([0, 0], 50);
    console.log(largeCircle.radius); // 50
    </script>


## Methods

### bbox

Returns the bounding box of this circle after applying the
specified transformation matrix.


<div class="meta-api-description">
Calculate or retrieve the bounding rectangle of a circle after applying a transformation matrix for tasks like collision detection, layout positioning, hit-testing, viewport culling, clipping, or rendering calculations; this function enables configuring precise bounding box dimensions by setting or enabling transformations to determine the updated spatial footprint, optimize collision boundaries, perform hit area detection, or adjust layouts based on rotated, scaled, or translated circles for graphics, UI elements, or game objects.
</div>

#### Parameters

##### matrix `kendo.geometry.Matrix`

Transformation matrix to apply.

#### Returns

`kendo.geometry.Rect` The bounding box after applying the transformation matrix.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([50, 50], 25);
    
    // Get bounding box without transformation
    var matrix = geom.Matrix.unit();
    var boundingBox = circle.bbox(matrix);
    console.log(boundingBox); // Rect with dimensions covering the circle
    
    // Get bounding box with scaling transformation
    var scaleMatrix = geom.Matrix.scale(2, 2);
    var scaledBoundingBox = circle.bbox(scaleMatrix);
    console.log(scaledBoundingBox); // Larger bounding box due to scaling
    </script>


### clone

Creates a new instance with the same center and radius.


<div class="meta-api-description">
Create an exact duplicate of a circular shape with identical center coordinates and radius, enabling you to copy, replicate, or reuse circle geometries separately without affecting the original; this supports cloning circle objects, generating new instances for independent transformations, modifications, or drawing operations where preserving the source shape is essential.
</div>

#### Returns

`kendo.geometry.Circle` A new Circle instance with the same center and radius.

#### Example

    <script>
    var geom = kendo.geometry;
    var originalCircle = new geom.Circle([10, 20], 15);
    var clonedCircle = originalCircle.clone();
    
    console.log(clonedCircle.center.x); // 10
    console.log(clonedCircle.center.y); // 20
    console.log(clonedCircle.radius); // 15
    
    // Verify they are separate instances
    originalCircle.setRadius(30);
    console.log(originalCircle.radius); // 30
    console.log(clonedCircle.radius); // 15 (unchanged)
    </script>


### equals

Compares this circle with another instance.


<div class="meta-api-description">
Check if two circle shapes or geometries are identical by comparing their size, position, and attributes to determine geometric equality; use this method to test, match, verify, or control equivalence of circle objects within drawing, shape comparison, geometry validation, or graphical operations when detecting duplicates, overlaps, or matching circle features across datasets or visual components.
</div>

#### Parameters

##### other `kendo.geometry.Circle`

The circle to compare with.

#### Returns

`Boolean` true if the point coordinates match; false otherwise.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle1 = new geom.Circle([10, 20], 15);
    var circle2 = new geom.Circle([10, 20], 15);
    var circle3 = new geom.Circle([10, 20], 20);
    var circle4 = new geom.Circle([5, 20], 15);
    
    console.log(circle1.equals(circle2)); // true (same center and radius)
    console.log(circle1.equals(circle3)); // false (different radius)
    console.log(circle1.equals(circle4)); // false (different center)
    </script>


### getCenter

Gets the circle center location.


<div class="meta-api-description">
Retrieve the coordinates of a circle’s central point to perform tasks like positioning elements, aligning shapes, calculating offsets, determining bounding areas, handling hit-testing, or implementing collision detection by accessing the geometric center point of a circular shape. This can be used to extract the exact center location for transformations such as translations and rotations, for aligning graphical components or UI elements precisely, for spatial calculations including center-based offsets and boundary checks, and for detecting interactions or overlaps based on the circle’s midpoint. Developers searching for ways to get the middle position, centroid, or anchor point of a circle to manipulate or analyze its spatial properties will find this functionality essential.
</div>

#### Returns

`kendo.geometry.Point` The location of the circle center.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([25, 35], 10);
    var centerPoint = circle.getCenter();
    
    console.log(centerPoint.x); // 25
    console.log(centerPoint.y); // 35
    console.log(centerPoint instanceof geom.Point); // true
    </script>


### getRadius

Gets the circle radius.


<div class="meta-api-description">
Accessing or retrieving the radius length, size measurement, or numeric value of a circular shape for purposes such as layout adjustments, rendering dimensions, collision detection, hit-testing, geometric calculations, animation scaling, exporting metrics, or comparing circular dimensions; obtaining the current radius used internally by a geometric circle representation to determine its extent, boundary, or spatial coverage within visual components or graphic computations.
</div>

#### Returns

`Number` The radius of the circle.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([10, 10], 42);
    var radius = circle.getRadius();
    
    console.log(radius); // 42
    console.log(typeof radius); // "number"
    </script>


### pointAt

Gets the location of a point on the circle's circumference at a given angle.


<div class="meta-api-description">
Calculate or retrieve coordinates on a circle’s edge at a specific angle for tasks like positioning objects, visual drawing, vector math, or collision detection by determining the (x,y) point along the circumference relative to the center. Use angle-based queries to find exact locations on circular paths for graphics rendering, geometric computations, or spatial calculations, enabling precise control over points on a round shape for design, layout, or interaction purposes.
</div>

#### Parameters

##### angle `Number`

Angle in decimal degrees. Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

#### Returns

`kendo.geometry.Point` The point on the circle's circumference.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([0, 0], 10);
    
    // Get point at 0 degrees (rightmost point)
    var rightPoint = circle.pointAt(0);
    console.log(rightPoint.x); // 10
    console.log(rightPoint.y); // 0
    
    // Get point at 90 degrees (bottom point)
    var bottomPoint = circle.pointAt(90);
    console.log(Math.round(bottomPoint.x)); // 0
    console.log(Math.round(bottomPoint.y)); // 10
    
    // Get point at 180 degrees (leftmost point)
    var leftPoint = circle.pointAt(180);
    console.log(Math.round(leftPoint.x)); // -10
    console.log(Math.round(leftPoint.y)); // 0
    </script>


### setCenter

Sets the location of the circle center.


<div class="meta-api-description">
Change, update, or move the center position of a circle shape by specifying new coordinates, points, or location objects to reset or redefine its central point during runtime or after initial setup, enabling dynamic repositioning, layout adjustments, and geometry control for circular elements.
</div>

#### Parameters

##### value `kendo.geometry.Point|Array`

The new center Point or equivalent [x, y] array.

#### Returns

`kendo.geometry.Point` The location of the circle center.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([10, 10], 5);
    
    console.log(circle.center.x); // 10
    console.log(circle.center.y); // 10
    
    // Set new center using array notation
    circle.setCenter([25, 30]);
    console.log(circle.center.x); // 25
    console.log(circle.center.y); // 30
    
    // Set new center using Point instance
    var newPoint = new geom.Point(50, 60);
    circle.setCenter(newPoint);
    console.log(circle.center.x); // 50
    console.log(circle.center.y); // 60
    </script>


### setRadius

Sets the circle radius.


<div class="meta-api-description">
Adjust or update the size, radius, or diameter of a circular geometry shape dynamically, programmatically define or modify the circle's dimensions at runtime by specifying a numeric radius value, control or configure the scaling or resizing of a circle object on the fly, change circle size parameters in real-time for rendering updates, modify geometric properties such as radius to influence shape calculations and visual representation, set or override the circle’s boundary measurement after creation, enable dynamic transformations related to the circle’s extent, apply precise radius adjustments for layout, graphics, or geometry computations, manipulate circular dimensions during execution to affect rendering or collision detection, define or reset the radius length to control the circle’s spatial footprint within an environment.
</div>

#### Parameters

##### value `Number`

The new circle radius.

#### Returns

`kendo.geometry.Circle` The current circle instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var circle = new geom.Circle([10, 10], 5);
    
    console.log(circle.radius); // 5
    
    // Set new radius
    var result = circle.setRadius(15);
    console.log(circle.radius); // 15
    console.log(result === circle); // true (returns the same instance)
    
    // Chain method calls
    circle.setRadius(25).setCenter([20, 20]);
    console.log(circle.radius); // 25
    console.log(circle.center.x); // 20
    console.log(circle.center.y); // 20
    </script>

