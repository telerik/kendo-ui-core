---
title: Matrix
page_title: API reference for methods and fields of Kendo UI Geometry Matrix
res_type: api
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

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(2, 0, 0, 1, 10, 5);
        console.log(matrix.a); // outputs: 2
    </script>

### b `Number`

The b (2, 1) member of the matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0.5, 0, 1, 10, 5);
        console.log(matrix.b); // outputs: 0.5
    </script>

### c `Number`

The c (1, 2) member of the matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0.3, 1, 10, 5);
        console.log(matrix.c); // outputs: 0.3
    </script>

### d `Number`

The d (2, 2) member of the matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0, 1.5, 10, 5);
        console.log(matrix.d); // outputs: 1.5
    </script>

### e `Number`

The e (1, 3) member of the matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0, 1, 20, 5);
        console.log(matrix.e); // outputs: 20
    </script>

### f `Number`

The f (2, 3) member of the matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0, 1, 10, 15);
        console.log(matrix.f); // outputs: 15
    </script>

## Class Methods

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

#### Example

    <script>
        var geom = kendo.geometry;
        // Create a rotation matrix for 45 degrees around point (100, 50)
        var rotateMatrix = geom.Matrix.rotate(45, 100, 50);
        console.log("Rotation matrix:", rotateMatrix.toString());
    </script>

### scale

Creates a transformation matrix for scale with the specified parameters.

#### Parameters

##### scaleX `Number`

The scale factor on the X axis.

##### scaleY `Number`

The scale factor on the Y axis.

#### Returns

`kendo.geometry.Matrix` The transformation matrix for the specified scale.

#### Example

    <script>
        var geom = kendo.geometry;
        // Create a scale matrix to scale by 2x on X axis and 1.5x on Y axis
        var scaleMatrix = geom.Matrix.scale(2, 1.5);
        console.log("Scale matrix:", scaleMatrix.toString());
    </script>

### translate

Creates a transformation matrix for translation with the specified parameters.

#### Parameters

##### x `Number`

The distance to translate along the X axis.

##### y `Number`

The distance to translate along the Y axis.

#### Returns

`kendo.geometry.Matrix` The transformation matrix for the specified translation.

#### Example

    <script>
        var geom = kendo.geometry;
        // Create a translation matrix to move by 50 pixels on X and 30 pixels on Y
        var translateMatrix = geom.Matrix.translate(50, 30);
        console.log("Translation matrix:", translateMatrix.toString());
    </script>

### unit

Returns the unit (identity) transformation matrix.

#### Returns

`kendo.geometry.Matrix` The unit (identity) matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        // Get the unit (identity) matrix
        var unitMatrix = geom.Matrix.unit();
        console.log("Unit matrix:", unitMatrix.toString()); // outputs: "1, 0, 0, 1, 0, 0"
    </script>

## Methods

### clone

Creates a new instance with the same element values.

#### Returns

`kendo.geometry.Matrix` A new Matrix instance with the same element values.

#### Example

    <script>
        var geom = kendo.geometry;
        var originalMatrix = new geom.Matrix(2, 0.5, 0.3, 1.5, 20, 15);
        var clonedMatrix = originalMatrix.clone();
        console.log("Original:", originalMatrix.toString());
        console.log("Cloned:", clonedMatrix.toString());
        console.log("Are they equal?", originalMatrix.equals(clonedMatrix)); // true
    </script>

### equals

Compares this matrix with another instance.

#### Parameters

##### other `kendo.geometry.Matrix`

The matrix instance to compare with.

#### Returns

`Boolean` true if the matrix elements match; false otherwise.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix1 = new geom.Matrix(1, 0, 0, 1, 10, 20);
        var matrix2 = new geom.Matrix(1, 0, 0, 1, 10, 20);
        var matrix3 = new geom.Matrix(2, 0, 0, 1, 10, 20);
        console.log("matrix1 equals matrix2:", matrix1.equals(matrix2)); // true
        console.log("matrix1 equals matrix3:", matrix1.equals(matrix3)); // false
    </script>

### round

Rounds the matrix elements to the specified number of fractional digits.

#### Parameters

##### digits `Number`

Number of fractional digits.

#### Returns

`kendo.geometry.Matrix` The current matrix instance.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1.123456, 0.987654, 0.345678, 1.765432, 10.234567, 5.876543);
        console.log("Before rounding:", matrix.toString());
        matrix.round(2);
        console.log("After rounding to 2 digits:", matrix.toString());
    </script>

### multiplyCopy

Multiplies the matrix with another one and returns the result as new instance.
The current instance elements are not altered.

#### Parameters

##### matrix `kendo.geometry.Matrix`

The matrix to multiply by.

#### Returns

`kendo.geometry.Matrix` The result of the multiplication.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix1 = new geom.Matrix(2, 0, 0, 2, 10, 20);
        var matrix2 = new geom.Matrix(1, 0, 0, 1, 5, 5);
        var result = matrix1.multiplyCopy(matrix2);
        console.log("Matrix1:", matrix1.toString());
        console.log("Matrix2:", matrix2.toString());
        console.log("Result:", result.toString());
    </script>

### toArray

Returns the matrix elements as an [a, b, c, d, e, f] array.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

#### Returns

`Array` An array representation of the matrix.

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1.123, 0.456, 0.789, 1.234, 10.567, 5.891);
        var array = matrix.toArray();
        console.log("Array representation:", array);
        
        // With specified digits
        var roundedArray = matrix.toArray(2);
        console.log("Rounded to 2 digits:", roundedArray);
    </script>

### toString

Formats the matrix elements as a string.

#### Parameters

##### digits `Number`

(Optional) Number of fractional digits.

##### separator `String` *(default: ",")*

The separator to place between elements.

#### Returns

`String` A string representation of the matrix, e.g. "1, 0, 0, 1, 0, 0".

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1.123, 0.456, 0.789, 1.234, 10.567, 5.891);
        
        // Default string representation
        console.log("Default:", matrix.toString());
        
        // With specified digits
        console.log("Rounded to 2 digits:", matrix.toString(2));
        
        // With custom separator
        console.log("With pipe separator:", matrix.toString(2, " | "));
    </script>


