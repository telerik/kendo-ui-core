---
title: Basic Usage
page_title: Basic Usage | Kendo UI Data Source
description: "Learn about the most common usage scenarios of the Kendo UI DataSource component."
previous_url: /howto/use-the-datasource-component
slug: basicusage_kendoui_datasourcecomponent
position: 2
---

# Basic Usage

The [Kendo UI DataSource component](https://demos.telerik.com/kendo-ui/datasource/index) plays a central role in all web applications built with Kendo UI for jQuery.

The DataSource is an abstraction for using local data (arrays of JavaScript objects) or remote data (web services returning JSON, JSONP, [oData](http://www.odata.org/) or XML). This article demonstrates some of the most common scenarios regarding the possibilities for you to apply the DataSource component to your projects.

## Creating Local Data Sources

The following example demonstrates how to create a DataSource for local data.

        var movies = [
                { title: "Star Wars: A New Hope", year: 1977 },
                { title: "Star Wars: The Empire Strikes Back", year: 1980 },
                { title: "Star Wars: Return of the Jedi", year: 1983 }
        ];

        var localDataSource = new kendo.data.DataSource({ data: movies });

The `localDataSource` variable in the example is a DataSource that is initialized to represent an in-memory cache of the `movies` array. However, the data represented by the `movies` array is not loaded in the DataSource until the `.read()` method is called:

        localDataSource.read();

When the DataSource is bound to a Kendo UI widget or chart, the explicit invocation may not be necessary. The default configuration of the widgets is set to automatically bind to an associated DataSource. However, this may be overridden, i.e. `autoBind`.

## Creating Remote Data Sources

The process of creating a DataSource for remote data differs in several ways from creating a DataSource for a local data:

* A `transport` must identify the protocols, URLs of endpoints, and serialization formats for any or all CRUD (Create, Read, Update, Destroy) data operations.
* It is optionally required to use a `parameterMap`, which marshals request parameters to the format of a remote endpoint.
* It is optionally configured to use server operations for calculating aggregates, defining filters, and supporting features like grouping, paging, and sorting.

The following example demonstrates how to create a DataSource for data from a remote endpoint.

        var remoteDataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "http://odata.netflix.com/Catalog/Titles"
            }
        });

The `remoteDataSource` variable in the example is a DataSource that is initialized to represent an in-memory cache of movie titles from the Netflix catalog service, which employs the [oData](http://www.odata.org/) protocol. It is only configured to act as a read-only source of data to any widgets to which it is bound.

As is the case with creating a DataSource for local data, the data provided by the Netflix catalog service is not loaded until the `.read()` method is called:

        remoteDataSource.read();

When the DataSource is bound to a Kendo UI widget or chart, the explicit invocation may not be necessary. The default configuration of the widgets is set to automatically bind to an associated DataSource. However, this may be overridden, i.e. `autoBind`.

The following example demonstrates how to create a DataSource for data from another remote endpoint.

        var remoteDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://search.twitter.com/search.json",
                    dataType: "jsonp",
                    data: {
                        q: function() {
                            return $("#searchFor").val();
                        }
                    }
                }
            }
        });

The DataSource in the example is initialized to represent an in-memory cache of tweets from the search service for Twitter. This endpoint employs a [JSON](http://www.json.org/)-based endpoint contact that allows an input parameter `q` to denote a query string for the search service. Here, its value is provided by an input element on the page.

Operations conducted by the DataSource against this remote endpoint are performed via [`jQuery.ajax()`](https://api.jquery.com/jQuery.ajax/) and therefore, are subject to the same security constraints as the ones enforced by the user agent. These security constraints also apply to [XHRs (XMLHttpRequests)](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) made across different domains. Since this is the case with the example above, the `dataType` configuration property is set to use [JSONP](https://en.wikipedia.org/wiki/JSONP).

## Local Filtering

Filtering local data is a trivial task using the DataSource. The component accepts a list of one or more filter expressions. They can be combined by using the `and` or `or` logical operators. For more details about the filter expression structure, refer to the documentation on the [`filter`](/api/javascript/data/datasource/configuration/filter) configuration option. Local filtering is convenient for small datasets. Avoid it when working with large datasets because it might lead to performance issues.

```tab-Data

        var words = [
            { 'w': 'kendo', 'length': 4 },
            { 'w': 'done', 'length': 4 },
            { 'w': 'keno', 'length': 4 },
            { 'w': 'node', 'length': 5 }
        ];
```
```tab-DataSource

        var wordsDataSource = new kendo.data.DataSource({
            data: words,
            filter: {
                logic: 'or',
                filters: [
                    { field: 'w', operator: 'contains', value: 'don' },
                    { field: 'length', operator: 'gte', value: 5 }
                ]
            }
        });
```

## Server Filtering

Server filtering is convenient for large datasets. Make sure that you set the [`schema`](/api/javascript/data/datasource/configuration/schema) and the [`filter`](/api/javascript/data/datasource/configuration/filter) properties as necessary.

The following example features local data but the data returned by the [`transport`](/api/javascript/data/datasource/configuration/transport) is going to be evaluated the same way.

```tab-Data
        //the JSON result from "{remote service}"
        {
            result: [
                { 'w': 'done', 'length': 4 },
                { 'w': 'node', 'length': 5 }
            ]
        }
```
```tab-DataSource

        var wordsDataSource = new kendo.data.DataSource({
            serverFiltering: true,
            transport: {
                read: {
                    url: "{remote service}"
                }
            },
            schema: {
                data: "result"
            },
            filter: {
                logic: 'or',
                filters: [
                    { field: 'w', operator: 'contains', value: 'don' },
                    { field: 'length', operator: 'gte', value: 5 }
                ]
            }
        });
```

## Accent Folding

Starting from R2 2019 release there is a built-in functionality in the Kendo UI DataSource to handle cases when user needs to filter on diacritic characters for specific language. The [accentFoldingFiltering](/api/javascript/data/datasource/configuration/accentfoldingfiltering) option allows user to define a specific culture to be used when applying the filter. Since these characters are unique for a specific language, setting the appropriate culture has to be set as a value. For example, `tr-TR` for Turkish, `es-ES` for Spanish, or `fr-FR` for French.

> Due to the specifics of the case-insensitive search, only one language can be used to filter your data. For example, if you mix Spanish and Turkish in the data, you may observe unexpected behavior.

The following example demonstrates how to check the filtering.

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
      dataSource.fetch(function() {
        var view = dataSource.view();
        console.log(view.length); // displays "1"
        console.log(view[0].name); // displays "KIZILTOPRAK"
      });
    </script>

## Local Grouping

When you group local data, you can continue to use the same DataSource you are already familiar with. However, generating grouped data on the server can be difficult when you are unsure of the format the DataSource is expecting. Local grouping is convenient for small datasets. However, for performance concerns, avoid it when you work with large datasets.

```tab-Data

        var words = {
            'count': 4,
            'input': 'kendo',
            'items': [
                { 'w': 'kendo', 'length': 5 },
                { 'w': 'done', 'length': 4 },
                { 'w': 'keno', 'length': 4 },
                { 'w': 'node', 'length': 4 }
            ]
        };
```
```tab-DataSource

        var wordsDataSource = new kendo.data.DataSource({
            data: words,
            group: { field: 'length', dir: 'desc'},
            schema: { data: 'items' }
        });
```

## Server Grouping

Server grouping is an excellent option when working with large datasets. Be sure to set the `schema` and `group` properties as necessary.

The following example features local data but the data returned by a `transport` is going to be evaluated the same way.

```tab-Data

        var words = {
            'count': 4,
            'input': 'kendo',
            'groups': [{
                'field': 'length',
                'value': '5',
                'items': [{
                    'w': 'kendo'
                }],
                'hasSubgroups': false,
                'aggregates': {}
            },{
                'field': 'length',
                'value': '4',
                'items': [
                    { 'w': 'done' },
                    { 'w': 'keno' },
                    { 'w': 'node' }
                ],
                'hasSubgroups': false,
                'aggregates': {}
            }]
        };
```
```tab-DataSource

        var wordsDataSource = new kendo.data.DataSource({
            data: words,
            schema: {
                groups: 'groups'
            },
            group: {
                field: 'length'
            },
            serverGrouping: true
        });
```

## See Also

* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
