---
title: HierarchicalDataSource
page_title: API Reference for Kendo UI Hierarchical DataSource
description: Learn more about the configuration of Kendo UI DataSource, methods and events.
res_type: api
---

# kendo.data.HierarchicalDataSource

## Configuration

See the [DataSource configuration](/api/framework/datasource#configuration) for all inherited configuration.

### filter `Array|Object`

The filters which are applied over the data items. It applies the filter to all loaded nodes and creates views from the nodes that match the filter and their parent nodes up to the root of the hierarchy. Currently not loaded nodes are not filtered. By default, no filter is applied.

> The data source filters the data items client-side unless the [`serverFiltering`](/api/framework/datasource#configuration-serverFiltering) option is set to `true`.

#### Example - set a single filter

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            filter:{ field: "name", operator: "startswith", value: "John" },
            change: function(e) {
                 for (var i = 0; i < e.items.length; i++) {
                    e.items[i].load();
                 }
            },
            data: [
            { name: "Jane Doe", items: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ] },
            { name: "John Doe" }
            ]
        });

        dataSource.fetch();
        var view = dataSource.view();

        console.log(view.length);// displays 2
        console.log(view[0].name); // displays "Jane Doe"
        console.log(view[0].children.view().length); // displays 1
        console.log(view[0].children.view()[0].name); // displays "John Doe"
    </script>

#### Example - set filter as conjunction (and)

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            filter:[{ field: "name", operator: "startswith", value: "John" },
                { field: "name", operator: "contains", value: "Snow" }],
            change: function(e) {
                 for (var i = 0; i < e.items.length; i++) {
                    e.items[i].load();
                 }
            },
            data: [
            { name: "Jane Doe", items: [
                { name: "Jane Doe" },
                { name: "John Snow" },
                { name: "John Doe" }
            ] },
            { name: "John Snow" }
            ]
        });

        dataSource.fetch();
        var view = dataSource.view();

        console.log(view.length);// displays 2
        console.log(view[0].name); // displays "Jane Doe"
        console.log(view[0].children.view().length); // displays 1
        console.log(view[0].children.view()[0].name); // displays "John Snow"
    </script>

#### Example - set filter as disjunction (or)

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
              filter: {
                logic: "or",
                filters: [
                  { field: "username", operator: "contains", value: "Snow" },
                  { field: "name", operator: "contains", value: "John" }
                ]
              },
            change: function(e) {
                 for (var i = 0; i < e.items.length; i++) {
                    e.items[i].load();
                 }
            },
            data: [
            { name: "Jane Doe", items: [
                { username: "Jane Doe" },
                { username: "John Snow" },
                { username: "John Doe" }
            ] },
            { name: "John Snow" }
            ]
        });

        dataSource.fetch();
        var view = dataSource.view();

        console.log(view.length);// displays 2
        console.log(view[0].name); // displays "Jane Doe"
        console.log(view[0].children.view().length); // displays 1
        console.log(view[0].children.view()[0].username); // displays "John Snow"
    </script>

### schema `Object`

The schema configuration. See the [DataSource.schema configuration](/api/framework/datasource#configuration-schema) for all available options.

### schema.model `Object|kendo.data.Node`

The data item (model) configuration. See the [DataSource.schema.model configuration](/api/framework/datasource#configuration-schema.model) for all available options.

> The model **must** inherit from [kendo.data.Node](/api/framework/node).

#### Example - use a custom model

    <script>
    var CustomNode = kendo.data.Node.define({
      averageRating: function() {
        var movies = this.children.data();
        var rating = 0;

        if (movies.length) {
          $.each(movies, function() { rating += this.rating; });
          rating /= movies.length;
        }

        return rating.toFixed(2);
      }
    });

    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        { categoryName: "SciFi", items: [
          { movieName: "Inception", rating: 8.8 },
          { movieName: "The Matrix", rating: 8.7 }
        ] },
        { categoryName: "Drama", hasAssignedMovies: true }
      ],
      schema: {
        model: CustomNode
      }
    });

    datasource.read();

    var category = datasource.data()[0];
    category.load();
    console.log(category.averageRating()); // logs 8.75
    </script>

### schema.model.hasChildren `Boolean|String|Function` *(default: false)*

Specifies whether the model might have children and might be loaded. Applicable when the rendering of a
widget needs to have different states for items that have no children (e.g. the toggle button of the TreeView).

#### Example - map the hasChildren field to another field

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        { categoryName: "SciFi", hasAssignedMovies: false },
        { categoryName: "Drama", hasAssignedMovies: true }
      ],
      schema: {
        model: {
          hasChildren: "hasAssignedMovies"
        }
      }
    });

    datasource.read();

    console.log(datasource.data()[0].hasChildren); // logs false
    console.log(datasource.data()[1].hasChildren); // logs true
    </script>

#### Example - compute if an item has children with a function

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        { categoryName: "SciFi" },
        { categoryName: "Drama" }
      ],
      schema: {
        model: {
          hasChildren: function(item) {
            return item.categoryName != "Drama";
          }
        }
      }
    });

    datasource.read();

    console.log(datasource.data()[0].hasChildren); // logs true
    console.log(datasource.data()[1].hasChildren); // logs false
    </script>

#### Example - specify that all items may have children

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        { categoryName: "SciFi" },
        { categoryName: "Drama" }
      ],
      schema: {
        model: {
          hasChildren: true
        }
      }
    });

    datasource.read();

    console.log(datasource.data()[0].hasChildren); // logs true
    </script>

### schema.model.children `String|Object` *(default: "items")*

DataSource object or configuration for fetching child nodes.
Detailed explanation of how children are fetched is found in the [HierarchicalDataSource overview help topic](http://docs.telerik.com/kendo-ui/framework/hierarchicaldatasource/overview).

> Note that "children" cannot be used as a field name. The model already has a children property - the child data source.

For static HierarchicalDataSource (local data), this field may be a `String`,
indicating which field holds the nested data.

#### Example - specify children field

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        {
          categoryName: "SciFi",
          movies: [
            { title: "Star Wars: A New Hope", year: 1977 },
            { title: "Star Wars: The Empire Strikes Back", year: 1980 },
            { title: "Star Wars: Return of the Jedi", year: 1983 }
          ]
        },
        {
          categoryName: "Drama",
          movies: [
            { title: "The Shawshenk Redemption", year: 1994 },
            { title: "Fight Club", year: 1999 },
            { title: "The Usual Suspects", year: 1995 }
          ]
        }
      ],
      schema: {
        model: {
          children: "movies"
        }
      }
    });

    datasource.read();

    var scifi = datasource.data()[0];
    scifi.load();
    console.log(scifi.children.data().length); // logs 3
    </script>

#### Example - 

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        {
          categoryName: "SciFi",
          movies: [
            { title: "Star Wars: A New Hope", year: 1977, cast: [
                { actor: "Mark Hamill", character: "Luke Skywalker" },
                { actor: "Harrison Ford", character: "Han Solo" },
                { actor: "Carrie Fisher", character: "Princess Leia Organa" }
            ] },
            { title: "Star Wars: The Empire Strikes Back", year: 1980, cast: [
                { actor: "Mark Hamill", character: "Luke Skywalker" },
                { actor: "Harrison Ford", character: "Han Solo" },
                { actor: "Carrie Fisher", character: "Princess Leia Organa" },
                { actor: "Billy Dee Williams", character: "Lando Calrissian" }
            ] }
          ]
        }
      ],
      schema: {
        model: {
          children: { // define options for second level
            schema: {
              data: "movies",
              model: {
                children: "cast" // third level is defined by the field "cast"
              }
            }
          }
        }
      }
    });

    datasource.read();

    var scifi = datasource.data()[0];
    scifi.load();
    var sw5 = scifi.children.data()[1];
    sw5.load();
    console.log(sw5.children.data().length); // logs 4
    </script>

## Methods

See the [DataSource methods](/api/framework/datasource#methods) for all inherited methods.

The **filter**, **remove** and **getByUid** methods are overridden and work with the hierarchical data
(they will act on all child datasources that have been read).

### filter

Gets or sets the filter configuration. It applies the filter to all loaded nodes and creates views from the nodes that match the filter and their parent nodes up to the root of the hierarchy. Currently not loaded nodes are not filtered.

#### Parameters

##### value `Object` *(optional)*

The filter configuration. Accepts the same values as the [`filter`](#configuration-filter) option (**check there for more examples**).

#### Returns

`Object` the current filter configuration. Returns `undefined` if the DataSource instance has not performed filtering so far.

#### Example - set the data source filter

    <script>
            var dataSource = new kendo.data.HierarchicalDataSource({
                change: function(e) {
                 for (var i = 0; i < e.items.length; i++) {
                    e.items[i].load();
                 }
                },
                data: [
                { name: "Jane Doe", items: [
                    { name: "Jane Doe" },
                    { name: "John Doe" }
                ] },
                { name: "John Doe" }
                ]
            });

            dataSource.fetch();
            dataSource.filter({ field: "name", operator: "startswith", value: "John" });
            var view = dataSource.view();

            console.log(view.length);// displays 2
            console.log(view[0].name); // displays "Jane Doe"
            console.log(view[0].children.view().length); // displays 1
            console.log(view[0].children.view()[0].name); // displays "John Doe"
    </script>

#### Example - get the data source filter

    <script>
        var dataSource = new kendo.data.HierarchicalDataSource({
            filter: { field: "name", operator: "startswith", value: "John" },
            change: function(e) {
                 for (var i = 0; i < e.items.length; i++) {
                    e.items[i].load();
                 }
            },
            data: [
            { name: "Jane Doe", items: [
                { name: "Jane Doe" },
                { name: "John Doe" }
            ] },
            { name: "John Doe" }
            ]
        });
         
        dataSource.fetch();
        var filter = dataSource.filter();

        console.log(filter.filters[0]); //displays '{field: "name", operator: "startswith", value: "John"}'
    </script>

## Events

See the [DataSource events](/api/framework/datasource#events) for all inherited events.

> Disclaimer: The [push](/api/framework/datasource#events-push) event is not currently supported by the `HierarchicalDataSource`.

### change

Fires when data is changed. In addition to the [standard change event](/api/framework/datasource#change),
the HierarchicalDataSource includes additional data when the event has been triggered from a child
DataSource.

#### Event Data

##### e.node `kendo.data.Node`

If the event was triggered by a child datasource, this field holds a reference to the parent node.

#### Example

    <script>
    var datasource = new kendo.data.HierarchicalDataSource({
      data: [
        { id: 1, text: "foo", items: [
          { id: 2, text: "bar" }
        ] }
      ],
      change: function(e) {
        console.log(e.node);
      }
    });

    // logs `undefined`, because the change event is not triggered by a node
    datasource.read();

    // logs `{ id: 1, text: "foo" }`, because the event is triggered by the root item
    datasource.get(1).load();
    </script>
