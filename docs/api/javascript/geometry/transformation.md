---
title: Transformation
page_title: API reference for methods and fields of Kendo UI Geometry Transformation
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


### equals

Compares this transformation with another instance.

#### Parameters

##### other `kendo.geometry.Transformation`

The transformation to compare with.

#### Returns

`Boolean` true if the transformation matrix is the same; false otherwise.


### matrix

Gets the current transformation matrix for this transformation.

#### Returns

`kendo.geometry.Matrix` The current transformation matrix.


### multiply

Multiplies the transformation with another.
The underlying transformation matrix is updated in-place.

#### Parameters

##### transformation `kendo.geometry.Transformation`

The transformation to multiply by.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.


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


### scale

Sets scale with the specified parameters.

#### Parameters

##### scaleX `Number`

The scale factor on the X axis.

##### scaleY `Number`

The scale factor on the Y axis.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.


### translate

Sets translation with the specified parameters.

#### Parameters

##### x `Number`

The distance to translate along the X axis.

##### y `Number`

The distance to translate along the Y axis.

#### Returns

`kendo.geometry.Transformation` The current transformation instance.


