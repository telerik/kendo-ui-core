---
title: Transformation
page_title: API reference for methods and fields of Kendo UI Geometry Transformation
res_type: api
---

# kendo.geometry.Transformation

An utility class for building transformation matrices.

## Example - Creating a transformation
        <script>
            var geom = kendo.geometry;
            var tr = new geom.Transformation();
            tr.translate(10, 20);
            tr.scale(1, 1.5);
        </script>

## Example - Creating a transformation (short syntax)
        <script>
            var geom = kendo.geometry;
            var tr = geom.transform().translate(10, 20).scale(1, 1.5);
        </script>

## Methods

### clone

Creates a new instance with the same transformation matrix.


<div class="meta-api-description">
How can I create an independent copy of a Kendo UI transformation matrix? Generate an independent duplicate of a transformation matrix to create a separate transform instance with identical values for use in drawing or graphics operations, enabling developers to copy, replicate, clone, or copy-paste transform settings without affecting the original, allowing modification, composition, adjustment, or separate application of transformation properties such as scaling, rotation, translation, or skew while preserving original data integrity and supporting operations that require isolated transform instances for concurrent or sequential manipulation in graphics programming and rendering workflows.
</div>

#### Returns

`kendo.geometry.Transformation` A new Transformation instance with the same matrix.

#### Example

    <script>
    var geom = kendo.geometry;
    var originalTransform = geom.transform().translate(10, 20).scale(2, 3);
    var clonedTransform = originalTransform.clone();
    
    console.log('Original and clone are different objects:', originalTransform !== clonedTransform);
    console.log('But have the same matrix values:', originalTransform.equals(clonedTransform));
    </script>


### equals

Compares this transformation with another instance.


<div class="meta-api-description">
How do I check if two transformations in Kendo UI for jQuery are identical? Check whether two transform objects represent identical changes by comparing their internal properties for equality, enabling detection of matching transformations, avoiding duplicate updates, verifying if transformation states are the same, synchronizing transform data across UI elements or components, or implementing conditional logic based on whether transformations are equivalent, with functionality to evaluate if two instances of transformation data or matrices produce the same visual or spatial effect.
</div>

#### Parameters

##### other `kendo.geometry.Transformation`

The transformation to compare with.

#### Returns

`Boolean` true if the transformation matrix is the same; false otherwise.

#### Example

    <script>
    var geom = kendo.geometry;
    var transform1 = geom.transform().translate(10, 20).scale(2, 2);
    var transform2 = geom.transform().translate(10, 20).scale(2, 2);
    var transform3 = geom.transform().translate(5, 10).scale(1, 1);
    
    console.log('transform1 equals transform2:', transform1.equals(transform2)); // true
    console.log('transform1 equals transform3:', transform1.equals(transform3)); // false
    </script>


### matrix

Gets the current transformation matrix for this transformation.


<div class="meta-api-description">
How can I access the current transformation matrix in Kendo UI for jQuery drawingapi? Retrieve or access the current transformation matrix representing translation, rotation, and scaling states as a numeric 2D or 3D matrix to read, reuse, or manipulate transformations, including extracting transformation data, computing transformed coordinates, composing combined transforms, serializing transformation states, comparing transformation matrices, enabling programmatic control over object positioning and orientation, configuring coordinate transformations, or applying matrix-based transformations in graphics or animation workflows.
</div>

#### Returns

`kendo.geometry.Matrix` The current transformation matrix.

#### Example

    <script>
    var geom = kendo.geometry;
    var transform = geom.transform().translate(50, 100).scale(2, 1.5);
    var matrix = transform.matrix();
    
    console.log('Matrix values:');
    console.log('a:', matrix.a, 'b:', matrix.b, 'c:', matrix.c);
    console.log('d:', matrix.d, 'e:', matrix.e, 'f:', matrix.f);
    </script>


### multiply

Multiplies the transformation with another.
The underlying transformation matrix is updated in-place.


<div class="meta-api-description">
How do I combine multiple transformation matrices in Kendo UI for jQuery using the multiply method? Combine multiple transformation matrices, chain or compose transforms by applying one transformation on top of another, multiply transformation matrices directly to merge effects, update transformation state in-place without creating new objects, control matrix composition through method calls that modify existing matrix data, apply sequential transformations efficiently by mutating the current matrix, configure cumulative transformations by multiplying matrices, enable transformation chaining that modifies the existing matrix reference, perform matrix multiplication to get combined transform results, set or control transformation updates dynamically within the same object instance.
</div>

#### Parameters

##### transformation `kendo.geometry.Transformation`

The transformation to multiply by.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var transform1 = geom.transform().translate(10, 20);
    var transform2 = geom.transform().scale(2, 3);
    
    console.log('Before multiply - matrix a:', transform1.matrix().a);
    transform1.multiply(transform2);
    console.log('After multiply - matrix a:', transform1.matrix().a);
    console.log('Transformation is applied in sequence');
    </script>


### rotate

Sets rotation with the specified parameters.


<div class="meta-api-description">
How can I dynamically set the rotation of shapes in my Kendo UI drawing? Apply or set the rotation of graphical shapes or groups programmatically by adjusting their orientation, angle, or pivot point within a drawing or graphics context; control or configure rotation transforms dynamically to spin, turn, or animate elements by updating the transformation matrix, enabling rotation animations, clockwise or counterclockwise rotations, and precise angle adjustments for visual manipulation or interactive effects in vector graphics or canvas-based drawings.
</div>

#### Parameters

##### angle `Number`

The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `Array|kendo.geometry.Point`

The center of rotation.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var transform = geom.transform();
    
    // Rotate 45 degrees around center point (100, 100)
    transform.rotate(45, [100, 100]);
    
    // Or using a Point object
    var centerPoint = new geom.Point(50, 50);
    var transform2 = geom.transform().rotate(90, centerPoint);
    
    console.log('Rotation applied with center at:', centerPoint.x, centerPoint.y);
    </script>


### scale

Sets scale with the specified parameters.


<div class="meta-api-description">
How do I dynamically resize and zoom drawing elements in Kendo UI for jQuery using the scale method? Control resizing and zooming of drawing elements by setting scale factors, uniform or non-uniform scaling parameters, or adjusting the scaling origin to dynamically modify element size, apply zoom levels, manipulate horizontal and vertical scale values, and programmatically transform graphics with precise control over scaling behavior and coordinate origins.
</div>

#### Parameters

##### scaleX `Number`

The scale factor on the X axis.

##### scaleY `Number`

The scale factor on the Y axis.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var transform = geom.transform();
    
    // Scale by 2x horizontally and 1.5x vertically
    transform.scale(2, 1.5);
    
    // Chain with other transformations
    var combinedTransform = geom.transform()
        .scale(3, 2)
        .translate(10, 20);
    
    console.log('Scale transformation applied');
    console.log('Matrix values:', transform.matrix().a, transform.matrix().d);
    </script>


### translate

Sets translation with the specified parameters.


<div class="meta-api-description">
How do I adjust the positional shift of a transformation in Kendo UI for jQuery using the translate method? Control or set the positional shift of a transformation by moving or offsetting along the x and y axes using numerical values or vector inputs, enabling translation adjustments that affect rendering placement, coordinate changes, and transformation composition. Adjust, apply, or update spatial translation in graphical transformations, shift objects precisely, chain with scaling or rotation, and manage positional displacement through methods that modify transformation matrices or object coordinates for drawing, animation, or layout purposes.
</div>

#### Parameters

##### x `Number`

The distance to translate along the X axis.

##### y `Number`

The distance to translate along the Y axis.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.

#### Example

    <script>
    var geom = kendo.geometry;
    var transform = geom.transform();
    
    // Translate by 50 pixels right and 30 pixels down
    transform.translate(50, 30);
    
    // Chain with other transformations
    var combinedTransform = geom.transform()
        .translate(100, 50)
        .scale(2, 2)
        .rotate(45, [0, 0]);
    
    console.log('Translation applied');
    console.log('Matrix translation values:', transform.matrix().e, transform.matrix().f);
    </script>

`kendo.geometry.Transformation` The current transformation instance.


