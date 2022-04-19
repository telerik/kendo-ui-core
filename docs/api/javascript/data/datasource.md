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

#### Example - enable auto sync
    <script>
    var dataSource = new kendo.data.DataSource({
      autoSync: true,
      transport: {
        read:  {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "https://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20); // auto-syncs and makes request to https://demos.telerik.com/kendo-ui/service/products/update
    });
    </script>

### batch `Boolean` *(default: false)*

If set to `true`, the data source will batch CRUD operation requests. For example, updating two data items would cause one HTTP request instead of two. By default, the data source
makes an HTTP request for every CRUD operation.

> The changed data items are sent as `models` by default. This can be changed via the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option.

#### Example - enable the batch mode

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "https://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
      dataSource.sync(); // causes only one request to "https://demos.telerik.com/kendo-ui/service/products/update"
    });
    </script>

### data `Array|String`

The array of data items which the data source contains. The data source will wrap those items as [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) or [`kendo.data.Model`](/api/javascript/data/model) (if [`schema.model`](/api/javascript/data/datasource/configuration/schema.model) is set).

Can be set to a string value if the [`schema.type`](/api/javascript/data/datasource#configuration-schema.type) option is set to `"xml"`.

> A field in the DataSource cannot be named "data". The latter should be considered a limitation.

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
        // specify the the schema is XML
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

### filter.filters `Array`

The nested filter expressions. Supports the same options as [`filter`](/api/javascript/data/datasource#configuration-filter). Filters can be nested indefinitely.

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

### inPlaceSort `Boolean` *(default: false)*

If set to `true`, the original `Array` used as [`data`](/api/javascript/data/datasource#configuration-data) will be sorted when sorting operation is performed. This setting supported only with local data, bound to a JavaScript array via the [`data`](/api/javascript/data/datasource#configuration-data) option.

### offlineStorage `String|Object`

The offline storage key or custom offline storage implementation.

#### Example - set an offline storage key

    <script>
    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
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
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });
    </script>

### page `Number`

The page of data which the data source will return when the [`view`](/api/javascript/data/datasource/methods/view) method is invoked or request from the remote service.

> The data source will page the data items client-side unless the [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging) option is set to `true`.

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

#### Example - specify the schema of the remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: function(response) {
          return response.statuses; // twitter's response is { "statuses": [ /* results */ ] }
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
      }
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

#### Returns

`Array`&mdash;The data items from the response.

#### Example - specify the field which contains the data items as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: "statuses" // twitter's response is { "statuses": [ /* results */ ] }
      }
    });
    dataSource.fetch(function(){
      var data = this.data();
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(data.length);
    });
    </script>

#### Example - specify the field which contains the data items as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: function(response) {
          return response.statuses; // twitter's response is { "statuses": [ /* results */ ] }
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

> If this option is set and the server response contains that field, then the `error` event will be fired. The `errors` field of the event argument will contain the errors returned by the server.

#### Example - specify the error field as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://www.mocky.io/v2/5ad0597a3100004f004eac46",
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
        console.log("error event handler", e.errors[0]);
      }
    });
    dataSource.fetch();
    </script>

#### Example - specify the error field as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "aaaaa" }
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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

#### Example - use XML data

    <script>
    var dataSource = new kendo.data.DataSource({
      data: '<books><book id="1"><title>Secrets of the JavaScript Ninja</title></book></books>',
      schema: {
        // specify the the schema is XML
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

Use the [`parameterMap`](/api/javascript/data/datasource#configuration-transport.parameterMap) option to send the paging options in a different format.

For more information and tips about client and server data operations, refer to the [introductory article on the DataSource](/framework/datasource/overview#mixed-data-operations-mode).

For a runnable example with enabled server paging, you can visit [the Grid remote data binding demo.](https://demos.telerik.com/kendo-ui/grid/remote-data-binding)

#### Example - enable server paging

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverPaging: true,
      schema: {
        total: "total" // total is returned in the "total" field of the response
      }
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

#### Example - specify the remote service configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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

### transport.batch.url `String|Function`

> This option is configurable for the [odata-v4 data source `type`](/api/javascript/data/datasource/configuration/type) in [`batch`](/api/javascript/data/datasource/configuration/batch) mode.

The [odata-v4 batch `endpoint`](https://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part1-protocol/odata-v4.0-errata02-os-part1-protocol-complete.html#_Toc406398359) to which the request is sent.

If set to a function, the data source will invoke it and use the result as the URL.

### transport.cache `Boolean` *(default: false)*

Specifies if the transport caches the result from `read` requests. The query parameters are used as a cache key and if the key is present in the cache, a new request to the server is not executed. The cache is kept in memory and, thus, cleared on page refresh.

#### Example - specify the remote service configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders",
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

#### Example - set the create remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        // make JSONP request to https://demos.telerik.com/kendo-ui/service/products/create
        create: {
          url: "https://demos.telerik.com/kendo-ui/service/products/create",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            // send the created data items as the "models" service parameter encoded in JSON
            return { models: kendo.stringify(data.models) };
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
          // make JSONP request to https://demos.telerik.com/kendo-ui/service/products/create
          $.ajax({
            url: "https://demos.telerik.com/kendo-ui/service/products/create",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            // send the created data items as the "models" service parameter encoded in JSON
            data: {
              models: kendo.stringify(options.data.models)
            },
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

#### Example - specify the URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "https://demos.telerik.com/kendo-ui/service/products/create",
          cache: true,
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            return { models: kendo.stringify(data.models) }
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
            return "https://demos.telerik.com/kendo-ui/service/products/create"
          },
          cache: true,
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            return { models: kendo.stringify(data.models) }
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

#### Example - set the destroy remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        },
        // make JSONP request to https://demos.telerik.com/kendo-ui/service/products/destroy
        destroy: {
          url: "https://demos.telerik.com/kendo-ui/service/products/destroy",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "destroy") {
            // send the destroyed data items as the "models" service parameter encoded in JSON
            return { models: kendo.stringify(data.models) }
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
            url: "https://demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp",
            success: function(result) {
              options.success(result);
            }
          });
        },
        destroy: function (options) {
          // make JSONP request to https://demos.telerik.com/kendo-ui/service/products/destroy
          $.ajax({
            url: "https://demos.telerik.com/kendo-ui/service/products/destroy",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            // send the destroyed data items as the "models" service parameter encoded in JSON
            data: {
              models: kendo.stringify(options.data.models)
            },
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

#### Example - specify the URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        },
        destroy: {
          url: "https://demos.telerik.com/kendo-ui/service/products/destroy",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "destroy") {
            return { models: kendo.stringify(data.models) }
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        },
        destroy: {
          url: function (options) {
            return "https://demos.telerik.com/kendo-ui/service/products/destroy"
          },
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "destroy") {
            return { models: kendo.stringify(data.models) }
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
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders?$format=json",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          jsonp: "$callback",
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
        data: "d"
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
          url: "https://demos.telerik.com/kendo-ui/service/products/create",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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

    <script src="https://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-1.1.3.min.js"></script>
    <script>
    var hubUrl = "https://demos.telerik.com/kendo-ui/service/signalr/hubs";
    var connection = $.hubConnection(hubUrl, { useDefaultPath: false});
    var hub = connection.createHubProxy("productHub");
    var hubStart = connection.start({ jsonp: true });
    var dataSource = new kendo.data.DataSource({
    transport: {
      push: function(callbacks) {
        hub.on("create", function(result) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("push create");
          callbacks.pushCreate(result);
        });
        hub.on("update", function(result) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("push update");
          callbacks.pushUpdate(result);
        });
        hub.on("destroy", function(result) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("push destroy");
          callbacks.pushDestroy(result);
        });
      }
    },
    schema: {
      model: {
        id: "ID",
        fields: {
          "ID": { editable: false },
          "CreatedAt": { type: "date" },
          "UnitPrice": { type: "number" }
        }
      }
    }
    });
    </script>


### transport.read `Object|String|Function`

The configuration used when the data source loads data items from a remote service.

> The data source uses [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) to make an HTTP request to the remote service. The value configured via `transport.read` is passed to `jQuery.ajax`. This means that you can set all options supported by `jQuery.ajax` via `transport.read` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.read` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.read` is a string, the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, that is, as functions or as objects. Mixing the different configuration alternatives is not possible.

#### Example - set the read remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        // make JSONP request to https://demos.telerik.com/kendo-ui/service/products
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products/read",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
          // make JSONP request to https://demos.telerik.com/kendo-ui/service/products
          $.ajax({
            url: "https://demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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

#### Example - send additional parameters as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products/read",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products/read",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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

#### Example - specify URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
            return "https://demos.telerik.com/kendo-ui/service/products";
          },
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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

It is recommended to get familiar with the SignalR [JavaScript API](https://www.asp.net/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client).

#### Example

    <script src="https://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-1.1.3.min.js"></script>
    <script>
        var hubUrl = "https://demos.telerik.com/kendo-ui/service/signalr/hubs";
        var connection = $.hubConnection(hubUrl, { useDefaultPath: false});
        var hub = connection.createHubProxy("productHub");
        var hubStart = connection.start({ jsonp: true });

        var dataSource = new kendo.data.DataSource({
            type: "signalr",
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
    </script>

Configuration with [ASP.NET Core SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/):

#### Example

    <script src="https://unpkg.com/@aspnet/signalr@1.0.0/dist/browser/signalr.js"></script>
    <script>
        var hubUrl = "https://demos.telerik.com/aspnet-core/service/signalr/hubs/products";

        var hub = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                transport: signalR.HttpTransportType.LongPolling
            })
            .build();

        var hubStart = hub.start()

        var dataSource = new kendo.data.DataSource({
            type: "signalr",
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
    </script>

### transport.signalr.client `Object`

Specifies the client-side CRUD methods of the SignalR hub.

### transport.signalr.client.create `String`

Specifies the name of the client-side method of the SignalR hub responsible for creating data items.

### transport.signalr.client.destroy `String`

Specifies the name of the client-side method of the SignalR hub responsible for destroying data items.

### transport.signalr.client.read `String`

Specifies the name of the client-side method of the SignalR hub responsible for reading data items.

### transport.signalr.client.update `String`

Specifies the name of the client-side method of the SignalR hub responsible for updating data items.

### transport.signalr.hub `Object`

The SignalR hub object returned by the `createHubProxy` method (or `signalR.HubConnection` for ASP.NET Core SignalR). The `hub` option is mandatory.

### transport.signalr.promise `Object`

The promise returned by the `start` method of the SignalR connection. The `promise` option is mandatory.

### transport.signalr.server `Object`

Specifies the server-side CRUD methods of the SignalR hub.

### transport.signalr.server.create `String`

Specifies the name of the server-side method of the SignalR hub responsible for creating data items.

### transport.signalr.server.destroy `String`

Specifies the name of the server-side method of the SignalR hub responsible for destroying data items.

### transport.signalr.server.read `String`

Specifies the name of the server-side method of the SignalR hub responsible for reading data items.

### transport.signalr.server.update `String`

Specifies the name of the server-side method of the SignalR hub responsible for updating data items.

### transport.submit `Function`

A function that will handle create, update and delete operations in a single batch when custom transport is used, that is, the `transport.read` is defined as a function.

The `transport.create`, `transport.update`, and `transport.delete` operations will not be executed in this case.

> This function will only be invoked when the DataSource is in its [batch mode](/api/javascript/data/datasource#configuration-batch).

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
                  url: "https://demos.telerik.com/kendo-ui/service/products",
                  dataType: "jsonp",
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

#### Example - specify update as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "https://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20);
      dataSource.sync(); //makes request to https://demos.telerik.com/kendo-ui/service/products/update
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
          // make JSONP request to https://demos.telerik.com/kendo-ui/service/products/update
          $.ajax({
            url: "https://demos.telerik.com/kendo-ui/service/products/update",
            dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
            // send the updated data items as the "models" service parameter encoded in JSON
            data: {
              models: kendo.stringify(options.data.models)
            },
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
      dataSource.sync(); //makes request to https://demos.telerik.com/kendo-ui/service/products/update
    });
    </script>

### transport.update.cache `Boolean`

If set to `false`, the request result will not be cached by the browser. Setting `cache` to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters. By default, `"jsonp"` requests are not cached.

Refer to the [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax) documentation for further information.

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

#### Example - specify URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "https://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: function(options) {
            return "https://demos.telerik.com/kendo-ui/service/products/update"
          },
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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

#### Example - enable OData support

    <script>
    var dataSource= new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
        // make JSONP request to https://demos.telerik.com/kendo-ui/service/products/create
        create: {
          url: "https://demos.telerik.com/kendo-ui/service/products/create",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data, type) {
          if (type == "create") {
            // send the created data items as the "models" service parameter encoded in JSON
            return { models: kendo.stringify(data.models) };
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
Every item from the response is wrapped in a [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) or [`kendo.data.Model`](/api/javascript/data/model) (if the [`schema.model`](/api/javascript/data/datasource/configuration/schema.model) option is set).

If the data source is bound to a JavaScript array (via the [`data`](/api/javascript/data/datasource#configuration-data) option), the `data` method will return the items of that array.
Every item from the array is wrapped in a [`kendo.data.ObservableObject`](/api/javascript/data/observableobject) or [`kendo.data.Model`](/api/javascript/data/model) (if the [`schema.model`](/api/javascript/data/datasource/configuration/schema.model) option is set).

If the data source is grouped (via the [`group`](/api/javascript/data/datasource#configuration-group) option or the [group](/api/javascript/data/datasource/methods/group) method) and the [`serverGrouping`](/api/javascript/data/datasource#configuration-serverGrouping) is set to `true`, the `data` method will return the group items.

> The [`schema.model`](/api/javascript/data/datasource#configuration-schema.model) configuration will not be used to parse the set data items. The data should be parsed in advance and the values should be provided in the correct type - date values should be JavaScript Date objects, numeric values should be JavaScript numbers, and others.

Compare with the [`view`](/api/javascript/data/datasource/methods/view) method, which will return the data items that correspond to the current page, filter, sort and group configuration.

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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
    	      url: "https://demos.telerik.com/kendo-ui/service/products",
    	      dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
    	    }
    	  }
    	});

      // read the data items from https://demos.telerik.com/kendo-ui/service/products
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
    	      url: "https://demos.telerik.com/kendo-ui/service/products",
    	      dataType: "jsonp"
    	    }
    	  }
    	});
    
    	// read the data items from https://demos.telerik.com/kendo-ui/service/products
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

#### Parameters

##### uid `String`

The `uid` of the model to look for.

#### Returns

`kendo.data.ObservableObject`&mdash;The model instance. Returns `undefined` if a model with the specified `uid` is not found.

### group

Gets or sets the grouping configuration.

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
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
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
                url: "https://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
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
                url: "https://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            },
            update: {
                url: "https://demos.telerik.com/kendo-ui/service/products/update",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
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

> The difference between `pushUpdate` and updating items via their `set` method is that items updated via `set` are synced with the remote service.

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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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

#### Returns

`Promise`&mdash;A promise that will be resolved when all sync requests have finished successfully, or rejected if any single request fails.

#### Example - save the changes

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "https://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        destroy: {
          url: "https://demos.telerik.com/kendo-ui/service/products/destroy",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
      dataSource.sync(); // makes a request to https://demos.telerik.com/kendo-ui/service/products/update" and https://demos.telerik.com/kendo-ui/service/products/destroy
    });
    </script>

### total

Gets the total number of data items. Uses [`schema.total`](/api/javascript/data/datasource#configuration-schema.total) if the [`transport.read`](/api/javascript/data/datasource#configuration-transport.read) option is set.

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

#### Returns

`Number`&mdash;The available pages.

#### Example - get the total number of pages

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      pageSize: 1
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataSource.totalPages());   // displays "2"
    </script>

### view

Returns the data items which correspond to the **current** page, filter, sort, and group configuration. Compare with the [`data`](/api/javascript/data/datasource/methods/data) method, which will return data items from **all** pages, if **local** data binding and paging are used.

To ensure that data is available this method should be used within the [`change`](/api/javascript/data/datasource/events/change) event handler or the [`fetch`](/api/javascript/data/datasource/methods/fetch) method.

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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
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
          url: "https://demos.telerik.com/kendo-ui/service/"
        }
      }
    });
    dataSource.bind("error", dataSource_error);
    dataSource.fetch();
    </script>

### push

Fired when the data source receives a push notification or the `pushCreate`, `pushUpdate`, or `pushDestroy` methods are called.

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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
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

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

#### Example - subscribe to the sync event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        create: {
          url: "https://demos.telerik.com/kendo-ui/service/products/create",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data) {
          return { models: kendo.stringify(data.models) };
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
          url: "https://demos.telerik.com/kendo-ui/service/products/create",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data) {
          return { models: kendo.stringify(data.models) };
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
