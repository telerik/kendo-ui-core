---
title: DataSource
page_title: Configuration, methods and events of the Kendo DataSource component.
description: Easy to follow steps for DataSource component configuration, examples of supported methods and executed events.
---

# kendo.data.DataSource

## Overview

See the [DataSource Overview](/framework/datasource/overview) and [Basic Usage](/framework/datasource/basic-usage) for an introduction to DataSource.

## Configuration

### aggregate `Array`

The aggregate(s) which are calculated when the data source populates with data. The supported aggregates are "average", "count", "max", "min" and "sum".

> The data source calculates aggregates client-side unless the [serverAggregates](#configuration-serverAggregates) option is set to `true`.

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
      console.log(results.sum, results.min, results.max); // displays "63 30 33"
    });
    </script>

### aggregate.aggregate `String`

The name of the aggregate function. The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - specify aggregate function

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
      console.log(results.sum); // displays "63"
    });
    </script>

### aggregate.field `String`

The data item field which will be used to calculate the aggregates.

#### Example - specify aggregate field

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
      console.log(results.sum); // displays "63"
    });
    </script>

### autoSync `Boolean` *(default: false)*

If set to `true` the data source would automatically save any changed data items by calling the [sync](#methods-sync) method. By default changes are not automatically saved.

#### Example - enable auto sync
    <script>
    var dataSource = new kendo.data.DataSource({
      autoSync: true,
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "http://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.fetch(function() {
      var product = dataSource.at(0);
      product.set("UnitPrice", 20); // auto-syncs and makes request to http://demos.telerik.com/kendo-ui/service/products/update
    });
    </script>

### batch `Boolean` *(default: false)*

If set to `true` the data source will batch CRUD operation requests. For example updating two data items would cause one HTTP request instead of two. By default the data source
makes a HTTP request for every CRUD operation.

> The changed data items are sent by default as `models`. This can be changed via the [parameterMap](#configuration-transport.parameterMap) option.

#### Example - enable batch mode
    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
      dataSource.sync(); // causes only one request to "http://demos.telerik.com/kendo-ui/service/products/update"
    });
    </script>

### data `Array|String`

The array of data items which the data source contains. The data source will wrap those items as [kendo.data.ObservableObject](/api/javascript/data/observableobject) or [kendo.data.Model](/api/javascript/data/model) (if [schema.model](#configuration-schema-model) is set).

Can be set to a string value if the [schema.type](#configuration-schema.type) option is set to "xml".

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
      console.log(books[0].title); // displays "Secrets of the JavaScript Ninja"
    });
    </script>

### filter `Array|Object`

The filter(s) which is (are) applied over the data items. By default no filter is applied.

> The data source filters the data items client-side unless the [serverFiltering](#configuration-serverFiltering) option is set to `true`.

#### Example - set a single filter
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
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

#### Example - set filter as conjunction (and)
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Tea", category: "Beverages" },
        { name: "Coffee", category: "Beverages" },
        { name: "Ham", category: "Food" }
      ],
      filter: [
        // leave data items which are "Beverage" and not "Coffee"
        { field: "category", operator: "eq", value: "Beverages" },
        { field: "name", operator: "neq", value: "Coffee" }
      ]
    });
    dataSource.fetch(function(){
      var view = dataSource.view();
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Tea"
    });
    </script>

#### Example - set filter as disjunction (or)
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
      console.log(view.length); // displays "2"
      console.log(view[0].name); // displays "Tea"
      console.log(view[1].name); // displays "Ham"
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
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.filters `Array`

The nested filter expressions. Suppor the same options as [filter](#configuration-filter). Filters can be nested indefinitely.

#### Example - nested filters

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
      console.log(view.length); // displays "2"
      console.log(view[0].name); // displays "Tea"
      console.log(view[1].name); // displays "Ham"
    });
    </script>


### filter.logic `String`

The logical operation to use when the `filter.filters` option is set. The supported values are "and" and "or".

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
      console.log(view.length); // displays "2"
      console.log(view[0].name); // displays "Tea"
      console.log(view[1].name); // displays "Ham"
    });
    </script>

### filter.operator `String`

The filter operator (comparison). The supported operators are: "eq" (equal to), "neq" (not equal to), "isnull" (is equal to null), "isnotnull" (is not equal to null), "lt" (less than), "lte" (less than or equal to), "gt" (greater than), "gte" (greater than or equal to),
"startswith", "endswith", "contains", "isempty", "isnotempty". The last five are supported only for string fields.

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
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### filter.value `Object`

The value to which the [field](#configuration-filter.field) is compared. The value must be from the same type as the field.

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
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Jane Doe"
    });
    </script>

### group `Array|Object`

The grouping configuration of the data source. If set the data items will be grouped when the data source is populated. By default grouping is not applied.

> The data source groups the data items client-side unless the [serverGrouping](#configuration-serverGrouping) option is set to `true`.

#### Example - set group as an object
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
      console.log(view.length); // displays "2"
      var beverages = view[0];
      console.log(beverages.value); // displays "Beverages"
      console.log(beverages.items[0].name); // displays "Tea"
      console.log(beverages.items[1].name); // displays "Coffee"
      var food = view[1];
      console.log(food.value); // displays "Food"
      console.log(food.items[0].name); // displays "Ham"
    });
    </script>

#### Example - set group as an array (subgroups)
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
      console.log(view.length); // displays "1"
      var food = view[0];
      console.log(food.value); // displays "Food"
      var meat = food.items[0];
      console.log(meat.value); // displays "Meat"
      console.log(meat.items.length); // displays "2"
      console.log(meat.items[0].name); // displays "Pork"
      console.log(meat.items[1].name); // displays "Beef"
      var vegetables = food.items[1];
      console.log(vegetables.value); // displays "Vegetables"
      console.log(vegetables.items.length); // displays "1"
      console.log(vegetables.items[0].name); // displays "Pepper"
    });
    </script>

### group.aggregates `Array`

The aggregate(s) which are calculated during grouping. The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - set group aggregates
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
      console.log(beverages.aggregates.price.max); // displays "2"
      console.log(beverages.aggregates.price.min); // displays "1"
      var food = view[1];
      console.log(food.aggregates.price.max); // displays "3"
      console.log(food.aggregates.price.min); // displays "3"
    });
    </script>

### group.aggregates.aggregate `String`

The name of the aggregate function. Specifies the aggregate function. The supported aggregates are "average", "count", "max", "min" and "sum".

#### Example - specify aggregate function
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
      console.log(beverages.aggregates.price.max); // displays "2"
    });
    </script>

### group.aggregates.field `String`

The data item field which will be used to calculate the aggregates.

#### Example - specify aggregate field

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
      console.log(beverages.aggregates.price.max); // displays "2"
    });
    </script>

### group.dir `String` *(default: "asc")*

The sort order of the group. The supported values are "asc" (ascending order) and "desc" (descending order). The default sort order is ascending.

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
      console.log(food.value); // displays "Food"
      var beverages = view[1];
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
      console.log(beverages.items[0].name); // displays "Tea"
      console.log(beverages.items[1].name); // displays "Coffee"
      var food = view[1];
      console.log(food.items[0].name); // displays "Ham"
    });
    </script>

### offlineStorage `String|Object`

The offline storage key or custom offline storage implementation.

#### Example - set offline storage key
    <script>
    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });
    </script>

#### Example - set custom offline storage implementation
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
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            }
        }
    });
    </script>

### page `Number`

The page of data which the data source will return when the [view](#methods-view) method is invoked or request from the remote service.

> The data source will page the data items client-side unless the [serverPaging](#configuration-serverPaging) option is set to `true`.

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
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Ham"
    });
    </script>

### pageSize `Number`

The number of data items per page.

> The data source will page the data items client-side unless the [serverPaging](#configuration-serverPaging) option is set to `true`.

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
      console.log(view.length); // displays "2"
      console.log(view[0].name); // displays "Tea"
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
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "html5" } // search for tweets that contain "html5"
        }
      },
      schema: {
        data: function(response) {
          return response.results; // twitter's response is { "results": [ /* results */ ] }
        }
      }
    });
    dataSource.fetch(function(){
      var data = this.data();
      console.log(data.length);
    });
    </script>

### schema.aggregates `Function|String`

The field from the response which contains the aggregate results. Can be set to a function which is called to
return the aggregate results from the response.

> The `aggregates` option is used only when the [serverAggregates](#configuration-serverAggregates) option is set to `true`.

The result of the function should be a JavaScript object which contains the aggregate results for every fields in the following format:

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

For example if the data source is configured like this:

```pseudo
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
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

#### Example - set aggregates as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      }
      serverAggregates: true,
      schema: {
        aggregates: "aggregates" // aggregate results are returned in the "aggregates" field of the response
      }
    });
    </script>

#### Example - set aggregates as a function

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

The field from the server response which contains the data items. Can be set to a function which is called to
return the data items for the response.

#### Returns

`Array` The data items from the response.

#### Example - specify the field which contains the data items as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
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
      console.log(data.length);
    });
    </script>

#### Example - specify the field which contains the data items as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
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
      console.log(data.length);
    });
    </script>

### schema.errors `Function|String` *(default: "errors")*

The field from the server response which contains server-side errors. Can be set to a function which is called to
return the errors for response. If there are any errors the [error](#events-error) event will be fired.

#### Example - specify the error field as a string
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "#" }
        }
      },
      schema: {
        errors: "error" // twitter's response is { "error": "Invalid query" }
      },
      error: function(e) {
        console.log(e.errors); // displays "Invalid query"
      }
    });
    dataSource.fetch();
    </script>

#### Example - specify the error field as a function
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: { q: "#" }
        }
      },
      schema: {
        errors: function(response) {
          return response.error; // twitter's response is { "error": "Invalid query" }
        }
      },
      error: function(e) {
        console.log(e.errors); // displays "Invalid query"
      }
    });
    dataSource.fetch();
    </script>

### schema.groups `Function|String`

The field from the server response which contains the groups. Can be set to a function which is called to
return the groups from the response.

> The `groups` option is used only when the [serverGrouping](#configuration-serverGrouping) option is set to `true`.

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

#### Example - set groups as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
      serverGrouping: true,
      schema: {
        groups: "groups" // groups are returned in the "groups" field of the response
      }
    });
    </script>

#### Example - set groups as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        /* transport configuration */
      },
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

If set to an object the [Model.define](/api/javascript/data/model#model.define) method will be used to initialize the data source model.

If set to an existing [kendo.data.Model](/api/javascript/data/model) instance the data source will use that instance and will **not** initialize a new one.

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
              //data type of the field {Number|String|Boolean|Date} default is String
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

#### Example - set the model as an existing kendo.data.Model instance

    <script>
    var Product = kendo.model.define({
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
          //data type of the field {Number|String|Boolean|Date} default is String
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

#### Example - data projection

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
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
      console.log(product.name); // displays "Chai"
    });
    </script>

### schema.total `Function|String`

The field from the server response which contains the total number of data items. Can be set to a function which is called to
return the total number of data items for the response.

> The `schema.total` setting may be omitted when the Grid is bound to a plain `Array` (i.e. the data items' collection is not a value of a field in the server response).
In this case, the `length` of the response `Array` will be used.

> `schema.total` must be set if the [serverPaging](#configuration-serverPaging) option is set to `true`.

#### Returns

`Number` The total number of data items.

#### Example: set total as a string

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

#### Example: set total as a function

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

The type of the response. The supported values are "xml" and "json". By default the schema interprets the server response as JSON.

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
      console.log(books[0].title); // displays "Secrets of the JavaScript Ninja"
    });
    </script>

### serverAggregates `Boolean` *(default: false)*

If set to `true` the data source will leave the aggregate calculation to the remote service. By default the data source calculates aggregates client-side.

> Don't forget to set [schema.aggregates](#configuration-schema.aggregates) if you set `serverAggregates` to `true`.

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

If set to `true` the data source will leave the filtering implementation to the remote service. By default the data source performs filtering client-side.

By default the [filter](#configuration-filter) is sent to the server following jQuery's [conventions](http://api.jquery.com/jQuery.param/).

For example the filter `{ logic: "and", filters: [ { field: "name", operator: "startswith", value: "Jane" } ] }` is sent as:

*   filter[logic]: and
*   filter[filters][0][field]: name
*   filter[filters][0][operator]: startswith
*   filter[filters][0][value]: Jane

Use the [parameterMap](#configuration-transport.parameterMap) option to send the filter option in a different format.

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

If set to `true` the data source will leave the grouping implementation to the remote service. By default the data source performs grouping client-side.

By default the [group](#configuration-group) is sent to the server following jQuery's [conventions](http://api.jquery.com/jQuery.param/).

For example the group `{ field: "category", dir: "desc" }` is sent as:

*   group[0][field]: category
*   group[0][dir]: desc


Use the [parameterMap](#configuration-transport.parameterMap) option to send the group option in a different format.

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

If set to `true` the data source will leave the data item paging implementation to the remote service. By default the data source performs paging client-side.

> Don't forget to set [schema.total](#configuration-schema.total) if you set `serverPaging` to `true`.

The following options are sent to the server when server paging is enabled:

- page - the page of data item to return (`1` means the first page)
- pageSize - the number of items to return
- skip - how many data items to skip
- take - the number of data items to return (the same as `pageSize`)

Use the [parameterMap](#configuration-transport.parameterMap) option to send the paging options in a different format.

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

If set to `true` the data source will leave the data item sorting implementation to the remote service. By default the data source performs sorting client-side.

By default the [sort](#configuration-sort) is sent to the server following jQuery's [conventions](http://api.jquery.com/jQuery.param/).

For example the sort `{ field: "age", dir: "desc" }` is sent as:

*   sort[0][field]: age
*   sort[0][dir]: desc

Use the [parameterMap](#configuration-transport.parameterMap) option to send the paging options in a different format.

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

The sort order which will be applied over the data items. By default the data items are not sorted.

> The data source sorts the data items client-side unless the [serverSorting](#configuration-serverSorting) option is set to `true`.

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
      console.log(data[1].name); // displays "Coffee"
    });
    </script>

### sort.dir `String`

The sort order (direction). The supported values are "asc" (ascending order) and "desc" (descending order).

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
      console.log(data[0].age); // displays "33"
    });
    </script>

### transport `Object`

The configuration used to load and save the data items. A data source is remote or local based on the way of it retrieves data items.

Remote data sources load and save data items from and to a remote end-point (a.k.a. remote service or server). The `transport` option describes the remote service configuration - URL, HTTP verb, HTTP headers etc.
The `transport` option can also be used to implement custom data loading and saving.

Local data sources are bound to a JavaScript array via the [data](#configuration-data) option.

#### Example - specify the remote service configuration

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      }
    });
    dataSource.fetch(function() {
      var products = dataSource.data();
      console.log(products[0].ProductName); // displays "Chai"
    });
    </script>

### transport.create `Object|String|Function`

The configuration used when the data source saves newly created data items. Those are items added to the data source via the [add](#methods-add) or [insert](#methods-insert) methods.

> The data source uses [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) to make a HTTP request to the remote service. The value configured via `transport.create` is passed to [`jQuery.ajax`](http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings). This means that you can set
all options supported by `jQuery.ajax` via `transport.create` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.create` is a function, the data source invokes that function instead of `jQuery.ajax`. Check [the jQuery documentation](http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings) for more details on the provided argument.

If the value of `transport.create` is a string the data source uses this string as the URL of the remote service.

> *Important:* The remote service must return the inserted data items and the data item field configured as the `id` must be set. For example
if the `id` of the data item is `ProductID` the "create" server response must be `[{ "ProductID": 79 }]`.

> All transport actions (read, update, create, destroy) must be defined in the same way, e.g. as functions or as objects. Mixing the different configuration alternatives is not possible.

#### Example - set the create remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/create
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/products/create",
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
          // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/create
          $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/products/create",
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

If set to `false` the request result will not be cached by the browser. Setting cache to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters.
By default "jsonp" requests are not cached.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - set content type
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

Additional parameters which are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for
[sorting](#configuration-serverSorting), [filtering](#configuration-serverFiltering), [paging](#configuration-serverPaging) and [grouping](#configuration-serverGrouping).

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of result expected from the server. Commonly used values are "json" and "jsonp".

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".

> The `type` option is ignored if `dataType` is set to "jsonp". JSONP always uses GET requests.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

If set to function the data source will invoke it and use the result as the URL.

#### Example - specify URL as a string
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/products/create",
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

#### Example - specify URL as a function
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: function(options) {
            return "http://demos.telerik.com/kendo-ui/service/products/create"
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

The configuration used when the data source destroys data items. Those are items removed from the data source via the [remove](#methods-remove) method.

> The data source uses [jQuery.ajax](http://api.jquery.com/jQuery.ajax) to make a HTTP request to the remote service. The value configured via `transport.destroy` is passed to `jQuery.ajax`. This means that you can set
all options supported by `jQuery.ajax` via `transport.destroy` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.destroy` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.destroy` is a string the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, e.g. as functions or as objects. Mixing the different configuration alternatives is not possible.

#### Example - set the destroy remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        },
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/destroy
        destroy: {
          url: "http://demos.telerik.com/kendo-ui/service/products/destroy",
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
            url: "http://demos.telerik.com/kendo-ui/service/products",
            dataType: "jsonp",
            success: function(result) {
              options.success(result);
            }
          });
        },
        destroy: function (options) {
          // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/destroy
          $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/products/destroy",
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

If set to `false` the request result will not be cached by the browser. Setting cache to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters.
By default "jsonp" requests are not cached.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - set content type
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

Additional parameters which are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for
[sorting](#configuration-serverSorting), [filtering](#configuration-serverFiltering), [paging](#configuration-serverPaging) and [grouping](#configuration-serverGrouping).

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of result expected from the server. Commonly used values are "json" and "jsonp".

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".

> The `type` option is ignored if `dataType` is set to "jsonp". JSONP always uses GET requests.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

If set to function the data source will invoke it and use the result as the URL.

#### Example - specify URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        },
        destroy: {
          url: "http://demos.telerik.com/kendo-ui/service/products/destroy",
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

#### Example - specify URL as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        },
        destroy: {
          url: function (options) {
            return "http://demos.telerik.com/kendo-ui/service/products/destroy",
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

The function which converts the request parameters to a format suitable for the remote service. By default
the data source sends the parameters using jQuery's [conventions](http://api.jquery.com/jQuery.param/).

> The `parameterMap` method is often used to encode the parameters in JSON format.

> **Important:** The `parameterMap` function will not be called when using custom functions for the read, update, create and destroy operations.

#### Parameters

##### data `Object`

The parameters which will be sent to the remote service. The value specified in the `data` field of the transport settings (create, read, update or destroy) is included as well.
If [batch](#batch-boolean-default) is set to `false` the fields of the changed data items are also included.

##### data.aggregate `Array`

The current aggregate configuration as set via the [aggregate](#configuration-aggregate) option.
Available  if the [serverAggregates](#configuration-serverAggregates) option is set to `true` and the data source makes a "read" request.

##### data.group `Array`

The current grouping configuration as set via the [group](#configuration-group) option.
Available  if the [serverGrouping](#configuration-serverGrouping) option is set to `true` and the data source makes a "read" request.

##### data.filter `Object`

The current filter configuration as set via the [filter](#configuration-filter) option.
Available  if the [serverFiltering](#configuration-serverFiltering) option is set to `true` and the data source makes a "read" request.

##### data.models `Array`

All changed data items. Available  if there are any data item changes and the [batch](#configuration-batch) option is set to `true`.

##### data.page `Number`

The current page. Available if the [serverPaging](#configuration-serverPaging) option is set to `true` and the data source makes a "read" request.

##### data.pageSize `Number`

The current page size as set via the [pageSize](#configuration-pageSize) option. Available if the [serverPaging](#configuration-serverPaging) option is set to `true` and the data source makes a "read" request.

##### data.skip `Number`

The number of data items to skip. Available if the [serverPaging](#configuration-serverPaging) option is set to `true` and the data source makes a "read" request.

##### data.sort `Array`

The current sort configuration as set via the [sort](#configuration-sort) option. Available if the [serverSorting](#configuration-serverSorting) option is set to `true` and the data source makes a "read" request.

##### data.take `Number`

The number of data items to return (the same as `data.pageSize`). Available if the [serverPaging](#configuration-serverPaging) option is set to `true` and the data source makes a "read" request.

##### type `String`

The type of the request which the data source makes. The supported values are "create", "read", "update" and "destroy".

#### Returns

`Object` the request parameters converted to a format required by the remote service.

#### Example - convert data source request parameters

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders?$format=json",
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
      console.log(dataSource.view().length); // displays "20"
    });
    </script>


#### Example - send request parameters as JSON

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/products/create",
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

The function invoked during transport initialization which sets up push notifications. The data source will call this function only once and provide
callbacks which will handle push notifications (data pushed from the server).

#### Parameters

##### callbacks `Object`

An object containing callbacks for notifying the data source of push notifications.

##### callbacks.pushCreate `Function`

Function that should be invoked to notify the data source about newly created data items that are pushed from the server. Accepts a single argument - the object pushed from the server
which should follow the `schema.data` configuration.

##### callbacks.pushDestroy `Function`

Function that should be invoked to notify the data source about destroyed data items that are pushed from the server. Accepts a single argument - the object pushed from the server
which should follow the `schema.data` configuration.

##### callbacks.pushUpdate `Function`

Function that should be invoked to notify the data source about updated data items that are pushed from the server. Accepts a single argument - the object pushed from the server
which should follow the `schema.data` configuration.

#### Example

    <script src="http://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-1.1.3.min.js"></script>
    <script>
    var hubUrl = "http://demos.telerik.com/kendo-ui/service/signalr/hubs";
    var connection = $.hubConnection(hubUrl, { useDefaultPath: false});
    var hub = connection.createHubProxy("productHub");
    var hubStart = connection.start({ jsonp: true });
    var dataSource = new kendo.data.DataSource({
    transport: {
      push: function(callbacks) {
        hub.on("create", function(result) {
          console.log("push create");
          callbacks.pushCreate(result);
        });
        hub.on("update", function(result) {
          console.log("push update");
          callbacks.pushUpdate(result);
        });
        hub.on("destroy", function(result) {
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

> The data source uses [jQuery.ajax](http://api.jquery.com/jQuery.ajax) to make a HTTP request to the remote service. The value configured via `transport.read` is passed to `jQuery.ajax`. This means that you can set
all options supported by `jQuery.ajax` via `transport.read` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.read` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.read` is a string the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, e.g. as functions or as objects. Mixing the different configuration alternatives is not possible.

#### Example - set the read remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      }
    });
    dataSource.fetch(function() {
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

#### Example - send additional parameters to the remote service
    <input value="html5" id="search" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: {
            q: $("#search").val() // send the value of the #search input to the remote service
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
          // make JSONP request to http://demos.telerik.com/kendo-ui/service/products
          $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/products",
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
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

### transport.read.cache `Boolean`

If set to `false` the request result will not be cached by the browser. Setting cache to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters.
By default "jsonp" requests are not cached.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - set content type
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

### transport.read.data `Object|Function`

Additional parameters which are sent to the remote service. The parameter names must not match reserved words, which are used by the Kendo UI DataSource for
[sorting](#configuration-serverSorting), [filtering](#configuration-serverFiltering), [paging](#configuration-serverPaging) and [grouping](#configuration-serverGrouping).

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

#### Example - send additional parameters as an object

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: {
            q: "html5" // send "html5" as the "q" parameter
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
          url: "http://demos.telerik.com/kendo-ui/service/twitter/search",
          dataType: "jsonp", // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
          data: function() {
            return {
              q: "html5" // send "html5" as the "q" parameter
            };
          }
        }
      }
    });
    dataSource.fetch();
    </script>

### transport.read.dataType `String`

The type of result expected from the server. Commonly used values are "json" and "jsonp".

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".

> The `type` option is ignored if `dataType` is set to "jsonp". JSONP always uses GET requests.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

If set to function the data source will invoke it and use the result as the URL.

#### Example - specify URL as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      }
    });
    dataSource.fetch(function() {
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

#### Example - specify URL as a function

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: function(options) {
            return "http://demos.telerik.com/kendo-ui/service/products",
          }
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      }
    });
    dataSource.fetch(function() {
      console.log(dataSource.view().length); // displays "77"
    });
    </script>

### transport.signalr `Object`

The configuration used when [type](#configuration-type) is set to "signalr". Configures the SignalR settings - hub, connection promise, server and client hub methods.

Live demo available at [demos.telerik.com/kendo-ui](http://demos.telerik.com/kendo-ui/grid/signalr).

It is recommended to familiarize with the SignalR [JavaScript API](http://www.asp.net/signalr/overview/guide-to-the-api/hubs-api-guide-javascript-client).

#### Example

    <script src="http://ajax.aspnetcdn.com/ajax/signalr/jquery.signalr-1.1.3.min.js"></script>
    <script>
        var hubUrl = "http://demos.telerik.com/kendo-ui/service/signalr/hubs";
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

The SignalR hub object returned by the `createHubProxy` method. The `hub` option is mandatory.

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

### transport.update `Object|String|Function`

The configuration used when the data source saves updated data items. Those are data items whose fields have been updated.

> The data source uses [jQuery.ajax](http://api.jquery.com/jQuery.ajax) to make a HTTP request to the remote service. The value configured via `transport.update` is passed to `jQuery.ajax`. This means that you can set
all options supported by `jQuery.ajax` via `transport.update` except the `success` and `error` callback functions which are used by the transport.

If the value of `transport.update` is a function, the data source invokes that function instead of `jQuery.ajax`.

If the value of `transport.update` is a string the data source uses this string as the URL of the remote service.

> All transport actions (read, update, create, destroy) must be defined in the same way, e.g. as functions or as objects. Mixing the different configuration alternatives is not possible.

#### Example - specify update as a string

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
      dataSource.sync(); makes request to http://demos.telerik.com/kendo-ui/service/products/update
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
          // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/update
          $.ajax({
            url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
      dataSource.sync(); makes request to http://demos.telerik.com/kendo-ui/service/products/update
    });
    </script>

### transport.update.cache `Boolean`

If set to `false` the request result will not be cached by the browser. Setting cache to `false` will only work correctly with HEAD and GET requests. It works by appending *"_={timestamp}"* to the GET parameters.
By default "jsonp" requests are not cached.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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
[sorting](#configuration-serverSorting), [filtering](#configuration-serverFiltering), [paging](#configuration-serverPaging) and [grouping](#configuration-serverGrouping).

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of result expected from the server. Commonly used values are "json" and "jsonp".

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

The type of request to make ("POST", "GET", "PUT" or "DELETE"), default is "GET".

> The `type` option is ignored if `dataType` is set to "jsonp". JSONP always uses GET requests.

Refer to the [jQuery.ajax](http://api.jquery.com/jQuery.ajax) documentation for further info.

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

If set to function the data source will invoke it and use the result as the URL.

#### Example - specify URL as a string
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: function(options) {
            return "http://demos.telerik.com/kendo-ui/service/products/update",
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

If set the data source will use a predefined [transport](#configuration-transport) and/or [schema](#configuration-schema).
The supported values are "odata" which supports the [OData](http://www.odata.org) v.2 protocol, "odata-v4" which [partially supports](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/odata-v4-web-api-binding)
odata version 4 and "signalr".

#### Example - enable OData support

    <script>
    var dataSource= new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
      },
      pageSize: 20,
      serverPaging: true
    });
    dataSource.fetch(function() {
      console.log(dataSource.view().length); // displays "20"
    });
    </script>

## Methods

### add

Appends a data item to the data source.

#### Parameters

##### model `Object|kendo.data.Model`

Either a [kendo.data.Model](/api/javascript/data/model) instance or JavaScript object containing the data item field values.

#### Returns

`kendo.data.Model` the data item which is inserted.

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
    console.log(lastItem.name); // displays "John Doe"
    console.log(lastItem.age); // displays "33"
    </script>

#### Example - add a data item to a remote data source

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        // make JSONP request to http://demos.telerik.com/kendo-ui/service/products/create
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/products/create",
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

The aggregate configuration. Accepts the same values as the [aggregate](#configuration-aggregate) option.

#### Returns

`Array` the current aggregate configuration.

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
    console.log(ageAggregates.min); // displays "30"
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
    console.log(kendo.stringify(aggregates[0])); // displays {"aggregate": "min", "field": "age"}
    </script>

### aggregates

Returns the aggregate results.

#### Returns

`Object` the aggregate results. There is a key for every aggregated field.

#### Example - get aggregate results

    <script>
    var dataSource= new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      aggregate: [
        { field: "age", aggregate: "min" },
        { field: "name", aggregate: "max" }
      ]
    });
    dataSource.read();
    var ageAggregates = dataSource.aggregates().age;
    console.log(ageAggregates.min); // displays "30"
    console.log(ageAggregates.max); // displays "33"
    </script>

### at

Returns the data item at the specified index. The index is zero-based.

#### Parameters

##### index `Number`

The zero-based index of the data item.

#### Returns

`kendo.data.ObservableObject` the data item at the specified index. Returns `undefined` if a data item is not found at the specified index.
Returns a `kendo.data.Model` instance if the [schema.model](#configuration-schema.model) option is set.

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
      console.log(dataItem.name); // displays "Jane Doe"
      var dataItemWhichDoesNotExist = dataSource.at(3);
      console.log(dataItemWhichDoesNotExist); // displays "undefined"
    });
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed and updated data items are restored to their initial state.

> Note that change event will be triggered only when all changes are reverted and will not be triggered when reverting changes for a single model instance.

#### Parameters

##### model `kendo.data.Model`

The optional data item (model). If specified only the changes of this data item will be discarded. If omitted all changes will be discarded.

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
      console.log(dataItem.name); // displays "Jane Doe"
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
      console.log(dataItem.name); // displays "Jane Doe"
      console.log(dataSource.data().length); // displays "2"
    });
    </script>

### data

Gets or sets the data items of the data source.

If the data source is bound to a remote service (via the [transport](#configuration-transport) option) the `data` method will return the service response.
Every item from the response is wrapped in a [kendo.data.ObservableObject](/api/javascript/data/observableobject) or [kendo.data.Model](/api/javascript/data/model) (if the [schema.model](#configuration-schema.model) option is set).

If the data source is bound to a JavaScript array (via the [data](#configuration-data) option) the `data` method will return the items of that array.
Every item from the array is wrapped in a [kendo.data.ObservableObject](/api/javascript/data/observableobject) or [kendo.data.Model](/api/javascript/data/model) (if the [schema.model](#configuration-schema.model) option is set).

If the data source is grouped (via the [group](#configuration-group) option or the [group](#methods-group) method) and the [serverGrouping](#configuration-serverGrouping) is set to `true`
the `data` method will return the group items.

> The [schema.model](#configuration-schema.model) configuration will not be used to parse the set data items. The data should be parsed in advance.

Compare with the [`view`](#methods-view) method, which will return the data items that correspond to the current page, filter, sort and group configuration.

#### Parameters

##### value `Array|kendo.data.ObservableArray`

The data items which will replace the current ones in the data source. If omitted the current data items will be returned.

#### Returns

`kendo.data.ObservableArray` the data items of the data source. Returns empty array if the data source hasn't been populated with data items via the [read](#methods-read), [fetch](#methods-fetch) or [query](#methods-query) methods.

#### Example - get the data items when bound to array

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ]
    });
    dataSource.fetch(function(){
      var data = dataSource.data();
      console.log(data.length);  // displays "2"
      console.log(data[0].name); // displays "Jane Doe"
      console.log(data[1].name); // displays "John Doe"
    });
    </script>

#### Example - get the data items when bound to a remote service
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      }
    });
    dataSource.fetch(function(){
      var data = dataSource.data();
      console.log(data.length);  // displays "77"
      console.log(data[0].ProductName); // displays "Chai"
    });
    </script>

#### Example - set the data items
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe" }
      ]
    });
    dataSource.fetch(function(){
      dataSource.data([ { name: "John Doe" } ]);
      var data = dataSource.data();
      console.log(data[0].name); // displays "John Doe"
    });
    </script>

### fetch

Reads the data items from a remote service (if the [transport](#configuration-transport) option is set) or from a JavaScript array (if the [data](#configuration-data) option is set).

> The `fetch` method makes a request to the remote service only the first time it is called if the dataSource is not configured for server operations.

#### Parameters

##### callback `Function` *(optional)*

The optional function which is executed when the remote request is finished.  The function context (available via the `this` keyword) will be set to the data source instance.

#### Returns

`Promise` A promise that will be resolved when the data has been loaded, or rejected if an HTTP error occurs.

#### Example - read data from a remote data source

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      }
    });
    // read the data items from http://demos.telerik.com/kendo-ui/service/products
    dataSource.fetch(function(){
      var data = this.data();
      console.log(data.length);  // displays "77"
      console.log(data[0].ProductName); // displays "Chai"
    });
    </script>

#### Example - use the Promise API to track when a request finishes

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });

    // read the data items from http://demos.telerik.com/kendo-ui/service/products
    dataSource.fetch().then(function(){
      var data = dataSource.data();
      console.log(data.length);  // displays "77"
      console.log(data[0].ProductName); // displays "Chai"
    });
    </script>

### filter

Gets or sets the filter configuration.

#### Parameters

##### value `Object` *(optional)*

The filter configuration. Accepts the same values as the [filter](#configuration-filter) option (**check there for more examples**).

#### Returns

`Object` the current filter configuration. Returns `null` if no filter criteria are currently applied. Returns `undefined` if the DataSource instance has not performed filtering so far.

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
    console.log(view.length);
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
    console.log(filter.logic);  // displays "and"
    console.log(filter.filters[0]); //displays '{field: "name", operator: "startswith", value: "Jane"}'
    </script>

### get

Gets the data item (model) with the specified [id](/api/javascript/data/model#fields-id).

> The `get` method requires the [schema.model](#configuration-schema.model) option to be set and the `id` of the model to be specified.

#### Parameters

##### id `Number|String`

The id of the model to look for.

#### Returns

`kendo.data.Model` the model instance. Returns `undefined` if a model with the specified id is not found.

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
      console.log(dataItem.name); // displays "Jane Doe"
    });
    </script>

### getByUid

Gets the data item (model) with the specified [uid](/api/javascript/data/model#fields-uid).

#### Parameters

##### uid `String`

The uid of the model to look for.

#### Returns

`kendo.data.ObservableObject` the model instance. Returns `undefined` if a model with the specified uid is not found.

### group

Gets or sets the grouping configuration.

#### Parameters

##### value `Object|Array`

The grouping configuration. Accepts the same values as the [group](#configuration-group) option.

#### Returns

`Array` the current grouping configuration.

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
    console.log(view.length); // displays "2"
    var beverages = view[0];
    console.log(beverages.value); // displays "Beverages"
    console.log(beverages.items[0].name); // displays "Tea"
    console.log(beverages.items[1].name); // displays "Coffee"
    var food = view[1];
    console.log(food.value); // displays "Food"
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
    console.log(groups.length); // displays "1"
    console.log(groups[0].field); // displays "category"
    </script>

### hasChanges `Boolean`

Checks if the data items have changed.

#### Returns

`Boolean` returns `true` if the data items have changed. Otherwise, `false`.

#### Example - check if the data source has changes

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
      console.log(dataSource.hasChanges()); // displays "false"
      dataSource.add({ name: "John Doe" });
      console.log(dataSource.hasChanges()); // displays "true"
    });
    </script>

### indexOf

Gets the index of the specified data item.

#### Parameters

##### dataItem `kendo.data.ObservableObject`

The target data item.

#### Returns

`Number` the index of the specified data item. Returns `-1` if the data item is not found.

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
      console.log(index); // displays "0"
    });
    </script>

### insert

Inserts a data item in the data source at the specified index.

#### Parameters

##### index `Number`

The zero-based index at which the data item will be inserted.

##### model `Object|kendo.data.ObservableObject|kendo.data.Model`

Either a [kendo.data.Model](/api/javascript/data/model) instance or JavaScript object containing the field values.

#### Returns

`kendo.data.Model` the data item which is inserted.

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
      console.log(index); // displays "0"
    });
    </script>

### online

Gets or sets the online state of the data source.

#### Parameters

##### value `Boolean`

The online state - `true` for online, `false` for offline.

#### Returns

`Boolean` the current online state - `true` if online; otherwise `false`.

#### Example - set the online state

    var dataSource = kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
                url: "http://demos.telerik.com/kendo-ui/service/products",
                type: "jsonp"
            },
            update: {
                url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
    console.log(dataSource.online()); // displays "false"


### offlineData

Gets or sets the offline state of the data source.

#### Parameters

##### data `Array`

The array of data items that replace the current offline state of the data source.

#### Returns

`Array` array of JavaScript objects that represent the data items. Changed data items have a `__state__` field attached. That field indicates the type of change: "create", "update" or "destroy". Unmodified data items don't have a `__state__` field.

#### Example - get the offline state

    <script>
    var dataSource = new kendo.data.DataSource({
        offlineStorage: "products-offline",
        transport: {
            read: {
                url: "http://demos.telerik.com/kendo-ui/service/products",
                dataType: "jsonp"
            },
            update: {
                url: "http://demos.telerik.com/kendo-ui/service/products/update",
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
        console.log(offlineData[0].__state__); // displays "update"
    });
    </script>

### page

Gets or sets the current page.

#### Parameters

##### page `Number`

The new page.

#### Returns

`Number` the current page.

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
    console.log(dataSource.page()); // displays "2"
    </script>

### pageSize

Gets or sets the current page size.

#### Parameters

##### size `Number`

The new page size.

#### Returns

`Number` the current page size.

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
    console.log(dataSource.pageSize()); // displays "1"
    </script>

### pushCreate

Appends the specified data item(s) to the data source without marking them as "new". The data source will not sync data items appended via `pushCreate`.

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
    console.log(dataSource.at(0).name); // displays "John Doe"
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
    console.log(dataSource.at(1).name); // displays "Jane Doe"
    console.log(dataSource.at(1).isNew()); // displays "false"
    </script>

### pushDestroy

Removes the specified data item(s) from the data source without marking them as "removed". The data source will not sync data items appended via `pushDestroy`.

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
    console.log(dataSource.total()); // displays "0"
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
    console.log(dataSource.total()); // displays "0"
    console.log(dataSource.hasChanges()); // displays "false"
    </script>

### pushUpdate

Updates the specified data item(s) without marking them as "dirty". The data source will not sync data items appended via `pushUpdate`.
If the data items are not found (using `schema.model.id`) they will be appended.

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
    console.log(dataSource.at(0).name); // displays "Jane Doe"
    console.log(dataSource.at(0).dirty); // displays "false"
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
    console.log(dataSource.at(0).name); // displays "John"
    console.log(dataSource.at(0).dirty); // displays "false"
    console.log(dataSource.hasChanges()); // displays "false"
    </script>

### query

Executes the specified query over the data items. Makes a HTTP request if bound to a remote service.

This method is useful when you need to modify several parameters of the data request at the same time (e.g. filtering and sorting).
If you execute `filter()` and then `sort()`, the DataSource will make two separate requests. With `query()`, it will make one request.

#### Parameters

##### options `Object` *(optional)*

The query options which should be applied.

##### options.aggregate `Array` *(optional)*

The aggregate configuration. Accepts the same values as the [aggregate](#configuration-aggregate) option.
The `query` method will request the remote service if the [serverAggregates](#configuration-serverAggregates)
option is set to `true`.

##### options.filter `Object|Array` *(optional)*

The filter configuration. Accepts the same values as the [filter](#configuration-filter) option.
The `query` method will request the remote service if the [serverFiltering](#configuration-serverFiltering)
option is set to `true`.

##### options.group `Object|Array` *(optional)*

The grouping configuration. Accepts the same values as the [filter](#configuration-filter) option.
The `query` method will request the remote service if the [serverGrouping](#configuration-serverGrouping)
option is set to `true`.

##### options.page `Number` *(optional)*

The page of data to return.
The `query` method will request the remote service if the [serverPaging](#configuration-serverPaging)
option is set to `true`.

##### options.pageSize `Number` *(optional)*

The number of data items to return.
The `query` method will request the remote service if the [serverPaging](#configuration-serverPaging)
option is set to `true`.

##### options.sort `Object|Array` *(optional)*

The sort configuration. Accepts the same values as the [sort](#configuration-sort) option.
The `query` method will request the remote service if the [serverSorting](#configuration-serverSorting)
option is set to `true`.

#### Returns

`Promise` A promise that will be resolved when the data has been loaded, or rejected if an HTTP error occurs.

#### Example - query the data source
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      },
      change: function(e) {
        var view = this.view();
        console.log(view[0].ProductName); // displays "Manjimup Dried Apples"
      }
    });
    // sort by "ProductName" and get the third page with page size set to 20
    dataSource.query({
      sort: { field: "ProductName", dir: "desc" },
      page: 3,
      pageSize: 20
    });
    </script>

#### Example - use the Promise API to get notified when the query finishes

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
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
        console.log(view[0].ProductName); // displays "Manjimup Dried Apples"
      });
    </script>

### read

Reads data items from a remote service (if the [transport](#configuration-transport) option is set) or from a JavaScript array (if the [data](#configuration-data) option is set).

> The `read` method always makes a request to the remote service, unless the Data Source is [offline](#methods-online).
offline.

#### Parameters

##### data `Object` *(optional)*

Optional data to pass to the remote service.
If you need to **filter**, it is better to use the [`filter()`](#methods-filter) method or the [`query()`](#methods-query) method with a `filter` parameter.

#### Returns

`Promise` A promise that will be resolved when the data has been loaded, or rejected if an HTTP error occurs.

#### Example - read data from a remote service

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      change: function(e) {
        var view = this.view();
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
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });

    dataSource.read().then(function() {
      var view = dataSource.view();
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
      console.log(data.length);  // displays "1"
      console.log(data[0].name); // displays "John Doe"
    });
    </script>

### sort

Gets or sets the sort order which will be applied over the data items.

#### Parameters

##### value `Object|Array`

The sort configuration. Accepts the same values as the [sort](#configuration-sort) option.

#### Returns

`Array` The current sort configuration. Returns `undefined` instead of an empty array, if the DataSource instance has not performed any sorting so far.

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
    console.log(sort.length);   // displays "1"
    console.log(sort[0].field); // displays "age"
    </script>

### sync

Saves any data item changes.

The `sync` method will request the remote service if:

* the [transport.create](#configuration-transport.create) option is set and the data source contains new data items
* the [transport.destroy](#configuration-transport.destroy) option is set and data items have been removed from the data source
* the [transport.update](#configuration-transport.update) option is set and the data source contains updated data items

#### Returns

`Promise` A promise that will be resolved when all sync requests have finished succesfully, or rejected if any single request fails.

#### Example - save the changes

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        read:  {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        update: {
          url: "http://demos.telerik.com/kendo-ui/service/products/update",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        destroy: {
          url: "http://demos.telerik.com/kendo-ui/service/products/destroy",
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
      dataSource.sync(); // makes a request to http://demos.telerik.com/kendo-ui/service/products/update" and http://demos.telerik.com/kendo-ui/service/products/destroy
    });
    </script>

### total

Gets the total number of data items. Uses [schema.total](#configuration-schema.total) if the [transport.read](#configuration-transport.read) option is set.

#### Returns

`Number` the total number of data items. Returns the `length` of the array returned by the [data](#methods-data) method if `schema.total` or `transport.read` are not set.
Returns `0` if the data source hasn't been populated with data items via the [read](#methods-read), [fetch](#methods-read) or [query](#methods-query) methods.

#### Example - get the total number of data items
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    dataSource.fetch(function() {
      console.log(dataSource.total()); // displays "2"
    });
    </script>

### totalPages

Gets the number of available pages.

#### Returns

`Number` the available pages.

#### Example - get the total number of pages

    <script>
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      pageSize: 1
    });
    console.log(dataSource.totalPages());   // displays "2"
    </script>

### view

Returns the data items which correspond to the **current** page, filter, sort and group configuration.
Compare with the [`data`](#methods-data) method, which will return data items from **all** pages, if **local** data binding and paging are used.

To ensure that data is available this method should be used within the [change](#events-change) event handler or the [fetch](#methods-fetch) method.

#### Returns

`kendo.data.ObservableArray` the data items. Returns groups if the data items are grouped (via the [group](#configuration-group) option or the [group](#methods-group) method).

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
      console.log(view.length); // displays "1"
      console.log(view[0].name); // displays "Tea"
    });
    </script>

#### Example - get the paged, sorted and grouped data items
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
      console.log(view.length); // displays "1"
      var beverages = view[0];
      console.log(beverages.value); // displays "Beverages"
      console.log(beverages.items.length); // displays "2"
      console.log(beverages.items[0].name); // displays "Coffee"
      console.log(beverages.items[1].name); // displays "Tea"
    });
    </script>

## Events

### change

Fired when the data source is populated from a JavaScript array or a remote service, a data item is inserted, updated or removed, the data items are paged, sorted, filtered or grouped.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.action `String` *(optional)*

String describing the action type (available for all actions other than "read"). Possible values are "itemchange", "add", "remove" and "sync".

##### e.field `String` *(optional)*

String describing the field that is changed (available only for "itemchange" action).

##### e.items `Array`

The array of data items that were affected (or read).

#### Example - subscribe to the "change" event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        }
      },
      change: function(e) {
        var data = this.data();
        console.log(data.length); // displays "77"
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the "change" event after initialization

    <script>
    function dataSource_change(e) {
      var data = this.data();
      console.log(data.length); // displays "77"
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
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

> If the [schema.errors](#configuration-schema.errors) option is set and the server response contains that field then the `error` event will be fired. The
`errors` field of the event argument will contain the errors returned by the server.

#### Event Data

##### e.errorThrown `Object` *(optional)*

Optional exception.

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.status `String`

String describing the type of the error

##### e.xhr `Object`

The current [jqXHR](http://api.jquery.com/Types/#jqXHR).

#### Example - subscribe to the "error" event after initialization
    <script>
    function dataSource_error(e) {
      console.log(e.status); // displays "error"
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/"
        }
      }
    });
    dataSource.bind("error", dataSource_error);
    dataSource.fetch();
    </script>

### push

Fired when the data source receives a push notification or the `pushCreate`, `pushUpdate` or `pushDestroy` methods are called.

#### Event Data

##### e.items `Array`

The array of data items that were affected by the push notification.

##### e.type `String`

The type of the push notification. One of the following values: "create", "update", "destroy";

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

#### Example - subscribe to the "push" event during initialization
    <script>
    function dataSource_push(e) {
      console.log(e.type); // displays "update"
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

> The "response" argument is not available for local operations.

#### Event Data

##### e.response `Object`

The raw remote service response.

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.type `String`

The type of the request. Set to "create", "read", "update" or "destroy".

#### Example - subscribe to the "requestEnd" event during initialization
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      requestEnd: function(e) {
        var response = e.response;
        var type = e.type;
        console.log(type); // displays "read"
        console.log(response.length); // displays "77"
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the "requestEnd" event to catch only "read" requests
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      requestEnd: function(e) {
        //check the "response" argument to skip the local operations
        if (e.type === "read" && e.response) {
            console.log("Current request is 'read'.");
        }
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the "requestEnd" event after initialization
    <script>
    function dataSource_requestEnd(e) {
      var response = e.response;
      var type = e.type;
      console.log(type); // displays "read"
      console.log(response.length); // displays "77"
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });
    dataSource.bind("requestEnd", dataSource_requestEnd);
    dataSource.fetch();
    </script>

> The requestEvent does not hold information regarding any errors occured during the request. The error information is availale as part of the error event.

### requestStart

Fired when the data source makes a remote service request.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

It is possible to prevent the remote request. To achieve this, execute `e.preventDefault()` in the handler function.

> This event can be prevented only for `read` requests.

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

##### e.type `String`

The type of the request. Set to "create", "read", "update" or "destroy".

#### Example - subscribe to the "requestStart" event during initialization
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      },
      requestStart: function(e) {
        console.log("request started");
      }
    });
    dataSource.fetch();
    </script>

#### Example - subscribe to the "requestStart" event after initialization
    <script>
    function dataSource_requestStart(e) {
      console.log("request started");
    }
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
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
          url: "http://demos.telerik.com/kendo-ui/service/products",
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

Fired after the data source saves data item changes. The data source saves the data item changes when the [sync](#methods-sync) method is called.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

> The `sync` event is fired after all remote requests finish.

#### Event Data

##### e.sender `kendo.data.DataSource`

The data source instance which fired the event.

#### Example - subscribe to the "sync" event during initialization

    <script>
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/products/create",
          dataType: "jsonp" //"jsonp" is required for cross-domain requests; use "json" for same-domain requests
        },
        parameterMap: function(data) {
          return { models: kendo.stringify(data.models) };
        }
      },
      sync: function(e) {
        console.log("sync complete");
      },
      schema: {
        model: { id: "ProductID" }
      }
    });
    dataSource.add( { ProductName: "Ham" } );
    dataSource.sync();
    </script>

#### Example - subscribe to the "sync" event after initialization

    <script>
    function dataSource_sync(e) {
      console.log("sync complete");
    }
    var dataSource = new kendo.data.DataSource({
      batch: true,
      transport: {
        create: {
          url: "http://demos.telerik.com/kendo-ui/service/products/create",
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

## Class methods

### create

Creates a data source instance using the specified configuration. If the configuration is a data source instance the same instance will be returned.

#### Returns

`kendo.data.DataSource` the new data source instance.

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

