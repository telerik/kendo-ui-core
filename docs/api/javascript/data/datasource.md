---
title: DataSource
page_title: Configuration, methods and events of the Kendo DataSource component.
description: Easy to follow steps for DataSource component configuration, examples of supported methods and executed events.
res_type: api
component: data-source
---

# kendo.data.DataSource

## Overview

See the [DataSource Overview](/framework/datasource/overview) and [Basic Usage](/framework/datasource/basic-usage) for an introduction to the DataSource.

## Configuration

### accentFoldingFiltering `String`

It allows the filtering operation to be performed considering the diacritic characters for specific language.

> * Since these characters are strictly specific for a specific language, setting the appropriate culture has to be set as a value. For example, `tr-TR` for Turkish, `es-ES` for Spanish, or `fr-FR` for French.
> * Due to the specifics of the case-insensitive search, only one language can be used to filter your data. For example, if you mix English and Turkish in the data, you may observe unexpected behavior.

Introduced in the Kendo UI 2019 R1 SP1 (2019.1.220) release.


<div class="meta-api-description">
How do I configure accent folding filtering in Kendo UI DataSource for culture-sensitive matching of accented characters? Control filtering behavior to enable or disable recognition of diacritic and accent marks during search and filter operations, allowing culture-sensitive matching of accented characters such as "é" versus "e" based on specified locale settings like Turkish, Spanish, or French. Configure language-aware filtering that respects or folds accents in text queries, supporting scenarios like case-insensitive searches with single-language accent rules while preventing mixed-language conflicts. Adjust settings to fine-tune search results for internationalization, accent-insensitive or accent-sensitive filtering, partial and exact matches considering language-specific characters, and customize text filtering behavior that differentiates or ignores diacritics according to cultural norms and developer-defined locale preferences.
</div>

#### Example - use the accentFoldingFiltering

    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
    					{  name: "KIZILTOPRAK" },
    					{  name: "KARŞIYAKA" },
              {  name: "İSTANBUL" }
        ],
        filter: { field: "name", operator: "contains", value: "k\u0131z" },
        accentFoldingFiltering: "tr-TR"
      });
      dataSource.fetch(function(){
        var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(view[0].name); // displays "KIZILTOPRAK"
      });
    </script>

### aggregate `Array`

The aggregates which are calculated when the data source populates with data.

The supported aggregates are:

* `"average"` - Only for Number.
* `"count"` - String, Number and Date.
* `"max"` - Number and Date.
* `"min"` - Number and Date.
* `"sum"` - Only for Number.

> The data source calculates aggregates client-side unless the [`serverAggregates`](/api/javascript/data/datasource#configuration-serverAggregates) option is set to `true`.


<div class="meta-api-description">
How to calculate averages and totals client-side with Kendo UI DataSource aggregate function? Set or control aggregate functions such as average, count, sum, minimum, and maximum calculations for numeric, string, or date fields during data processing to compute totals, averages, record counts, smallest or largest values, either client-side or server-side aggregation, enabling dynamic summary statistics, data grouping results, and real-time computed metrics for display, binding, filtering, or reporting purposes within the data component.
</div>

#### Example - specify aggregates

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "sum" },
        { field: "age", aggregate: "min" },
        { field: "age", aggregate: "max" }
      ]
    });
    dataSource.fetch(function(){
      var results = dataSource.aggregates().age;
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(results.sum, results.min, results.max); // displays "63 30 33"
    });
    </script>

### aggregate.aggregate `String`

The name of the aggregate function.

The supported aggregates are:

* `"average"`
* `"count"`
* `"max"`
* `"min"`
* `"sum"`


<div class="meta-api-description">
How do I configure summary calculations for data fields in Kendo UI DataSource using aggregate operations? Configure summary calculations for data fields by specifying aggregation operations such as totals, counts, averages, maximum, or minimum values within a data set. Enable or set the type of summary function to compute group or global aggregates, allowing control over how data is summarized and rolled up during queries or reports. Use aggregation keywords like average, count, max, min, and sum to define the mathematical operation applied to data fields for generating concise metrics, statistical summaries, or overview calculations in datasets and collections.
</div>

#### Example - specify an aggregate function

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "sum" }
      ]
    });
    dataSource.fetch(function(){
      var results = dataSource.aggregates().age;
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(results.sum); // displays "63"
    });
    </script>

### aggregate.field `String`

The data item field which will be used to calculate the aggregates.


<div class="meta-api-description">
How do I specify which field in my data source to use for aggregation operations with Kendo UI DataSource? Specify or set the particular data field or key from your dataset that should be used for performing aggregation operations such as sum, average, minimum, maximum, or other summary statistics; control, configure, or select the target property within each data item that aggregation functions will process, enabling filtering, grouping, or summarized calculation based on that specific attribute or column name in the data source.
</div>

#### Example - specify an aggregate field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "sum" }
      ]
    });
    dataSource.fetch(function(){
      var results = dataSource.aggregates().age;
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(results.sum); // displays "63"
    });
    </script>

### autoSync `Boolean` *(default: false)*

If set to `true`, the data source would automatically save any changed data items by calling the [`sync`](/api/javascript/data/datasource/methods/sync) method. By default, changes are not automatically saved.


<div class="meta-api-description">
How to enable automatic saving of modified data in Kendo UI DataSource? Enable automatic saving or syncing of modified data entries within a data collection or database by configuring an option that controls whether changes are immediately persisted without manual intervention. This setting can be toggled to automatically apply updates, inserts, or deletes as soon as data modifications occur, supporting seamless data consistency and reducing the need for explicit save or sync commands. Ideal for scenarios where continuous data synchronization is required, it allows developers to control or configure auto-saving, automatic data persistence, instant update propagation, and real-time synchronization behavior in data-bound components or data sources.
</div>

#### Example - enable auto sync
    <script>
    var dataSource = new kendo.data.DataSource({
      autoSync: true,
      transport: {
        read:  {
          url: "https://demos.telerik.com/service/v2/core/Products",
        },
        update: {
          url: "https://demos.telerik.com/service/v2/core/Products/Update",
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20); // auto-syncs and makes request to https://demos.telerik.com/service/v2/core/products/update
    });
    </script>

### batch `Boolean` *(default: false)*

If set to `true`, the data source will batch CRUD operation requests. For example, updating two data items would cause one HTTP request instead of two. By default, the data source
makes an HTTP request for every CRUD operation.

> The changed data items are sent as `models` by default. This can be changed via the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option.


<div class="meta-api-description">
How to combine multiple create, update, and delete actions in a single server request with Kendo UI DataSource? Control how to combine multiple create, update, and delete actions into a single server request to optimize network usage and reduce HTTP calls during data synchronization; configure batching to send multiple CRUD operations together in one payload, customize how changes are grouped and transmitted, adjust request formats for create, update, or destroy operations, set options to prevent separate API calls for each data modification, and manage payloads using parameter mapping to efficiently handle bulk data updates and minimize server round-trips during data source synchronization.
</div>

#### Example - enable the batch mode

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
          url: "https://demos.telerik.com/service/v2/core/products"
        },
        update: {
          url: "https://demos.telerik.com/service/v2/core/products/update",
          type: "POST",
          contentType: "application/json",
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      var anotherProduct = dataSource.at(1);
      anotherProduct.set("UnitPrice", 20);
      dataSource.sync(); // causes only one request to "https://demos.telerik.com/service/v2/core/products/update"
    });
    </script>

### data `Array|String`

The array of data items which the data source contains. The data source will wrap those items as [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) or [`kendo.data.Model`](/api/javascript/data/model) (if [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel) is set).

Can be set to a string value if the [`schema.type`](/api/javascript/data/datasource#configuration-schema.type) option is set to `"xml"`.

> A field in the DataSource cannot be named "data". The latter should be considered a limitation.


<div class="meta-api-description">
How do I set data for a Kendo UI DataSource? Set or bind the collection of data items or records managed by the source, supporting local arrays, JSON objects, or XML strings for loading and syncing data. Configure or supply datasets as flat arrays or complex models, enabling integration with observable objects, data models, or custom schema types. Control the initial or dynamic data input for data management, collection binding, local or in-memory data loading, and ensure compatibility with structured data formats while avoiding field name conflicts with reserved terms. This property is essential for feeding raw data, collections, or serialized strings into the data handling layer for operations like sorting, filtering, and model mapping.
</div>

#### Example - set the data items of a data source

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    dataSource.fetch(function(){
      var janeDoe = dataSource.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(janeDoe.name); // displays "Jane Doe"
    });
    </script>

#### Example - set the data items as an XML string

    <script>
    var dataSource = new kendo.data.DataSource({
      data: '<books><book id="1"><title>Secrets of the JavaScript Ninja</title></book></books>',
      schema: {
        // specify the schema is XML
        type: "xml",
        // the XML element which represents a single data record
        data: "/books/book",
        // define the model - the object which will represent a single data record
        model: {
          // configure the fields of the object
          fields: {
            // the "title" field is mapped to the text of the "title" XML element
            title: "title/text()",
            // the "id" field is mapped to the "id" attribute of the "book" XML element
            id: "@id"
          }
        }
      }
    });
    dataSource.fetch(function() {
      var books = dataSource.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(books[0].title); // displays "Secrets of the JavaScript Ninja"
    });
    </script>

### filter `Array|Object`

The filters which are applied over the data items. By default, no filter is applied.

> The data source filters the data items client-side unless the [`serverFiltering`](/api/javascript/data/datasource#configuration-serverFiltering) option is set to `true`.


<div class="meta-api-description">
How do I configure filtering in my Kendo UI DataSource? Configure criteria to limit or restrict the data returned or displayed by controlling which records meet specific conditions through filter settings, enabling client-side or server-side filtering depending on whether serverFiltering is enabled, allowing for dynamic, customizable data queries, selective retrieval, or constrained datasets based on property values, expressions, or rules applied during data source initialization to enhance data management, search precision, or visibility within applications.
</div>

#### Example - set a single filter

    <h3>All names(no filters)</h3>
    <div id="non-filtered"></div>
    <h3>All names that start with "Ja"</h3>
    <div id="filtered"></div>
      
    <script>
    var data = [
      { name: "Jane Doe" },
      { name: "John Doe" },
      { name: "Jane Sam" },
      { name: "John Doe" },
      { name: "Jane Mike" }
    ];
    var dataSource = new kendo.data.DataSource({
      data: data,
      filter: { field: "name", operator: "startswith", value: "Ja" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
    	view.forEach(function(item) {
        $("#filtered").append("name - " + item.name + "<br>");
      });
    });
      
    data.forEach(function(item) {
      $("#non-filtered").append("name - " + item.name + "<br>");
    });
    </script>

#### Example - set the filter as a conjunction (and)

    <h3>All products(no filters)</h3>
    <div id="non-filtered"></div>
    <h3>All products with category "Beverages" that are not "Coffee".</h3>
    <div id="filtered"></div>

    <script>
    var data = [{ name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }];
      
    var dataSource = new kendo.data.DataSource({
      data: data,
      filter: [
        // leave data items which are "Beverage" and not "Coffee"
        { field: "category", operator: "eq", value: "Beverages" },
        { field: "name", operator: "neq", value: "Coffee" }
      ]
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      view.forEach(function(item) {
        $("#filtered").append("name - " + item.name + ", category - " + item.category + "<br>");
      });
    });
      
    data.forEach(function(item) {
      $("#non-filtered").append("name - " + item.name + ", category - " + item.category + "<br>");
    });
    </script>

#### Example - set the filter as a disjunction (or)

    <h3>All products(no filters)</h3>
    <div id="non-filtered"></div>
    <h3>All products with category "Food" or name "Tea".</h3>
    <div id="filtered"></div>
      
    <script>
    var data = [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ];
      
    var dataSource = new kendo.data.DataSource({
      data: data,
      filter: {
        // leave data items which are "Food" or "Tea"
        logic: "or",
        filters: [
          { field: "category", operator: "eq", value: "Food" },
          { field: "name", operator: "eq", value: "Tea" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      view.forEach(function(item) {
        $("#filtered").append("name - " + item.name + ", category - " + item.category + "<br>");
      });
    });
      
    data.forEach(function(item) {
      $("#non-filtered").append("name - " + item.name + ", category - " + item.category + "<br>");
    });
    </script>

### filter.field `String`

The data item field to which the filter operator is applied.


<div class="meta-api-description">
How do I specify which data field in my Kendo UI DataSource to apply a filter condition to? Specify or configure the target data property or attribute that a filter condition applies to within a data source, enabling selection of fields by name or nested path using dot notation so filtering operations, comparisons, or queries can be performed on that specific data element; this includes setting which item property to evaluate when filtering data collections, controlling which field the filter operator matches against, and directing filters to particular keys, subfields, or nested object properties for precise data querying and manipulation.
</div>

#### Example - set the filter field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.ignoreCase `Boolean` *(default: true)*

The filter will ignore the casing of the value by default.


<div class="meta-api-description">
How can I make Kendo UI's DataSource filter case-insensitive? Configure case-insensitive filtering to match text strings without considering uppercase or lowercase differences, enabling searches that ignore letter casing for equality, containment, prefix, and other string comparisons. Control whether filtering operations treat input as case-sensitive or case-insensitive, allowing flexible string matching and search behavior regardless of character case variations in data queries or filtering conditions. Adjust filter behavior to enable robust string matching across different case formats, improving search, filter, and query precision in collection or data source operations.
</div>

#### Example - set the filter ignoreCase

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane", ignoreCase: false } // Value will be treated as "Jane" instead of "jane".
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.filters `Array`

The nested filter expressions. Supports the same options as [`filter`](/api/javascript/data/datasource#configuration-filter). Filters can be nested indefinitely.


<div class="meta-api-description">
How to configure complex filtering in Kendo UI DataSource? Configure complex, nested filtering queries by combining multiple conditions and logical operators to create advanced, multi-level filters for data sources. Enable grouping of filter expressions, apply compound criteria, and build recursive, hierarchical filter structures that support unlimited nesting and dynamic condition chaining. Control and customize filter trees to refine data retrieval, define intricate query logic, and implement multi-condition data filtering with and/or operators for tailored dataset querying and advanced data source filtering workflows.
</div>

#### Example - set nested filters

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      filter: {
        // leave data items which are "Food" or "Tea"
        logic: "or",
        filters: [
          { field: "category", operator: "eq", value: "Food" },
          { field: "name", operator: "eq", value: "Tea" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Tea"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[1].name); // displays "Ham"
    });
    </script>


### filter.logic `String`

The logical operation to use when the `filter.filters` option is set.

The supported values are:

* `"and"`
* `"or"`


<div class="meta-api-description">
How does the Kendo UI DataSource logic property control filter combinations in a data query? Control how multiple filter conditions combine by configuring the logical operator between filter expressions, enabling either all conditions to be required for a match (AND logic) or allowing matches if any condition is true (OR logic), useful for setting up complex data queries, refining search criteria, toggling filter combination modes, specifying conjunction or disjunction in filter sets, adjusting filter evaluation strategy, and customizing how multiple filter rules apply when querying or searching data sources.
</div>

#### Example - set the filter logic

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      filter: {
        // leave data items which are "Food" or "Tea"
        logic: "or",
        filters: [
          { field: "category", operator: "eq", value: "Food" },
          { field: "name", operator: "eq", value: "Tea" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Tea"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[1].name); // displays "Ham"
    });
    </script>

### filter.operator `String|Function`

The filter operator (comparison).

The supported operators are:

* `"eq"` (equal to)
* `"neq"` (not equal to)
* `"isnull"` (is equal to null)
* `"isnotnull"` (is not equal to null)
* `"lt"` (less than)
* `"lte"` (less than or equal to)
* `"gt"` (greater than)
* `"gte"` (greater than or equal to)
* `"startswith"`
* `"doesnotstartwith"`
* `"endswith"`
* `"doesnotendwith"`
* `"contains"`
* `"doesnotcontain"`
* `"isempty"`
* `"isnotempty"`

The last eight are supported only for string fields.


<div class="meta-api-description">
What is the comparison method used in Kendo UI DataSource filtering operations? Specify or configure the comparison method, operator, or condition that determines how filter criteria match or compare data values during querying or filtering operations, including equality, inequality, null checks, greater than or less than comparisons, and various string-specific matches like starts with, ends with, contains, or their negations, enabling flexible control over filtering logic, value matching, and conditional data selection in data sources with options for numeric, string, and null-inclusive comparisons.
</div>

#### Example - set the filter operator

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.value `Object`

The value to which the [`field`](/api/javascript/data/datasource#configuration-filter.field) is compared. The value has to be of the same type as the field.

> By design, the `"\n"` is removed from the filter before the filtering is performed. That is why an `"\n"` identifier from the filter will not match data items whose corresponding fields contain new lines.


<div class="meta-api-description">
How do I configure the value for filtering data with Kendo UI's DataSource? Specify or configure the filter comparison value used to match data items against a specific field, ensuring the value type aligns with the field data type for accurate filtering; control and adjust filter behavior by setting this comparison input alongside operators to define criteria for inclusion or exclusion of records, while remembering that newline characters within the filter value are automatically stripped before evaluation, affecting matches with multiline data fields.
</div>

#### Example - specify the filter value

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", birthday: new Date(1983, 1, 1) },
        { name: "John Doe", birthday: new Date(1980, 1, 1)}
      ],
      filter: { field: "birthday", operator: "gt", value: new Date(1980, 1, 1) }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### group `Array|Object`

The grouping configuration of the data source. If set, the data items will be grouped when the data source is populated. By default, grouping is not applied.

> The data source groups the data items client-side unless the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) option is set to `true`.


<div class="meta-api-description">
How to enable server-side grouping in Kendo UI DataSource? Organize and categorize data items by configuring grouping settings that enable logical clusters based on specified fields and custom ordering, supporting multiple grouping levels to control how data collections are partitioned and displayed. This grouping functionality can be activated or disabled, applied client-side by default, or delegated to the server when server-side grouping is enabled, allowing flexible management of grouped datasets, sorting within groups, and hierarchical data presentation. Search for ways to enable grouping, set grouping descriptors, control field-based grouping criteria, handle multi-level groups, manage grouped views, implement client or server grouping modes, and customize data grouping behaviors across data collections or sources.
</div>

#### Example - set a group as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      // group by the "category" field
      group: { field: "category" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "2"
      var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.value); // displays "Beverages"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items[0].name); // displays "Tea"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items[1].name); // displays "Coffee"
      var food = view[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.value); // displays "Food"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.items[0].name); // displays "Ham"
    });
    </script>

#### Example - set a group as an array (subgroups)

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Pork", category: "Food", subcategory: "Meat" },
        { name: "Pepper", category: "Food", subcategory: "Vegetables" },
        { name: "Beef", category: "Food", subcategory: "Meat" }
      ],
      group: [
        // group by "category" and then by "subcategory"
        { field: "category" },
        { field: "subcategory" },
      ]
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
      var food = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.value); // displays "Food"
      var meat = food.items[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(meat.value); // displays "Meat"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(meat.items.length); // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(meat.items[0].name); // displays "Pork"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(meat.items[1].name); // displays "Beef"
      var vegetables = food.items[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(vegetables.value); // displays "Vegetables"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(vegetables.items.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(vegetables.items[0].name); // displays "Pepper"
    });
    </script>

### group.aggregates `Array`

The aggregates which are calculated during grouping.

The supported aggregates are:

* `"average"`
* `"count"`
* `"max"`
* `"min"`
* `"sum"`


<div class="meta-api-description">
How do I calculate sums, averages, etc. in Kendo UI for jQuery data grouping? Configure or set aggregation functions like sum, average, count, min, and max to calculate group-level summaries when grouping data; control which aggregate metrics are computed per group for totals, counts, or other statistical summaries by specifying one or more aggregation operations in the grouping configuration, enabling grouped data to display calculated values such as averages, sums, minimums, maximums, or counts within each group.
</div>

#### Example - set the group aggregates

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages", price: 1 },
        { name: "Coffee", category: "Beverages", price: 2 },
        { name: "Ham", category: "Food", price: 3 },
      ],
      group: {
        field: "category",
        aggregates: [
          { field: "price", aggregate: "max" },
          { field: "price", aggregate: "min" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.aggregates.price.max); // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.aggregates.price.min); // displays "1"
      var food = view[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.aggregates.price.max); // displays "3"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.aggregates.price.min); // displays "3"
    });
    </script>

### group.aggregates.aggregate `String`

The name of the aggregate function. Specifies the aggregate function.

The supported aggregates are:

* `"average"`
* `"count"`
* `"max"`
* `"min"`
* `"sum"`


<div class="meta-api-description">
How do I configure aggregation methods in Kendo UI for jQuery's DataSource grouping feature? Configure how grouped data is summarized by specifying summary calculations such as average, count, maximum, minimum, or sum for fields within data collections during grouping operations. Enable setting aggregation methods to compute group-level statistics, control how grouped values are computed or combined, choose summary functions to analyze data segments, and adjust group summary calculations dynamically for data processing, reporting, or visualization tasks that require customized roll-up values or summarized insights.
</div>

#### Example - specify an aggregate function

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages", price: 1 },
        { name: "Coffee", category: "Beverages", price: 2 },
        { name: "Ham", category: "Food", price: 3 }
      ],
      group: {
        field: "category",
        aggregates: [
          // calculate max price
          { field: "price", aggregate: "max" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.aggregates.price.max); // displays "2"
    });
    </script>

### group.aggregates.field `String`

The data item field which will be used to calculate the aggregates.


<div class="meta-api-description">
How do I specify which field to aggregate when using the `group.aggregates` setting in Kendo UI DataSource? Specify the exact data field or property to aggregate when performing grouping and summary calculations, enabling control over which dataset attribute is used for computing totals, averages, counts, sums, or other aggregate functions; this setting helps target specific data columns or properties for aggregation during grouped queries, summaries, or statistics computations, allowing configuration of aggregation operations on precise fields within the data source.
</div>

#### Example - specify an aggregate field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages", price: 1 },
        { name: "Coffee", category: "Beverages", price: 2 },
        { name: "Ham", category: "Food", price: 3 }
      ],
      group: {
        field: "category",
        aggregates: [
          // calculate max price
          { field: "price", aggregate: "max" }
        ]
      }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.aggregates.price.max); // displays "2"
    });
    </script>

### group.compare `Function`

A JavaScript function which is used to compare the groups (refer to [`sort.compare`](/api/javascript/data/datasource#configuration-sort.compare) for comparing the items of the groups). It has the same signature as the [compare function accepted by `Array.sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).


<div class="meta-api-description">
How can I customize the sorting of groups in my Kendo UI DataSource? Control or customize the order of grouped data by defining a function to compare and sort group objects, enabling tailored group sorting logic beyond default behavior, adjust group ordering in data grouping scenarios, set custom comparison functions to organize grouped entries, implement specific rules or criteria for sorting groups in a dataset, configure group-level sorting with JavaScript comparator functions similar to array sorting callbacks, define how groups should be ranked or prioritized when aggregating or grouping data collections, override default group order by supplying custom comparison logic, enable precise control over group sequence in grouped views or data sources.
</div>

#### Example - use a custom function to compare the groups in the DataSource

    <script>
        var dataSource = new kendo.data.DataSource({
            data: [
                { name: "Salmon", category: "Seafood" },
                { name: "Mackerel", category: "Seafood" },
                { name: "Ice cream", category: "Desserts" },
                { name: "Cake", category: "Desserts" },
                { name: "Lemonade", category: "Beverages" },
                { name: "Tea", category: "Beverages" },
                { name: "Coffee", category: "Beverages" }
            ],
            group: {
                field: "category",
                dir: "desc",
                compare: function(a, b) {
                    if (a.items.length === b.items.length) {
                        return 0;
                    } else if (a.items.length > b.items.length) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            }
        });

        dataSource.fetch(function() {
            var view = dataSource.view();
            var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(kendo.stringify(beverages.items));
            var seafood = view[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(kendo.stringify(seafood.items));
            var desserts = view[2];
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(kendo.stringify(desserts.items));
        });
    </script>>

### group.dir `String` *(default: "asc")*

The sort order of the group.

The supported values are:

*  `"asc"` (ascending order)
* `"desc"` (descending order)

The default sort order is ascending.


<div class="meta-api-description">
How to control the sorting direction of grouped data in Kendo UI DataSource? Control and configure the sorting direction of grouped data entries, enabling arrangement of grouped items in either ascending or descending order based on developer preferences or UI requirements. Adjust how grouped records are ordered within data collections or sources to support custom sorting logic, toggling between ascending (lowest to highest) and descending (highest to lowest) sequences for grouped elements. Change group sorting order to enable, set, or control display and processing order of items within grouped datasets, supporting scenarios where sorting direction impacts data visualization, filtering, or aggregation. This feature is useful for developers needing to specify, enforce, or modify the order in which grouped data clusters appear or operate, enhancing the ability to manage sorted groupings dynamically and intuitively.
</div>

#### Example - sort the groups in descending order

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages"},
        { name: "Ham", category: "Food"},
      ],
      // group by "category" in descending order
      group: { field: "category", dir: "desc" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var food = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.value); // displays "Food"
      var beverages = view[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.value); // displays "Beverages"
    });
    </script>

### group.field `String`

The data item field to group by.


<div class="meta-api-description">
How do I group data in Kendo UI DataSource using a specific field? Organize or categorize data entries by specifying a particular key or attribute within each record, enabling grouping based on a chosen field such as a category name, date, or any data property, to support functionalities like sorting, filtering, grouping queries, or display segmentation both locally and on remote data sources. This grouping control facilitates configuring which data column or property values to cluster by, allowing developers to set, enable, or customize how data items are aggregated or partitioned within collections, lists, tables, or grids according to field values.
</div>

#### Example - set the field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      // group by the "category" field
      group: { field: "category" }
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items[0].name); // displays "Tea"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items[1].name); // displays "Coffee"
      var food = view[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(food.items[0].name); // displays "Ham"
    });
    </script>

### groupPaging `Boolean` *(default: false)*

When set to true, dataSource treats groups as items during pagination.


<div class="meta-api-description">
How does Kendo UI's groupPaging option affect page navigation with grouped data? Control how pagination works with grouped data by configuring whether pages contain entire groups instead of individual rows, allowing you to enable or disable group-based paging, adjust page size calculations to count groups as single items, manage page navigation that reflects grouped entries, set paging behavior for datasets where grouping is applied, and handle scenarios where you want to paginate by grouped sections rather than separate records within those groups.
</div>

#### Example

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "John", team: "A", score: 10 },
        { name: "Jane", team: "A", score: 20 },
        { name: "Bob", team: "B", score: 15 },
        { name: "Alice", team: "B", score: 25 }
      ],
      group: { field: "team" },
      pageSize: 2,
      groupPaging: true
    });
    
    $("#grid").kendoGrid({
      dataSource: dataSource,
      pageable: true,
      groupable: true
    });
    </script>

### inPlaceSort `Boolean` *(default: false)*

If set to `true`, the original `Array` used as [`data`](/api/javascript/data/datasource#configuration-data) will be sorted when sorting operation is performed. This setting supported only with local data, bound to a JavaScript array via the [`data`](/api/javascript/data/datasource#configuration-data) option.


<div class="meta-api-description">
How does Kendo UI's inPlaceSort property affect memory use when sorting local data arrays? Control whether sorting modifies the original JavaScript array directly or works on a copy, enabling in-place sorting of local data arrays to optimize memory use and performance by mutating the source array during sort operations; this option is useful when you want to avoid extra copies, manage local dataset sorting behavior, or configure sort operations to affect the exact array instance passed as data rather than a cloned version, supporting scenarios where maintaining or tracking references to the sorted array is important in applications handling client-side data manipulation.
</div>

#### Example

    <div id="grid"></div>
    <script>
    var originalArray = [
      { name: "John", age: 25 },
      { name: "Jane", age: 30 },
      { name: "Bob", age: 20 }
    ];
    
    var dataSource = new kendo.data.DataSource({
      data: originalArray,
      inPlaceSort: true,
      sort: { field: "name", dir: "asc" }
    });
    
    dataSource.read();
    
    // The original array is now sorted in place
    console.log(originalArray[0].name); // "Bob"
    
    $("#grid").kendoGrid({
      dataSource: dataSource
    });
    </script>

### offlineStorage `String|Object`

The offline storage key or custom offline storage implementation.


<div class="meta-api-description">
How do I configure offline data caching in Kendo UI DataSource? Control and configure offline data caching by setting the storage method for data persistence when the application is offline, enabling the use of either a predefined storage key or a custom storage implementation for saving data locally, managing offline access, data synchronization, and ensuring data availability without network connectivity through configurable offline storage options integrated with the data source initialization process.
</div>

#### Example - set an offline storage key

    <script>
    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/products"
            }
        }
    });
    </script>

#### Example - set a custom offline storage implementation

    <script>
    var dataSource = new kendo.data.DataSource({
        // use sessionStorage instead of localStorage
        offlineStorage: {
            getItem: function() {
                return JSON.parse(sessionStorage.getItem("products-key"));
            },
            setItem: function(item) {
                sessionStorage.setItem("products-key", JSON.stringify(item));
            }
        },
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/products"
            }
        }
    });
    </script>

### page `Number`

The page of data which the data source will return when the [`view`](/api/javascript/data/datasource/methods/view) method is invoked or request from the remote service.

> The data source will page the data items client-side unless the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true`.


<div class="meta-api-description">
How do I set the current page index for client-side pagination in Kendo UI DataSource? Control or configure which segment or page of data is retrieved or displayed when querying a data collection, enabling pagination either on the client side or remotely by specifying the current page index for data requests, coordinating with server-side paging if enabled, managing data slicing, fetching specific data portions, navigating through paged datasets, setting page number for data retrieval, and handling pagination state during data operations or view updates.
</div>

#### Example - set the current page

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      // set the second page as the current page
      page: 2,
      pageSize: 2
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Ham"
    });
    </script>

### pageSize `Number`

The number of data items per page. The property has no default value. Therefore, to use paging, make sure some `pageSize` value is set.

> The data source will page the data items client-side unless the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true`.


<div class="meta-api-description">
How do I set the number of items retrieved per page in Kendo UI's data source? Configure the number of items retrieved per page when fetching data, enabling pagination by specifying how many records to load at once for client-side or server-side data fetching. Control page length, set page limits, adjust batch sizes, define record counts per request, or enable paged data loading with customizable page size for efficient data display or processing. Manage paginated queries, control data slicing in UI components, and optimize data retrieval by setting the quantity of items returned in each data page or chunk.
</div>

#### Example - set the page size

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      page: 1,
      // a page of data contains two data items
      pageSize: 2
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Tea"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[1].name); // displays "Coffee"
    });
    </script>

### schema `Object`

The configuration used to parse the remote service response.


<div class="meta-api-description">
How to map data from a remote server response in Kendo UI DataSource? Configure how to read, interpret, and extract data from remote server responses by defining mappings for response fields such as data arrays, total counts, error messages, or metadata; enable setting custom parsing logic, field names, functions, or data models to transform and map incoming API payloads, JSON structures, or service responses into usable formats, control how response content is mapped to data items and metadata like totals and errors, and customize parsing rules to handle varied API formats, nested objects, or error handling within the data source integration.
</div>

#### Example - specify the schema of the remote service

    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/products",
            contentType: "application/json",
            type: "POST"
          },
          parameterMap: function (data, type) {
            if (type == "read") {
              return JSON.stringify(data);
            }
          }
        },
        schema: {
          data: function(response) {
            console.log(response)            
            return response;
          }
        }
      });
      dataSource.fetch(function(){
        var data = this.data();
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.length);
      });
    </script>

### schema.aggregates `Function|String`

The field from the response which contains the aggregate results. Can be set to a function which is called to return the aggregate results from the response.

> The `aggregates` option is used only when the [`serverAggregates`](/api/javascript/data/datasource#configuration-serverAggregates) option is set to `true`.

The result of the function should be a JavaScript object which contains the aggregate results for every field in the following format:

```pseudo
    {
      Field1Name: {
        Function1Name: Function1Value,
        Function2Name: Function2Value
      },
      Field2Name: {
        Function1Name: Function1Value
      }
    }
```

For example, if the data source is configured like this:

```pseudo
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverAggregates: true,
      aggregate: [
        { field: "unitPrice", aggregate: "max" },
        { field: "unitPrice", aggregate: "min" },
        { field: "ProductName", aggregate: "count" }
      ]
    });
```

The aggregate results should have the following format:

```pseudo
    {
      unitPrice: {
          max: 100,
          min: 1
      },
      productName: {
          count: 42
      }
    }
```


<div class="meta-api-description">
How do I configure Kendo UI DataSource to handle server-returned aggregate summaries? Configure the parsing and mapping of server-returned aggregate summaries such as sum, min, max, count, or custom aggregates by specifying the response field or providing a function that extracts and transforms aggregated data from the server response into a structured JavaScript object keyed by field names and aggregate types; this setup supports scenarios where server-side aggregation is enabled, facilitating retrieval and integration of calculated totals, counts, minimums, maximums, or other statistical summaries into the client data source for filtering, display, or further processing.
</div>

#### Example - set the aggregates as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverAggregates: true,
      schema: {
        aggregates: "aggregates" // aggregate results are returned in the "aggregates" field of the response
      }
    });
    </script>

#### Example - set the aggregates as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverAggregates: true,
      schema: {
        aggregates: function(response) {
          return response.aggregates;
        }
      }
    });
    </script>

### schema.data `Function|String`

The field from the server response which contains the data items. Can be set to a function which is called to return the data items for the response.

> The `data` option will not be used if the data source is grouped and set for [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping).


<div class="meta-api-description">
How do I configure Kendo UI's DataSource to extract data from a server response? Configure how to extract or select the main data items from a server response by specifying the response field name containing the data array or by providing a custom function that processes the response and returns the data elements; this setting helps control which part of the server's returned payload is used as the data source content, supporting flexible mapping from various response shapes, enabling developers to define or transform the data set to be consumed while handling JSON or other formats, especially when manual extraction or reshaping of the data items is required, except when data grouping is managed server-side where this extraction step is bypassed.
</div>

#### Returns

`Array`&mdash;The data items from the response.

#### Example - specify the field which contains the data items as a string

```pseudo
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/products",
            contentType: "application/json",
            type: "POST"
          },
          parameterMap: function (data, type) {
            if (type == "read") {
              return JSON.stringify(data);
            }
          }
        },
        schema: {
          data: "Data"
        }
      });
      dataSource.fetch(function(){
        var data = this.data();
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.length);
      });
    </script>
```

#### Example - specify the field which contains the data items as a function

    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/products",
            contentType: "application/json",
            type: "POST"
          },
          parameterMap: function (data, type) {
            if (type == "read") {
              return JSON.stringify(data);
            }
          }
        },
        schema: {
          data: function(response) {
            console.log(response)            
            return response; 
          }
        }
      });
      dataSource.fetch(function(){
        var data = this.data();
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.length);
      });
    </script>

### schema.errors `Function|String` *(default: "errors")*

The field from the server response which contains server-side errors. Can be set to a function which is called to return the errors for response. If there are any errors, the [`error`](/api/javascript/data/datasource/events/error) event will be fired.

```pseudo
    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/error-response",
          dataType: "json"
        }
      },
      schema: {
        data: "data",
        errors: "errors"
      },
      error: function(e) {
        console.log("Error occurred: " + e.errors);
      }
    });
    
    $("#grid").kendoGrid({
      dataSource: dataSource
    });
    </script>
```

> If this option is set and the server response contains that field, then the `error` event will be fired. The `errors` field of the event argument will contain the errors returned by the server.


<div class="meta-api-description">
How to configure Kendo UI DataSource to detect errors in server responses? Configure error detection and handling for server responses by specifying how to identify error information within the returned data structure, either by naming the response field containing errors, such as "errors," or by providing a custom function that extracts error details from the raw server reply. Enable automatic triggering of error events when the designated error field is found and includes error messages or objects, allowing developers to capture and respond to server-side issues efficiently. Control and customize error parsing, processing, and event notification for server responses in data fetching scenarios, supporting varied formats of error representation and flexible integration with error management workflows. Adjust detection logic to map specific error-containing fields or transform raw server responses into standardized error arrays or objects for consistent error reporting and handling within data-driven components.
</div>

#### Specify the error field as a string

```pseudo
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://run.mocky.io/v3/ef00571f-cd9c-4bb3-a8fc-c98afa9e8de4",
        }
      },
      schema: {
        data: "items",
        errors: function(response) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("errors as function", response.errors[0])
          return response.errors;
        }
      },
      error: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("error event handler", e.errorThrown);
      }
    });
    dataSource.fetch();
    </script>
```

#### Specify the error field as a function

```pseudo
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/products",
          }
        },
        schema: {
          errors: function(response) { 
            return response.error;
          }
        },
        error: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.errors);
        }
      });
      dataSource.fetch();
    </script>
```

### schema.groups `Function|String`

The field from the server response which contains the groups. Can be set to a function which is called to return the groups from the response.

> The `groups` option is used only when the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) option is set to `true`.

The result should have the following format:

    [{
      aggregates: {
        FIEL1DNAME: {
          FUNCTON1NAME: FUNCTION1VALUE,
          FUNCTON2NAME: FUNCTION2VALUE
        },
        FIELD2NAME: {
          FUNCTON1NAME: FUNCTION1VALUE
        }
      },
      field: FIELDNAME, // the field by which the data items are grouped
      hasSubgroups: true, // true if there are subgroups
      items: [
        // either the subgroups or the data items
        {
          aggregates: {
            //nested group aggregates
          },
          field: NESTEDGROUPFIELDNAME,
          hasSubgroups: false,
          items: [
          // data records
          ],
          value: NESTEDGROUPVALUE
        },
        //nestedgroup2, nestedgroup3, etc.
      ],
      value: VALUE // the group key
    } /* other groups */
    ]


<div class="meta-api-description">
How do I configure Kendo UI's DataSource to handle hierarchical grouping data from a server response? Configure or control how hierarchical grouping information from server responses maps into the data source by specifying the response field containing grouped data or by defining a custom extractor function that processes the server payload and returns an array of group objects structured with aggregate summaries, group field identifiers, subgroup presence flags, nested items or subgroups, and group key values; support for multi-level nested groups includes consistent schema shapes for aggregates per field with respective aggregation function results, fields identifying grouping criteria, boolean indicators for subgroups, arrays of subordinate groups or raw data items, and group values, enabling features like server-side grouping, complex nested group handling, and aggregation mapping for client-side rendering or data manipulation within any server grouping-enabled data pipeline or query response transformation workflow.
</div>

#### Example - set the groups as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      group:[{field: "field"}],
      serverGrouping: true,
      schema: {
        groups: "groups" // groups are returned in the "groups" field of the response
      }
    });
    </script>

#### Example - set the groups as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      group:[{field: "field"}],
      serverGrouping: true,
      schema: {
        groups: function(response) {
          return response.groups; // groups are returned in the "groups" field of the response
        }
      }
    });
    </script>

### schema.model `Object|kendo.data.Model`

The data item (model) configuration.

If set to an object, the [`Model.define`](/api/javascript/data/model/methods/define) method will be used to initialize the data source model.

If set to an existing [`kendo.data.Model`](/api/javascript/data/model) instance, the data source will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How do I customize data entry structure in Kendo UI DataSource? Define and customize the structure, attributes, and behavior of individual data entries within a data collection by setting up fields, identifiers, default values, validation rules, and custom methods to control creation and data integrity; configure schema models dynamically using object definitions or leverage existing model instances to shape how data records are initialized, validated, and managed, enabling precise control over data item formats, data source modeling, and record lifecycle customization in data-driven applications.
</div>

#### Example - set the model as a JavaScript object

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "ProductID",
          fields: {
            ProductID: {
              //this field will not be editable (default value is true)
              editable: false,
              // a defaultValue will not be assigned (default value is false)
              nullable: true
            },
            ProductName: {
              //set validation rules
              validation: { required: true }
            },
            UnitPrice: {
              //data type of the field {number|string|boolean|date} default is string
              type: "number",
              // used when new model is created
              defaultValue: 42,
              validation: { required: true, min: 1 }
            }
          }
        }
      }
    });
    </script>

#### Example - set the model as an existing `kendo.data.Model` instance

    <script>
    var Product = kendo.data.Model.define({
      id: "ProductID",
      fields: {
        ProductID: {
          //this field will not be editable (default value is true)
          editable: false,
          // a defaultValue will not be assigned (default value is false)
          nullable: true
        },
        ProductName: {
          //set validation rules
          validation: { required: true }
        },
        UnitPrice: {
          //data type of the field {number|string|boolean|date} default is string
          type: "number",
          // used when new model is created
          defaultValue: 42,
          validation: { required: true, min: 1 }
        }
      }
    });
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: Product
      }
    });
    </script>

### schema.parse `Function`

Executed before the server response is used. Use it to preprocess or parse the server response.


<div class="meta-api-description">
How do I modify raw server response data in Kendo UI for jQuery? Transform, preprocess, normalize, or extract and modify raw server response data before it is handled by the data source, enabling control over the server payload by parsing, filtering, mapping fields, reshaping nested results, or restructuring incoming data for consistent consumption, allowing configuration to intercept and adjust raw API or backend output into the desired format for downstream processing or display.
</div>

#### Parameters

##### response `Object|Array`

The initially parsed server response that may need additional modifications.

#### Returns

`Array`&mdash;The data items from the response.

#### Example - set the data projection

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      schema: {
        parse: function(response) {
          var products = [];
          for (var i = 0; i < response.length; i++) {
            var product = {
              id: response[i].ProductID,
              name: response[i].ProductName
            };
            products.push(product);
          }
          return products;
        }
      }
    });
    dataSource.fetch(function(){
      var data = dataSource.data();
      var product = data[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(product.name); // displays "Chai"
    });
    </script>

### schema.total `Function|String`

The field from the server response which contains the total number of data items. Can be set to a function which is called to return the total number of data items for the response.

> * The `schema.total` setting may be omitted when the Grid is bound to a plain `Array` (that is, the data items' collection is not a value of a field in the server response). In this case, the `length` of the response `Array` will be used.
> * The `schema.total` must be set if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true` or the [`schema.data`](/api/javascript/data/datasource#configuration-schema.data) option is used.


<div class="meta-api-description">
How to set up total count for server-driven paging in Kendo UI DataSource? Specify or customize how to extract the total number of data items from server responses for accurate pagination and item counting, including setting a response field name or providing a callback function to determine total count dynamically; configure total counts for server-driven paging scenarios or structured response data where total results aren’t directly inferred, supporting cases where total items need to be read separately from data arrays or nested response properties, enabling control over paging indicators, result summaries, and total record calculations regardless of whether data comes as plain arrays, complex objects, or requires custom logic to compute total items.
</div>

#### Returns

`Number`&mdash;The total number of data items.

#### Example - set the total as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverGrouping: true,
      schema: {
        total: "total" // total is returned in the "total" field of the response
      }
    });
    </script>

#### Example - set the total as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverGrouping: true,
      schema: {
        total: function(response) {
          return response.total; // total is returned in the "total" field of the response
        }
      }
    });
    </script>

### schema.type `String` *(default: "json")*

The type of the response.

The supported values are:

* `"xml" `
* `"json"`

By default, the schema interprets the server response as JSON.


<div class="meta-api-description">
How do I configure my Kendo UI DataSource to parse JSON responses from a server? Configure the expected format of server responses to enable parsing and processing of remote data or API results, including setting the response type as JSON or XML to handle AJAX calls and dynamic data binding. Enables control over how incoming payloads are interpreted by specifying whether the data structure is JSON-based or XML-based, allowing for correct extraction and mapping of data fields from diverse server responses. Useful for adjusting data source parsing behavior, handling various content types, managing API response formats, and ensuring accurate reading of remote data sets in different serialization formats.
</div>

#### Example - use XML data

    <script>
    var dataSource = new kendo.data.DataSource({
      data: '<books><book id="1"><title>Secrets of the JavaScript Ninja</title></book></books>',
      schema: {
        // specify the schema is XML
        type: "xml",
        // the XML element which represents a single data record
        data: "/books/book",
        // define the model - the object which will represent a single data record
        model: {
          // configure the fields of the object
          fields: {
            // the "title" field is mapped to the text of the "title" XML element
            title: "title/text()",
            // the "id" field is mapped to the "id" attribute of the "book" XML element
            id: "@cover"
          }
        }
      }
    });
    dataSource.fetch(function() {
      var books = dataSource.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(books[0].title); // displays "Secrets of the JavaScript Ninja"
    });
    </script>

### serverAggregates `Boolean` *(default: false)*

If set to `true`, the data source will leave the aggregate calculation to the remote service. By default, the data source calculates aggregates client-side.

> Configure [`schema.aggregates`](/api/javascript/data/datasource#configuration-schema.aggregates) if you set `serverAggregates` to `true`.

For more information and tips about client and server data operations, refer to the [introductory article on the DataSource](/framework/datasource/overview#mixed-data-operations-mode).


<div class="meta-api-description">
How to enable server-side aggregation in Kendo UI for jQuery DataSource? Enable remote or server-side aggregation to delegate summary calculations like sum, average, count, min, max, and other group-level aggregates to the backend service or database instead of performing these computations on the client. This setting helps optimize data processing by offloading aggregate calculations to the server, reducing client CPU usage and improving performance when working with large datasets or paged data. Use this to control whether aggregates are computed remotely or locally, and set up the proper schema or query configuration to support server aggregation. Ideal for scenarios where you want centralized data summarization, scalable aggregation, cloud-enabled computations, or want to configure whether the client or server handles total, subtotal, and grouped aggregate results.
</div>

#### Example - enable server aggregates

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverAggregates: true,
      aggregate: [
        { field: "age", aggregate: "sum" }
      ],
      schema: {
        aggregates: "aggregates" // aggregate results are returned in the "aggregates" field of the response
      }
    });
    </script>

### serverFiltering `Boolean` *(default: false)*

If set to `true`, the data source will leave the filtering implementation to the remote service. By default, the data source performs filtering client-side.

By default, the [`filter`](/api/javascript/data/datasource#configuration-filter) is sent to the server following jQuery [conventions](https://api.jquery.com/jQuery.param/).

For example, the filter `{ logic: "and", filters: [ { field: "name", operator: "startswith", value: "Jane" } ] }` is sent as:

*  `filter[logic]: and`
*  `filter[filters][0][field]: name`
*  `filter[filters][0][operator]: startswith`
*  `filter[filters][0][value]: Jane`

Use the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option to send the filter option in a different format.

For more information and tips about client and server data operations, refer to the [introductory article on the DataSource](/framework/datasource/overview#mixed-data-operations-mode).


<div class="meta-api-description">
How to configure server-side filtering in Kendo UI DataSource? Control whether filtering is performed on the server by configuring remote data filtering, enabling server-side filtering instead of client-side processing, sending filter criteria in requests so that the backend applies them according to specified logic and operators; set filtering to true to delegate filter operations to the server, customize filter parameter formats via parameter mapping, handle complex filter expressions including nested conditions and multiple fields, and optimize data retrieval by offloading filter computations to the server side rather than the client.
</div>

#### Example - enable server filtering

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverFiltering: true,
      filter: { logic: "and", filters: [ { field: "name", operator: "startswith", value: "Jane" } ] }
    });
    </script>

### serverGrouping `Boolean` *(default: false)*

If set to `true`, the data source will leave the grouping implementation to the remote service. By default, the data source performs grouping client-side.

By default, the [`group`](/api/javascript/data/datasource#configuration-group) is sent to the server following jQuery [conventions](https://api.jquery.com/jQuery.param/).

For example, the group `{ field: "category", dir: "desc" }` is sent as:

*  `group[0][field]: category`
*  `group[0][dir]: desc`

Use the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option to send the group option in a different format.

For more information and tips about client and server data operations, refer to the [introductory article on the DataSource](/framework/datasource/overview#mixed-data-operations-mode).


<div class="meta-api-description">
How to implement server-side grouping in Kendo UI DataSource for large datasets? Configure remote data grouping by enabling server-side grouping to delegate grouping logic and criteria to a backend service, optimizing performance for large datasets or paged data. Control how group configurations are sent with requests, customize request parameter formats for grouping through mappings, and switch between server-managed grouping and default client-side grouping. Adjust request payloads to match backend expectations for grouped data retrieval, control grouping directions and fields in API calls, handle mixed scenarios with combined client and server operations, and optimize data loading strategies by offloading group sorting and aggregation to remote servers.
</div>

#### Example - enable server grouping

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverGrouping: true,
      group: { field: "category", dir: "desc" }
    });
    </script>

### serverPaging `Boolean` *(default: false)*

If set to `true`, the data source will leave the data item paging implementation to the remote service. By default, the data source performs paging client-side.

> Configure [`schema.total`](/api/javascript/data/datasource#configuration-schema.total) if you set `serverPaging` to `true`. In addition, [`pageSize`](/api/javascript/data/datasource#configuration-pageSize) should be set no matter if paging is performed client-side or server-side.

The following options are sent to the server when server paging is enabled:

- `page` - The page of data item to return (`1` means the first page).
- `pageSize` - The number of items to return.
- `skip` - The number of data items to skip.
- `take` - The number of data items to return (the same as `pageSize`).

The `skip` and `take` values are automatically calculated based on the current `page` and `pageSize`. This means that a dataSource with `page` = 3 and `pageSize` = 20 will generate a request that has `skip` = 40 and `take` = 20.

Use the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option to send the paging options in a different format.

For more information and tips about client and server data operations, refer to the [introductory article on the DataSource]({% slug overview_kendoui_datasourcecomponent %}#mixed-data-operations-mode).

For a runnable example with enabled server paging, you can visit [the Grid remote data binding demo.](https://demos.telerik.com/kendo-ui/grid/remote-data-binding)


<div class="meta-api-description">
How to configure remote pagination in Kendo UI for jQuery DataSource? Enable remote or server-side pagination by configuring data fetching to delegate page calculation, page size, item skipping, and data slicing to the backend service instead of performing paging locally on the client. Control the number of items per page, current page number, and offsets such as skip and take parameters sent to the server, allowing precise control over remote data retrieval and avoiding client memory overload. Customize or map paging query parameters to fit backend API requirements, ensuring correct total data count is handled through schema configuration. Use terms like remote pagination, server paging, backend data slicing, skip and take logic, pageSize settings, parameter mapping, and data virtualization for optimized searches related to paged data loading, virtual scrolling, and efficient large dataset handling.
</div>

#### Example - enable server paging

    <div id="container"></div>
    
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          // The remote endpoint which will receive the request parameters and return the response containing the data.
          read: {
            url: "https://demos.telerik.com/service/v2/core/Products",
          }
        },
        serverPaging: true,
        pageSize: 10, // The number of items per page.
        page: 3 // Change the page property to see a different set of items. The endpoint contains 77 items in total. This means that there are eight pages (eight pages multiplied by 10 records each).
      });
      
      // The remote endpoint is configured to return the items in descending order. The first item is with ID = 77, the last item is with ID = 1
      dataSource.fetch(function() {
        let data = this.data(),
            currentPage = this.page();
        
        // For demo purposes, each item in the current page is rendered on the screen.
        data.forEach((item) => {
          let element = `<p>ID - ${item.ProductID}, Name = ${item.ProductName}, Page = ${currentPage}</p>`;
          $("#container").append($(element));
        });
      });
    </script>

### serverSorting `Boolean` *(default: false)*

If set to `true`, the data source will leave the data item sorting implementation to the remote service. By default, the data source performs sorting client-side.

By default, the [`sort`](/api/javascript/data/datasource#configuration-sort) is sent to the server following jQuery [conventions](https://api.jquery.com/jQuery.param/).

For example, the sort `{ field: "age", dir: "desc" }` is sent as:

* `sort[0][field]: age`
* `sort[0][dir]: desc`

Use the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option to send the paging options in a different format.

For more information and tips about client and server data operations, refer to the [introductory article on the DataSource](/framework/datasource/overview#mixed-data-operations-mode).


<div class="meta-api-description">
How do I configure Kendo UI for jQuery to sort data on the server-side? Control whether sorting is performed on the server or client side by enabling remote sorting logic, configure data queries to delegate sorting of items to the backend service instead of local processing, set sorting preferences to allow server-driven order based on fields and directions such as ascending or descending, customize how sorting parameters are sent with requests using conventions like nested field and direction keys or alternative formats via parameter mapping, optimize data operations by deciding if the server handles sorting tasks to reduce client load or supports complex sorting scenarios, toggle between client and server sorting modes for efficient handling of large datasets or real-time backend order updates.
</div>

#### Example - enable server sorting

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverSorting: true,
      sort: { field: "age", dir: "desc" }
    });
    </script>

### sort `Array|Object`

The sort order which will be applied over the data items. By default, the data items are not sorted.

> The data source sorts the data items client-side unless the [`serverSorting`](/api/javascript/data/datasource#configuration-serverSorting) option is set to `true`.


<div class="meta-api-description">
How to enable client-side sorting in Kendo UI DataSource? Control how data items are ordered by configuring sorting criteria, specifying one or multiple fields to sort by, and setting ascending or descending directions to organize results. Enable or disable client-side sorting versus server-side sorting when applicable, customize sort descriptors to prioritize fields, and manage result arrangement based on different property values. This covers use cases such as applying multi-field sorting rules, adjusting sort order dynamically, and ensuring data is displayed in a preferred sequence through configurable sorting options.
</div>

#### Example - sort the data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sort: { field: "age", dir: "desc" }
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[0].age); // displays "33"
    });
    </script>

#### Example - sort the data items by multiple fields

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      sort: [
        // sort by "category" in descending order and then by "name" in ascending order
        { field: "category", dir: "desc" },
        { field: "name", dir: "asc" }
      ]
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[1].name); // displays "Coffee"
    });
    </script>

### sort.dir `String`

The sort order (direction).

The supported values are:

* `"asc"` (ascending order)
* `"desc"` (descending order)


<div class="meta-api-description">
How do I set the sorting direction for my Kendo UI data source to ascending order? Configure or control the sorting direction for data queries, enabling ascending or descending order arrangements for data source results, datasets, or collections. Set, update, change, or apply sort direction to organize, filter, or display data in ascending (asc) or descending (desc) sequence, supporting sorting preferences, programmatic adjustments, or UI-driven order toggling to manage sorted outputs, results, or data views effectively.
</div>

#### Example - specify the sort order (direction)

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      // order by "age" in descending order
      sort: { field: "age", dir: "desc" }
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[0].age); // displays "33"
    });
    </script>

### sort.field `String`

The field by which the data items are sorted.


<div class="meta-api-description">
How do I specify which field to sort by in a Kendo UI DataSource? Control and configure the sorting behavior by selecting the specific data attribute, key, or property used to order items within a data collection, enabling sorting by fields such as names, dates, or custom record properties. Set, change, or define which field or data column governs the sort sequence to customize record ordering by any relevant data property or key, allowing for tailored ascending or descending arrangements based on user-defined fields, attributes, or identifiers in the dataset. Adjust and specify the sorting criteria by naming the data property that acts as the sort key, optimizing how records are prioritized or organized according to chosen data fields or values.
</div>

#### Example - specify the sort field

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      // order by "age" in descending order
      sort: { field: "age", dir: "desc" }
    });
    dataSource.fetch(function(){
      var data = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[0].age); // displays "33"
    });
    </script>

### sort.compare `Function`

Function which can be used for custom comparing of the DataSource items.


<div class="meta-api-description">
How to customize sorting behavior in Kendo UI's DataSource widget? Customize the sorting behavior by defining a comparison function that determines the order of items based on your own criteria, enabling tailored sorting logic such as locale-sensitive ordering, nested property sorting, multi-field comparison, or complex rules for data initialization sequences. Control how data items are arranged by setting a function that receives two elements and returns a negative, zero, or positive number to dictate their relative ranking, allowing for flexible, precise sorting mechanisms beyond default alphabetical or numerical order and supporting advanced use cases like case-insensitive sorting, hierarchical data ordering, or custom value prioritization.
</div>

#### Example - use a custom compare function to compare items in the DataSource

    <div id="grid"></div>
    <script>
      var numbers = {
        "one"  : 1,
        "two"  : 2,
        "three": 3,
        "four" : 4,
      };

      var dataSource = new kendo.data.DataSource({
        data: [
          { id: 1, item: "two" },
          { id: 2, item: "one" },
          { id: 3, item: "three" },
          { id: 4, item: "four" }
        ],
        sort: { field: "item", dir: "asc", compare: function(a, b) {
          return numbers[a.item] - numbers[b.item];
        }
              }
      });

      $("#grid").kendoGrid({
        dataSource: dataSource,
        sortable: true,
        columns: [{
          field: "item",
          sortable: {
            compare: function(a, b) {
              return numbers[a.item] - numbers[b.item];
            }
          }
        }]
      });
    </script>

### transport `Object`

The configuration used to load and save the data items. A data source is remote or local based on the way it retrieves data items.

Remote data sources load and save data items from and to a remote end-point (also known as remote service or server). The `transport` option describes the remote service configuration - URL, HTTP verb, HTTP headers, and others. The `transport` option can also be used to implement custom data loading and saving.

Local data sources are bound to a JavaScript array via the [`data`](/api/javascript/data/datasource#configuration-data) option.


<div class="meta-api-description">
How to configure remote endpoints for data loading in Kendo UI DataSource transport? Configure how data is loaded, saved, fetched, or updated by specifying remote endpoints, URLs, HTTP methods like GET, POST, PUT, DELETE, custom headers, and request parameters, or by implementing custom read, create, update, and delete logic for data transport. Control integration with RESTful services, AJAX calls, or any external data sources, enabling connectivity to remote servers or defining in-memory or local array sources. Adjust data retrieval, saving behaviors, syncing, and service connection settings, including how to set up requests, handle responses, and customize data flow between client and server endpoints in both synchronous and asynchronous ways.
</div>

#### Example - specify the remote service configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.fetch(function() {
      var products = dataSource.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(products[0].ProductName); // displays "Chai"
    });
    </script>

### transport.batch `Object`

> Configurable for the [odata-v4 data source `type`](/api/javascript/data/datasource/configuration/type) in [`batch`](/api/javascript/data/datasource/configuration/batch) mode.

The object can contain all the available [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/) options.


<div class="meta-api-description">
How do I configure the batch transport for my Kendo UI DataSource to handle multiple CRUD operations as a single OData v4 request? Configure and control how multiple create, read, update, and delete operations are combined and sent together as a single batch HTTP request when working with OData v4 services, enabling efficient bulk data modifications. Customize the batch request transport by setting options like URL endpoints, HTTP method types, data formats, content headers, authentication tokens, request timeouts, caching behavior, data serialization, and callbacks for handling success or error responses. Enable precise control over Ajax parameters and hooks to tailor batch processing, optimize network traffic, implement request retries, or modify headers before sending grouped CRUD actions in one network call for improved OData v4 batch data handling.
</div>

#### Example

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      batch: true,
      transport: {
        read: {
          url: "https://services.odata.org/V4/OData/OData.svc/Products"
        },
        batch: {
          url: "https://services.odata.org/V4/OData/OData.svc/$batch",
          contentType: "multipart/mixed"
        }
      },
      schema: {
        model: {
          id: "ID",
          fields: {
            ID: { type: "number" },
            Name: { type: "string" }
          }
        }
      }
    });
    
    $("#grid").kendoGrid({
      dataSource: dataSource,
      editable: true
    });
    </script>

### transport.batch.url `String|Function`

> This option is configurable for the [odata-v4 data source `type`](/api/javascript/data/datasource/configuration/type) in [`batch`](/api/javascript/data/datasource/configuration/batch) mode.

The [odata-v4 batch `endpoint`](https://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398359) to which the request is sent.

If set to a function, the data source will invoke it and use the result as the URL.


<div class="meta-api-description">
How to configure the batch URL for OData v4 services in Kendo UI DataSource transport? Set or configure the endpoint URL for sending batch requests using OData v4 services, control or customize the batch operation URL for grouped or combined data updates, enable dynamic or static batch request URLs including functional URL generation for batched CRUD operations, specify the OData v4 batch processing endpoint for efficient multiple request handling, support custom routing for batch API calls, adjust the batch transport URL to optimize bulk data submission or querying, manage batch transport URLs for OData v4 in batch request mode, and define or programmatically determine the URL target used when batching multiple OData requests together.
</div>

#### Example

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      batch: true,
      transport: {
        read: {
          url: "https://services.odata.org/V4/OData/OData.svc/Products"
        },
        batch: {
          url: function() {
            return "https://services.odata.org/V4/OData/OData.svc/$batch";
          }
        }
      },
      schema: {
        model: {
          id: "ID",
          fields: {
            ID: { type: "number" },
            Name: { type: "string" }
          }
        }
      }
    });
    
    $("#grid").kendoGrid({
      dataSource: dataSource,
      editable: true
    });
    </script>

### transport.cache `Boolean` *(default: false)*

Specifies if the transport caches the result from `read` requests. The query parameters are used as a cache key and if the key is present in the cache, a new request to the server is not executed. The cache is kept in memory and, thus, cleared on page refresh.


<div class="meta-api-description">
How do I prevent repeated network calls with Kendo UI's DataSource? Control caching behavior for client-side data retrieval to prevent repeated network calls by storing responses in memory based on request parameters; configure enabling or disabling of automatic in-memory cache for fetch or read operations to optimize performance, reduce duplicate server queries, and speed up data loading by reusing previous results until a page reload clears the cache.
</div>

#### Example - specify the remote service configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: "https://demos.telerik.com/service/v2/odata/Orders",
        cache: true
      },
      schema: {
        model: {
          fields: {
            OrderID: { type: "number" },
            Freight: { type: "number" },
            ShipName: { type: "string" },
            OrderDate: { type: "date" },
            ShipCity: { type: "string" }
          }
        }
      },
      pageSize: 20,
      serverPaging: true,
      serverFiltering: true,
      serverSorting: true
    });
    dataSource.fetch(function() {
      dataSource.page(2);
      dataSource.page(1); //a new request is not executed
    });
    </script>

### transport.create `Object|String|Function`

The configuration used when the data source saves newly created data items. Those are items added to the data source via the [`add`](/api/javascript/data/datasource/methods/add) or [`insert`](/api/javascript/data/datasource/methods/insert) methods.

> The data source uses [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/) to make an HTTP request to the remote service. The value configured via `transport.create` is passed to [`jQuery.ajax`](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings). This means that you can set all options supported by `jQuery.ajax` via `transport.create` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.create` is a function, the data source invokes that function instead of `jQuery.ajax`. Check [the jQuery documentation](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings) for more details on the provided argument.

If the value of `transport.create` is a string, the data source uses this string as the URL of the remote service.

> * The remote service must return the inserted data items and the data item field configured as the `id` must be set. For example, if the `id` of the data item is `ProductID`, the `"create"` server response must be `[{ "ProductID": 79, "AnotherProperties": "value"}]` including the ID and the other properties of the data items.
> * All transport actions (read, update, create, destroy) must be defined in the same way, that is, as functions or as objects. Mixing the different configuration alternatives is not possible.


<div class="meta-api-description">
How to configure Kendo UI DataSource to submit new records using a specific endpoint URL? Configure how new data records are saved by setting up the mechanism for submitting newly added items, including specifying the endpoint URL for creating entries, customizing AJAX options for the create request, or providing a custom function to handle the creation process. This setup supports defining how new records are transmitted to remote services, enabling actions like adding new database entries through automated HTTP calls, fine-tuning request parameters, or implementing custom transport logic that replaces default AJAX behavior, ensuring consistent data submission and retrieval of the newly created items with their unique identifiers returned from the server. This is essential for controlling create operations in data synchronization workflows and requires uniform configuration style across all CRUD operations for coherent handling of data persistence.
</div>

#### Example - set the create remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "https://demos.telerik.com/service/v2/core/products/create",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            // send the created data items as the "models" service parameter encoded in JSON
            return kendo.stringify(data.models);
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    // create a new data item
    dataSource.add( { ProductName: "New Product" });
    // save the created data item
    dataSource.sync(); // server response is [{"ProductID":78,"ProductName":"New Product","UnitPrice":0,"UnitsInStock":0,"Discontinued":false}]
    </script>

#### Example - set create as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          /* implementation omitted for brevity */
        },
        create: function(options) {
          $.ajax({
            url: "https://demos.telerik.com/service/v2/core/products/create",
            type: "POST",
            contentType: "application/json",
            data: kendo.stringify(options.data.models),
            success: function(result) {
              // notify the data source that the request succeeded
              options.success(result);
            },
            error: function(result) {
              // notify the data source that the request failed
              options.error(result);
            }
          });
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.add( { ProductName: "New Product" });
    dataSource.sync();
    </script>

### transport.create.cache `Boolean`

If set to `false`, the request result will not be cached by the browser. Setting `cache` to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters. By default, `"jsonp"` requests are not cached.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I prevent browser caching when creating data in Kendo UI's DataSource transport? Control browser caching behavior for create request operations by configuring cache settings to disable or enable caching of HTTP HEAD and GET requests, preventing stale data transmission during resource creation or submission. Manage and customize how GET requests append unique timestamp parameters to avoid browser or intermediary caches from returning outdated responses, ensuring fresh data interactions when sending new resource requests. Adjust cache control for transport layers to support appropriate caching strategies, including disabling cache for JSONP requests by default and configuring AJAX request cache handling for create operations within data source workflows. Enable fine-tuned cache management for create actions to prevent unintended reuse of old data while facilitating efficient data exchange and synchronization in web applications.
</div>

#### Example - enable request caching

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          /* omitted for brevity */
          cache: true
        }
      }
    });
    </script>

### transport.create.contentType `String`

The content-type HTTP header sent to the server. The default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON. Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to set the content type for create requests in Kendo UI DataSource? Set or customize the HTTP Content-Type header for create requests when sending data to a server, including options to specify JSON payloads with "application/json" or traditional form data with "application/x-www-form-urlencoded"; control the format of the create operation’s request body, adjust headers for API compatibility, configure content type to match server expectations, and manage how new records are posted in AJAX or RESTful interactions.
</div>

#### Example - set a content type

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          /* omitted for brevity */
          contentType: "application/json"
        }
      }
    });
    </script>

### transport.create.data `Object|Function`

Additional parameters that are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for [sorting](/api/javascript/data/datasource#configuration-serverSorting), [filtering](/api/javascript/data/datasource#configuration-serverFiltering), [paging](/api/javascript/data/datasource#configuration-serverPaging), and [grouping](/api/javascript/data/datasource#configuration-serverGrouping).

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to add custom fields to Kendo UI DataSource create request? Include extra custom fields, parameters, or name/value pairs to send alongside create requests when performing remote data creation operations; configure additional data payload for server-side handling, append custom parameters to the create transport call, control what supplementary information is posted during creation, integrate extra key-value pairs to pass alongside remote inserts, customize request body content for create actions without conflicting with reserved keywords such as sorting, filtering, paging, or grouping options commonly used in data operations.
</div>

#### Example - send additional parameters as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          /* omitted for brevity */
          data: {
            name: "Jane Doe",
            age: 30
          }
        }
      }
    });
    </script>

#### Example - send additional parameters by returning them from a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          /* omitted for brevity */
          data: function() {
            return {
              name: "Jane Doe",
              age: 30
            }
          }
        }
      }
    });
    </script>

### transport.create.dataType `String`

The type of result expected from the server. Commonly used values are `"json"` and `"jsonp"`.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to set the expected response format for create operations in Kendo UI DataSource transport? Control and configure the expected response format or content type for create operations in data source transports, enabling proper parsing and handling of server responses when creating new records or resources. Set or specify common data formats like JSON, JSONP, or other jQuery.ajax supported types to ensure correct interpretation of server feedback during create requests. Enable customization of accepted return data types to handle asynchronous create calls, define how to process response payloads, and manage data serialization formats for create transport in data operations. Adjust or set the dataType for create requests to match server response formats, facilitating seamless integration and data exchange workflows.
</div>

#### Example - set the data type to JSON

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          /* omitted for brevity */
          dataType: "json"
        }
      }
    });
    </script>

### transport.create.type `String` *(default: "GET")*

The type of request to make (`"POST"`, `"GET"`, `"PUT"` or `"DELETE"`). The default request is `"GET"`.

> The `type` option is ignored if `dataType` is set to `"jsonp"`. JSONP always uses GET requests.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
What HTTP method should I use for creating new data with Kendo UI's DataSource transport? Set or configure the HTTP method used for create operations in data interactions with RESTful services, enabling you to specify request types such as POST, GET, PUT, or DELETE when sending new data to an endpoint; this option is essential for controlling how data is submitted during create actions, affects request behavior in AJAX calls, can be overridden or ignored in cases like JSONP which strictly uses GET, and is useful for managing API communications, altering HTTP verbs, customizing CRUD request methods, and ensuring proper server-side handling of create requests.
</div>

#### Example - set the HTTP verb of the request

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          /* omitted for brevity */
          type: "POST"
        }
      }
    });
    </script>

### transport.create.url `String|Function`

The URL to which the request is sent.

If set to a function, the data source will invoke it and use the result as the URL.


<div class="meta-api-description">
How do I specify the URL for creating new records with Kendo UI DataSource transport? Configure the target URL or endpoint for sending new record creation requests, enabling customization of where data is posted or submitted when adding entries. This setting supports specifying a fixed string URL or a dynamic function that returns a URL, allowing control over create operations' destination in data synchronization workflows, API integrations, and backend communication for inserting new items. Developers commonly seek ways to define, set, update, or customize the create request endpoint, control the destination URL for POST operations, handle dynamic URL generation for create calls, or direct the data insertion process to specific servers or services.
</div>

#### Example - specify the URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "https://demos.telerik.com/service/v2/core/products/create",
          cache: true,
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            return kendo.stringify(data.models)
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.add( { ProductName: "New Product" });
    dataSource.sync();
    </script>

#### Example - specify the URL as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: function(options) {
            return "https://demos.telerik.com/service/v2/core/products/create"
          },
          cache: true,
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            return kendo.stringify(data.models)
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.add( { ProductName: "New Product" });
    dataSource.sync();
    </script>

### transport.destroy `Object|String|Function`

The configuration used when the data source destroys data items. Those are items removed from the data source via the [`remove`](/api/javascript/data/datasource/methods/remove) method.

> The data source uses [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) to make an HTTP request to the remote service. The value configured via `transport.destroy` is passed to `jQuery.ajax`. This means that you can set all options supported by `jQuery.ajax` via `transport.destroy` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.destroy` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.destroy` is a string, the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, that is, as functions or as objects. Mixing the different configuration alternatives is not possible.


<div class="meta-api-description">
How do I configure delete request handling in Kendo UI DataSource? Configure delete request handling for data removal operations by specifying how to send HTTP DELETE or removal calls, including options to set custom URLs for delete endpoints, provide AJAX request parameters like headers or content type, supply callback functions to override default request behavior, and control whether to use functions, plain URL strings, or full AJAX configurations consistently with other CRUD operations to ensure uniform request handling and integration with client-server synchronization workflows.
</div>

#### Example - set the destroy remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        },
        destroy: {
          url: "https://demos.telerik.com/service/v2/core/products/destroy",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "destroy") {
            // send the destroyed data items as the "models" service parameter encoded in JSON
            return kendo.stringify(data.models)
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var products = dataSource.data();
      // remove the first data item
      dataSource.remove(products[0]);
      // send the destroyed data item to the remote service
      dataSource.sync();
    });
    </script>

#### Example - set destroy as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          $.ajax({
            url: "https://demos.telerik.com/service/v2/core/products",
            success: function(result) {
              options.success(result);
            }
          });
        },
        destroy: function (options) {
          $.ajax({
            url: "https://demos.telerik.com/service/v2/core/products/destroy",
            type: "POST",
            contentType: "application/json",
            data: kendo.stringify(options.data.models),
            success: function(result) {
              // notify the data source that the request succeeded
              options.success(result);
            },
            error: function(result) {
              // notify the data source that the request failed
              options.error(result);
            }
          });
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var products = dataSource.data();
      dataSource.remove(products[0]);
      dataSource.sync();
    });
    </script>

### transport.destroy.cache `Boolean`

If set to `false`, the request result will not be cached by the browser. Setting `cache` to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters. By default, `"jsonp"` requests are not cached.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to prevent browser caching during destroy operations in Kendo UI DataSource transport? Control browser caching behavior for deletion or destroy HTTP requests by enabling or disabling cache prevention mechanisms, ensuring that destroy operations do not retrieve stale or cached responses; configure settings to append unique timestamps to GET requests or adjust transport options to avoid unwanted cache hits during resource removal or destruction calls, which is particularly relevant when managing HTTP HEAD or GET methods and handling cache invalidation strategies to maintain fresh server state and prevent interference from browser or proxy caches during delete operations.
</div>

#### Example - enable request caching

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        destroy: {
          /* omitted for brevity */
          cache: true
        }
      }
    });
    </script>

### transport.destroy.contentType `String`

The content-type HTTP header sent to the server. The default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON. Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I set the content type for delete requests in a Kendo UI DataSource? Set or customize the HTTP Content-Type header used when sending delete or destroy requests from a data source, specifying the format of the request payload such as JSON, form URL-encoded, or other MIME types; configure how the body of HTTP DELETE requests is encoded, enabling options like application/json or application/x-www-form-urlencoded to match server expectations, control request content-type headers during resource deletion, and adjust serialization formats for API compatibility and proper handling of destroy operations.
</div>

#### Example - set the content type

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        destroy: {
          /* omitted for brevity */
          contentType: "application/json"
        }
      }
    });
    </script>

### transport.destroy.data `Object|Function`

Additional parameters which are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for [sorting](/api/javascript/data/datasource#configuration-serverSorting), [filtering](/api/javascript/data/datasource#configuration-serverFiltering), [paging](/api/javascript/data/datasource#configuration-serverPaging), and [grouping](/api/javascript/data/datasource#configuration-serverGrouping).

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I pass custom data with delete requests to a remote server using Kendo UI DataSource transport? Configure extra custom parameters and key-value pairs sent with delete or destroy requests to remote servers, enabling you to add additional data during removal operations without conflicting with reserved server-side keywords like sorting, filtering, paging, or grouping; this setting helps control what information is included in AJAX calls for resource deletion, allowing developers to extend or customize the payload for server communication during data destruction actions.
</div>

#### Example - send additional parameters as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        destroy: {
          /* omitted for brevity */
          data: {
            name: "Jane Doe",
            age: 30
          }
        }
      }
    });
    </script>

#### Example - send additional parameters by returning them from a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        destroy: {
          /* omitted for brevity */
          data: function() {
            return {
              name: "Jane Doe",
              age: 30
            }
          }
        }
      }
    });
    </script>

### transport.destroy.dataType `String`

The type of result expected from the server. Commonly used values are `"json"` and `"jsonp"`.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I configure the Kendo UI DataSource to handle JSON responses when deleting data via AJAX? Control the format of server responses when deleting data through AJAX by specifying the expected response type such as JSON, JSONP, or other supported data formats. Configure how the client processes or parses server replies after a delete operation, enabling proper handling of different content types returned by remote endpoints. This setting helps manage response parsing behavior during remote data removals, API calls for deleting records, and integration with back-end services that deliver various payload types like JSON or script. Adjust the response content type to ensure compatibility with asynchronous delete requests and AJAX transport mechanisms.
</div>

#### Example - set the data type to JSON

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        destroy: {
          /* omitted for brevity */
          dataType: "json"
        }
      }
    });
    </script>

### transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET"`, `"PUT"` or `"DELETE"`). The default request is `"GET"`.

> The `type` option is ignored if `dataType` is set to `"jsonp"`. JSONP always uses GET requests.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to configure the HTTP request method for delete operations in Kendo UI DataSource transport? Configure or set the HTTP request method used for delete, destroy, or removal operations sent to the server, controlling whether the request uses POST, GET, PUT, or DELETE verbs for data deletion calls. Adjust or specify the HTTP verb for server-side destroy actions, influencing how the data source issues delete commands, with defaults typically to GET unless overridden. This setting governs the method to trigger remove, erase, or destroy requests over HTTP while noting that JSONP data types will always enforce GET requests regardless of configuration. Customize or control the HTTP method for server-side deletion processes, managing transport-level request behavior for resource removal.
</div>

#### Example

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        destroy: {
          /* omitted for brevity */
          type: "POST"
        }
      }
    });
    </script>

### transport.destroy.url `String|Function`

The URL to which the request is sent.

If set to a function, the data source will invoke it and use the result as the URL.


<div class="meta-api-description">
How to configure the delete endpoint for Kendo UI DataSource transport? Configure the URL or function for the endpoint that handles deletion requests, enabling control over where and how records are removed remotely; define, set, customize, or override the destroy request path or callback to specify the target API route for delete operations, supporting dynamic URL generation or static endpoint assignment for record destruction, delete actions, data removal, or resource cleanup in a remote data service.
</div>

#### Example - specify the URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        },
        destroy: {
          url: "https://demos.telerik.com/service/v2/core/products/destroy",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "destroy") {
            return kendo.stringify(data.models)
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var products = dataSource.data();
      dataSource.remove(products[0]);
      dataSource.sync();
    });
    </script>

#### Example - specify the URL as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        },
        destroy: {
          url: function (options) {
            return "https://demos.telerik.com/service/v2/core/products/destroy"
          },
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "destroy") {
            return kendo.stringify(data.models)
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var products = dataSource.data();
      dataSource.remove(products[0]);
      dataSource.sync();
    });
    </script>

### transport.parameterMap `Function`

The function which converts the request parameters to a format suitable for the remote service. By default, the data source sends the parameters using jQuery [conventions](https://api.jquery.com/jQuery.param/).

> * The `parameterMap` method is often used to encode the parameters in JSON format.
> * The `parameterMap` function will not be called when using custom functions for the read, update, create, and destroy operations.

If a [`transport.read.data`](/api/javascript/data/datasource#configuration-transport.read.data) function is used together with `parameterMap`, remember to preserve the result from the data function that will be received in the `parameterMap` arguments. An example is provided below. Generally, the `parameterMap` function is designed to transform the request payload, not to add new parameters to it.

```pseudo
transport: {
  read: {
    url: "my-data-service-url",
    data: function () {
      return {
        foo: 1
      };
    }
  },
  parameterMap: function (data, type) {
    // if type is "read", then data is { foo: 1 }, we also want to add { "bar": 2 }
    return kendo.stringify($.extend({ "bar": 2 }, data));
  }
}
```


<div class="meta-api-description">
How to serialize request data in Kendo UI DataSource using parameterMap? Customize, serialize, or transform outgoing request data into various formats like JSON strings, URL-encoded data, or custom payloads before sending to APIs by controlling how request parameters are encoded and mapped; handle serialization for create, read, update, and delete operations with options to convert, encode, or reshape parameters according to server requirements, enabling encoding strategies such as JSON.stringify, form data encoding, or custom structures, while ensuring compatibility with custom data functions and maintaining the original input, supporting use cases where developers need to adjust request payloads dynamically, configure parameter mapping logic, or implement specialized data formatting for remote data services.
</div>

#### Parameters

##### data `Object`

The parameters which will be sent to the remote service. The value specified in the `data` field of the transport settings (create, read, update or destroy) is included as well. If [`batch`](#batch-boolean-default) is set to `false`, the fields of the changed data items are also included.

##### data.aggregate `Array`

The current aggregate configuration as set via the [`aggregate`](/api/javascript/data/datasource#configuration-aggregate) option. Available if the [`serverAggregates`](/api/javascript/data/datasource#configuration-serverAggregates) option is set to `true` and the data source makes a `"read"` request.

##### data.group `Array`

The current grouping configuration as set via the [`group`](/api/javascript/data/datasource#configuration-group) option. Available if the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) option is set to `true` and the data source makes a `"read"` request.

##### data.filter `Object`

The current filter configuration as set via the [`filter`](/api/javascript/data/datasource#configuration-filter) option. Available if the [`serverFiltering`](/api/javascript/data/datasource#configuration-serverFiltering) option is set to `true` and the data source makes a `"read"` request.

##### data.models `Array`

All changed data items. Available if there are any data item changes and the [`batch`](/api/javascript/data/datasource#configuration-batch) option is set to `true`.

##### data.page `Number`

The current page. Available if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true` and the data source makes a `"read"` request.

##### data.pageSize `Number`

The current page size as set via the [`pageSize`](/api/javascript/data/datasource#configuration-pageSize) option. Available if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true` and the data source makes a `"read"` request.

##### data.skip `Number`

The number of data items to skip. Available if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true` and the data source makes a `"read"` request.

##### data.sort `Array`

The current sort configuration as set via the [`sort`](/api/javascript/data/datasource#configuration-sort) option. Available if the [`serverSorting`](/api/javascript/data/datasource#configuration-serverSorting) option is set to `true` and the data source makes a `"read"` request.

##### data.take `Number`

The number of data items to return (the same as `data.pageSize`). Available if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true` and the data source makes a `"read"` request.

##### type `String`

The type of the request which the data source makes.

The supported values are:

* `"create"`
* `"read"`
* `"update"`
* `"destroy"`

#### Returns

`Object`&mdash;The request parameters converted to a format required by the remote service.

#### Example - convert data source request parameters

    <script>
    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/odata/Orders",
          cache: true
        },
        parameterMap: function(data, type) {
          if (type == "read") {
            // send take as "$top" and skip as "$skip"
            return {
              $top: data.take,
              $skip: data.skip
            }
          }
        }
      },
      schema: {
        data: "value"
      },
      pageSize: 20,
      serverPaging: true // enable serverPaging so take and skip are sent as request parameters
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.view().length); // displays "20"
    });
    </script>

#### Example - send request parameters as JSON

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "https://demos.telerik.com/service/v2/core/products/create",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          return kendo.stringify(data);
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.add( { ProductName: "New Product" });
    dataSource.sync();
    </script>

### transport.push `Function`

The function invoked during transport initialization which sets up push notifications. The data source will call this function only once and provide callbacks which will handle push notifications (data pushed from the server).


<div class="meta-api-description">
How do I enable real-time data updates with WebSocket in Kendo UI DataSource? Configure real-time data updates by enabling server push connections such as WebSocket, Server-Sent Events, or SignalR within your data handling layer, allowing automatic subscription to live data feeds, registering event handlers, sending acknowledgments, and streaming pushed messages directly into your data set; set up and control a single initialization function to manage persistent connection channels for instant synchronization, live updates, push notifications, and reactive data flow without polling or manual refresh.
</div>

#### Parameters

##### callbacks `Object`

An object containing callbacks for notifying the data source of push notifications.

##### callbacks.pushCreate `Function`

A function that should be invoked to notify the data source about newly created data items that are pushed from the server. Accepts a single argument - the object pushed from the server which should follow the `schema.data` configuration.

##### callbacks.pushDestroy `Function`

A function that should be invoked to notify the data source about destroyed data items that are pushed from the server. Accepts a single argument - the object pushed from the server
which should follow the `schema.data` configuration.

##### callbacks.pushUpdate `Function`

A function that should be invoked to notify the data source about updated data items that are pushed from the server. Accepts a single argument - the object pushed from the server
which should follow the `schema.data` configuration.

#### Example

    <script>
      $.when(
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js"),
      ).done(function () {
        var hubUrl = "https://demos.telerik.com/service/v2/signalr/products";
        var hub = new signalR.HubConnectionBuilder()
          .withUrl(hubUrl, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
          })
          .build();

        var hubStart = hub.start()
          .then(function (e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Hub started");
          })
          .catch(function (err) {
            return console.error(err.toString());
          });

        var dataSource = new kendo.data.DataSource({
          type: "signalr",
          autoSync: true,
          push: function (e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Push", e);
          },
          schema: {
            model: {
              id: "ID",
              fields: {
                "ID": { editable: false, nullable: true },
                "CreatedAt": { type: "date" },
                "UnitPrice": { type: "number" }
              }
            }
          },
          sort: [{ field: "CreatedAt", dir: "desc" }],
          transport: {
            signalr: {
              promise: hubStart,
              hub: hub,
              server: {
                read: "read",
                update: "update",
                destroy: "destroy",
                create: "create"
              },
              client: {
                read: "read",
                update: "update",
                destroy: "destroy",
                create: "create"
              }
            }
          }
        });

        dataSource.fetch(() => {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Data fetched", dataSource.view());
        })
      });
    </script>

### transport.read `Object|String|Function`

The configuration used when the data source loads data items from a remote service.

> The data source uses [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) to make an HTTP request to the remote service. The value configured via `transport.read` is passed to `jQuery.ajax`. This means that you can set all options supported by `jQuery.ajax` via `transport.read` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.read` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.read` is a string, the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, that is, as functions or as objects. Mixing the different configuration alternatives is not possible.


<div class="meta-api-description">
How to configure read transport in Kendo UI DataSource? Configure loading data from remote HTTP endpoints by specifying request parameters, URLs, or custom functions to control how data items are fetched, using jQuery.ajax options for HTTP requests except overriding success and error callbacks. This setup supports passing detailed ajax settings, providing URLs as strings for REST calls, or utilizing custom read functions for advanced asynchronous operations. Ensure consistent use of either functions or objects/strings across all transport actions like read, create, update, or delete to maintain uniform request configurations when fetching data from APIs, web services, or remote servers.
</div>

#### Example - set the read remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

#### Example - send additional parameters to the remote service

    <input value="2" id="search" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        type: "odata-v4",
        read: {
          url: "https://demos.telerik.com/service/v2/core/products",
          data: function() {
              return {
                  skip: 0,
                  take: $("#search").val() // send the value of the #search input to the remote service
              };
          }
        }
      }
    });
    dataSource.fetch();
    </script>

#### Example - set read as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          $.ajax({
            url: "https://demos.telerik.com/service/v2/core/products",
            success: function(result) {
              // notify the data source that the request succeeded
              options.success(result);
            },
            error: function(result) {
              // notify the data source that the request failed
              options.error(result);
            }
          });
        }
      }
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

### transport.read.cache `Boolean`

If set to `false`, the request result will not be cached by the browser. Setting cache to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters. By default, `"jsonp"` requests are not cached.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to prevent browser caching in Kendo UI DataSource read operations? Control the prevention of browser caching for data retrieval requests by disabling cache, ensuring that GET and HEAD requests bypass stored responses by automatically appending unique timestamp parameters to URLs to force fresh data loading. This setting affects how read operations manage cache behavior, enabling developers to configure cache busting for AJAX calls, HTTP fetches, or JSONP requests, and is useful for scenarios requiring up-to-date data, avoiding stale responses, or managing cache headers and query string modifications to ensure real-time information retrieval during client-server interactions.
</div>

#### Example - enable request caching

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          /* omitted for brevity */
          cache: true
        }
      }
    });
    </script>

### transport.read.contentType `String`

The content-type HTTP header sent to the server. The default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON. Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I set the content type for read operations in Kendo UI's DataSource? Set, configure, or specify the HTTP Content-Type header for read operations when fetching data from a server, including options to send JSON payloads, form-encoded data, or custom content types; control request headers for AJAX calls, REST API reads, and web service interactions by adjusting how the data payload is encoded or formatted, enabling compatibility with various backend endpoints and data serialization formats, useful for managing content negotiation, ensuring proper server parsing, and customizing request headers in data retrieval scenarios.
</div>

#### Example - set content type

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          /* omitted for brevity */
          contentType: "application/json"
        }
      }
    });
    </script>

### transport.read.data `Object|Function`

Additional parameters which are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for [sorting](/api/javascript/data/datasource#configuration-serverSorting), [filtering](/api/javascript/data/datasource#configuration-serverFiltering), [paging](/api/javascript/data/datasource#configuration-serverPaging), and [grouping](/api/javascript/data/datasource#configuration-serverGrouping).

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to add custom data to Kendo UI DataSource read requests? Configure additional parameters or custom data to send along with remote data fetch requests, including static values or dynamically generated fields such as authentication tokens, search queries, filters, or custom flags for each read operation in the data transport layer. Enable passing extra query parameters or payload data to remote services, customize request payloads without interfering with default sorting, filtering, paging, or grouping keywords, control how additional request details are sent during data retrieval, and dynamically inject or attach metadata, filters, or operational parameters to enhance or tailor server-side data queries in asynchronous read operations.
</div>

#### Example - send additional parameters as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      type: "odata-v4",
      transport: {       
        read: {
          url: "https://demos.telerik.com/service/v2/odata/products",
          data:  {
              skip: 0,
              take: 2
          }
        }
      }
    });
    dataSource.fetch();
    </script>

#### Example - send additional parameters by returning them from a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        type: "odata-v4",
        read: {
          url: "https://demos.telerik.com/service/v2/core/products",
          data: function() {
              return {
                  skip: 0,
                  take: 2
              };
          }
        }
      }
    });
    dataSource.fetch();
    </script>

### transport.read.dataType `String`

The type of result expected from the server. Commonly used values are `"json"` and `"jsonp"`.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
What is the dataType property in Kendo UI DataSource used for? Configure or specify the expected format of server responses during data retrieval or AJAX read operations, including common types like JSON or JSONP, to control how the client parses, handles, and processes incoming data payloads from remote endpoints; set or adjust the response data format to match server output and ensure proper deserialization when loading, fetching, or requesting data asynchronously, enabling compatibility with various data interchange formats and tailoring response parsing behavior for seamless integration with RESTful services, APIs, or remote data sources.
</div>

#### Example - set the data type to JSON

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          /* omitted for brevity */
          dataType: "json"
        }
      }
    });
    </script>

### transport.read.type `String`

The type of request to make (`"POST"`, `"GET"`, `"PUT"` or `"DELETE"`). The default request is `"GET"`.

> The `type` option is ignored if `dataType` is set to "jsonp". JSONP always uses GET requests.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I configure the HTTP method for reading data from a server with Kendo UI DataSource? Configure or specify the HTTP method for fetching or synchronizing data, including options like GET, POST, PUT, or DELETE, to control how read operations communicate with the server; this setting determines the request verb used during data loading, allows overriding default GET behavior, and is essential for RESTful integration or API interaction, while noting that JSONP requests always use GET regardless of the configured method.
</div>

#### Example - set the HTTP verb of the request

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          /* omitted for brevity */
          type: "POST"
        }
      }
    });
    </script>

### transport.read.url `String|Function`

The URL to which the request is sent.

If set to a function, the data source will invoke it and use the result as the URL.


<div class="meta-api-description">
How do I configure the URL for reading data remotely in a Kendo UI DataSource? Configure or set the endpoint URL for retrieving data remotely by specifying a static URL string or dynamically generating the URL with a function at request time, enabling flexible control over where read operations fetch data from, supporting scenarios like API integration, dynamic query construction, and conditional request routing.
</div>

#### Example - specify URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

#### Example - specify URL as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: function(options) {
              return "https://demos.telerik.com/service/v2/core/products";
            },
          }
        }
      });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.view().length); // displays "72"
    });
    </script>

### transport.signalr `Object`

The configuration used when [`type`](/api/javascript/data/datasource#configuration-type) is set to `"signalr"`. Configures the SignalR settings - hub, connection promise, server, and client hub methods.

A live demo is available at [demos.telerik.com/kendo-ui](https://demos.telerik.com/kendo-ui/grid/signalr).

It is recommended to get familiar with the SignalR [JavaScript API](https://www.asp.net/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client) and [ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/).


<div class="meta-api-description">
How to configure SignalR transport in Kendo UI DataSource for real-time data updates? Configure real-time data synchronization by connecting your data source to a SignalR hub, enabling live updates through SignalR transport with options to set up the connection promise, map server-side method invocations, define client-side callbacks, and handle push notifications or live binding scenarios. This setup supports scenarios like enabling live data feeds, real-time event handling, instant data refreshes, seamless server-to-client communication, and integrating SignalR for asynchronous update delivery in web applications. Users often look to control, enable, or customize SignalR connections for dynamic, live data streaming, event-driven APIs, and interactive UI components requiring up-to-date information without polling.
</div>

#### Example

        <script>
        $.when(
            $.getScript("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js"),
        ).done(function () {
            var hubUrl = "https://demos.telerik.com/service/v2/signalr/products";
            var hub = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl,{
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();

            var hubStart = hub.start()
                .then(function (e) {
                    console.log("SignalR Hub Started!");
                })
                .catch(function (err) {
                    return console.error(err.toString());
                });

           
        var dataSource = new kendo.data.DataSource({
        type: "signalr",
        schema: {
          model: {
            id: "ID",
            fields: {
              ID: { editable: false, nullable: true },
              CreatedAt: { type: "date" },
              UnitPrice: { type: "number" },
            },
          },
        },
        transport: {
          signalr: {
            promise: hubStart,
            hub: hub,
            server: {
              read: "read",
              update: "update",
              destroy: "destroy",
              create: "create",
            },
            client: {
              read: "read",
              update: "update",
              destroy: "destroy",
              create: "create",
            },
          },
        },
      });

      dataSource.fetch(function () {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(dataSource.data());
      });
        });
    </script>

### transport.signalr.client `Object`

Specifies the client-side CRUD methods of the SignalR hub.


<div class="meta-api-description">
How to configure SignalR client method handlers for real-time data updates in Kendo UI DataSource? Configure and control real-time synchronization for create, read, update, and delete operations by defining client-side SignalR hub method handlers that respond to server push events, enabling live data updates and instant CRUD data binding. Map SignalR hub callbacks to functions or handlers that automatically trigger data source updates upon server-initiated messages, supporting push-based live data management, event-driven data refresh, and seamless integration of server-sent events for interactive, real-time applications. This setup allows enabling, setting, or customizing real-time data flow, reactive updates, and CRUD operation handlers tied directly to SignalR hub client methods.
</div>

#### Example

```pseudo
  <script>
  var connection = new signalR.HubConnectionBuilder()
      .withUrl("/dataHub")
      .build();
  
  var dataSource = new kendo.data.DataSource({
    transport: {
      signalr: {
        promise: connection.start(),
        hub: connection,
        client: {
          create: "itemCreated",
          destroy: "itemDestroyed", 
          read: "itemRead",
          update: "itemUpdated"
        },
        server: {
          create: "createItem",
          destroy: "destroyItem",
          read: "readItems",
          update: "updateItem"
        }
      }
    }
  });
  </script>
```

### transport.signalr.client.create `String`

Specifies the name of the client-side method of the SignalR hub responsible for creating data items.


<div class="meta-api-description">
How to configure SignalR for creating new records in a Kendo UI DataSource? Configure real-time data creation by setting the client-side SignalR hub method name responsible for adding new records, enabling instant communication and synchronization when inserting data items through the transport layer. This setup lets applications invoke, call, or bind create operations dynamically over SignalR connections, supporting use cases like live updates, push-based record creation, and seamless integration of client-server messaging for new data entries, ensuring efficient real-time interaction and data flow with customizable hub method names.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            create: "itemCreated"
          },
          server: {
            create: "createItem"
          }
        }
      }
    });
    
    // Listen for created items from server
    connection.on("itemCreated", function(item) {
      console.log("Item created:", item);
    });
    </script>
```

### transport.signalr.client.destroy `String`

Specifies the name of the client-side method of the SignalR hub responsible for destroying data items.


<div class="meta-api-description">
How to configure SignalR data removal in Kendo UI DataSource transport? Configure real-time deletion by setting the client-side SignalR hub method for removing or destroying data items within the data source, enabling synchronization of delete or remove actions instantly across connected clients, mapping client operations to server-side SignalR methods for live data removal, specifying how delete commands trigger SignalR hub calls during transport, and controlling dynamic data updates by linking remove or destroy actions to real-time SignalR messaging for seamless record deletion.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            destroy: "itemDeleted"
          },
          server: {
            destroy: "deleteItem"
          }
        }
      }
    });
    
    // Listen for deleted items from server
    connection.on("itemDeleted", function(item) {
      console.log("Item deleted:", item);
    });
    </script>
```

### transport.signalr.client.read `String`

Specifies the name of the client-side method of the SignalR hub responsible for reading data items.


<div class="meta-api-description">
What is the client-side SignalR hub method I should use for reading data with a Kendo UI DataSource transport? Configure or set the client-side SignalR hub method name used for retrieving data items, specifying the exact client method the data source calls to fetch or read data from the SignalR connection; control which hub function the real-time data source invokes to receive data streams or messages, ensuring the method signature matches the expected parameters for seamless data retrieval via SignalR transport, useful during initialization to enable live updates, data syncing, or streaming data from server to client applications.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            read: "dataRead"
          },
          server: {
            read: "getData"
          }
        }
      }
    });
    
    // Listen for data from server
    connection.on("dataRead", function(data) {
      console.log("Data received:", data);
    });
    </script>
```

### transport.signalr.client.update `String`

Specifies the name of the client-side method of the SignalR hub responsible for updating data items.


<div class="meta-api-description">
What is the client-side method name for handling live update messages via SignalR in Kendo UI for jQuery DataSource? Configure real-time data synchronization by specifying the client-side method name for handling live update messages via SignalR, enabling seamless data item changes pushed from the server to the client, ensuring the method name and signature align between client and server to receive and process update events correctly, supporting scenarios like dynamic data refresh, push updates, live synchronization, and reactive data binding within applications using SignalR transport mechanisms.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            update: "itemUpdated"
          },
          server: {
            update: "updateItem"
          }
        }
      }
    });
    
    // Listen for updated items from server
    connection.on("itemUpdated", function(item) {
      console.log("Item updated:", item);
    });
    </script>
```

### transport.signalr.hub `Object`

The SignalR hub object returned by the `createHubProxy` method (or `signalR.HubConnection` for ASP.NET Core SignalR). The `hub` option is mandatory.


<div class="meta-api-description">
How do I connect to a SignalR hub using Kendo UI for jQuery's DataSource transport? Configure real-time data synchronization and live updates by connecting to a SignalR hub instance or proxy object, enabling server push notifications and continuous data refresh. Enable or set the hub connection for receiving immediate data changes, live event streaming, and instant server-client communication using classic SignalR proxies or ASP.NET Core SignalR HubConnection objects. Use this to control live data feeds, push-based updates, instant synchronization, and real-time event handling for dynamic data loading scenarios. Establish persistent SignalR connections to stream data changes automatically from the server to the client without polling, supporting live dashboards, interactive applications, and instant user notifications.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            read: "dataReceived"
          },
          server: {
            read: "getData"
          }
        }
      }
    });
    </script>
```

### transport.signalr.promise `Object`

The promise returned by the `start` method of the SignalR connection. The `promise` option is mandatory.


<div class="meta-api-description">
How to delay Kendo UI data loading until SignalR connection is established? Configure the asynchronous start or initialization of a real-time communication link by supplying the promise or deferred object returned when establishing a SignalR connection, ensuring that data loading, synchronization, remote data operations, and real-time updates are delayed until the connection is fully established and ready. Enable control over the timing and coordination of data binding and interaction with real-time hubs by setting or providing the connection startup's promise or completion token, allowing applications to await successful connection before proceeding with data queries, updates, or message handling. This mechanism supports scenarios where developers need to guarantee that the underlying SignalR connection is active and stable before triggering any subsequent data source actions or synchronization workflows.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var connectionPromise = connection.start();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connectionPromise,
          hub: connection,
          client: {
            read: "dataReceived"
          },
          server: {
            read: "getData"
          }
        }
      }
    });
    
    connectionPromise.then(function() {
      console.log("SignalR connection established");
    });
    </script>
```

### transport.signalr.server `Object`

Specifies the server-side CRUD methods of the SignalR hub.


<div class="meta-api-description">
How do I map SignalR server methods to CRUD operations in Kendo UI DataSource? Configure real-time data synchronization and live updates by linking server-side SignalR hub methods with CRUD operations such as create, read, update, and delete, enabling seamless mapping of backend hub method names to frontend data actions for dynamic data handling, binding SignalR server methods to enable automatic data refresh, setting up method mappings for efficient data manipulation over SignalR connections, controlling how client operations invoke server hub functions for synchronizing data changes, and integrating server-driven event handling with data transport workflows for responsive applications using SignalR hubs.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            create: "itemCreated",
            destroy: "itemDeleted",
            read: "dataReceived",
            update: "itemUpdated"
          },
          server: {
            create: "CreateItem",
            destroy: "DeleteItem", 
            read: "GetData",
            update: "UpdateItem"
          }
        }
      }
    });
    </script>
```

### transport.signalr.server.create `String`

Specifies the name of the server-side method of the SignalR hub responsible for creating data items.


<div class="meta-api-description">
How do I specify the SignalR server method for creating new data entries in Kendo UI DataSource transport operations? Configure the setting to specify or customize the server-side hub method name used for creating new data entries via SignalR in data transport operations, enabling control over how create actions in CRUD workflows are invoked remotely, supporting patterns like setting the method to call for adding or inserting items through real-time SignalR connections, specifying the exact server endpoint for create commands, managing the invocation name for creating records over SignalR, and tailoring the hub method used during create requests in live data synchronization scenarios.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            create: "itemCreated"
          },
          server: {
            create: "CreateItem"
          }
        }
      }
    });
    
    // When a new item is added, it will call the CreateItem method on the server
    dataSource.add({ name: "New Item", value: 100 });
    </script>
```

### transport.signalr.server.destroy `String`

Specifies the name of the server-side method of the SignalR hub responsible for destroying data items.


<div class="meta-api-description">
How to specify server-side method for delete operations in Kendo UI DataSource with SignalR transport? Configure or specify the server-side SignalR hub method name responsible for handling delete or remove operations on data, enabling real-time remote deletion through SignalR transport integration; use this setting to control how and which server method is invoked for CRUD destroy actions, ensuring that remote data removal is properly triggered and synchronized, supporting scenarios where you need to set, enable, or customize the server delete handler method within real-time hub communication for efficient data source removals.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            destroy: "itemDeleted"
          },
          server: {
            destroy: "DeleteItem"
          }
        }
      }
    });
    
    // When an item is removed, it will call the DeleteItem method on the server
    var item = dataSource.get(1);
    if (item) {
      dataSource.remove(item);
    }
    </script>
```

### transport.signalr.server.read `String`

Specifies the name of the server-side method of the SignalR hub responsible for reading data items.


<div class="meta-api-description">
How do I specify the SignalR hub method to use for reading data in a Kendo UI DataSource? Specify or configure the server-side SignalR hub method name used to read, load, fetch, or retrieve data items remotely through real-time communication; set, control, or enable the exact hub function or server method invocation for data binding, loading, or querying from the server to the client, supporting scenarios where the data source calls a specific SignalR method to pull or synchronize data dynamically via the hub connection.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            read: "dataReceived"
          },
          server: {
            read: "GetData"
          }
        }
      }
    });
    
    // When dataSource.read() is called, it will invoke the GetData method on the server
    dataSource.read();
    </script>
```

### transport.signalr.server.update `String`

Specifies the name of the server-side method of the SignalR hub responsible for updating data items.


<div class="meta-api-description">
How do I configure Kendo UI DataSource to use SignalR for real-time data updates? Configure or set the server-side SignalR hub method name responsible for updating data items, enabling real-time data synchronization and updates via SignalR transport. Developers can specify or control which hub function handles update operations, allowing push or live update mechanisms between client and server. This setting connects the data source's update actions with the appropriate SignalR method, supporting custom hub method names, real-time data changes, and seamless data updates over WebSocket or SignalR connections. It covers scenarios involving live data editing, server communication, and reactive data transport where controlling the update procedural binding to the SignalR hub is needed.
</div>

#### Example

```pseudo
    <script>
    var connection = new signalR.HubConnectionBuilder()
        .withUrl("/dataHub")
        .build();
    
    var dataSource = new kendo.data.DataSource({
      transport: {
        signalr: {
          promise: connection.start(),
          hub: connection,
          client: {
            update: "itemUpdated"
          },
          server: {
            update: "UpdateItem"
          }
        }
      }
    });
    
    // When an item is modified and sync() is called, it will call UpdateItem on the server
    var item = dataSource.get(1);
    if (item) {
      item.set("name", "Updated Name");
      dataSource.sync();
    }
    </script>
```

### transport.submit `Function`

A function that will handle create, update and delete operations in a single batch when custom transport is used, that is, the `transport.read` is defined as a function.

The `transport.create`, `transport.update`, and `transport.delete` operations will not be executed in this case.

```pseudo
    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: function(e) {
          // Custom read implementation
          $.ajax({
            url: "/api/data",
            success: function(result) {
              e.success(result);
            }
          });
        },
        submit: function(e) {
          // Handle all CRUD operations in batch
          var models = e.data.models;
          var operations = [];
          
          for (var i = 0; i < models.length; i++) {
            var model = models[i];
            if (model.isNew()) {
              operations.push({ type: "create", data: model });
            } else if (model.dirty) {
              operations.push({ type: "update", data: model });
            }
          }
          
          // Send batch operations to server
          $.ajax({
            url: "/api/batch",
            type: "POST",
            data: JSON.stringify(operations),
            contentType: "application/json",
            success: function() {
              e.success();
            }
          });
        }
      }
    });
    
    $("#grid").kendoGrid({
      dataSource: dataSource,
      editable: true
    });
    </script>
```

> This function will only be invoked when the DataSource is in its [batch mode](/api/javascript/data/datasource#configuration-batch).


<div class="meta-api-description">
How do I aggregate create, update, and delete actions in a batch request using Kendo UI's DataSource transport submit? Control how create, update, and delete actions are aggregated and sent together in one batch request when using custom data fetching, enabling bulk saving, combined CRUD operations, and customized synchronization logic by implementing a single handler function that processes changed data models, merges modifications, handles server responses, and overrides default atomic create/update/delete calls to efficiently manage data transactions in batch mode with flexible batch processing, batch syncing, and unified update submission workflows.
</div>

#### Parameters

##### e.data `Object`

An object containing the created (`e.data.created`), updated (`e.data.updated`), and destroyed (`e.data.destroyed`) items.

##### e.success `Function`

A callback that should be called for each operation with two parameters - items and operation. See example below.

##### e.error `Function`

A callback that should be called in case of failure of any of the operations.

##### Example - declare transport submit function

      <script>
          var dataSource = new kendo.data.DataSource({
            transport: {
              read:  function(options){
                $.ajax({
                  url: "https://demos.telerik.com/service/v2/core/products",
                  success: function(result) {
                    options.success(result);
                  },
                  error: function(result) {
                    options.error(result);
                  }
                });
              },
              submit: function(e) {
                var data = e.data;
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(data);

                // send batch update to desired URL, then notify success/error

                e.success(data.updated,"update");
                e.success(data.created,"create");
                e.success(data.destroyed,"destroy");
                e.error(null, "customerror", "custom error");
              }
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: { type: "number", validation: { required: true, min: 1} },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                }
              }
            }
          });

          dataSource.read().then(function(){
            var productOne = dataSource.at(1),
                productTwo = dataSource.at(2);
            productOne.set("UnitPrice",42);
            productTwo.set("UnitPrice",42);
            dataSource.sync();
          });

      </script>

### transport.update `Object|String|Function`

The configuration used when the data source saves updated data items. Those are data items whose fields have been updated.

> The data source uses [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) to make an HTTP request to the remote service. The value configured via `transport.update` is passed to `jQuery.ajax`. This means that you can set all options supported by `jQuery.ajax` via `transport.update` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.update` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.update` is a string, the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, that is, as functions or as objects. Mixing the different configuration alternatives is not possible.


<div class="meta-api-description">
How to configure update requests for Kendo UI DataSource? Configure or customize how updated data records are sent to remote services via HTTP update requests, controlling AJAX parameters such as URL endpoints, HTTP methods, headers, content types, request payloads, and data formats for saving changes; options include specifying the update request as a function for full custom request handling or as a URL string for default calls, ensuring consistency with other CRUD operation configurations and enabling precise control over remote update behaviors, headers, and request timing while integrating with common AJAX setups for server synchronization and data persistence.
</div>

#### Example - specify update as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "https://demos.telerik.com/service/v2/core/products"
        },
        update: {
          url: "https://demos.telerik.com/service/v2/core/products/update",
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      dataSource.sync(); 
    });
    </script>

#### Example - specify update as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: function(options) {
          /* implementation omitted for brevity */
        },
        update: function(options) {
          $.ajax({
            url: "https://demos.telerik.com/service/v2/core/products/update",
            // send the updated data items as the "models" service parameter encoded in JSON
            data: kendo.stringify(options.data.models),
            success: function(result) {
              // notify the data source that the request succeeded
              options.success(result);
            },
            error: function(result) {
              // notify the data source that the request failed
              options.error(result);
            }
          });
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      dataSource.sync();
    });
    </script>

### transport.update.cache `Boolean`

If set to `false`, the request result will not be cached by the browser. Setting `cache` to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters. By default, `"jsonp"` requests are not cached.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I prevent browser caching for update requests in Kendo UI Data Source? Control preventing browser caching for update requests in data operations by disabling cache, ensuring fresh data on each update call by appending unique timestamps or cache-busters to GET and HEAD request URLs. Manage how update data transports handle caching behavior, including enabling or turning off automatic cache prevention for network fetches, overcoming default cache policies, and avoiding stale data responses during asynchronous data updates. Configure cache settings for update HTTP requests to force server round-trips and avoid client-side caching interference, applicable especially to GET, HEAD, and JSONP types, ensuring real-time data consistency during update operations.
</div>

#### Example - enable request caching

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        update: {
          /* omitted for brevity */
          cache: true
        }
      }
    });
    </script>

### transport.update.contentType `String`

The content-type HTTP header sent to the server. Defaults to `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How do I set the content type for update operations in Kendo UI DataSource? Set or configure the HTTP Content-Type header for update operations to control how the request payload is formatted or encoded, including options like JSON format or form URL encoding, specifying MIME types such as application/json or application/x-www-form-urlencoded, adjusting header content type for AJAX update requests, defining payload encoding methods for server communication during data updates, and managing how data is sent over HTTP for effective content negotiation and correct parsing on the server side.
</div>

#### Example - set content type
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        update: {
          /* omitted for brevity */
          contentType: "application/json"
        }
      }
    });
    </script>

### transport.update.data `Object|Function`

Additional parameters which are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for
[sorting](/api/javascript/data/datasource#configuration-serverSorting), [filtering](/api/javascript/data/datasource#configuration-serverFiltering), [paging](/api/javascript/data/datasource#configuration-serverPaging), and [grouping](/api/javascript/data/datasource#configuration-serverGrouping).

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
How to include extra data in Kendo UI DataSource update request? Include additional custom parameters, fields, metadata, or contextual information such as authentication tokens, form values, or extra data when sending update requests to a remote server; control which auxiliary data is transmitted alongside update operations without interfering with reserved system keywords used for sorting, paging, filtering, or grouping, enabling flexible configuration of request payloads to enhance server-side processing and authorization during data synchronization or CRUD operations.
</div>

#### Example - send additional parameters as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        update: {
          /* omitted for brevity */
          data: {
            name: "Jane Doe",
            age: 30
          }
        }
      }
    });
    </script>

#### Example - send additional parameters by returning them from a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        update: {
          /* omitted for brevity */
          data: function() {
            return {
              name: "Jane Doe",
              age: 30
            }
          }
        }
      }
    });
    </script>

### transport.update.dataType `String`

The type of result expected from the server. Commonly used values are `"json"` and `"jsonp"`.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
What is the expected response format for server update operations in Kendo UI DataSource? Control the expected response format or data type for server update operations, specifying how update requests handle and interpret returned data such as JSON, JSONP, XML, or other content types, enabling configuration of transport protocols, response parsing, and integration with asynchronous calls or AJAX settings to manage server responses during data updates.
</div>

#### Example - set the data type to JSON

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        update: {
          /* omitted for brevity */
          dataType: "json"
        }
      }
    });
    </script>

### transport.update.type `String`

The type of request to make (`"POST"`, `"GET"`, `"PUT"` or `"DELETE"`). The default request is `"GET"`.

> The `type` option is ignored if `dataType` is set to `"jsonp"`. JSONP always uses GET requests.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.


<div class="meta-api-description">
What HTTP method should I use for updating data in Kendo UI's DataSource? Configure the HTTP method or verb used when sending update requests to the server, enabling control over whether updates are sent as POST, GET, PUT, or DELETE operations, which affects how the server interprets and processes changes; common use cases include choosing POST for creating or modifying resources, PUT for idempotent updates, or DELETE for removals, while GET is typically avoided for updates but may be used when necessary; the method selection can be customized or overridden depending on AJAX settings, JSONP limitations that enforce GET, or specific API requirements, allowing developers to set, customize, or control the HTTP request type for data synchronization, server communication, and RESTful interactions in client-server data exchange scenarios.
</div>

#### Example - set the HTTP verb of the request
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        update: {
          /* omitted for brevity */
          type: "POST"
        }
      }
    });
    </script>

### transport.update.url `String|Function`

The URL to which the request is sent.

If set to a function, the data source will invoke it and use the result as the URL.


<div class="meta-api-description">
How to configure the update URL for Kendo UI DataSource? Configure the endpoint URL for updating data records, enabling specification of a static address or dynamic function-generated URL where update requests are sent, allowing customization of request targets, controlling how and where update operations connect, supporting both fixed and programmatically determined update service paths for flexible API integration, managing data modification URLs, and dynamically setting or overriding update destinations during data source operations.
</div>

#### Example - specify URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
            url: "https://demos.telerik.com/service/v2/core/products"
        },
        update: {
          url: "https://demos.telerik.com/service/v2/core/products/update",
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      dataSource.sync();
    });
    </script>

#### Example - specify URL as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
            url: "https://demos.telerik.com/service/v2/core/products"
        },
        update: {
          url: function(options) {
            return "https://demos.telerik.com/service/v2/core/products/update"
          },
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      dataSource.sync();
    });
    </script>

### type `String`

If set, the data source will use a predefined [`transport`](/api/javascript/data/datasource#configuration-transport) and/or [`schema`](/api/javascript/data/datasource#configuration-schema).

The supported values are:

* `"odata"` which supports the [OData](https://www.odata.org) v.2 protocol
* `"odata-v4"` which [partially supports](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/odata-v4-web-api-binding)
odata version 4
* `"signalr"`


<div class="meta-api-description">
What is the purpose of setting the type property in a Kendo UI DataSource? Configure or select the communication protocol for connecting and transferring data with the data source, enabling predefined setups for OData version 2 or version 4, as well as real-time data synchronization through SignalR; this setting controls the underlying transport mechanism and data schema format, facilitating integration scenarios like RESTful OData queries, partial OData v4 support, or live updates using SignalR, and is key for developers wanting to set, enable, or switch between these standard protocols to ensure proper data exchange and schema compatibility across web services or real-time applications.
</div>

#### Example - enable OData support

    <script>
    var dataSource= new kendo.data.DataSource({
      type: "odata-v4",
      transport: {
        read: "https://demos.telerik.com/service/v2/odata/Orders"
      },
      pageSize: 20,
      serverPaging: true
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.view().length); // displays "20"
    });
    </script>

## Methods

### add

Appends a data item to the data source.


<div class="meta-api-description">
How do I dynamically add new records to my Kendo UI data source? Insert or append a new record, data item, or entry into a data collection or dataset at runtime by adding plain objects, JSON records, or existing model instances to the end of an in-memory array or data source dynamically; configure, enable, or trigger data addition to update UI components, lists, grids, or tables with fresh content, supporting use cases for runtime data injection, incremental loading, or live updates without replacing the entire dataset.
</div>

#### Parameters

##### model `Object|kendo.data.Model`

Either a [`kendo.data.Model`](/api/javascript/data/model) instance or JavaScript object containing the data item field values.

#### Returns

`kendo.data.Model`&mdash;The data item which is inserted.

#### Example - add a data item to a local data source

    <script>
    var dataSource= new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 }
      ]
    });
    dataSource.add({ name: "John Doe", age: 33 });
    var data = dataSource.data();
    var lastItem = data[data.length - 1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(lastItem.name); // displays "John Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(lastItem.age); // displays "33"
    </script>

#### Example - add a data item to a remote data source

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "https://demos.telerik.com/service/v2/core/products/create",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            // send the created data items as the "models" service parameter encoded in JSON
            return kendo.stringify(data.models);
          }
        }
      },
      batch: true,
      schema: {
        model: { id: "ProductID" }
      }
    });
    // add a new data item
    dataSource.add( { ProductName: "New Product" });
    // save the created data item
    dataSource.sync();
    </script>

### aggregate

Gets or sets the aggregate configuration.


<div class="meta-api-description">
How do I calculate summary statistics on specific columns in my Kendo UI DataSource? Set, change, or retrieve summary computations such as sum, average, count, or other aggregate functions on specific data fields within a data source, enabling configuration of how data is grouped, summarized, or rolled up; access existing summary settings or define new aggregation rules by specifying summary types for columns to control data aggregation output and computations dynamically.
</div>

#### Parameters

##### value `Object|Array`

The aggregate configuration. Accepts the same values as the [`aggregate`](/api/javascript/data/datasource#configuration-aggregate) option.

#### Returns

`Array`&mdash;The current aggregate configuration.

#### Example - set the data source aggregates

    <script>
    var dataSource= new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    // calculate the minimum and maximum age
    dataSource.aggregate([
      { field: "age", aggregate: "min" },
      { field: "age", aggregate: "max" }
    ]);
    var ageAggregates = dataSource.aggregates().age;
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(ageAggregates.min); // displays "30"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(ageAggregates.max); // displays "33"
    </script>

#### Example - get the data source aggregates

    <script>
    var dataSource= new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "min" },
        { field: "age", aggregate: "max" }
      ]
    });
    var aggregates = dataSource.aggregate();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(kendo.stringify(aggregates[0])); // displays {"aggregate": "min", "field": "age"}
    </script>

### aggregates

Returns the aggregate results.


<div class="meta-api-description">
How to access sum of filtered data in Kendo UI DataSource? Retrieve or access summary statistics such as sums, counts, minimums, maximums, averages, or other aggregate calculations derived from your data set whether filtered or sorted. Obtain real-time computed aggregate results, including those calculated at group levels when data grouping is applied. Extract client-side aggregation outputs reflecting current data state after transformations, enabling reading of totals, counts, averages, or custom aggregate summaries. Fetch dynamically updated summary metrics corresponding to configured aggregate functions on datasets or grouped entries, supporting use cases involving on-the-fly calculation of aggregate values in data processing, charting, or reporting scenarios.
</div>

#### Returns

`Object`&mdash;The aggregate results. There is a key for every aggregated field.

#### Example - get aggregate results

    <script>
    var dataSource= new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "min" },
        { field: "age", aggregate: "max" }
      ]
    });
    dataSource.read();
    var ageAggregates = dataSource.aggregates().age;
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(ageAggregates.min); // displays "30"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(ageAggregates.max); // displays "33"
    </script>

### at

Returns the data item at the specified index. The index is zero-based.


<div class="meta-api-description">
How do I access a specific item in my Kendo UI DataSource by its index position? Retrieve or access a specific data entry by index position within a data collection by specifying a zero-based numeric index to obtain the item located at that exact position, enabling targeted access to elements based on their ordered placement in lists, arrays, or datasets, supporting use cases like fetching items at known positions, indexing into data structures, or extracting entries by numeric offset.
</div>

#### Parameters

##### index `Number`

The zero-based index of the data item.

#### Returns

`kendo.data.ObservableObject`&mdash;The data item at the specified index. Returns `undefined` if a data item is not found at the specified index.
Returns a `kendo.data.Model` instance if the [schema.model](/api/javascript/data/datasource#configuration-schema.model) option is set.

#### Example - get a data item
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ]
    });
    dataSource.fetch(function(){
      var dataItem = dataSource.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataItem.name); // displays "Jane Doe"
      var dataItemWhichDoesNotExist = dataSource.at(3);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataItemWhichDoesNotExist); // displays "undefined"
    });
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed, and updated data items are restored to their initial state. Every data item [`uid`](/api/javascript/data/model#fields-uid) will be reset.

> A `change` event will be triggered only when all changes are reverted and will not be triggered when reverting changes for a single model instance.


<div class="meta-api-description">
How do I revert unsaved modifications in Kendo UI DataSource using the cancelChanges method? Revert all unsaved modifications and discard local edits by rolling back data item updates, deletions, and additions to their original states, effectively resetting any temporary changes, restoring deleted records, removing newly added items, undoing updated fields back to initial values, and resetting unique identifiers, supporting scenarios where you need to cancel or abort batch edits, undo changes in a data collection, reset modified data models, discard transactional edits, or rollback user input before saving, with event notifications triggered upon complete reversion of all changes but not for individual record undos.
</div>

#### Parameters

##### model `kendo.data.Model`

The optional data item (model). If specified, only the changes of this data item will be discarded. If omitted, all changes will be discarded.

> Specifying a data item (model) for `cancelChanges` will not work if the data item was removed from the collection via `remove` method.

#### Example - cancel all changes

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { id: 1, name: "Jane Doe" }
      ],
      schema: {
        model: { id: "id" }
      }
    });
    dataSource.fetch(function(){
      // add a new data item
      dataSource.add({ name: "John Doe" });
      // update existing data item
      var dataItem = dataSource.at(0);
      dataItem.set("name", "Jane Doe 2");
      // cancel all changes
      dataSource.cancelChanges();
      dataItem = dataSource.at(0);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataItem.name); // displays "Jane Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.data().length); // displays "1"
    });
    </script>

#### Example - cancel changes of only one data item

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { id: 1, name: "Jane Doe" }
      ],
      schema: {
        model: { id: "id" }
      }
    });
    dataSource.fetch(function(){
      // add a new data item
      dataSource.add({ name: "John Doe" });
      // update existing data item
      var dataItem = dataSource.at(0);
      dataItem.set("name", "Jane Doe 2");
      // cancel the changes of the dataItem
      dataSource.cancelChanges(dataItem);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataItem.name); // displays "Jane Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.data().length); // displays "2"
    });
    </script>

### data

Gets or sets the data items of the data source.

If the data source is bound to a remote service (via the [`transport`](/api/javascript/data/datasource#configuration-transport) option), the `data` method will return the service response.
Every item from the response is wrapped in a [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) or [`kendo.data.Model`](/api/javascript/data/model) (if the [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel) option is set).

If the data source is bound to a JavaScript array (via the [`data`](/api/javascript/data/datasource#configuration-data) option), the `data` method will return the items of that array.
Every item from the array is wrapped in a [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) or [`kendo.data.Model`](/api/javascript/data/model) (if the [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel) option is set).

If the data source is grouped (via the [`group`](/api/javascript/data/datasource#configuration-group) option or the [group](/api/javascript/data/datasource/methods/group) method) and the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) is set to `true`, the `data` method will return the group items.

> The [`schema.model`](/api/javascript/data/datasource#configuration-schema.model) configuration will not be used to parse the set data items. The data should be parsed in advance and the values should be provided in the correct type - date values should be JavaScript Date objects, numeric values should be JavaScript numbers, and others.

Compare with the [`view`](/api/javascript/data/datasource/methods/view) method, which will return the data items that correspond to the current page, filter, sort and group configuration.


<div class="meta-api-description">
How do I retrieve and update data in Kendo UI's DataSource? Retrieve, set, load, update, or replace the complete collection of items managed by a data source, whether from local arrays or remote services, including reading raw data responses, binding new datasets, or inspecting current contents; handle underlying arrays or server responses with automatic wrapping into observable or model objects, support grouped data retrieval for server-side grouping scenarios, manage type-correct parsed data such as JavaScript Date and Number objects, and distinguish from filtered or paged views by accessing the full unfiltered, unsorted, or ungrouped data items directly for comprehensive data manipulation, synchronization, and inspection in data-driven applications.
</div>

#### Parameters

##### value `Array|kendo.data.ObservableArray`

The data items which will replace the current ones in the data source. If omitted the current data items will be returned.

#### Returns

`kendo.data.ObservableArray`&mdash;The data items of the data source. Returns an empty array if the data source was not populated with data items via the [`read`](/api/javascript/data/datasource/methods/read), [`fetch`](/api/javascript/data/datasource/methods/fetch), or [`query`](/api/javascript/data/datasource/methods/query) methods.

#### Example - get the data items when bound to an array

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ]
    });
    dataSource.fetch(function(){
      var data = dataSource.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data.length);  // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[0].name); // displays "Jane Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[1].name); // displays "John Doe"
    });
    </script>

#### Example - get the data items when bound to a remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.fetch(function(){
      var data = dataSource.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data.length);  // displays "77"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[0].ProductName); // displays "Chai"
    });
    </script>

#### Example - set the data items

    <script>
      var dataSource = new kendo.data.DataSource({
        data: [
          { name: "Jane Doe" },
          { name: "John Smith" },
          { name: "Andrew Robertson" }
        ]
      });
      dataSource.fetch(function(){
        var newData = [
          { name: "Samuell Dean" },
          { name: "John Doe" }
        ]
        dataSource.data(newData);
        var data = dataSource.data();
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data); 
        console.log(data[0].name); // displays "Samuel Dean"        
      });
    </script>

### fetch

Reads the data items from a remote service (if the [`transport`](/api/javascript/data/datasource#configuration-transport) option is set) or from a JavaScript array (if the [`data`](/api/javascript/data/datasource#configuration-data) option is set).

> The `fetch` method makes a request to the remote service only the first time it is called if the dataSource is not configured for server operations.


<div class="meta-api-description">
How do I update data in my Kendo UI DataSource using jQuery? Retrieve or update the dataset dynamically by invoking the fetching mechanism that triggers data loading from remote APIs when configured with transport endpoints or reads from local JavaScript arrays if data is provided inline, enabling refreshes, initial data pulls, and control over when and how records are retrieved either once or with subsequent calls, accommodating server-driven and client-based data sourcing setups, managing asynchronous requests, synchronous local reads, and ensuring consistent data availability for components or applications requiring up-to-date or reactive content updates.
</div>

#### Parameters

##### callback `Function` *(optional)*

The optional function which is executed when the remote request is finished. The function context (available via the `this` keyword) will be set to the data source instance.

#### Returns

`Promise`&mdash;A promise that will be resolved when the data has been loaded, or rejected if an HTTP error occurs.

#### Example - read data from a remote data source

    <div id="grid"></div>

    <script>
    	var dataSource = new kendo.data.DataSource({
    	  transport: {
    	    read:  {
            url: "https://demos.telerik.com/service/v2/core/products"
    	    }
    	  }
    	});

      dataSource.fetch(function() {
        let data = this.data();

        // initialize a Kendo Grid with the returned data from the server.
        $("#grid").kendoGrid({
          dataSource: {
            data: data
          },
          height: 800
        });
      });
    </script>

#### Example - use the Promise API to track when a request finishes

    <div id="grid"></div>
      
    <script>
    	var dataSource = new kendo.data.DataSource({
    	  transport: {
    	    read:  {
            url: "https://demos.telerik.com/service/v2/core/products"
    	    }
    	  }
    	});
    	dataSource.fetch().then(function(){
      	var data = dataSource.data();
    
        // initialize a Kendo Grid with the returned data from the server.
        $("#grid").kendoGrid({
          dataSource: {
            data: data
          },
          height: 800
        });
    	});
    </script>

### filter

Gets or sets the filter configuration.

A list of the supported operators you can find in this filter [operator configuration article](/api/javascript/data/datasource/configuration/filter#filteroperator).


<div class="meta-api-description">
How do I configure filtering criteria for my Kendo UI DataSource? Configure, set, or retrieve filtering criteria to control which data items are included or excluded during data queries or binding operations, enabling precise selection of records using single or multiple filter conditions, complex filter objects, or arrays of filters with various operators for customized data filtering, querying, or searching within data sources.
</div>

#### Parameters

##### value `Object` *(optional)*

The filter configuration. Accepts the same values as the [`filter`](/api/javascript/data/datasource#configuration-filter) option (**check there for more examples**).

#### Returns

`Object`&mdash;The current filter configuration. Returns `null` if no filter criteria are currently applied. Returns `undefined` if the DataSource instance has not performed filtering so far.

#### Example - set the data source filter

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ]
    });
    dataSource.filter( { field: "name", operator: "startswith", value: "Jane" });
    var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(view.length);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(view[0].name); // displays "Jane Doe"
    </script>

#### Example - get the data source filter

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filter: { field: "name", operator: "startswith", value: "Jane" }
    });
    var filter = dataSource.filter();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(filter.logic);  // displays "and"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(filter.filters[0]); //displays '{field: "name", operator: "startswith", value: "Jane"}'
    </script>

### get

Gets the data item (model) with the specified [`id`](/api/javascript/data/model#fields-id).

> The `get` method requires the [`schema.model`](/api/javascript/data/datasource#configuration-schema.model) option to be set and the `id` of the model to be specified. The `get` method will look for items only on the current page if [`serverPaging`](/api/javascript/data/datasource/configuration/serverpaging) is enabled.


<div class="meta-api-description">
How to fetch a specific data record by its unique identifier in Kendo UI for jQuery? Retrieve or fetch a specific data record, item, or model instance by its unique identifier or ID, enabling lookup, find, or get operations within a data source, collection, or dataset; supports querying by model ID when a data schema with model definitions is configured, with considerations for pagination such as fetching only from the current page when server-side paging is active, controlling whether the data retrieval targets local cache or requires additional server queries, and allowing developers to access individual entries efficiently by key or primary ID in contexts like database queries, REST API calls, or data-binding scenarios.
</div>

#### Parameters

##### id `Number|String`

The id of the model to look for.

#### Returns

`kendo.data.Model`&mdash;The model instance. Returns `undefined` if a model with the specified id is not found.

#### Example - find a model by id

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        {id: 1, name: "Jane Doe" },
        {id: 2, name: "John Doe" }
      ],
      schema: {
        model: { id: "id" }
      }
    });
    dataSource.fetch(function() {
      var dataItem = dataSource.get(1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataItem.name); // displays "Jane Doe"
    });
    </script>

### getByUid

Gets the data item (model) with the specified [`uid`](/api/javascript/data/model#fields-uid).


<div class="meta-api-description">
How do I retrieve a specific data record from my Kendo UI DataSource using its unique identifier? Find, fetch, or retrieve a single data record, entry, or model from a data collection or source by specifying its unique identifier, UID, or key. Locate a specific dataset element for accessing, updating, deleting, or linking to user interface components using unique IDs or keys. Search or query databases, data sources, or collections for exact item matches by unique identifiers, enabling precise data manipulation, retrieval, or UI binding based on unique record keys or IDs.
</div>

#### Parameters

##### uid `String`

The `uid` of the model to look for.

#### Returns

`kendo.data.ObservableObject`&mdash;The model instance. Returns `undefined` if a model with the specified `uid` is not found.

#### Example - find model by uid

    <button id="get">Get By UID</button>
    <div id="grid"></div>
    <div id="result"></div>

    <script>
      var dataSource = new kendo.data.DataSource({
        data: [{ID: 1, Name: "Name 1"}, {ID: 2, Name: "Name 2"}]
      });
      $("#grid").kendoGrid({
        dataSource: dataSource
      });
      
      $("#get").on("click", function() {
        let secondRow = $("#grid tr:last"),
            uid = secondRow.data("uid");
        
        // Get the dataItem by using the uid property.
        let dataItem = dataSource.getByUid(uid);
        
        $("#result").html(`<h4>Result</h4><p>Name - ${dataItem.Name}</p><p>ID - ${dataItem.ID}</p>`);
      });
    </script>

### group

Gets or sets the grouping configuration.


<div class="meta-api-description">
How do I configure data grouping settings in Kendo UI for jQuery? configure or retrieve data grouping settings to organize records by specific fields, customize grouping directions such as ascending or descending, apply multiple group criteria simultaneously, control aggregated calculations within groups, update or reset grouping configurations dynamically, trigger data refreshes or re-evaluations upon grouping changes, access current grouping descriptors, manage hierarchical or multi-level grouping for data sets, enable or disable grouping features programmatically, and integrate grouping logic for sorting, filtering, or summarizing large collections effectively.
</div>

#### Parameters

##### value `Object|Array`

The grouping configuration. Accepts the same values as the [`group`](/api/javascript/data/datasource#configuration-group) option.

#### Returns

`Array`&mdash;The current grouping configuration.

#### Example - group the data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ]
    });
    dataSource.group({ field: "category" });
    var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(view.length); // displays "2"
    var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(beverages.value); // displays "Beverages"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(beverages.items[0].name); // displays "Tea"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(beverages.items[1].name); // displays "Coffee"
    var food = view[1];
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(food.value); // displays "Food"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(food.items[0].name); // displays "Ham"
    </script>

#### Example - get the data source grouping configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      group: { field: "category" }
    });
    var groups = dataSource.group();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(groups.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(groups[0].field); // displays "category"
    </script>

### hasChanges `Boolean`

Checks if the data items have changed.

> Requires an [`ID` field] to be configured in [`schema.model.id`](/api/javascript/data/datasource#configuration-schema.model). Otherwise, will always return `true`.


<div class="meta-api-description">
How do I determine if there are unsaved modifications in a Kendo UI DataSource? Check or verify if the underlying data collection has unsaved modifications, edits, updates, deletions, or newly added records by invoking a method to detect changes before syncing or committing data. This detection helps control data synchronization workflows, enables conditional saving, and supports checking for dirty, dirty state, or modified entities since the last update, ensuring that you can query for any inserted, updated, or removed items programmatically. It requires entity identification via an ID field to accurately track changes and distinguish between unchanged and modified data states.
</div>

#### Returns

`Boolean`&mdash;Returns `true` if the data items have changed. Otherwise, returns `false`.

#### Example - check if the data source is changed

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { id: 1, name: "Jane Doe" }
      ],
      schema: {
        model: { id: "id" }
      }
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.hasChanges()); // displays "false"
      dataSource.add({ name: "John Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.hasChanges()); // displays "true"
    });
    </script>

### indexOf

Gets the index of the specified data item.


<div class="meta-api-description">
How to find the index of a specific data item in Kendo UI DataSource? Locate the position or index of a specific data item within a collection or data source, enabling you to search, find, identify, or retrieve the zero-based location of an element by matching its reference, object, or model instance. This supports common tasks such as determining where an item exists in a list, checking if an entry is present, comparing positions, finding indexes for updating, removing, or manipulating entries within datasets, collections, arrays, or data structures used in applications or code.
</div>

#### Parameters

##### dataItem `kendo.data.ObservableObject`

The target data item.

#### Returns

`Number`&mdash;The index of the specified data item. Returns `-1` if the data item is not found.

#### Example - get the index of a data item

    <script>
    var dataSource= new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    dataSource.fetch(function() {
      var dataItem = dataSource.at(0);
      var index = dataSource.indexOf(dataItem);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(index); // displays "0"
    });
    </script>

### insert

Inserts a data item in the data source at the specified index.


<div class="meta-api-description">
How to insert a new item into a Kendo UI DataSource at a specific index? Add or insert an item, record, or model instance into a data collection at a precise position or index, enabling control over where new data appears within an array, list, or data source structure; this method supports adding plain objects or model instances directly into a dataset so that bound UI components, lists, or iterations immediately update to include the item at the specified location, facilitating dynamic data manipulation like inserting entries before or after certain elements while maintaining index-specific placement in collections.
</div>

#### Parameters

##### index `Number`

The zero-based index at which the data item will be inserted.

##### model `Object|kendo.data.ObservableObject|kendo.data.Model`

Either a [`kendo.data.Model`](/api/javascript/data/model) instance or a JavaScript object containing the field values.

#### Returns

`kendo.data.Model`&mdash;The data item which is inserted.

#### Example - insert a data item

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { id: 1, name: "Jane Doe" }
      ],
      schema: {
        model: { id: "id" }
      }
    });
    dataSource.fetch(function() {
      var dataItem = dataSource.insert(0, { name: "John Doe" });
      var index = dataSource.indexOf(dataItem);
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(index); // displays "0"
    });
    </script>

### online

Gets or sets the online state of the data source.


<div class="meta-api-description">
How to check if Kendo UI data source is online using JavaScript? Control and check the connectivity status for remote data operations, enabling toggling between online and offline modes to manage synchronization, remote reads, and writes; retrieve the current connection state as a boolean or set the connection to active or inactive to ensure proper handling of data access and synchronization workflows when working with remote sources or APIs, facilitating conditional logic for network availability, offline support, and dynamic switching between connected and disconnected modes for data syncing and remote communication.
</div>

#### Parameters

##### value `Boolean`

The online state - `true` for online, `false` for offline.

#### Returns

`Boolean`&mdash;The current online state - `true` if online. Otherwise, `false`.

#### Example - set the online state

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/products"
            },
            update: {
                url: "https://demos.telerik.com/service/v2/core/products/update",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });
    dataSource.online(false);

#### Example - get the online state

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/products"
            },
            update: {
                url: "https://demos.telerik.com/service/v2/core/products/update",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });
    dataSource.online(false);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.online()); // displays "false"

### offlineData

Gets or sets the offline state of the data source.


<div class="meta-api-description">
How to toggle offline mode in Kendo UI DataSource? Configure, enable, disable, or check offline mode for data caching and synchronization management by programmatically setting or retrieving the current offline state to control data availability when disconnected. Use simple method calls to toggle offline caching, switch between online and offline modes, inspect whether offline support is active, manage data operations without network connection, and optimize component behavior for offline access or sync control. This functionality supports queries for the current offline status and commands to activate or deactivate offline mode for efficient data handling during network interruptions or offline scenarios.
</div>

#### Parameters

##### data `Array`

The array of data items that replace the current offline state of the data source.

#### Returns

`Array`&mdash;An array of JavaScript objects that represent the data items. Changed data items have a `__state__` field attached. That field indicates the type of change: `"create"`, `"update"`, or `"destroy"`. Unmodified data items do not have a `__state__` field.

#### Example - get the offline state

    <script>
    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/service/v2/core/products"
            },
            update: {
                url: "https://demos.telerik.com/service/v2/core/products/update",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                }
            }
        },
        schema: {
            model: {
                id: "ProductID"
            }
        }
    });

    dataSource.fetch(function() {
        // go in offline mode
        dataSource.online(false);
        // change the ProductName field of the first data item
        dataSource.at(0).set("ProductName", "Updated");
        // sync to accept the changes
        dataSource.sync();
        // get the offline data
        var offlineData = dataSource.offlineData();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(offlineData[0].__state__); // displays "update"
    });
    </script>

### page

Gets or sets the current page.


<div class="meta-api-description">
How do I change the current page in Kendo UI DataSource? Control or retrieve the current page index in paginated data sets by getting or setting the active page number, enabling navigation through pages, switching to a specific data segment, managing pagination state, triggering data reloads for a chosen page, updating the view to show a particular slice of data, handling page changes programmatically, and integrating page controls with custom logic to display or request distinct pages dynamically in a data-driven application.
</div>

#### Parameters

##### page `Number`

The new page.

#### Returns

`Number`&mdash;The current page.

#### Example - set the current page

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      pageSize: 1
    });
    dataSource.fetch(function() {
      dataSource.page(2);
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "John Doe"
    });
    </script>

#### Example - get the current page

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      pageSize: 1,
      page: 2
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.page()); // displays "2"
    </script>

### pageSize

Gets or sets the current page size.


<div class="meta-api-description">
How do I set the number of items to display per page in a Kendo UI data grid? Control or configure the number of items, records, or entries shown on each page in data pagination systems; retrieve the current page size count or set and update the page length dynamically by specifying a numeric value to influence how many results appear per page; manage pagination limits, page item counts, page length adjustments, and customize how many rows or data points display in paged views for seamless navigation through datasets.
</div>

#### Parameters

##### size `Number`

The new page size.

#### Returns

`Number`&mdash;The current page size.

#### Example - set the page size

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ]
    });
    dataSource.pageSize(1);
    dataSource.fetch(function() {
      dataSource.page(2);
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "John Doe"
    });
    </script>

#### Example - get the page size

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      pageSize: 1
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.pageSize()); // displays "1"
    </script>

### pushCreate

Appends the specified data items to the data source without marking them as "new". The data source will not sync data items appended via `pushCreate`.

> The difference between `pushCreate` and `add` is that items appended via `add` are synced with the remote service.


<div class="meta-api-description">
How do I add records to a Kendo UI DataSource without triggering create events? Add or append records directly into a data collection without marking them as new, bypassing change tracking and avoiding automatic synchronization with remote servers or APIs; this enables inserting data silently without triggering create events, prevents the system from treating the added items as pending remote updates, and allows manual control over when and how data is synced or flagged, useful for bulk imports, offline caching, or initializing data sets without network communication or replication.
</div>

#### Parameters

##### items `Object|Array`

The data item or data items to append to the data source.

#### Example - pushCreate with a single item

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      }
    });
    dataSource.pushCreate({ id: 1, name: "John Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(0).name); // displays "John Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(0).isNew()); // displays "false"
    </script>

#### Example - pushCreate with multiple items

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      }
    });
    dataSource.pushCreate([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" }
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(1).name); // displays "Jane Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(1).isNew()); // displays "false"
    </script>

### pushDestroy

Removes the specified data items from the data source without marking them as "removed". The data source will not sync data items appended via `pushDestroy`.

> The difference between `pushDestroy` and `remove` is that items removed via `remove` are synced with the remote service.


<div class="meta-api-description">
How to silently remove data items from Kendo UI DataSource without pushing changes to remote server? Control local deletion of data items instantly without syncing or marking them as removed, enabling you to erase entries from the data source silently and prevent remote updates or any "removed" state tracking. Configure data removal that bypasses synchronization triggers, allowing silent, immediate deletion of records or entries locally without affecting the backend or remote datasets. Manage local data cleanup by forcibly deleting items without pushing changes, avoiding replicated deletions or sync conflicts, and disabling automatic propagation of removals to external services. Use this method to silently purge or discard data entries client-side, skipping any remote synchronization or state changes that occur with standard removal operations.
</div>

#### Parameters

##### items `Object|Array`

The data item or data items to remove from the data source.

#### Example - pushDestroy with a single item

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      },
      data: [
         { id: 1, name: "John Doe" }
      ]
    });
    dataSource.read();
    dataSource.pushDestroy({ id: 1, name: "John Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.total()); // displays "0"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.hasChanges()); // displays "false"
    </script>

#### Example - pushDestroy with multiple items

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      },
      data: [
         { id: 1, name: "John Doe" },
         { id: 2, name: "Jane Doe" }
      ]
    });
    dataSource.read();
    dataSource.pushDestroy([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" }
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.total()); // displays "0"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.hasChanges()); // displays "false"
    </script>

### pushInsert

Appends the specified data items to the data source without marking them as "new". The data source will not sync data items appended via `pushInsert`.

> The difference between `pushInsert` and `insert` is that items appended via `insert` are synced with the remote service.


<div class="meta-api-description">
How to add data silently to a Kendo UI for jQuery DataSource without triggering sync? Add or append data entries to a local collection without marking them as new or triggering synchronization or remote updates, enabling you to insert records quietly without queuing them for persistence or syncing with backend services, allowing offline or temporary additions that remain local and unsynced; this method differs from standard insert operations which typically flag new data for syncing or remote storage, providing control over when data changes are propagated to external servers or databases.
</div>

#### Parameters

##### index `Number`

The zero-based index at which the data item will be inserted.

##### items `Object|Array`

The data item or data items to append to the data source.

#### Example - pushInsert with a single item

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      }
    });
    //create sample data set:
    dataSource.pushCreate([{ id: 1, name: "John Doe" }, { id: 2, name: "Alex" }]);

    //insert record at specified index
    dataSource.pushInsert(1, { id: 2, name: "Peter" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(1).name); // displays "Peter"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(1).isNew()); // displays "false"
    </script>

### pushMove

Moves the specified data items to the data source without marking them as "new". The data source cannot reorder data items to the server without explicit knowledge of the sorting mechanism. Therefore, this is an explicitly client-side operation. 


<div class="meta-api-description">
How to move existing data records in a Kendo UI DataSource without triggering server-side insert events? Transfer or relocate existing data records into a data collection while maintaining their unique identities and avoiding triggering new creation flags or server-side insert events; perform client-side moves of items within a dataset to reposition or update entries without registering them as newly created or changing their status on the backend; handle local data realignment, migration, or reordering in the application's memory without affecting server persistence or causing unintended synchronization of order changes; enable seamless updating or rearranging of records by pushing or moving them within the in-memory data source to keep consistency and prevent server-side creation markers while supporting client-only adjustments to data positioning.
</div>

#### Parameters

##### index `Number`

The zero-based index at which the data item should be moved to.

##### items `Object|Array`

The data item or data items to append to the data source.

#### Example - pushInsert with a single item

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      }
    });
    dataSource.pushCreate([{ id: 1, name: "John Doe" }, { id: 2, name: "Alex" }, { id: 3, name: "Peter" }]);

    /* Move the first item to second position. */
    dataSource.pushMove(2, dataSource.at(0));

	  /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(1).name); // displays "John Doe"
	  /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(1).isNew()); // displays "false"
    </script>

### pushUpdate

Updates the specified data items without marking them as "dirty". The data source will not sync data items appended via `pushUpdate`. If the data items are not found (using `schema.model.id`), they will be appended.

> The difference between `pushUpdate` and updating items via their [`set`](/api/javascript/data/observableobject/methods/set) method is that items updated via [`set`](/api/javascript/data/observableobject/methods/set) are synced with the remote service.


<div class="meta-api-description">
How to silently update local data in Kendo UI without synchronizing with remote servers? Update or append individual data entries within a data collection without triggering change tracking or marking items as modified, enabling silent local updates that do not synchronize with remote servers; this method lets you insert new entries if no matching identifier is found, differs from typical set or save operations that sync changes remotely, and is useful for controlling local data state, managing partial updates, avoiding automatic server communication, and handling data mutations without affecting synchronization or marking records as changed.
</div>

#### Parameters

##### items `Object|Array`

The data item or data items to update.

#### Example - pushUpdate with a single item

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      },
      data: [
         { id: 1, name: "John Doe" }
      ]
    });
    dataSource.read();
    dataSource.pushUpdate({ id: 1, name: "Jane Doe" });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(0).name); // displays "Jane Doe"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(0).dirty); // displays "false"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.hasChanges()); // displays "false"
    </script>

#### Example - pushUpdate with multiple items

    <script>
    var dataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: "id"
        }
      },
      data: [
         { id: 1, name: "John Doe" },
         { id: 2, name: "Jane Doe" }
      ]
    });
    dataSource.read();
    dataSource.pushUpdate([
        { id: 1, name: "John" },
        { id: 2, name: "Jane" }
    ]);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(0).name); // displays "John"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.at(0).dirty); // displays "false"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.hasChanges()); // displays "false"
    </script>

### query

Executes the specified query over the data items. Makes an HTTP request if bound to a remote service.

This method is useful when you need to modify several parameters of the data request at the same time (e.g. filtering and sorting). If you execute `filter()` and then `sort()`, the DataSource will make two separate requests. With `query()`, it will make one request.

> This method will remove the current sort, filter, group, aggregates descriptors and paging information, if such are not provided as arguments.


<div class="meta-api-description">
How can I dynamically filter data in a Kendo UI for jQuery DataSource using the query method? Execute complex queries and control data retrieval by running a customizable query operation on the data source, enabling dynamic filtering, sorting, grouping, aggregation, and paging parameters. Configure or update multiple request options simultaneously such as filters, sorts, groups, aggregates, and pagination to optimize data fetching and reduce multiple network calls into a single, efficient query execution. Enable flexible query modifications on both local data collections and remote services through HTTP requests, supporting combined query parameter adjustments to fetch, refresh, or reset data views according to new criteria while managing or resetting existing descriptors as needed to tailor the data response precisely.
</div>

#### Parameters

##### options `Object` *(optional)*

The query options which should be applied.

##### options.aggregate `Array` *(optional)*

The aggregate configuration. Accepts the same values as the [`aggregate`](/api/javascript/data/datasource#configuration-aggregate) option. The `query` method will request the remote service if the [`serverAggregates`](/api/javascript/data/datasource#configuration-serverAggregates) option is set to `true`.

##### options.filter `Object|Array` *(optional)*

The filter configuration. Accepts the same values as the [`filter`](/api/javascript/data/datasource#configuration-filter) option. The `query` method will request the remote service if the [`serverFiltering`](/api/javascript/data/datasource#configuration-serverFiltering) option is set to `true`.

##### options.group `Object|Array` *(optional)*

The grouping configuration. Accepts the same values as the [`filter`](/api/javascript/data/datasource#configuration-filter) option. The `query` method will request the remote service if the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) option is set to `true`.

##### options.page `Number` *(optional)*

The page of data to return. The `query` method will request the remote service if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true`.

##### options.pageSize `Number` *(optional)*

The number of data items to return. The `query` method will request the remote service if the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true`.

##### options.sort `Object|Array` *(optional)*

The sort configuration. Accepts the same values as the [`sort`](/api/javascript/data/datasource#configuration-sort) option. The `query` method will request the remote service if the [`serverSorting`](/api/javascript/data/datasource#configuration-serverSorting) option is set to `true`.

#### Returns

`Promise`&mdash;A promise that will be resolved when the data has been loaded or rejected if an HTTP error occurs.

#### Example - query the data source

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products",
            dataType: "json"
        }
      },
      change: function(e) {
        var view = this.view();
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(view)
        console.log(view[0].ProductName); // displays "Manjimup Dried Apples"
      }
    });
    // Filter only results with ProductID greather than 30, sort by "ProductName" and get the second page with page size set to 20. 
    dataSource.query({
      sort: { field: "ProductName", dir: "desc" },
	  filter: { field: "ProductID", operator: "gt", value: 30 },
      page: 2,
      pageSize: 20
    });
    </script>

#### Example - use the Promise API to get notified when the query finishes

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    // sort by "ProductName" and get the third page with page size set to 20
    dataSource.query({
      sort: { field: "ProductName", dir: "desc" },
      page: 3,
      pageSize: 20
    }).then(function(e) {
        var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(view[0].ProductName); // displays "Manjimup Dried Apples"
      });
    </script>

### read

Reads data items from a [remote/custom transport](/framework/datasource/crud) (if the [`transport`](/api/javascript/data/datasource#configuration-transport) option is set) or from a JavaScript array (if the [`data`](/api/javascript/data/datasource#configuration-data) option is set).

> The `read` method always makes a request to the remote service unless the Data Source is [offline](/api/javascript/data/datasource/methods/online).


<div class="meta-api-description">
How to refresh data in Kendo UI DataSource using the read method? Retrieve, fetch, load, or refresh data items from a remote server, API endpoint, custom transport, or local JavaScript array source by invoking or configuring the data retrieval method; control how data is requested or reloaded, handle data synchronization, update collections dynamically, enable pulling fresh data on demand, manage offline scenarios where remote calls do not occur, and adapt data fetching strategies when using built-in transport settings or customized data sources for flexible, real-time, or batch loading of datasets.
</div>

#### Parameters

##### data `Object` *(optional)*

Optional data to pass to the remote service. If you need to filter, it is better to use the [`filter()`](/api/javascript/data/datasource/methods/filter) method or the [`query()`](/api/javascript/data/datasource/methods/query) method with a `filter` parameter.

#### Returns

`Promise`&mdash;A promise that will be resolved when the data has been loaded or rejected if an HTTP error occurs.

#### Example - read data from a remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      change: function(e) {
        var view = this.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(view[0].ProductName); // displays "Chai"
      }
    });

    var optionalData = { foo: 42, bar: "baz" };

    dataSource.read(optionalData);
    </script>

#### Example - use the Promise API to track when a request finishes

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.read().then(function() {
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].ProductName); // displays "Chai"
    });
    </script>

### remove

Removes the specified data item from the data source.


<div class="meta-api-description">
How do I delete items from a Kendo UI DataSource in-memory collection? Remove or delete items, records, or models from the in-memory collection or data array managed by a data source, enabling local removal of specific data entries; this action often involves configuring or invoking removal functions to update or manipulate datasets, with options to persist changes remotely via synchronization or syncing with a backend server, handling use cases for deleting records, clearing models, removing data entries, or updating client-side collections before optionally syncing to persist deletions in databases or APIs.
</div>

#### Parameters

##### model `kendo.data.Model`

The data item which should be removed.

#### Example - remove a data item

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { id: 1, name: "Jane Doe" },
        { id: 2, name: "John Doe" }
      ],
      schema: {
        model: { id: "id" }
      }
    });
    dataSource.fetch(function() {
      var dataItem = dataSource.at(0);
      dataSource.remove(dataItem);
      var data = dataSource.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data.length);  // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data[0].name); // displays "John Doe"
    });
    </script>

### skip

Gets the current skip parameter of the dataSource. The skip parameter indicates the number of data items that should be skipped when a new page is formed.


<div class="meta-api-description">
How to configure server-side paging in Kendo UI for jQuery with DataSource.skip method? Retrieve or configure the numeric offset for data pagination, controlling how many items are bypassed when loading a new page or segment of data. This numeric skip parameter is essential for implementing paging strategies such as server-side paging, infinite scroll, virtual scroll, chunked loading, or any scenario that requires determining the current page position, calculating offsets, or fetching subsets of data based on how many records to omit at the beginning. Use this to manage data slices, adjust data windows, or compute skip counts for queries and load operations.
</div>

#### Returns

`Number`&mdash;The current `skip` parameter.

#### Example - get the current page

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      pageSize: 1,
      page: 2
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.skip()); // displays "1"
    </script>

### sort

Gets or sets the sort order which will be applied over the data items.


<div class="meta-api-description">
How to implement sorting in Kendo UI DataSource? Configure, set, or retrieve the sorting criteria and order for collections of data items, enabling control over how data is ordered by one or multiple fields or properties, supporting sorting strategies like ascending, descending, custom comparators, multi-level sorting, dynamic reorder, or updating sort preferences at runtime to influence data presentation, filtering, and search results based on specific attribute sequences or user-defined priority rules.
</div>

#### Parameters

##### value `Object|Array`

The sort configuration. Accepts the same values as the [`sort`](/api/javascript/data/datasource#configuration-sort) option.

#### Returns

`Array`&mdash;The current sort configuration. Returns `undefined` instead of an empty array if the DataSource instance has not performed any sorting so far.

#### Example - sort the data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    dataSource.sort({ field: "age", dir: "desc" });
    var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(view[0].name); // displays "John Doe"
    </script>

#### Example - get the sort configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sort: { field: "age", dir: "desc" }
    });
    var sort = dataSource.sort();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sort.length);   // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(sort[0].field); // displays "age"
    </script>

### sync

Saves any data item changes.

The `sync` method will request the remote service if:

* The [`transport.create`](/api/javascript/data/datasource#configuration-transport.create) option is set and the data source contains new data items.
* The [`transport.destroy`](/api/javascript/data/datasource#configuration-transport.destroy) option is set and data items have been removed from the data source.
* The [`transport.update`](/api/javascript/data/datasource#configuration-transport.update) option is set and the data source contains updated data items.


<div class="meta-api-description">
How do I programmatically push local data changes to a remote server using Kendo UI for jQuery's DataSource? Control data synchronization processes to push local additions, updates, and deletions to a remote server or API by enabling sync operations that handle create, update, and destroy actions conditionally based on configured transport methods; configure syncing to flush changes only for newly created, modified, or removed records, initiate data persistence through remote calls, and manage synchronization workflows that ensure local modifications are consistently reflected in the backend system with create/update/delete support as set in transport options.
</div>

#### Returns

`Promise`&mdash;A promise that will be resolved when all sync requests have finished successfully, or rejected if any single request fails.

#### Example - save the changes

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
            url: "https://demos.telerik.com/service/v2/core/products",
            dataType: "json"
        },
        update: {
          url: "https://demos.telerik.com/service/v2/core/products/update",
          type: "POST",
          contentType: "application/json"
        },
        destroy: {
          url: "https://demos.telerik.com/service/v2/core/products/destroy",
          type: "POST",
          contentType: "application/json"
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      var anotherProduct = dataSource.at(1);
      anotherProduct.set("UnitPrice", 20);
      var yetAnotherProduct = dataSource.at(2);
      dataSource.remove(yetAnotherProduct);
      dataSource.sync(); // makes a request to https://demos.telerik.com/service/v2/core/products/update" and https://demos.telerik.com/service/v2/core/products/destroy
    });
    </script>

### total
Gets the total number of data items. Uses [`schema.total`](/api/javascript/data/datasource#configuration-schema.total) if the [`transport.read`](/api/javascript/data/datasource#configuration-transport.read) option is set.


<div class="meta-api-description">
How to calculate total records in Kendo UI DataSource? Retrieve or calculate the complete total count of data items or records from a data source for tasks like pagination, reporting, or display of item quantities, supporting both local and remote data fetching scenarios. This method helps in controlling and obtaining accurate overall record counts, enabling queries for total elements, server-side total extraction using schemas, and accurate page calculations by fetching or computing the aggregate number of entries regardless of client or server data origins. It supports scenarios including total record retrieval, count summaries, server-returned totals for pagination controls, and dynamic total count access to manage data views and navigation.
</div>

#### Returns

`Number`&mdash;The total number of data items. Returns the `length` of the array returned by the [`data`](/api/javascript/data/datasource/methods/data) method if `schema.total` or `transport.read` are not set.
Returns `0` if the data source was not populated with data items via the [`read`](/api/javascript/data/datasource/methods/read), [`fetch`](/api/javascript/data/datasource/methods/read), or [`query`](/api/javascript/data/datasource/methods/query) methods.

#### Example - get the total number of data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    dataSource.fetch(function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(dataSource.total()); // displays "2"
    });
    </script>

### totalPages

Gets the number of available pages.


<div class="meta-api-description">
How do I get the total number of pages in a Kendo UI DataSource when using pagination? Calculate or determine the total number of pages available based on the overall data record count and the configured page size to enable pagination controls, manage page navigation, set or validate current page indexes, drive pager interfaces, fetch specific pages, or implement page count calculations for data-driven components handling large datasets.
</div>

#### Returns

`Number`&mdash;The available pages.

#### Example - get the total number of pages

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
        { name: "James Doe", age: 34 },
        { name: "Tom Doe", age: 35 }
    ],
    pageSize: 2,
    total: 4
    });
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.totalPages());   // displays "2"
    </script>

### view

Returns the data items which correspond to the **current** page, filter, sort, and group configuration. Compare with the [`data`](/api/javascript/data/datasource/methods/data) method, which will return data items from **all** pages, if **local** data binding and paging are used.

To ensure that data is available this method should be used within the [`change`](/api/javascript/data/datasource/events/change) event handler or the [`fetch`](/api/javascript/data/datasource/methods/fetch) method.


<div class="meta-api-description">
How to get only the visible records in Kendo UI DataSource after applying filtering and sorting? Access or retrieve the subset of data items currently displayed after applying paging, filtering, sorting, or grouping operations, enabling you to get only the visible records based on the current data state or view configuration. This includes dynamically fetching the displayed page’s data, filtered or sorted results, and grouped entries as per the active user interactions or data source settings, as opposed to retrieving the full dataset across all pages. This method is commonly used to handle visible data updates during change events, fetch cycles, or to synchronize UI elements with the current data presentation, supporting use cases like paginated views, client-side filtering, sorting controls, grouped data displays, and data virtualization scenarios where only a subset of the entire dataset is rendered or manipulated at any given time.
</div>

#### Returns

`kendo.data.ObservableArray`&mdash;The data items. Returns groups if the data items are grouped (via the [`group`](/api/javascript/data/datasource#configuration-group) option or the [`group`](/api/javascript/data/datasource/methods/group) method).

#### Example - get the paged and sorted data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      pageSize: 1,
      page: 2,
      sort: { field: "category", dir: "desc" }
    });
    dataSource.fetch(function() {
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view[0].name); // displays "Tea"
    });
    </script>

#### Example - get the paged, sorted, and grouped data items

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      group: { field: "category" },
      sort: { field: "name", dir: "asc" },
      pageSize: 2,
      page: 1
    });
    dataSource.fetch(function() {
      var view = dataSource.view();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(view.length); // displays "1"
      var beverages = view[0];
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.value); // displays "Beverages"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items.length); // displays "2"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items[0].name); // displays "Coffee"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(beverages.items[1].name); // displays "Tea"
    });
    </script>

## Events

### change

Fired when the data source is populated from a JavaScript array or a remote service, a data item is inserted, updated or removed, the data items are paged, sorted, filtered, or grouped.

The event handler function context (available via the `this` keyword) will be set to the data source instance.


<div class="meta-api-description">
How do I detect when data changes in Kendo UI's DataSource? Detect or handle updates and modifications in the data set by listening to events triggered when data changes occur, including when new data is loaded from local arrays or remote services, when items are inserted, updated, removed, or when data is reorganized through paging, sorting, filtering, or grouping; configure custom callbacks, event handlers, or listeners that respond dynamically to any content alterations in the data source, enabling developers to react to data lifecycle events, synchronize views, trigger UI refreshes, or perform actions tied to data mutations while maintaining context within the current data source instance.
</div>

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.action `String` *(optional)*

String describing the action type (available for all actions other than `"read"`).

The possible values are:

* `"itemchange"`
* `"add"`
* `"remove"`
* `"sync"`

##### e.field `String` *(optional)*

A string describing the field that is changed (available only for the `"itemchange"` action).

##### e.items `Array`

The array of data items that were affected (or read).

#### Example - subscribe to the change event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      change: function(e) {
        var data = this.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.length); // displays "77"
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the change event after initialization

    <script>
    function dataSource_change(e) {
      var data = this.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data.length); // displays "77"
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.bind("change", dataSource_change);
    dataSource.fetch();
    </script>

### error

Fired when a request to the remote service fails.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

> If the [`schema.errors`](/api/javascript/data/datasource#configuration-schema.errors) option is set and the server response contains that field, then the `error` event will be fired. The
`errors` field of the event argument will contain the errors returned by the server.


<div class="meta-api-description">
How do I handle errors in Kendo UI for jQuery's remote data requests? Manage and respond to failed remote data requests with access to server error information, enabling detection of network issues, HTTP failures, or API errors during data fetching. Capture and handle error events triggered when remote service calls fail, supporting implementation of retries, error logging, recovery procedures, and custom error processing. Utilize context-aware error handlers that provide detailed server response errors if defined in the schema, facilitating debugging and graceful handling of server-side validation or response errors for remote data operations.
</div>

#### Event Data

##### e.errorThrown `Object` *(optional)*

An optional exception.

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.status `String`

A string describing the type of the error.

##### e.xhr `Object`

The current [`jqXHR`](https://api.jquery.com/Types/#jqXHR).

#### Example - subscribe to the error event after initialization

    <script>
    function dataSource_error(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.status); // displays "error"
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core"
        }
      }
    });
    dataSource.bind("error", dataSource_error);
    dataSource.fetch();
    </script>

### push

Fired when the data source receives a push notification or the `pushCreate`, `pushUpdate`, or `pushDestroy` methods are called.


<div class="meta-api-description">
How can I handle data updates in Kendo UI DataSource with real-time push events? Handle real-time data updates, live synchronization, and immediate change notifications for data sources by reacting to push events that signal new records, updates, or deletions, enabling you to process incoming change data, merge or refresh records seamlessly, keep UI components or application state consistent with remote or collaborative modifications, and trigger automatic updates or bindings refreshes to maintain an up-to-date interface during data pushCreate, pushUpdate, or pushDestroy actions.
</div>

#### Event Data

##### e.items `Array`

The array of data items that were affected by the push notification.

##### e.type `String`

The type of the push notification.

One of the following values:

* `"create"`
* `"update"`
* `"destroy"`

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

#### Example - subscribe to the push event during initialization

    <script>
    function dataSource_push(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.type); // displays "update"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.items[0].name); // displays "Jane Doe"
    }
    var dataSource = new kendo.data.DataSource({
      push: dataSource_push,
      schema: {
        model: {
          id: "id"
        }
      },
      data: [
        { id: 1, name: "John Doe" }
      ]
    });
    dataSource.fetch();
    dataSource.pushUpdate({ id: 1, name: "Jane Doe" });
    </script>

### requestEnd

Fired when a remote service request is finished.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

> The `"response"` argument is not available for local operations.


<div class="meta-api-description">
What event is triggered when a remote data request finishes in Kendo UI's DataSource widget? Detect when a remote data request finishes to trigger custom logic such as inspecting server responses, updating user interface elements, handling asynchronous data load completion, processing metadata from results, managing callbacks after remote service calls, or reacting to the end of fetch operations; this event activates after external data fetching concludes and allows methods tied to the original data source instance to be accessed within event handlers, enabling control over post-request workflows, error handling, or UI refresh based on server replies, with attention to the fact that local data operations do not provide server response details during this event.
</div>

#### Event Data

##### e.response `Object`

The raw remote service response.

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.type `String`

The type of the request.

Set to:

* `"create"`
* `"read"`
* `"update"`
* `"destroy"`

#### Example - subscribe to the requestEnd event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      requestEnd: function(e) {
        var response = e.response;
        var type = e.type;
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(type); // displays "read"
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(response.length); // displays "77"
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the requestEnd event to catch only read requests

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      requestEnd: function(e) {
        //check the "response" argument to skip the local operations
        if (e.type === "read" && e.response) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Current request is 'read'.");
        }
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the requestEnd event after initialization

    <script>
    function dataSource_requestEnd(e) {
      var response = e.response;
      var type = e.type;
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(type); // displays "read"
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(response.length); // displays "77"
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.bind("requestEnd", dataSource_requestEnd);
    dataSource.fetch();
    </script>

> The `requestEnd` event does not hold information regarding any errors that occurred during the request. The error information is available as part of the error event.

### requestStart

Fired when the data source makes a remote service request.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

It is possible to prevent the remote request. To achieve this, execute `e.preventDefault()` in the handler function.

> This event can be prevented only for `read` requests.


<div class="meta-api-description">
How to cancel a Kendo UI DataSource read operation before it starts? Intercept or hook into the moment before any remote data fetch or service call is initiated to modify, cancel, or conditionally block outgoing requests, especially read operations, by running custom logic or validations; control, prevent, or stop data retrieval actions programmatically by listening for request start triggers, handling pre-request events, and applying cancellation with event prevention methods to manage or override fetching behavior dynamically in data-driven applications.
</div>

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.type `String`

The type of the request.

Set to:

* `"create"`
* `"read"`
* `"update"`
* `"destroy"`

#### Example - subscribe to the requestStart event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      requestStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("request started");
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the requestStart event after initialization

    <script>
    function dataSource_requestStart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("request started");
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    dataSource.bind("requestStart", dataSource_requestStart);
    dataSource.fetch();
    </script>

#### Example - prevent the remote request

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
            url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      requestStart: function(e) {
        var myCondition = true;
        if (myCondition) {
            e.preventDefault();
        }
      }
    });
    dataSource.fetch();
    </script>

### sync

Fired after the data source saves data item changes. The data source saves the data item changes when the [`sync`](/api/javascript/data/datasource/methods/sync) method is called.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

> The `sync` event is fired after all remote requests finish.


<div class="meta-api-description">
How do I run custom logic after all pending data changes are saved in Kendo UI DataSource? Trigger callbacks or run custom logic immediately after all pending data changes are successfully saved and synchronized with the server by detecting when the data source completes its synchronization process, including handling cases where you want to respond once remote requests finish, confirm that locally modified data items are persisted, track completion of batch updates, or react to data save events in client-server interactions, enabling you to set event handlers that execute upon save completion, update confirmations, and data syncing operations within data-bound applications.
</div>

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

#### Example - subscribe to the sync event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        create: {
          url: "https://demos.telerik.com/service/v2/core/products/create",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data) {
          return kendo.stringify(data.models);
        }
      },
      sync: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("sync complete");
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.add( { ProductName: "Ham" } );
    dataSource.sync();
    </script>

#### Example - subscribe to the sync event after initialization

    <script>
    function dataSource_sync(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("sync complete");
    }
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        create: {
          url: "https://demos.telerik.com/service/v2/core/products/create",
          type: "POST",
          contentType: "application/json"
        },
        parameterMap: function(data) {
          return kendo.stringify(data.models);
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.bind("sync", dataSource_sync);
    dataSource.add( { ProductName: "Ham" } );
    dataSource.sync();
    </script>

## Class Methods

### create

Creates a data source instance using the specified configuration. If the configuration is a data source instance, the same instance will be returned.


<div class="meta-api-description">
How do I create a data source instance with Kendo UI for jQuery? Generate or initialize a data source from various inputs including configuration objects, arrays, or existing data source instances to set up, bind, or reuse data effectively in data source components; this method handles normalization by returning a consistent data source instance whether starting from raw configurations or reusing previously created sources, enabling flexible creation, setup, reuse, conversion, and binding of data sources across different contexts and configurations.
</div>

#### Returns

`kendo.data.DataSource`&mdash;The new data source instance.

#### Parameters

##### options `Object`

The data source [configuration](#configuration).

#### Example - parsing the dataSource configuration option in a custom widget

    <script>
    var dataSource = kendo.data.DataSource.create({
      data: [
        { name: "Jane Doe" }
      ]
    });
    </script>
