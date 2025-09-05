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

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(100, 50);
    console.log(size.width); // logs 100
    </script>


### height `Number`

The vertical size.

#### Example

    <script>
    var geom = kendo.geometry;
    var size = new geom.Size(100, 50);
    console.log(size.height); // logs 50
    </script>

## Class Methods

### create

Creates a Size instance from various parameters.

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

