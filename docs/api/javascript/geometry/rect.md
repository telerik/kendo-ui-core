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


<div class="meta-api-description">
Set or define the starting position, top-left corner coordinates, or initial point of a rectangle shape within drawing or graphics contexts by specifying its origin using an array of two numeric values representing x and y positions, controlling placement, layout alignment, or offset of the rectangular area in 2D coordinate space, enabling precise positioning for shapes, bounding boxes, or graphical elements in visual compositions and designs.
</div>

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


<div class="meta-api-description">
Specify or set rectangle dimensions by providing width and height values either as separate numbers or a pair in an array format to control the size of a geometric rectangle during its creation, initialize rectangle size with exact width and height parameters, configure the dimensions for a rect object in drawing operations, define the width and height for a rectangle when constructing geometry, input size data as numbers or arrays to determine the overall shape dimensions, adjust and set rectangle size at instantiation, pass width and height values to establish geometric rect measurements, enable dimension configuration through numeric or array parameters for rectangle initialization, control the size attributes of a rectangle shape on object creation, and provide size inputs to customize the rectangular geometry from the start.
</div>

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


<div class="meta-api-description">
Set or retrieve the position coordinates of a rectangle's top-left corner within a drawing or graphical component by accessing or modifying the origin point values such as x and y; control, move, or update the rectangle placement on a canvas or layout by changing these location properties, enabling precise positioning, alignment, or relocation of rectangular shapes in graphical interfaces, UI elements, or custom drawings through direct manipulation of coordinate fields representing the shape's anchor or starting point.
</div>

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


<div class="meta-api-description">
Configure, retrieve, or update the width and height dimensions of rectangular shapes within drawing tools, control shape size parameters, adjust rectangle measurements dynamically, set or get shape boundaries using size properties, manipulate geometric dimensions such as width and height, handle rectangle scaling or resizing through size attributes, define layout bounds for shapes, access or modify the size field to influence shape geometry, and manage shape dimensions in graphical components or interfaces.
</div>

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


<div class="meta-api-description">
Calculate or generate the smallest bounding rectangle that encloses a set of given coordinates or points, enabling tasks like determining bounding boxes for shapes, aligning elements within a drawing area, clipping graphical content, detecting collisions between geometry, or computing extents from multiple positions. This method takes any number of coordinate points and returns a rectangle that tightly fits around all input points, supporting use cases involving spatial alignment, area selection, overlap checks, or dynamic layout calculations within graphics or UI programming.
</div>

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


<div class="meta-api-description">
Calculate the combined bounding area that encompasses two rectangular regions by merging their coordinates into a single rectangle covering both without modifying the original shapes, useful for determining layout boundaries, overlapping bounds, hit-testing zones, collision detection areas, and spatial calculations involving multiple rectangles in drawing or UI components, enabling configuration of merged rectangles, union of geometric bounds, and controlling composite rectangle dimensions efficiently.
</div>

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


<div class="meta-api-description">
Calculate or retrieve the axis-aligned bounding box of a rectangle after applying transformations like rotation, scaling, translation, or skewing for tasks such as layout calculations, collision detection, hit-testing, or spatial queries. Use transformation matrices to obtain the exact transformed extents, rendering boundaries, clipping regions, or spatial limits of shapes in different coordinate spaces, enabling control over visual bounds and interactive element placement after modification. This method helps determine precise rectangle bounds in transformed coordinate systems for accurate layout, rendering, interaction, or physics calculations.
</div>

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


<div class="meta-api-description">
Retrieve or calculate the coordinates of the lower-left corner or origin point of a rectangular shape to use for positioning, alignment, anchoring, transformations, collision checks, layout placement, or rendering calculations. This method or function extracts the bottom-left vertex position from a rectangle’s geometry, enabling developers to control placement, detect overlaps, determine exact origin points, set anchors, or adjust rendering based on that corner in 2D space or graphical components. It is useful for geometrical computations involving the rectangle’s starting coordinate, spatial organization, or shape manipulation in drawing or UI frameworks.
</div>

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


<div class="meta-api-description">
Retrieve or calculate the lower-right corner coordinates of a rectangle shape for graphical layout, positioning, hit testing, collision detection, bounding box calculations, coordinate extraction, and passing precise corner points in drawing or UI rendering contexts, enabling control over rectangle edges, corner points, dimensions, and spatial relationships for responsive design, collision logic, or interactive element placement.
</div>

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


<div class="meta-api-description">
Calculate or obtain the central point coordinates, midpoint, or geometric center of a rectangle shape to determine its position for alignment, rotation pivots, transformations, hit detection, layout placement, or relative positioning of other graphical elements in drawing or UI frameworks. Access or set the rectangle’s center location to facilitate spatial computations, center-based adjustments, coordinate retrieval, or anchor point calculations when working with rectangular geometry in graphical components.
</div>

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


<div class="meta-api-description">
Create a duplicate rectangle with identical position and dimensions, enabling independent modification, resizing, or transformation without altering the original shape or its coordinates. This process supports workflows where you need to copy bounding boxes, clone geometric regions, replicate rectangle properties for drawing operations, generate independent area copies for calculations, or manipulate rectangle instances separately for layout and graphic transformations. Use cases include duplicating rectangles for safe edits, creating snapshots of geometry states, or preserving the source while applying changes to copies in graphical programming and spatial computations.
</div>

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


<div class="meta-api-description">
Compare two rectangle shapes for exact coordinate and size equality, check if rectangles match or are identical, verify if geometric boundaries overlap perfectly, test for rectangle duplication or sameness in drawing or shape manipulation, determine if two rectangle objects represent the same area or dimensions, validate rectangle equality in graphical components, confirm matching rectangle coordinates and sizes programmatically, detect if rectangles share the same position and width/height values, enable precise shape comparison and validation for rectangles, assess duplicates or equivalence of rectangular geometries.
</div>

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


<div class="meta-api-description">
Obtain the starting coordinates or top-left corner point of a rectangle to determine its origin for use in positioning, alignment, translation, bounding box calculations, hit-testing, or layout adjustments. Retrieve or access the initial X and Y values representing the rectangle’s reference point for geometry operations, coordinate mapping, UI placement, or offset calculations within drawing or graphical components. Extract the rectangle’s origin point dynamically during runtime to control spatial arrangements, alignment anchors, or shape transformations in rendering contexts.
</div>

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


<div class="meta-api-description">
Retrieve, calculate, or obtain the width and height measurements, dimensions, or bounding box size of a rectangle shape within drawing or graphics contexts, enabling you to measure, compare, position, layout, resize, scale, or manipulate rectangular areas programmatically by extracting current bounds, overall size, width and height values, or geometric extents for shapes and components.
</div>

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


<div class="meta-api-description">
Get the numeric vertical size or height dimension of a rectangle shape for layout calculations, measurement, bounding box evaluation, serialization, or shape export; retrieve the rectangle’s height value from geometric data, access current height for rendering or comparison purposes, query the rectangle’s vertical extent in drawing, UI arrangement, or graphical component contexts, obtain shape height for positioning, resizing, or programmatic manipulation scenarios, and extract the height dimension from shape objects used in drawing workflows or coordinate geometry operations.
</div>

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


<div class="meta-api-description">
Adjust the placement or position of a rectangle shape by specifying its new top-left corner coordinates, enabling control over its location within a drawing area or canvas. Configure, update, or reposition the rectangle’s anchor point to move it precisely, set its origin point to control layout and rendering position, and shift the rectangle’s location based on custom coordinate inputs for dynamic placement, alignment, or spatial adjustments in graphical interfaces.
</div>

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


<div class="meta-api-description">
Adjust, update, modify, or resize a rectangle’s width and height dynamically within a drawing or graphical component to control layout, measurement, hit-testing, or rendering behavior; change bounding box dimensions after creation to reflect new size instantly; configure rectangle size for accurate geometry calculations, collision detection, UI layout adjustments, or visual updates by setting width and height values programmatically using methods that manipulate shape dimensions in real time.
</div>

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


<div class="meta-api-description">
Retrieve the x and y coordinates of the rectangle’s top-left corner position, origin point, or initial layout reference to enable alignment, offset calculations, positioning, anchoring, or transform operations based on the rectangle’s upper left boundary. Access the geometric origin, top-left corner location, or starting coordinate for precise placement, child element arrangement, layout adjustments, or origin-based transformations involving rectangles, bounding boxes, or coordinate systems.
</div>

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


<div class="meta-api-description">
Retrieve or calculate the coordinates of the top-right corner of a rectangular shape for purposes such as positioning UI elements, aligning graphics, setting anchor points, detecting collisions, or performing transformations in drawing contexts. Access, get, or obtain the upper-right corner location to precisely control layout, adjust element placement, calculate bounding boxes, or determine corner positions within various coordinate systems. This method supports use cases involving layout adjustment, graphic alignment, spatial calculations, and object manipulation where exact corner coordinates are needed.
</div>

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


<div class="meta-api-description">
Obtain the numeric horizontal size or extent of a rectangle shape, measure the current rectangle width for layout calculations, determining element alignment, or computing bounding dimensions, retrieve the actual width value for positioning and sizing tasks, access the rectangle’s width dimension dynamically at runtime, calculate hit areas or interactive zones based on the horizontal span, extract the width measurement for responsive design adjustments, get the size along the X-axis of a rectangular geometry, query the rectangle’s width property to inform rendering or spatial decisions, and control or modify layout by fetching the precise width from a geometric rectangle instance.
</div>

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

