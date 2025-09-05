---
title: Rect
page_title: API reference for methods and fields of Kendo UI Geometry Rectangle
res_type: api
---

# kendo.geometry.Rect

A rectangle with set origin (top-left corner) and size.

## Example - Creating a rectangle
        <script>
            var geom = kendo.geometry;
            var origin = new geom.Point(10, 10);
            var size = new geom.Size(20, 20);
            var rect = new geom.Rect(origin, size);
        </script>

## Example - Creating a rectangle (short syntax)
        <script>
            var geom = kendo.geometry;
            var rect = new geom.Rect([10, 10], [20, 20]);
        </script>


## Constructor Parameters

### origin `kendo.geometry.Point|Array`

The origin (top-left corner) of the rectangle or equivalent [x, y] array.

#### Example

    <script>
    var geom = kendo.geometry;
    
    // Using Point object
    var origin = new geom.Point(5, 10);
    var rect1 = new geom.Rect(origin, [20, 15]);
    
    // Using array notation
    var rect2 = new geom.Rect([5, 10], [20, 15]);
    
    console.log("Both rectangles have same origin:", rect1.equals(rect2)); // true
    </script>

### size `kendo.geometry.Size|Array`

The size of the rectangle or an equivalent [width, height] array.

#### Example

    <script>
    var geom = kendo.geometry;
    
    // Using Size object
    var size = new geom.Size(25, 35);
    var rect1 = new geom.Rect([0, 0], size);
    
    // Using array notation
    var rect2 = new geom.Rect([0, 0], [25, 35]);
    
    console.log("Both rectangles have same size:", rect1.equals(rect2)); // true
    </script>


## Fields

### origin `kendo.geometry.Point`

The origin (top-left corner) of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 10], [20, 20]);
    
    // Get the origin point
    var origin = rect.origin;
    console.log("Origin x:", origin.x); // 10
    console.log("Origin y:", origin.y); // 10
    </script>

### size `kendo.geometry.Size`

The size of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 10], [20, 30]);
    
    // Get the size
    var size = rect.size;
    console.log("Width:", size.width); // 20
    console.log("Height:", size.height); // 30
    </script>


## Class Methods

### fromPoints

Creates a Rect instance that contains the points given as arguments.

#### Example

    <script>
    var geom = kendo.geometry;
    var point1 = new geom.Point(5, 10);
    var point2 = new geom.Point(20, 5);
    var point3 = new geom.Point(15, 25);
    
    // Create rectangle that contains all points
    var rect = geom.Rect.fromPoints(point1, point2, point3);
    
    console.log("Rectangle origin:", rect.origin.x, rect.origin.y); // 5, 5
    console.log("Rectangle size:", rect.size.width, rect.size.height); // 15, 20
    </script>

#### Parameters

##### pointA `kendo.geometry.Point`

The first point.

##### pointB `kendo.geometry.Point`

The second point.

Multiple arguments are accepted.

#### Returns

`kendo.geometry.Rect` The new Rect instance.


### union

Creates a new Rect instance that encloses the two rectangles given as arguments.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect1 = new geom.Rect([0, 0], [10, 10]);
    var rect2 = new geom.Rect([5, 5], [15, 15]);
    
    // Create union rectangle
    var unionRect = geom.Rect.union(rect1, rect2);
    
    console.log("Union origin:", unionRect.origin.x, unionRect.origin.y); // 0, 0
    console.log("Union size:", unionRect.size.width, unionRect.size.height); // 20, 20
    </script>

#### Parameters

##### rectA `kendo.geometry.Rect`

The first rectangle.

##### rectB `kendo.geometry.Rect`

The second rectangle.

#### Returns

`kendo.geometry.Rect` The new Rect instance.


## Methods

### bbox

Returns the bounding box of this rectangle after applying the
specified transformation matrix.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([0, 0], [10, 10]);
    
    // Create transformation matrix (rotation)
    var matrix = geom.Matrix.rotate(45, [5, 5]);
    
    // Get bounding box after transformation
    var boundingBox = rect.bbox(matrix);
    
    console.log("Bounding box origin:", boundingBox.origin.x.toFixed(2), boundingBox.origin.y.toFixed(2));
    console.log("Bounding box size:", boundingBox.size.width.toFixed(2), boundingBox.size.height.toFixed(2));
    </script>

#### Parameters

##### matrix `kendo.geometry.Matrix`

Transformation matrix to apply.

#### Returns

`kendo.geometry.Rect` The bounding box after applying the transformation matrix.


### bottomLeft

Gets the position of the bottom-left corner of the rectangle.
This is also the rectangle origin

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [30, 40]);
    
    // Get bottom-left corner
    var bottomLeft = rect.bottomLeft();
    
    console.log("Bottom-left x:", bottomLeft.x); // 10
    console.log("Bottom-left y:", bottomLeft.y); // 60 (20 + 40)
    </script>

#### Returns

`kendo.geometry.Point` The position of the bottom-left corner.


### bottomRight

Gets the position of the bottom-right corner of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [30, 40]);
    
    // Get bottom-right corner
    var bottomRight = rect.bottomRight();
    
    console.log("Bottom-right x:", bottomRight.x); // 40 (10 + 30)
    console.log("Bottom-right y:", bottomRight.y); // 60 (20 + 40)
    </script>

#### Returns

`kendo.geometry.Point` The position of the bottom-right corner.


### center

Gets the position of the center of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [30, 40]);
    
    // Get center point
    var center = rect.center();
    
    console.log("Center x:", center.x); // 25 (10 + 30/2)
    console.log("Center y:", center.y); // 40 (20 + 40/2)
    </script>

#### Returns

`kendo.geometry.Point` The position of the center.


### clone

Creates a new instance with the same origin and size.

#### Example

    <script>
    var geom = kendo.geometry;
    var originalRect = new geom.Rect([10, 20], [30, 40]);
    
    // Clone the rectangle
    var clonedRect = originalRect.clone();
    
    console.log("Original equals clone:", originalRect.equals(clonedRect)); // true
    console.log("Same instance:", originalRect === clonedRect); // false
    </script>

#### Returns

`kendo.geometry.Rect` A new Rect instance with the same origin and size.


### equals

Compares this rectangle with another instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect1 = new geom.Rect([10, 20], [30, 40]);
    var rect2 = new geom.Rect([10, 20], [30, 40]);
    var rect3 = new geom.Rect([5, 15], [30, 40]);
    
    console.log("rect1 equals rect2:", rect1.equals(rect2)); // true
    console.log("rect1 equals rect3:", rect1.equals(rect3)); // false
    </script>

#### Parameters

##### other `kendo.geometry.Rect`

The rectangle to compare with.

#### Returns

`Boolean` true if the origin and size is the same for both rectangles; false otherwise.


### getOrigin

Gets the origin (top-left point) of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([15, 25], [20, 30]);
    
    // Get the origin point
    var origin = rect.getOrigin();
    
    console.log("Origin x:", origin.x); // 15
    console.log("Origin y:", origin.y); // 25
    console.log("Same as rect.origin:", origin.equals(rect.origin)); // true
    </script>

#### Returns

`kendo.geometry.Point` The origin (top-left point).


### getSize

Gets the rectangle size.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [25, 35]);
    
    // Get the size
    var size = rect.getSize();
    
    console.log("Width:", size.width); // 25
    console.log("Height:", size.height); // 35
    console.log("Same as rect.size:", size.equals(rect.size)); // true
    </script>

#### Returns

`kendo.geometry.Size` The current rectangle Size.


### height

Gets the rectangle height.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [25, 35]);
    
    // Get the height
    var height = rect.height();
    
    console.log("Rectangle height:", height); // 35
    console.log("Same as size height:", height === rect.size.height); // true
    </script>

#### Returns

`Number` The rectangle height.


### setOrigin

Sets the origin (top-left point) of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [25, 35]);
    
    console.log("Original origin:", rect.origin.x, rect.origin.y); // 10, 20
    
    // Set new origin using Point object
    rect.setOrigin(new geom.Point(5, 15));
    console.log("New origin:", rect.origin.x, rect.origin.y); // 5, 15
    
    // Set origin using array notation
    rect.setOrigin([0, 0]);
    console.log("Final origin:", rect.origin.x, rect.origin.y); // 0, 0
    </script>

#### Parameters

##### value `kendo.geometry.Point|Array`

The new origin Point or equivalent [x, y] array.

#### Returns

`kendo.geometry.Rect` The current rectangle instance.


### setSize

Sets the rectangle size.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [25, 35]);
    
    console.log("Original size:", rect.size.width, rect.size.height); // 25, 35
    
    // Set new size using Size object
    rect.setSize(new geom.Size(40, 50));
    console.log("New size:", rect.size.width, rect.size.height); // 40, 50
    
    // Set size using array notation
    rect.setSize([60, 70]);
    console.log("Final size:", rect.size.width, rect.size.height); // 60, 70
    </script>

#### Parameters

##### value `kendo.geometry.Size|Array`

The new rectangle Size or equivalent [width, height] array.

#### Returns

`kendo.geometry.Rect` The current rectangle instance.


### topLeft

Gets the position of the top-left corner of the rectangle.
This is also the rectangle origin

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [30, 40]);
    
    // Get top-left corner
    var topLeft = rect.topLeft();
    
    console.log("Top-left x:", topLeft.x); // 10
    console.log("Top-left y:", topLeft.y); // 20
    console.log("Same as origin:", topLeft.equals(rect.origin)); // true
    </script>

#### Returns

`kendo.geometry.Point` The position of the top-left corner.


### topRight

Gets the position of the top-right corner of the rectangle.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [30, 40]);
    
    // Get top-right corner
    var topRight = rect.topRight();
    
    console.log("Top-right x:", topRight.x); // 40 (10 + 30)
    console.log("Top-right y:", topRight.y); // 20
    </script>

#### Returns

`kendo.geometry.Point` The position of the top-right corner.


### width

Gets the rectangle width.

#### Example

    <script>
    var geom = kendo.geometry;
    var rect = new geom.Rect([10, 20], [25, 35]);
    
    // Get the width
    var width = rect.width();
    
    console.log("Rectangle width:", width); // 25
    console.log("Same as size width:", width === rect.size.width); // true
    </script>

#### Returns

`Number` The rectangle width.

