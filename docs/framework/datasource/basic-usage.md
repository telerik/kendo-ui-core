---
title: Basic Usage
page_title: Use the DataSource component in Kendo UI framework
description: In this articla we provide a quick introduction of Kendo UI DataSource component and a few of its most common usage scenarios.
previous_url: /howto/use-the-datasource-component
position: 2
---

# Kendo UI DataSource Basic Usage

## Creating a DataSource for Local Data

Creating a DataSource for local data is simple:

        var movies = [
                { title: "Star Wars: A New Hope", year: 1977 },
                { title: "Star Wars: The Empire Strikes Back", year: 1980 },
                { title: "Star Wars: Return of the Jedi", year: 1983 }
        ];

        var localDataSource = new kendo.data.DataSource({ data: movies });

In this example, the variable, `localDataSource` is a DataSource that is initialized to represent an in-memory cache of the `movies` array. However, the data represented by the `movies` array is not loaded in the DataSource until the `.read()` method is called:

        localDataSource.read();

When the DataSource is bound to a widget or chart, the explicit invocation may not be necessary; their default configuration is set to automatically bind to an associated DataSource. However, this may be overriden (i.e. `autoBind`).

## Creating a DataSource for Remote Data

The process of creating a DataSource for remote data differs in several ways from creating a DataSource for a local data:

* a transport must identify the protocol(s), URL(s) of endpoints, and serialization format(s) for any/all CRUD operations;
* optionally requires the use of a `parameterMap`, which marshalls request parameters to the format of a remote endpoint;
* and, optionally configures the use of server operations for calculating aggregates, defining filters, and supporting features like grouping, paging, and sorting.

Here's an example of creating a DataSource for data from a remote endpoint:

        var remoteDataSource = new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "http://odata.netflix.com/Catalog/Titles"
            }
        });

The variable, `remoteDataSource` is a DataSource that is initialized to represent an in-memory cache of movies titles from the Netflix catalog service, which employs the [OData](http://www.odata.org/) protocol. It is only configured to act as a read-only source of data to any widgets to which it is bound.

As is the case with creating a DataSource for local data, the data provided by the Netflix catalog service is not loaded until the `.read()` method is called:

        remoteDataSource.read();

When the DataSource is bound to a widget or chart, the explicit invocation may not be necessary; their default configuration is set to automatically bind to an associated DataSource. However, this may be overriden (i.e. `autoBind`).

Here's another example of creating a DataSource for data from a remote endpoint:

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

In this example, the DataSource is initialized to represent an in-memory cache of tweets from the search service for Twitter. This endpoint employs a [JSON](http://www.json.org/)-based endpoint contact that allows an input parameter, `q` to denote a query string for the search service. Here, its value is provides by a input element on the page.

Operations conducted by the DataSource against this remote endpoint are performed via [jQuery.ajax()](http://api.jquery.com/jQuery.ajax/) and therefore, subject to the same security constraints enforced by the user agent. These security constraints also apply to XHRs made across different domains. Since this is the case with the example above, the `dataType` configuration property is set to use [JSONP](http://en.wikipedia.org/wiki/JSONP).

## Working with Grouped Data

Grouping local data is mostly trivial--you can continue to use the same DataSource you are already familiar with. However, generating grouped data on the server can be difficult when you are unsure of the format DataSource is expecting.

### Local Grouping

Local grouping is convenient for small datasets but, for performance reasons, should be avoided with large datasets.

Data:

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

DataSource:

        var wordsDataSource = new kendo.data.DataSource({
            data: words,
            group: { field: 'length', dir: 'desc'}
        });

### Server Grouping

Server grouping is an excellent option for large datasets. Be sure to set the `schema` and `group` properties as necessary. This example is with local data but the data returned by a `transport` will be evaluated the same way.

Data:

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

DataSource:

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
