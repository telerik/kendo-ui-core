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
