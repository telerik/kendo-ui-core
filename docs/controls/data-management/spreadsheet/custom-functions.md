---
title: Custom Functions
page_title: Custom Functions | Kendo UI Spreadsheet
description: "Learn how to make your own JavaScript functions in the Kendo UI Spreadsheet widget."
slug: custom_functions_spreadsheet_widget
position: 4
---

# Custom Functions (“primitives”)

You can make your own JavaScript functions available in formulas by calling the `kendo.spreadsheet.defineFunction(name, func)`. The first argument (`string`) is the name for your function in formulas (case-insensitive), and the second one is a JavaScript function (the implementation).

## Primitives

### Synchronous Primitives

The example below demonstrates how to define a function that calculates the distance between two points.

###### Example

    kendo.spreadsheet.defineFunction("distance", function(x1, y1, x2, y2){
        var dx = Math.abs(x1 - x2);
        var dy = Math.abs(y1 - y2);
        var dist = Math.sqrt(dx*dx + dy*dy);
        return dist;
    }).args([
        [ "x1", "number" ],
        [ "y1", "number" ],
        [ "x2", "number" ],
        [ "y2", "number" ]
    ]);

If you include the above JavaScript code, you can then use `DISTANCE` in formulas. For example, you can type in a cell `=DISTANCE(2, 2, 5, 6)` to find the distance between coordinate points `(2,2)` and `(5,6)`, or you can use the function in combined expressions such as `=DISTANCE(0, 0, 1, 1) + DISTANCE(2, 2, 5, 6)`, etc.

Note that in the above example `defineFunction` returns an object that has an `args` method. Using it, you can specify the expected types of arguments. If the function is called with mismatching argument types, the spreadsheet runtime will automatically return an error and your implementation will not even be called. This frees you from manually writing code that does argument type checking, and provides a nice declarative syntax instead.

### Asynchronous Primitives

Suppose you have a way to retrieve currency information from some remote server, you can define a primitive to make this information available in formulas. Note that we call `argsAsync` instead of `args` to define an asynchronous function.

###### Example

    kendo.spreadsheet.defineFunction("currency", function(callback, base, curr){
        // let's say we have this fetchCurrency function;
        // how it's implemented is not relevant for the goal of this document
        fetchCurrency(base, curr, function(value){
            callback(value);
        });
    }).argsAsync([
        [ "base", "string" ],
        [ "curr", "string" ]
    ]);

> **Important**
>
> The `argsAsync` passes a callback as first argument to your implementation function. Call that with the return value.

Now you can do the following in formulas: `=CURRENCY("EUR", "USD")`, `=A1 * CURRENCY("EUR", "USD")` etc. Note that the callback is invisible in formulas. The second formula shows that even though the implementation itself is asynchronous, it can be used in formulas in a synchronous way (i.e., the result yielded by `CURRENCY` will be multiplied with the value in A1).

The rest of this page deals with argument types. Also, the last section explains what happens if you do not invoke `args`/`argsAsync` — that is a pretty low level and we advise against using that form.

## Check Argument Types

As can be seen in the examples above, both `args` and `argsAsync` expect a single array argument. It contains one definition for each argument. Each definition is in turn an array where the first element is the argument name (note that it must be a valid JavaScript identifier), and the second element is a type specifier.

### Basic Type Specifiers

As of now, the following basic specifiers are supported:

|BASIC SPECIFIER    |ACTION     |
|:---               |:---       |
|`"number"`         |Requires a numeric argument. |
|`"number+"`        |Requires a number bigger than or equal to zero. |
|`"number++"`       |Requires a non-zero positive number.|
|`"integer"`/`"integer+"`/`"integer++"`   |Similar to `number`-s, but requires integer argument. Note that these may actually modify the argument value: if a number is specified and it has a decimal part, it will silently be truncated to integer, instead of returning an error. This is similar to Excel. |
|`"divisor"`        |Requires a non-zero number. Produces a `#DIV/0!` error if the argument is zero. |
|`"string"`         |Requires a string argument. |
|`"boolean"`        |Requires a boolean argument. Most times you may want to use `"logical"` though. |
|`"logical"`        |Requires a `logical` argument. That is, booleans `true` or `false`, but `1` and `0` are also accepted. It gets converted to an actual boolean. |
|`"date"`           |Requires a date argument. Internally, dates are stored as numbers (the number of days since December 31 1899), so this works the same as `"integer"`. It was added for consistency. |
|`"datetime"`       |This is like `"number"`, because the time part is represented as a fraction of a day. |
|`"anyvalue"`       |Accepts any value type. |
|`"matrix"`         |Accepts a matrix argument. Тhis is either a range, e.g., `A1:C3`, or a literal matrix (see the **Matrices** section below). |
|`"null"`           |Requires a null (missing) argument. The reason for this specifier will be clarified in the **Optional Arguments** section. |

Again, to make it clear, some specifiers actually modify the value that your function receives. For example, you could implement a function that truncates the argument to integer, as shown below.

###### Example

    defineFunction("truncate", function(value){
        return value;
    }).args([
        [ "value", "integer" ]
    ]);

If you call `=TRUNCATE(12.634)`, the result is `12`. You can also call `=TRUNCATE(TRUE)`, it returns `1`. All numeric types silently accept a Boolean, and convert `true` to `1` and `false` to `0`.

### Getting Error Values

By default, if an argument is an error, your function is not called at all and that error is returned.  

###### Example

    defineFunction("iserror", function(value){
        return value instanceof kendo.spreadsheet.CalcError;
    }).args([
        [ "value", "anyvalue" ]
    ]);

With this implementation, typing `=ISERROR(1/0)` returns `#DIV/0!` instead of `true`&mdash;the error is passed over, aborting computation. To allow errors to go through, append a `!` to the type.

###### Example

    ...args([
        [ "value", "anyvalue!" ]
    ]);

This time `true` is returned.

### Reference Type Specifiers

All the above type specifiers force references. For this reason `=TRUNCATE(A5)` also works&mdash;the function gets the value in `A5` cell. If `A5` contains a formula, the runtime library makes sure you get the current value (that is, `A5` is evaluated first). All of this goes under the hood and you need not worry about it.

However, sometimes you might need to write functions that receive a reference, instead of a resolved value. One example is Excel's `ROW` function. In its basic form, it takes a cell reference and returns its row number, as demonstrated in the example below. The actual `ROW` function is more complicated.

###### Example

    defineFunction("row", function(cell){
        // add 1 because internally row indexes are zero-based
        return cell.row + 1;
    }).args([
        [ "reference", "cell" ]
    ]);

If you now call `=ROW(A5)`, you get a `5`, regardless of what is in cell `A5`: it could be empty, or it is possible that this very formula sits in the `A5` cell and there must be no circular reference error in such a case.

See the **References** section below for more information about references. The related type specifiers are just listed here:

|TYPE SPECIFIER   |ACTION     |
|:---             |:---       |
|`"ref"`          |Allows any reference argument and your implementation gets it as such. |
|`"area"`         |Allows a cell or a range argument (`CellRef` or `RangeRef` instance). |
|`"cell"`         |Allows a cell argument (`CellRef` instance).|
|`"anything"`     |Allows any argument type. The difference to `anyvalue` is that this one does not force references, that is, if a reference is passed, it will remain a reference instead of being replaced by its value. |

### Compound Type Specifiers

In addition to basic type specifiers, which are strings, you can also use the following forms of type specs:

|ADDITIONAL SPECIFIER           |ACTION     |
|:---                           |:---       |
|`[ "null", DEFAULT ]`          |Validates a missing argument and makes it take the given `DEFAULT` value. This can be used in conjunction with `"or"` to support optional arguments. |
|`[ "not", SPEC ]`              |Requires an argument which does not match the spec. |
|`[ "or", SPEC, SPEC, ... ]`    |Validates an argument that passes any of the specs.|
|`[ "and", SPEC, SPEC, ... ]`   |Validates an argument that passes all the specs.|
|`[ "values", VAL1, VAL2, ... ]`|The argument must strictly equal one of the listed values.|
|`[ "[between]", MIN, MAX ]`    |Validates an argument between the given values inclusive. Note that it does not require numeric argument. The "between" value is an alias.|
|`[ "(between)", MIN, MAX ]`    |This is similar to "[between]" but is exclusive.|
|`[ "[between)", MIN, MAX ]`    |Requires an argument greater than or equal to `MIN`, and strictly less than `MAX`.|
|`[ "(between]", MIN, MAX ]`    |Requires an argument strictly greater than `MIN`, and less than or equal to `MAX`.|
|`[ "assert", COND ]`           |Inserts an arbitrary condition literally into the code (see the **Assertions** section below).|
|`[ "collect", SPEC ]`          |Collects all remaining arguments that pass the spec into a single array argument. This only makes sense at top level and cannot be nested in `"or"`, `"and"`, etc. Arguments not matching the `SPEC` are silently ignored, except errors. Each error aborts the calculation.|
|`[ "#collect", SPEC ]`         |This is similar to "collect", but ignores errors as well.|

### Previous Arguments Reference

In certain clauses you might need to be able to refer to values of previously type-checked arguments. For example, let us say you want to write a primitive that takes a minimum, a maximum, and a value that must be between them, and should return as a fraction the position of that value between min and max.

###### Example

    defineFunction("my.position", function(min, max, value){
        return (value - min) / (max - min);
    }).args([
        [ "min", "number" ],
        [ "max", "number" ],
        [ "value", [ "and", "number",
                     [ "[between]", "$min", "$max" ] ] ]
    ]);

Focus on the type specifier for `"value"`:

    [ "and", "number",
      [ "[between]", "$min", "$max" ] ]

That says the parameter must be a number, and it must be between `min` and `max`. To refer to a previous argument, prefix the identifier with a `$` character.

This works for arguments of `"between"` (and friends), `"assert"`, `"values"` and `"null"`.

### Arbitrary Assertions

You can notice though that the above function is not quite correct because it does not check that `max` is actually greater than `min`. To do that, use `"assert"`:

    defineFunction("my.position", function(min, max, value){
        return (value - min) / (max - min);
    }).args([
        [ "min", "number" ],
        [ "max", "number" ],
        [ "value", [ "and", "number",
                     [ "[between]", "$min", "$max" ] ] ],
        [ "?", [ "assert", "$min < $max", "N/A" ] ]
    ]);

The `"assert"` type spec allows you to introduce an arbitrary condition into the JavaScript code of the type checking function. An argument name of `"?"` will not actually introduce a new argument, but provide a place for such assertions. The third argument to `"assert"` is the error code that it should produce if the condition does not stand (and `#N/A!` is actually the default).

### Optional Arguments

As hinted above, you can use the `"null"` specifier to support optional arguments. Since it was already discussed above, here is the actual definition of the `ROW` function:

    defineFunction("row", function(ref){
        if (!ref) {
            return this.formula.row + 1;
        }
        if (ref instanceof CellRef) {
            return ref.row + 1;
        }
        return this.asMatrix(ref).mapRow(function(row){
            return row + ref.topLeft.row + 1;
        });
    }).args([
        [ "ref", [ "or", "area", "null" ]]
    ]);

This says that the argument can either be an area (a cell or a range), or `null` (that is, missing). By using the `"or"` combiner, you make it accept either of these. If the argument is missing, your function will get `null`. In such a case it should return the row of the current formula, which you get by `this.formula.row` (details in the **Context Object** section).

In most cases, “optional” means that the argument takes some default value if one is not provided. For example, the `LOG` function computes the logarithm of the argument to a base, but if the base is not specified it defaults to 10. Here is the implementation:

    defineFunction("log", function(num, base){
        return Math.log(num) / Math.log(base);
    }).args([
        [ "*num", "number++" ],
        [ "*base", [ "or", "number++", [ "null", 10 ] ] ],
        [ "?", [ "assert", "$base != 1", "DIV/0" ] ]
    ]);

<!--*-->
The type spec for `base` is: `[ "or", "number++", [ "null", 10 ] ]`. This says it should accept any number greater than zero, but if the argument is missing, defaults to 10. The implementation does not have to deal with the case that the argument is missing — it will get 10 instead.

Also, note that it uses an assertion to make sure the `base` is not 1. If it is, return a `#DIV/0!` error.

### Return Errors

If you need to return an error code, you must return a `spreadsheet.CalcError` object.

###### Example

    defineFunction("tan", function(x){
        // if x is sufficiently close to PI, tan would return
        // Infinity, or some really big number; let's error out instead
        if (Math.abs(x - Math.PI/2) < 1e-10) {
            return new spreadsheet.CalcError("DIV/0");
        }
        return Math.tan(x);
    }).args([
        [ "x", "number" ]
    ]);

> **Important**
>
> For convenience, for synchronous primitives (that is, if you use `args`, not `argsAsync`) you can also `throw` a `CalcError` object.

Note that it is possible to do the above via an assertion as well:

    defineFunction("tan", function(x){
        return Math.tan(x);
    }).args([
        [ "x", [ "and", "number",
                 [ "assert", "1e-10 < Math.abs($x - Math.PI/2)", "DIV/0" ] ] ]
    ]);

### Variable Argument List

The type checking mechanism will error out when your primitive receives more arguments than specified. There are a few ways to receive all remaining arguments without errors.

#### The `"rest"` type specifier

The simplest way is to use the `"rest"` type specifier. In such cases the last argument will be an array containing all remaining arguments, whatever types they might be.

The example below demonstrates how to use a function that joins arguments with a separator, producing a string.

###### Example

    defineFunction("join", function(sep, list){
        return list.join(sep);
    }).args([
        [ "sep", "string" ],
        [ "list", "rest" ]
    ]);

This allows for `=JOIN("-", 1, 2, 3)` which returns `1-2-3`, as well as `=JOIN(".")` which returns the empty string (since the list will be empty).

#### The `"collect"` clauses

This collects all remaining arguments that match a certain type specifier, ignoring the others (except errors). You would use this in functions like `SUM` which sums all numeric arguments, but does not care about empty or text arguments. Here is the definition of `SUM`:

    defineFunction("sum", function(numbers){
        return numbers.reduce(function(sum, num){
            return sum + num;
        }, 0);
    }).args([
        [ "numbers", [ "collect", "number" ] ]
    ]);

The `"collect"` clause will abort when it encounters an error. If you want to ignore errors as well, use the `"#collect"` spec.

Note that `"collect"` and `"#collect"` only make sense when being the first specifier, i.e., they cannot be nested in `"or"`, `"and"` etc.

#### Type-checked rest arguments

There are functions that allow an arbitrary number of arguments, but those arguments must be of certain types. For example, the `SUMPRODUCT` function takes an arbitrary number of arrays, and multiplies corresponding numbers in those arrays, and then returns the sum of these products. There must be at least two arrays. Here is the argument specification:

    [
        [ "a1", "matrix" ],
        [ "+",
          [ "a2", [ "and", "matrix",
                    [ "assert", "$a2.width == $a1.width" ],
                    [ "assert", "$a2.height == $a1.height" ] ] ] ]
    ]

The `"+"` in the second definition means that one or more arguments must follow. So the `a2` argument that is defined there can repeat. Also, notice how you can use assertions to make sure the matrices have the same shape as the first one (`a1`).

For another example, look at the `SUMIFS` function ([see Excel documentation](https://support.office.com/en-us/article/SUMIFS-function-c9e748f5-7ea7-455d-9406-611cebce642b)). It takes a `sum_range`, a `criteria_range` and a `criteria`. These are the required arguments. Then, any number of `criteria_range` and `criteria` arguments can follow. In particular, criteria ranges must all have the same shape (width/height). Here is the argument definition for `SUMIFS`:

    [
        [ "range", "matrix" ],
        [ "m1", "matrix" ],
        [ "c1", "anyvalue" ],
        [ [ "m2", [ "and", "matrix",
                    [ "assert", "$m1.width == $m2.width" ],
                    [ "assert", "$m1.height == $m2.height" ] ] ],
          [ "c2", "anyvalue" ] ]
    ]

The repeating part now is simply enclosed in an array, not preceded by `"+"`. This tells the system that any number may follow (so perhaps zero), while `"+"` requires at least one argument.

## Date and Time Representation

Dates are stored as the number of days since 1899-12-31 (that being day one). In Excel, day one is 1900-01-01, but for historical reasons Excel assumes that 1900 is a leap year (see [leap year bug](https://en.wikipedia.org/wiki/Leap_year_bug)). In Excel, day 60 yields an invalid date (1900-02-29), which means that date calculations involving dates before and after 1900-03-01 produce wrong results.

In order to be compatible with Excel, and to avoid implementing this bug, the Spreadsheet uses 1899-12-31 as the base date. Dates that are greater than or equal to 1900-03-31 have the same numeric representation as in Excel, while dates before 1900-03-31 are smaller by 1.

Time is kept as a fraction of a day, i.e., 0.5 means 12:00:00. For example, the date and time `Sep 27 1983 12:35:59` is numerically stored as `30586.524988425925`. To verify that in Excel, paste this number in a cell and then format it as date/time.

Functions to pack/unpack dates are available in `spreadsheet.calc.runtime`.

###### Example

    var runtime = kendo.spreadsheet.calc.runtime;

    // unpacking
    var date = runtime.unpackDate(28922.55);
    console.log(date); // { year: 1979, month: 2, date: 8, day: 4 }

    var time = runtime.unpackTime(28922.55);
    console.log(time); // { hours: 13, minutes: 12, seconds: 0, milliseconds: 0 }

    var date = runtime.serialToDate(28922.55); // produces JavaScript Date object
    console.log(date.toISOString()); // 1979-03-08T13:12:00.000Z

    // packing
    console.log(runtime.packDate(2015, 5, 25)); // year, month, date
    console.log(runtime.packTime(13, 35, 0, 0)); // hours, minutes, seconds, ms
    console.log(runtime.dateToSerial(new Date()))

Note that the serial date representation does not carry any timezone information, so the functions involving `Date` objects (`serialToDate` and `dateToSerial`) will use the local components, not UTC. Excel seems to do the same.

## References

As mentioned earlier, certain type specifiers allow you to get a reference in your function rather than the resolved value. It is important to note that when you do so, you cannot rely on the values in those cells to be calculated, so if your function might need the values as well, you have to compute them. Since the function that does that is asynchronous, your primitive must be defined in asynchronous style as well.

###### Example

    defineFunction("test", function(callback, x){
        this.resolveCells([ x ], function(){
            console.log(x instanceof spreadsheet.CellRef); // true
            console.log("So we have a cell:");
            console.log(x.sheet, x.row, x.col);
            console.log("And its value is:");
            console.log(this.getRefData(x));
            callback("Cell value: " + this.getRefData(x));
        });
    }).argsAsync([
        [ "x", "cell" ]
    ]);

This function accepts a cell argument, so you can only call it like `=test(B4)`. It calls `this.resolveCells` from the context object in order to make sure the cell value is calculated. Without this step, if the cell actually contains a formula, the value returned by `this.getRefData` could be outdated. Then it prints some information about that cell.

The subsections below discuss the types of references that your primitive can receive.

### `spreadsheet.Ref`

`spreadsheet.Ref` is a base class only. All references inherit from it, but no direct instance of this object should ever be created. The class is exported just to make it easier to check whether something is a reference: `x instanceof spreadsheet.Ref`.

### `spreadsheet.NULLREF`

`spreadsheet.NULLREF` is not a class, but an object (a singleton). It represents the `NULL` reference, and could occur, for example, when you intersect two disjoint ranges, or when a formula depends on a cell that has been deleted. For example, when you put in some cell `=test(B5)` and then right-click on column `B` and delete it.

To test when something is the `NULL` reference, just do `x === spreadsheet.NULLREF`.

### `spreadsheet.CellRef`

`spreadsheet.CellRef` represents a cell reference. Note that the references here follow the same programming language concept. They do not contain data. Instead they just point to where the data is. So a cell reference contains 3 essential properties:

- `sheet` — the name of the sheet that this cell points to (as a string)
- `row` — the row number, zero-based
- `col` — the column number, zero-based

### `spreadsheet.RangeRef`

`spreadsheet.RangeRef` is a range reference. It contains `topLeft` and `bottomRight`, which are `CellRef` objects.

### `spreadsheet.UnionRef`

`spreadsheet.UnionRef` is a union. It contains a `refs` property, which is an array of references (it can be empty). A `UnionRef` can be created by the union operator, which is the comma.

The example below demonstrates how to use a function that takes an arbitrary reference and returns its type of reference.

###### Example

    defineFunction("refkind", function(x){
        if (x === spreadsheet.NULLREF) {
            return "null";
        }
        if (x instanceof spreadsheet.CellRef) {
            return "cell";
        }
        if (x instanceof spreadsheet.RangeRef) {
            return "range";
        }
        if (x instanceof spreadsheet.UnionRef) {
            return "union";
        }
        return "unknown";
    }).args([
        [ "x", "ref" ]
    ]);

The example below demonstrates how to use a function that takes an arbitrary reference and returns the total number of cells it covers.

###### Example

    defineFunction("countcells", function(x){
        var count = 0;
        function add(x) {
            if (x instanceof spreadsheet.CellRef) {
                count++;
            } else if (x instanceof spreadsheet.RangeRef) {
                count += x.width() * x.height();
            } else if (x instanceof spreadsheet.UnionRef) {
                x.refs.forEach(add);
            } else {
                // unknown reference type.
                throw new CalcError("REF");
            }
        }
        add(x);
        return count;
    }).args([
        [ "x", "ref" ]
    ]);

You can now say:

- `=COUNTCELLS(A1)` — returns 1.
- `=COUNTCELLS(A1:C3)` — returns 9.
- `=COUNTCELLS( (A1,A2,A1:C3) )` — returns 11. This is a union.
- `=COUNTCELLS( (A1:C3 B:B) )` — returns 3. This is an intersection between the `A1:C3` range and the `B` column.

Here is a function that returns the background color of some cell:

    defineFunction("backgroundof", function(cell){
        var workbook = this.workbook();
        var sheet = workbook.sheetByName(cell.sheet);
        return sheet.range(cell).background();
    }).args([
        [ "cell", "cell" ]
    ]);

It uses `this.workbook()` to retrieve the workbook, and then uses the Workbook/Sheet/Range APIs to fetch the background color of the given cell.

## Matrices

Matrices are defined by `spreadsheet.calc.runtime.Matrix`. Your primitive can request a `Matrix` object by using the `"matrix"` type spec. In this case, it will accept a cell reference, a range reference, or a literal array. You can type literal arrays in formulas like in Excel, e.g., `{ 1, 2; 3, 4 }` (rows separated by semicolons).

Matrices were primarily added to deal with the “array formulas” concept in Excel. A function can return multiple values, and those will be in a `Matrix` object.

The example below demonstrates how to use a function that doubles each number in a range and returns a matrix of the same shape.

###### Example

    defineFunction("doublematrix", function(m){
        return m.map(function(value){
            return value * 2;
        });
    }).args([
        [ "m", "matrix" ]
    ]);

You can now type in some cell "=doublematrix(A1:B2)" and it will return a matrix, that is, fill all the required cells to the right and bottom from where this formula is defined with the doubled values. As of now, this is different from Excel, where in order to get all values returned by an array formula you have to pre-select the range, and save the formula with CTRL-SHIFT-ENTER.

Here is a list of interesting methods/properties provided by the `Matrix` objects.

|METHOD OR PROPERTY           |DESCRIPTION|
|:---                         |:---|
|`width` and `height`         |These properties indicate the dimensions of this matrix. |
|`clone()`                    |Returns a new matrix with the same data. |
|`get(row, col)`              |Returns the element at a given location. |
|`set(row, col, value)`       |Sets the element at a given location. |
|`each(func, includeEmpty)`   |Iterates through elements of the matrix, calling your `func` for each element (first columns, then rows) with 3 arguments: `value`, `row` and `column`. If `includeEmpty` is `true`, it will call your function for empty (`null`) elements as well. Otherwise, it only calls it where a value exists. |
|`map(func, includeEmpty)`    |This is similar to `each`, but produces a new matrix of the same shape as the original one with the values returned by your functions.|
|`transpose()`                |Returns the transposed matrix. The rows of the original matrix become columns of the transposed one.|
|`unit(n)`                    |Returns the unit square matrix of size `n`.|
|`multiply(m)`                |Multiplies the current matrix by the given matrix, and returns a new matrix as the result.|
|`determinant()`              |Returns the determinant of this matrix. The matrix should contain only numbers and be square. Note that there are no checks for this.|
|`inverse()`                  |Returns the inverse of this matrix. The matrix should contain only numbers and be square. Note that there are no checks for this. If the inverse does not exist&mdash;the determinant is zero&mdash;then it returns `null`.|

## Context Object

Every time a formula is evaluated, a special `Context` object is created and each primitive function involved is invoked in the context of that object, that is, it will be accessible as `this`. Here are a few methods that this object provides.

|METHOD                           |DESCRIPTION|
|:---                             |:---       |
|`resolveCells(array, callback)`  |Makes sure that all references in the given array are resolved before invoking your callback&mdash;that is, executes any formula. If this array turns out to include the very cell where the current formula lives, it returns a `#CIRCULAR!` error. Elements that are not references are ignored. |
|`cellValues(array)`              |Returns as a flat array the values in any reference that exist in the given array. Elements that are not references are copied over.
|`asMatrix(arg)`                  |Converts the given argument to a matrix, if possible. It accepts a `RangeRef` object or a plain JavaScript non-empty array. Additionally, if a `Matrix` object is provided, it is returned as is.|
|`workbook()`                     |Returns the `Workbook` object where the current formula is evaluated. |
|`getRefData(ref)`                |Returns the data&mdash;that is the value&mdash;in the given reference. If a `CellRef` is given, it returns a single value. For a `RangeRef` or `UnionRef`, it returns a flat array of values.|

Additionally, there is a `formula` property, an object representing the current formula. Its details are internal, but you can rely on it having the `sheet` (sheet name as a string), `row` and `col` properties, the location of the current formula.

## Not Calling `args` or `argsAsync`

If `args` or `argsAsync` are not called, the primitive function will receive exactly two arguments: a callback to be invoked with the result, and an array that will contain the arguments passed in the formula.

The example below demonstrates how to use a function that adds two things.

###### Example

    defineFunction("add", function(callback, args){
        callback(args[0] + args[1]);
    });

Results:

- `=ADD(7, 8)` → `15`
- `=ADD()` → `NaN`
- `=ADD("foo")` → `fooundefined`
- `=ADD(A1, A2)` → `A1A2`

In other words, if you use this raw form, you are responsible for type-checking the arguments and your primitive is always expected to be asynchronous.

## See Also

Other articles on the Kendo UI Spreadsheet:

* [Overview]({% slug overview_spreadsheet_widget %})
* [Cell Formatting]({% slug cell_formatting_spreadsheet_widget %})
* [Custom Cell Editors]({% slug custom_editors_spreadsheet_widget %})
* [Store Data as JSON]({% slug loadand_saveas_json_spreadsheet_widget %})
* [Export to Excel]({% slug export_toexcel_spreadsheet_widget %})
* [Server-Side Processing]({% slug serverside_processing_spreadsheet_widget %})
* [User Guide]({% slug user_guide_spreadsheet_widget %})
