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


<div class="meta-api-description">
How do I access and modify the top-left element of a Kendo UI drawing matrix? Access, retrieve, modify, or set the primary element in the first row and first column of a two-dimensional array, matrix, or transformation grid, often used for scaling factors, initial matrix values, top-left coordinate adjustments, or core numeric computations. Control and update the leading matrix entry for transformation matrices, affine transforms, scaling matrices, or any operations requiring direct manipulation of the matrix’s head element. Enable reading or changing the matrix’s initial scalar or numeric value positioned at the top-left corner to influence matrix calculations, adjustments, or transformation presets.
</div>

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(2, 0, 0, 1, 10, 5);
        console.log(matrix.a); // outputs: 2
    </script>

### b `Number`

The b (2, 1) member of the matrix.


<div class="meta-api-description">
How do I access a specific matrix element using the Matrix.b property in Kendo UI for jQuery? Retrieve or change the element located at the second row and first column within a matrix structure, enabling direct access to the specific matrix entry identified as (2,1) or the 'b' field. This capability supports operations like reading, setting, updating, or manipulating individual matrix cells by row and column indices, facilitating precise control over matrix elements, matrix data extraction, matrix cell modification, or element-based matrix adjustments within component instances after creation or initialization.
</div>

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0.5, 0, 1, 10, 5);
        console.log(matrix.b); // outputs: 0.5
    </script>

### c `Number`

The c (1, 2) member of the matrix.


<div class="meta-api-description">
How do I access the horizontal skew component in a 2D transformation matrix using Kendo UI for jQuery? Access, retrieve, or modify the specific element representing the horizontal skew or shear component in the second column, first row of a 2D transformation matrix within graphical or drawing contexts, enabling control over matrix transformations such as affine transformations, coordinate manipulation, element indexing within matrices, or matrix component adjustments relating to skewing, slanting, or linear transformations in rendering operations.
</div>

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0.3, 1, 10, 5);
        console.log(matrix.c); // outputs: 0.3
    </script>

### d `Number`

The d (2, 2) member of the matrix.


<div class="meta-api-description">
How to access the value at row 2 column 2 in a Kendo UI matrix? Retrieve or update the value located at the second row and second column of a matrix, enabling direct access to that specific element for reading, setting, or modifying its numeric content. Control or manipulate the mid-matrix entry for precise element-wise changes, custom numeric calculations, serialization processes, or targeted data transformation within a matrix structure. Useful for accessing the central data point in a 2D matrix grid, allowing fine-grained editing, custom adjustments, or integration with mathematical operations requiring the (2,2) position value.
</div>

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0, 1.5, 10, 5);
        console.log(matrix.d); // outputs: 1.5
    </script>

### e `Number`

The e (1, 3) member of the matrix.


<div class="meta-api-description">
How do I access and modify individual elements in a 2D matrix using Kendo UI for jQuery's Matrix.e property? Retrieve, read, modify, set, or update a specific matrix element located at row 1, column 3 of a 2D array or matrix structure, enabling precise access and control over individual matrix entries for tasks such as element manipulation, matrix transformation, numerical computation, coordinate-based updates, or targeted value assignment in linear algebra operations, mathematical calculations, or image processing workflows where direct indexing and element-wise adjustment at a fixed position is required.
</div>

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0, 1, 20, 5);
        console.log(matrix.e); // outputs: 20
    </script>

### f `Number`

The f (2, 3) member of the matrix.


<div class="meta-api-description">
How to update a specific element in a 2D matrix using Kendo UI Matrix.f? Retrieve or update a specific element within a two-dimensional matrix at a given row and column index, allowing precise control over individual matrix entries by reading or modifying the value located at the intersection of the second row and third column. This facilitates targeted adjustments, element-level access, direct setting or getting of matrix values, fine-grained matrix manipulation, indexed retrieval, and specific value assignment within a matrix structure for computational operations, data processing, or algorithm implementation involving matrices.
</div>

#### Example

    <script>
        var geom = kendo.geometry;
        var matrix = new geom.Matrix(1, 0, 0, 1, 10, 15);
        console.log(matrix.f); // outputs: 15
    </script>

## Class Methods

### rotate

Creates a transformation matrix for rotation with the specified parameters.


<div class="meta-api-description">
How to rotate an element using Kendo UI's Matrix.rotate method? Create or generate rotation transforms that rotate coordinates or shapes by a specified angle or parameters, apply rotational transformations to points or objects, configure and set rotation matrices for graphical manipulation, compose rotation operations with other transformations, enable rotating elements via matrix math, control angle-based rotation for rendering, layout adjustments, or coordinate transformations, calculate rotation matrices for 2D or 3D contexts, reuse rotation transformations for animation or visual effects, and perform rotation-based matrix transformations in vector graphic workflows.
</div>

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


<div class="meta-api-description">
How do I use the Matrix.scale method to resize a graphical shape in Kendo UI for jQuery? Adjusting size, resizing, scaling coordinates or graphical shapes, creating and configuring transformation matrices for scaling operations, applying scale transformations to points or vector shapes, combining or concatenating scale matrices with other transformations, inverting scale matrices for reverse scaling effects, setting scale factors for width and height changes, controlling uniform or non-uniform scaling in graphical components, manipulating scale transformations programmatically for drawing or rendering tasks, enabling flexible adjustment of shape dimensions through matrix-based scaling techniques.
</div>

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


<div class="meta-api-description">
How do I shift coordinates in Kendo UI using the translate method? Create or configure a transformation matrix to shift, move, or offset coordinates, points, shapes, or coordinate systems by specified horizontal and vertical distances or translation vectors, enabling control over positioning and spatial adjustments; utilize translation parameters to generate matrices that apply directional movement or displacement, support combining multiple transformations, and handle coordinate translation for graphical manipulation, layout adjustment, or geometry modification.
</div>

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


<div class="meta-api-description">
How to reset transformation in Kendo UI drawingapi? Retrieve the identity matrix representing the default or unit transformation, which serves as the neutral element in matrix multiplication, enabling resetting, initializing, or composing transformations such as translation, rotation, and scaling from a clean slate; useful for setting or comparing matrices to an untransformed baseline, creating identity transforms, zeroing out previous transformations, or establishing a default state in transformation workflows.
</div>

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


<div class="meta-api-description">
How do I create a copy of a matrix in Kendo UI for jQuery to avoid modifying the original data? Create an exact duplicate or copy of a two-dimensional numeric array or matrix to safely perform changes, edits, or transformations without altering the original data structure. Duplicate matrices for backup, copies for isolated modifications, separate instances for manipulation, or independent clones to maintain data integrity while applying updates, transformations, or calculations on the replicated matrix values. Generate new matrix objects mirroring original contents for parallel processing, undo functionality, or safe experimental changes, ensuring the original matrix remains unchanged during operations.
</div>

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


<div class="meta-api-description">
How do I check if two Kendo UI transformation matrices are identical? Check if two transformation matrices are identical by comparing all their elements one by one, determine whether two matrix objects represent the same geometric transformation or state, verify matrix equality for transformations within graphics or math calculations, evaluate if matrix data matches exactly, control logic flow based on matching matrix instances, distinguish equal versus different matrix configurations, confirm if matrix contents correspond point-to-point, and find if two matrices produce equivalent transformations in rendering or computations.
</div>

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


<div class="meta-api-description">
How do I round numeric values in a Kendo UI matrix to a specific number of decimal places? Round numeric values in a transformation matrix to a set number of decimal places, control precision of matrix elements during calculations, reduce floating-point errors for accurate comparison or serialization of matrices, normalize matrix data for consistent rendering output or exporting, adjust fractional digits of matrix components, apply rounding to transformation matrices to improve stability, set the number of decimal places on matrix elements, limit floating-point noise in graphics transformations, enforce consistent numeric precision across matrix operations.
</div>

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


<div class="meta-api-description">
How do I multiply two matrices in Kendo UI for jQuery without modifying the originals? Create a new matrix by multiplying two matrices without changing the original matrices, enabling safe calculation of matrix products while preserving the source data, useful for scenarios where immutability is needed, matrix operations require non-destructive transformations, or when you want to generate a fresh matrix result from multiplying one matrix by another without modifying existing instances.
</div>

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


<div class="meta-api-description">
How do I convert Kendo UI matrix to an array of transform parameters? Convert or extract transformation matrix components into a simple array of six numeric values representing the affine transform parameters [a, b, c, d, e, f] for purposes like serialization, cloning, comparison, or integration with rendering pipelines such as Canvas or SVG. Enable exporting transform data from complex matrix objects into flat arrays compatible with geometry calculations, graphical APIs, or data storage formats, useful for inspecting, manipulating, or passing matrix elements to functions expecting standard transform arrays.
</div>

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


<div class="meta-api-description">
How do I convert a Kendo UI matrix into a string? Convert a matrix into a readable string format for logging, debugging, displaying, serializing, or outputting its elements as text; generate a string representation of matrix values to easily compare, copy, or present the numerical data in a single concatenated text form without altering the original matrix content, enabling clear textual visualization and export of matrix values for diagnostics, display interfaces, or text-based processing workflows.
</div>

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


