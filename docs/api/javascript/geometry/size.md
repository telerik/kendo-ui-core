---
title: Size
page_title: API reference for methods and fields of Kendo UI Geometry Size
res_type: api
---

# kendo.geometry.Size

Represents the width and height of an entity.

## Example - Creating a size
        <script>
            var geom = kendo.geometry;
            var size = new geom.Size(10, 20);
        </script>

## Fields

### width `Number`

The horizontal size.


<div class="meta-api-description">
Control, configure, or retrieve the horizontal measurement, length, or width value used for layout, rendering, resizing, or drawing calculations of a size or dimension object, enabling adjustments to the horizontal extent, breadth, or span in graphical or UI components; set or get the horizontal size parameter, manipulate width properties for responsive design, dynamic scaling, dimension computation, or visual element sizing in drawing or display contexts.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(100, 50);
    console.log(size.width); // logs 100
    </script>


### height `Number`

The vertical size.


<div class="meta-api-description">
Control or retrieve the vertical measurement, height, to adjust or configure the component’s vertical size, dimension, or layout height value in drawing, UI design, or geometry calculations. Set, modify, access, or define the component’s height property to influence its tallness, vertical scale, or bounding box dimension for rendering, sizing, or positioning purposes. Use height to manage, customize, or manipulate the vertical extent or length when adjusting size, container height, or element layout in graphics, canvas, or user interface contexts.
</div>

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(100, 50);
    console.log(size.height); // logs 50
    </script>

## Class Methods

### create

Creates a Size instance from various parameters.


<div class="meta-api-description">
Generate or instantiate a standardized size object for layouts, measurements, or graphics by creating a new size instance from diverse input formats including numeric width and height values, arrays, or configuration objects; configure, set, or normalize dimensions to a consistent size representation suitable for layout calculations, drawing operations, scaling, or rendering workflows, enabling flexible creation of size entities from different parameter types and supporting various ways to specify width and height measurements for precise control over sizing in graphical or UI development contexts.
</div>

#### Parameters

##### width `Number|Array|kendo.geometry.Size`

Any of the following values:

* The width value.
* An array of width and height values.
* An existing Size instance.

##### height `Number`

The height value. Required only if the first argument is a number.

#### Returns

`kendo.geometry.Size` The new or supplied Size instance.

#### Example

    <script>
    var geom = kendo.geometry;
    
    // Create from width and height values
    var size1 = geom.Size.create(100, 50);
    console.log(size1.width); // logs 100
    
    // Create from array
    var size2 = geom.Size.create([200, 150]);
    console.log(size2.height); // logs 150
    
    // Create from existing Size instance
    var size3 = geom.Size.create(size1);
    console.log(size3.equals(size1)); // logs true
    </script>


## Methods

### clone

Creates a new instance with the same width and height.


<div class="meta-api-description">
Generate an exact duplicate of a size object that replicates width and height dimensions independently, enabling you to copy sizing data without altering the source, useful for scenarios like resizing, adjustments, transformations, or preserving original values in undo/redo processes, cloning size structures to maintain immutable originals while working on safe editable copies, creating new instances with identical dimensions for manipulation or comparison without side effects.
</div>

#### Returns

`kendo.geometry.Size` A new Size instance with the same dimensions.

#### Example

    <script>
    var geom = kendo.geometry;
    var originalSize = new geom.Size(100, 50);
    var clonedSize = originalSize.clone();
    
    console.log(clonedSize.width); // logs 100
    console.log(clonedSize.height); // logs 50
    console.log(clonedSize === originalSize); // logs false (different instances)
    console.log(clonedSize.equals(originalSize)); // logs true (same dimensions)
    </script>


### equals

Compares this Size with another instance.


<div class="meta-api-description">
Compare two dimension objects or size values to check if their width and height match exactly, enabling detection of identical sizes, dimension equivalence, or equality between size instances and preventing unnecessary layout recalculations or redundant UI updates by returning true when both width and height are the same.
</div>

#### Parameters

##### other `kendo.geometry.Size`

The Size to compare with.

#### Returns

`Boolean` true if the size members match; false otherwise.

#### Example

    <script>
    var geom = kendo.geometry;
    var size1 = new geom.Size(100, 50);
    var size2 = new geom.Size(100, 50);
    var size3 = new geom.Size(200, 100);
    
    console.log(size1.equals(size2)); // logs true (same dimensions)
    console.log(size1.equals(size3)); // logs false (different dimensions)
    console.log(size1.equals(size1)); // logs true (same instance)
    </script>


### getWidth

Gets the width value.


<div class="meta-api-description">
Retrieve or obtain the numeric width dimension from a size or measurement object, access the current width value for layout calculations, rendering size metrics, dimensional comparisons, or graphical measurements, query the width property from a dimension instance, extract width for conditional logic, math operations, or UI sizing decisions, get the horizontal measurement of an object's size for positioning or scaling, use methods to fetch or read the width attribute from a shape, component, or drawing dimension.
</div>

#### Returns

`Number` The current width value.

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(150, 75);
    var currentWidth = size.getWidth();
    console.log(currentWidth); // logs 150
    </script>


### getHeight

Gets the height value.


<div class="meta-api-description">
Retrieve the height dimension value from a size object or instance by accessing its vertical measurement, enabling you to read, obtain, or extract the current height used in layout calculations, sizing comparisons, dimension queries, or any scenario requiring the object's stored height property for UI arrangements, rendering logic, or dynamic updates where height measurement is needed.
</div>

#### Returns

`Number` The current height value.

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(150, 75);
    var currentHeight = size.getHeight();
    console.log(currentHeight); // logs 75
    </script>


### setWidth

Sets the width to a new value.


<div class="meta-api-description">
Adjust, modify, or update the width dimension of a size or layout element dynamically by setting a new width value at runtime, enabling resizing of components, controlling layout width, changing element size in response to user input or data updates, configuring width properties programmatically, and instantly applying width changes to visual or UI elements for responsive design, dimension control, and layout adjustments.
</div>

#### Parameters

##### value `Number`

The new width value.

#### Returns

`kendo.geometry.Size` The current Size instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(100, 50);
    
    size.setWidth(200);
    console.log(size.width); // logs 200
    console.log(size.getWidth()); // logs 200
    
    // Method chaining is possible
    var newSize = size.setWidth(300).setHeight(150);
    console.log(newSize.width); // logs 300
    console.log(newSize.height); // logs 150
    </script>


### setHeight

Sets the height to a new value.


<div class="meta-api-description">
Adjust or modify the height dimension of a size or layout component dynamically by setting a new height value programmatically, enabling control over vertical sizing after initial creation, updating measurements for components, widgets, or elements in code, resizing interfaces, controlling layout height property, and changing height attributes on the fly to reflect new dimensions during runtime or within responsive designs and UI adjustments.
</div>

#### Parameters

##### value `Number`

The new height value.

#### Returns

`kendo.geometry.Size` The current Size instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(100, 50);
    
    size.setHeight(80);
    console.log(size.height); // logs 80
    console.log(size.getHeight()); // logs 80
    
    // Method chaining with setWidth
    var modifiedSize = size.setHeight(120).setWidth(250);
    console.log(modifiedSize.width); // logs 250
    console.log(modifiedSize.height); // logs 120
    </script>

