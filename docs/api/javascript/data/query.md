---
title: Query
page_title: Configuration and methods of the Kendo Query component.
description: Easy to follow steps for Query component configuration and examples of supported methods.
res_type: api
---

# kendo.data.Query

## Overview

The Query class allows you to build queries including filtering, sorting and grouping.
They can be then executed over supplied set of data by calling [process](#process) method.

## Constructor Parameters

### data `Array` *optional*

The array of data items.


<div class="meta-api-description">
Configure the input dataset as an array of objects or primitives to serve as raw in-memory data for operations like filtering, sorting, grouping, aggregation, or querying within data manipulation tools. Enable setting or supplying a structured collection of items directly in code to control how the system processes and transforms data without external sources. Use this to define the initial data context, passing arrays that drive queries, data sources, or analytical functions supporting dynamic data workflows and custom data handling scenarios.
</div>

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


<div class="meta-api-description">
Retrieve all query results as a complete list or array of raw data entries for easy inspection, iteration, or transformation; convert query output into a simple collection to access underlying records, generate full datasets, extract items for processing, or manipulate the raw data without additional wrappers or stream processing.
</div>

#### Returns

`Array` Returns plain JavaScript array which represents the internal data collection

#### Example

    <script>
        var query = new kendo.data.Query([
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Bob Smith", age: 25 }
        ]);
        
        var dataArray = query.toArray();
        // the result can be seen in the browser console.
        console.log(dataArray);
    </script>

### skip

Skip a given amount it items


<div class="meta-api-description">
Configure query result pagination by defining how many records to omit at the beginning of a data retrieval operation, enabling offset control to return items starting from a specific index. Use this to skip a defined number of entries when fetching data, allowing precise control over batch processing, page navigation, or selective querying. Adjust the query to ignore a set count of initial results for scenarios such as paginated displays, infinite scrolling, or partial dataset retrieval, ensuring flexible chaining with other query modifiers like limits or filters. This method supports incrementally bypassing records in datasets to refine the selection window or implement custom paging and data slicing strategies.
</div>

#### Parameters

##### count `Number`

The number of items that should be skipped

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query with the first `count` elements of the list skipped

#### Example

    <script>
        var query = new kendo.data.Query([
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Bob Smith", age: 25 },
            { name: "Alice Johnson", age: 28 }
        ]);
        
        var skippedQuery = query.skip(2);
        var result = skippedQuery.toArray();
        // the result can be seen in the browser console.
        console.log(result); // Will contain only Bob Smith and Alice Johnson
    </script>

### take

Take a given amount it items


<div class="meta-api-description">
Control the maximum number of results retrieved from a data query by specifying a limit or count, enabling pagination, limiting result sets for top-n filtering, or constraining how many items are returned from a query operation. Configure the query to fetch up to a specified number of entries, effectively slicing or restricting data output without immediately executing data retrieval. Common use cases include setting page sizes, performing limit operations, controlling batch sizes, and combining with offset or skip parameters to build efficient paged queries, top result filters, or partial result views in data-access patterns.
</div>

#### Parameters

##### count `Number`

The number of items that should be taken

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing only the first `count` elements of the list

#### Example

    <script>
        var query = new kendo.data.Query([
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Bob Smith", age: 25 },
            { name: "Alice Johnson", age: 28 }
        ]);
        
        var limitedQuery = query.take(2);
        var result = limitedQuery.toArray();
        // the result can be seen in the browser console.
        console.log(result); // Will contain only Jane Doe and John Doe
    </script>

### select

Maps over the data items


<div class="meta-api-description">
Configure how to transform, map, or project data items in a query by applying a selector function or projection that converts each element to a new form or shape; control the mapping of query results, enable chaining of transformations on data collections, set custom selection logic to produce derived datasets from source queries, and extract or reshape data during query operations to create new collections with altered or filtered content suitable for further querying or binding.
</div>

#### Parameters

##### selector `Function`

A function that is applied to each of the items

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the mapped collection

#### Example

    <script>
        var query = new kendo.data.Query([
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ]);

        var selectedItems = query.select(function(item){
            return item.name;
        })
        // the result can be seen in the browser console.
        console.log(selectedItems);
    </script>

### order

Returns a copy of the list sorted according to the direction


<div class="meta-api-description">
Sort or organize collections, datasets, or query results by specifying ascending, descending, or custom directions without altering the original data. Configure sorting criteria to order lists, arrays, or query outputs safely while preserving immutability, enabling developers to arrange, rank, or sequence items efficiently in different scenarios such as data display, filtering, or processing. Control the sorting behavior dynamically to retrieve ordered copies of data from various sources, supporting use cases requiring stable, non-destructive sorting operations on query results or collections.
</div>

#### Parameters

##### selector `Object`

The current sort configuration.

##### selector.field `String | Function`

The field by which the data items are sorted.

#### dir `String`

The sort order (direction). The supported values are "asc" (ascending order) and "desc" (descending order).

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the sorted collection

#### Example

    <script>
        const query = new kendo.data.Query([
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Bob Smith", age: 25 },
            { name: "Alice Johnson", age: 28 }
        ]);
        
        const sortedQuery = query.order("age", "desc");
        const result = sortedQuery.toArray();
        // the result can be seen in the browser console.
        console.log(result); // Will be sorted by age in ascending order
    </script>

### filter

Returns a copy of the list filtered according to the expression


<div class="meta-api-description">
Control how to narrow down or restrict collections by applying conditions, predicates, callback functions, or filter expressions to generate a subset or filtered copy without modifying the original list or data set. Enable filtering of queries based on criteria, expressions, or functions to retrieve only items matching specific rules, supporting composition with other query operations, and allowing developers to specify constraints, selections, or where-like clauses for refined data retrieval and dynamic filtering of collections.
</div>

#### Parameters

##### expression `Object`

The filter configuration. Accepts the same values as the [filter](/api/javascript/data/datasource/configuration/filter) option (**check there for more examples**).

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the filtered collection

#### Example

    <script>
        var query = new kendo.data.Query([
            { name: "Jane Doe", age: 30, department: "Sales" },
            { name: "John Doe", age: 33, department: "IT" },
            { name: "Bob Smith", age: 25, department: "Sales" },
            { name: "Alice Johnson", age: 28, department: "Marketing" }
        ]);
        
        var filteredQuery = query.filter({
            logic: "and",
            filters: [
                { field: "age", operator: "gte", value: 28 },
                { field: "department", operator: "eq", value: "Sales" }
            ]
        });
        var result = filteredQuery.toArray();
        // the result can be seen in the browser console.
        console.log(result); // Will contain only Jane Doe (age >= 28 and department = Sales)
    </script>

### groupBy

Returns a copy of the list grouped according to the descriptor


<div class="meta-api-description">
Organize or categorize a list of items into nested or hierarchical clusters based on single or multiple criteria, enabling grouping by key, field, property, or attribute to create structured summaries or segmented views without modifying the original dataset. This function supports grouping by various descriptors or conditions, allowing developers to produce grouped copies of collections for UI display, reporting, or data aggregation purposes, including multi-level groupings, categorization by properties, and preparing grouped results for data sources or visual components. It helps in configuring grouped data sets, controlling grouping logic, and generating grouped data snapshots that maintain immutability while reflecting complex hierarchical group structures.
</div>

#### Parameters

##### descriptor `Object`

The grouping configuration. Accepts the same values as the [group](/api/javascript/data/datasource/configuration/group) option.

#### Returns

`kendo.data.Query` Returns a new instance of kendo.data.Query containing the grouped collection

#### Example

    <script>
        var query = new kendo.data.Query([
            { name: "Jane Doe", age: 30, department: "Sales" },
            { name: "John Doe", age: 33, department: "IT" },
            { name: "Bob Smith", age: 25, department: "Sales" },
            { name: "Alice Johnson", age: 28, department: "Marketing" }
        ]);
        
        var groupedQuery = query.groupBy({
            field: "department"
        });
        var result = groupedQuery.toArray();
        // the result can be seen in the browser console.
        console.log(result); // Will be grouped by department
    </script>

## Class Methods

### process

Executes the specified operations over the data items


<div class="meta-api-description">
Apply filtering, sorting, grouping, and other complex query operations on collections by configuring and running the sequence of data transformations, enabling users to control data manipulation workflows, execute tailored queries on datasets, retrieve refined or aggregated results, perform dynamic data processing for UI binding or backend logic, and customize how data items are selected, ordered, or grouped within applications that handle filtering, sorting, grouping, or complex query tasks.
</div>

#### Parameters

##### data `Array`

The data items collection

##### options `Object`

Accepts the same values as the [DataSource query](/api/javascript/data/datasource/methods/query) method.

#### Returns

`Object` with `total` and `data` fields representing the result of all operations

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(query.data);
    </script>
