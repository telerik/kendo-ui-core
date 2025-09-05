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

