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


