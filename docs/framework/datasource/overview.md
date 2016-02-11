---
title: Overview
page_title: Overview | Kendo UI Data Source
description: "Learn how to use the Kendo UI DataSource component to simplify data binding and operations."
previous_url: /howto/interact-with-an-existing-database
slug: overview_kendoui_datasourcecomponent
position: 1
---

# DataSource Overview

The [Kendo UI DataSource component](http://demos.telerik.com/kendo-ui/datasource/index) plays a central role in practically all web applications built with Kendo UI. It is an abstraction for using local data&mdash;arrays of JavaScript objects&mdash;or remote data&mdash;web services returning JSON, JSONP, [OData](http://www.odata.org/) or XML.

The Kendo UI DataSource has many abilities and responsibilities, among which to:

* [Retrieve data from a remote endpoint](/framework/datasource/cors).
* Maintain the [structure and type of the data (`schema`)](/framework/datasource/crud#schema).
* Process serialization formats to and from a remote endpoint.
* [synchronize updates&mdash;create, update, delete](/framework/datasource/crud) to and from a remote endpoint.
* [Maintain an in-memory cache of data, including changes](/framework/datasource/offline) for updating to a remote endpoint.
* Calculate and maintain [aggregates](/api/javascript/data/datasource#methods-aggregate), [sorting order](/api/javascript/data/datasource#methods-sort) and [paging](/api/javascript/data/datasource#methods-page).
* Provide a query mechanism via [filter expressions](/api/javascript/data/datasource#methods-filter).

In other words, the DataSource fully supports CRUD  (Create, Read, Update, Destroy) data operations, and provides both client-side and server-side support for sorting, paging, filtering, grouping, and aggregates.

For detailed information on the capabilities of the DataSource, refer to its [configuration API, methods, and events](/api/javascript/data/datasource), and [demos](http://demos.telerik.com/kendo-ui/datasource/index).

## Getting Started

This article provides simple examples, which show how to create Kendo UI DataSource instances bound to local or remote data, and DataSource instances, which are used by a single Kendo UI widget or by multiple widgets.

### Bind DataSource to Local Data

In this scenario an array of Javascript objects is assigned to the `data` configuration property of the DataSource instance, as demonstrated in the example below.

###### Example

    var movies = [{
        title: "Star Wars: A New Hope",
        year: 1977
    }, {
        title: "Star Wars: The Empire Strikes Back",
        year: 1980
    }, {
        title: "Star Wars: Return of the Jedi",
        year: 1983
    }];

    var localDataSource = new kendo.data.DataSource({
        data: movies
    });

### Bind DataSource to Remote Service

In this scenario the DataSource needs information about the web service URLs, the request type, the response data type, and the structure (`schema`) of the response, if it is more complex than a plain array of objects. You are also able to provide custom parameters, which are going to be submitted during the data request.

###### Example

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                // the remote service url
                url: "http://api.openweathermap.org/data/2.5/find",

                // the request type
                type: "get",

                // the data type of the returned result
                dataType: "json",

                // additional custom parameters sent to the remote service
                data: {
                    lat: 42.42,
                    lon: 23.20,
                    cnt: 10
                }
            }
        },
        // describe the result format
        schema: {
            // the data, which the data source will be bound to is in the "list" field of the response
            data: "list"
        }
    });

## Widget Binding

Many Kendo UI widgets support data binding, and the Kendo UI DataSource is an ideal binding source for both local and remote data.

### Bind Widgets to Local DataSource

A DataSource can be created in-line with other Kendo UI widget configuration settings, as demonstrated in the example below.

###### Example

    $("#chart").kendoChart({
        title: {
            text: "Employee Sales"
        },
        dataSource: new kendo.data.DataSource({
            data: [
            {
                employee: "Joe Smith",
                sales: 2000
            },
            {
                employee: "Jane Smith",
                sales: 2250
            },
            {
                employee: "Will Roberts",
                sales: 1550
            }]
        }),
        series: [{
            type: "line",
            field: "sales",
            name: "Sales in Units"
        }],
        categoryAxis: {
            field: "employee"
        }
    });

### Bind Widgets to Remote DataSource

You can also create a shared DataSource to allow multiple Kendo UI widgets to bind to the same data collection. The main benefits of using a shared DataSource are fewer data requests, better performance and automatic synchronized refreshing of all widgets bound to the same DataSource instance, when the data changes.

###### Example

    var sharedDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "data-service.json",
                dataType: "json"
            }
        }
    });

    // Bind two UI widgets to the same DataSource
    $("#chart").kendoChart({
        title: {
            text: "Employee Sales"
        },
        dataSource: sharedDataSource,
        series: [{
            field: "sales",
            name: "Sales in Units"
        }],
        categoryAxis: {
            field: "employee"
        }
    });

    $("#grid").kendoGrid({
        dataSource: sharedDataSource,
            columns: [
            {
                field: "employee",
                title: "Employee"
            },
            {
                field: "sales",
                title: "Sales",
                template: '#= kendo.toString(sales, "N0") #'
        }]
    });

## See Also

Other articles on the Kendo UI DataSource component:

* [Basic Usage]({% slug basicusage_kendoui_datasourcecomponent %})
* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
