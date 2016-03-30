---
title: Query
page_title: Configuration and methods of the Kendo Query component.
description: Easy to follow steps for Query component configuration and examples of supported methods.
---

# kendo.data.Query

## Overview

The Query class allows you to build queries including filtering, sorting and grouping.
They can be then executed over supplied set of data by calling [process](#process) method.

## Constructor Parameters

### data `Array` *optional*

The array of data items.

#### Example - creating a kendo.data.Query instance

```pseudo
    <script>
        var query = new kendo.data.Query([
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
        ]);
    </script>
```

## Methods

### toArray

Returns the internal data collection

#### Returns

`Array` Returns plain JavaScript array which represents the internal data collection

### skip

Skip a given amount it items

#### Parameters

##### count `Number`

The number of items that should be skipped

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query with the first `count` elements of the list skipped

### take

Take a given amount it items

#### Parameters

##### count `Number`

The number of items that should be taken

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing only the first `count` elements of the list

### select

Maps over the data items

#### Parameters

##### selector `Function`

A function that is applied to each of the items

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the mapped collection

### order

Returns a copy of the list sorted according to the direction

#### Parameters

##### selector `Object`

The current sort configuration.

##### selector.field `String | Function`

The field by which the data items are sorted.

#### dir `String`

The sort order (direction). The supported values are "asc" (ascending order) and "desc" (descending order).

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the sorted collection

### filter

Returns a copy of the list filtered according to the expression

#### Parameters

##### expression `Object`

The filter configuration. Accepts the same values as the [filter](datasource#configuration-filter) option (**check there for more examples**).

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the filtered collection

### groupBy

Returns a copy of the list grouped according to the descriptor

#### Parameters

##### descriptor `Object`

The grouping configuration. Accepts the same values as the [group](datasource#configuration-group) option.

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the grouped collection

## Class methods

### process

Executes the specified operations over the data items

#### Parameters

##### data `Array`

The data items collection

##### options `Object`

Accepts the same values as the [DataSource query](datasource#methods-query) method.

#### Returns

`Object` with `total` and `data` fields represeting the result of all operations

#### Example - filtering a data collection

    <script>
        var data = [
          { name: "Pork", category: "Food", subcategory: "Meat" },
          { name: "Pepper", category: "Food", subcategory: "Vegetables" },
          { name: "Beef", category: "Food", subcategory: "Meat" }
        ];

        var query = kendo.data.Query.process(data, {
          filter: {
            logic: "and",
            filters: [{
              field: "subcategory",
              value: "Meat",
              operator: "eq"
            }]
          }
        });

        // print the result
        console.log(query.data);
    </script>
