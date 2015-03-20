---
title: Overview
page_title: DataSource component for data binding in Kendo UI framework
description: How to get started using DataSource component in Kendo UI framework to simplify data binding and operations.
position: 1
previous_url: /howto/interact-with-an-existing-database
---

# Kendo UI DataSource Overview

The DataSource plays a central role in practically all web applications built with Kendo UI.
It is an abstraction for using local data (arrays of JavaScript objects) or
remote data (web services returning JSON, JSONP, [OData](http://www.odata.org/) or XML).

The Kendo UI DataSource has many abilities and responsibilities, including:

* [retrieve data from a remote endpoint](/framework/datasource/cors);
* maintain the [structure and type of the data (schema)](/framework/datasource/crud#schema);
* process serialization formats to/from a remote endpoint;
* [synchronize updates (i.e. create, update, delete)](/framework/datasource/crud) to/from a remote endpoint;
* [maintain an in-memory cache of data (including changes)](/framework/datasource/offline) for updating to a remote endpoint;
* calculate and maintain [aggregates](/api/javascript/data/datasource#methods-aggregate),
[sorting order](/api/javascript/data/datasource#methods-sort) and [paging](/api/javascript/data/datasource#methods-page);
* provide a query mechanism via [filter expressions](/api/javascript/data/datasource#methods-filter).

In other words, the DataSource fully supports CRUD operations (Create, Read, Update, Destroy),
and provides both client-side and server-side support for sorting, paging, filtering, grouping and aggregates.

> To learn more about the capabilities of the DataSource, make sure to check out its
[configuration API, methods and events](/api/framework/datasource), and also [demos](http://demos.telerik.com/kendo-ui/datasource/index).

## Getting Started

This documentation page provides simple examples, which show how to create Kendo UI DataSource instances bound to local or remote data.
In addition, it is also demonstrated how to create DataSource instances, which are used by a single Kendo UI widget or by multiple widgets.

### Creating a DataSource bound to local data

In this scenario an array of Javascript objects is assigned to the `data` configuration property of the DataSource instance.

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

### Creating a DataSource bound to a remote data service

In this scenario the DataSource needs information about the web service URL(s), the request type, the response data type, and the structure (schema) of the response, in case it is more complex than a plain array of objects.
Custom parameters can be provided, which will be submitted during the data request.

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

## Binding UI widgets to the Kendo UI DataSource

Many Kendo UI widgets support data binding, and the Kendo UI DataSource is an ideal binding source for both local and remote data.
A DataSource can be created in-line with other UI widget configuration settings,
or a shared DataSource can be created to allow multiple UI widgets to bind to the same data collection.
The main benefits of using a shared DataSource are fewer data requests, better performance and
automatic synchronized refreshing of all widgets bound to the same DataSource instance, when the data changes.

### Creating a local DataSource in-line with UI widget configuration

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

### Creating and binding to a shared remote DataSource

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
