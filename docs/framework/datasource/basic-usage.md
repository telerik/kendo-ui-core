---
title: Basic Usage
page_title: Basic Usage | Kendo UI Data Source
description: "Learn about the most common usage scenarios of the Kendo UI DataSource component."
previous_url: /howto/use-the-datasource-component
slug: basicusage_kendoui_datasourcecomponent
position: 2
---

# Basic Usage

The [Kendo UI DataSource component](http://demos.telerik.com/kendo-ui/datasource/index) plays a central role in practically all web applications built with Kendo UI. It is an abstraction for using local data&mdash;arrays of JavaScript objects&mdash;or remote data&mdash;web services returning JSON, JSONP, [OData](http://www.odata.org/) or XML. This article demonstrates some of the most common scenarios regarding the possibilities for you to apply the DataSource component to your projects.  

## DataSource for Local and Remote Data

### Create DataSource for Local Data

The example below demonstrates how to create a DataSource for local data.

###### Example

        var movies = [
                { title: "Star Wars: A New Hope", year: 1977 },
                { title: "Star Wars: The Empire Strikes Back", year: 1980 },
                { title: "Star Wars: Return of the Jedi", year: 1983 }
        ];

        var localDataSource = new kendo.data.DataSource({ data: movies });

The `localDataSource` variable in the example is a DataSource that is initialized to represent an in-memory cache of the `movies` array. However, the data represented by the `movies` array is not loaded in the DataSource until the `.read()` method is called:

        localDataSource.read();

When the DataSource is bound to a Kendo UI widget or chart, the explicit invocation may not be necessary. The default configuration of the widgets is set to automatically bind to an associated DataSource. However, this may be overridden, i.e. `autoBind`.

### Create DataSource for Remote Services

The process of creating a DataSource for remote data differs in several ways from creating a DataSource for a local data:

* A `transport` must identify the protocols, URLs of endpoints, and serialization formats for any or all CRUD (Create, Read, Update, Destroy) data operations.
* It is optionally required to use a `parameterMap`, which marshals request parameters to the format of a remote endpoint.
* It is optionally configured to use server operations for calculating aggregates, defining filters, and supporting features like grouping, paging, and sorting.

The example below demonstrates how to create a DataSource for data from a remote endpoint.

###### Example

        var remoteDataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "http://odata.netflix.com/Catalog/Titles"
            }
        });

The `remoteDataSource` variable in the example is a DataSource that is initialized to represent an in-memory cache of movie titles from the Netflix catalog service, which employs the [OData](http://www.odata.org/) protocol. It is only configured to act as a read-only source of data to any widgets to which it is bound.

As is the case with creating a DataSource for local data, the data provided by the Netflix catalog service is not loaded until the `.read()` method is called:

        remoteDataSource.read();

When the DataSource is bound to a Kendo UI widget or chart, the explicit invocation may not be necessary. The default configuration of the widgets is set to automatically bind to an associated DataSource. However, this may be overriden, i.e. `autoBind`.

The example below demonstrates how to create a DataSource for data from another remote endpoint.

###### Example

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

Operations conducted by the DataSource against this remote endpoint are performed via [`jQuery.ajax()`](http://api.jquery.com/jQuery.ajax/) and therefore, are subject to the same security constraints as the ones enforced by the user agent. These security constraints also apply to [XHRs (XMLHttpRequests)](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) made across different domains. Since this is the case with the example above, the `dataType` configuration property is set to use [JSONP](https://en.wikipedia.org/wiki/JSONP).

## Grouped Data Handling

Grouping local data is mostly trivial&mdash;you can continue to use the same DataSource you are already familiar with. However, generating grouped data on the server can be difficult when you are unsure of the format the DataSource is expecting.

### Local Grouping

Local grouping is convenient for small datasets. However, avoid it is working with large datasets for performance reasons.

###### Example

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
            group: { field: 'length', dir: 'desc'}
        });
```

### Server Grouping

Server grouping is an excellent option when working with large datasets. Be sure to set the `schema` and `group` properties as necessary.

The example below features local data but the data returned by a `transport` is going to be evaluated the same way.

###### Example

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

Other articles on the Kendo UI DataSource component:

* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
