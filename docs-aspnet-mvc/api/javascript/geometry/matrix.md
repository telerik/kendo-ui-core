---
title: Matrix
page_title: API reference for methods and fields of Kendo UI Geometry Matrix
---

# kendo.geometry.Matrix

Represents a 3x3 transformation matrix in the following form:

`a c e`

`( b d f )`

`0 0 1`

## Example - Creating a transformation matrix
        <script>
            var geom = kendo.geometry;
            var mx = new geom.Matrix(1, 0, 0, 1, 0, 0);
        </script>

## Fields

### a `Number`

The a (1, 1) member of the matrix.


### b `Number`

The b (2, 1) member of the matrix.


### c `Number`

The a (1, 2) member of the matrix.


### d `Number`

The d (2, 2) member of the matrix.


### e `Number`

The e (1, 3) member of the matrix.


### f `Number`

The f (2, 3) member of the matrix.


## Class methods

### rotate

Creates a transformation matrix for rotation with the specified parameters.

#### Parameters

##### angle `Number`

The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### x `Number`

The center of rotation on the X axis.

##### y `Number`

The center of rotation on the Y axis.

#### Returns

`kendo.geometry.Matrix` The transformation matrix for the specified rotation.


### scale

Creates a transformation matrix for scale with the specified parameters.

#### Parameters

##### scaleX `Number`

The scale factor on the X axis.

##### scaleY `Number`

The scale factor on the Y axis.

#### Returns

`kendo.geometry.Matrix` The transformation matrix for the specified scale.


### translate

Creates a transformation matrix for translation with the specified parameters.

#### Parameters

##### x `Number`

The distance to translate along the X axis.

##### y `Number`

The distance to translate along the Y axis.

#### Returns

`kendo.geometry.Matrix` The transformation matrix for the specified translation.


### unit

Returns the unit (identity) transformation matrix.

#### Returns

`kendo.geometry.Matrix` The unit (identity) matrix.


## Methods

### clone

Creates a new instance with the same element values.

#### Returns

`kendo.geometry.Matrix` A new Matrix instance with the same element values.


### equals

Compares this matrix with another instance.

#### Parameters

##### other `kendo.geometry.Matrix`

The matrix instance to compare with.

#### Returns

`Boolean` true if the matrix elements match; false otherwise.


### round

Rounds the matrix elements to the specified number of fractional digits.

#### Parameters

##### digits `Number`

Number of fractional digits.

#### Returns

`kendo.geometry.Matrix` The current matrix instance.


### multiplyCopy

Multiplies the matrix with another one and returns the result as new instance.
The current instance elements are not altered.

#### Parameters

##### matrix `kendo.geometry.Matrix`

The matrix to multiply by.

#### Returns

`kendo.geometry.Matrix` The result of the multiplication.


### toArray

Returns the matrix elements as an [a, b, c, d, e, f] array.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

#### Returns

`Array` An array representation of the matrix.


### toString

Formats the matrix elements as a string.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

##### separator `String` *(default: ",")*

The separator to place between elements.

#### Returns

`String` A string representation of the matrix, e.g. "1, 0, 0, 1, 0, 0".


