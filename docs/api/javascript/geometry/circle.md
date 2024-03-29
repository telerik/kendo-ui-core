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


### radius `Number`

The radius of the circle.


## Methods

### bbox

Returns the bounding box of this circle after applying the
specified transformation matrix.

#### Parameters

##### matrix `kendo.geometry.Matrix`

Transformation matrix to apply.

#### Returns

`kendo.geometry.Rect` The bounding box after applying the transformation matrix.


### clone

Creates a new instance with the same center and radius.

#### Returns

`kendo.geometry.Circle` A new Circle instance with the same center and radius.


### equals

Compares this circle with another instance.

#### Parameters

##### other `kendo.geometry.Circle`

The circle to compare with.

#### Returns

`Boolean` true if the point coordinates match; false otherwise.


### getCenter

Gets the circle center location.

#### Returns

`kendo.geometry.Point` The location of the circle center.


### getRadius

Gets the circle radius.

#### Returns

`Number` The radius of the circle.


### pointAt

Gets the location of a point on the circle's circumference at a given angle.

#### Parameters

##### angle `Number`

Angle in decimal degrees. Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

#### Returns

`kendo.geometry.Point` The point on the circle's circumference.


### setCenter

Sets the location of the circle center.

#### Parameters

##### value `kendo.geometry.Point|Array`

The new center Point or equivalent [x, y] array.

#### Returns

`kendo.geometry.Point` The location of the circle center.


### setRadius

Sets the circle radius.

#### Parameters

##### value `Number`

The new circle radius.

#### Returns

`kendo.geometry.Circle` The current circle instance.

