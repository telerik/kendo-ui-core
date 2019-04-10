---
title: Overview
page_title: DataSource Overview | Kendo UI Data Source
description: "Learn how to use the Kendo UI DataSource component to simplify data binding and operations."
previous_url: /howto/interact-with-an-existing-database
slug: overview_kendoui_datasourcecomponent
position: 1
---

# DataSource Overview

The [Kendo UI DataSource component](http://demos.telerik.com/kendo-ui/datasource/index) plays a central role in all web applications built with Kendo UI for jQuery.

## Getting Started

The DataSource is an abstraction for using local data (arrays of JavaScript objects) or remote data (web services returning JSON, JSONP, [oData](http://www.odata.org/) or XML). It fully supports CRUD (Create, Read, Update, Destroy) data operations and provides both client-side and server-side support for sorting, paging, filtering, grouping, and aggregates.

The following list includes some of the functionality and features which the DataSource provides. For detailed information on the capabilities of the DataSource, refer to its [configuration API, methods, and events](/api/javascript/data/datasource), and [demos](http://demos.telerik.com/kendo-ui/datasource/index).

* [Retrieval of data from a remote endpoint](/framework/datasource/cors).
* Maintaining the [structure and type of the data (`schema`)](/framework/datasource/crud#schema).
* Processing serialization formats to and from a remote endpoint.
* [Synchronization of updates&mdash;create, update, and delete](/framework/datasource/crud) to and from a remote endpoint.
* [Maintaining an in-memory cache of data, including changes](/framework/datasource/offline) for updating to a remote endpoint.
* Calculating and maintaining [aggregates](/api/javascript/data/datasource/methods/aggregate), [sorting order](/api/javascript/data/datasource/methods/sort), and [paging](/api/javascript/data/datasource/methods/page).
* Providing a query mechanism through [filter expressions](/api/javascript/data/datasource/methods/filter).

## Binding to Local Data

To bind the DataSource to local data, assign an array of JavaScript objects to the `data` configuration property of the DataSource instance.

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

## Binding to Remote Data Services

When you bind the DataSource to remote data, the component requires information about the web service URLs, the request type, the response data type, and the structure (`schema`) of the response if it is more complex than a plain array of objects. You can also provide custom parameters which will be submitted during the data request.

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                // The remote service url.
                url: "http://api.openweathermap.org/data/2.5/find",

                // The request type.
                type: "get",

                // The data type of the returned result.
                dataType: "json",

                // The additional custom parameters sent to the remote service.
                data: {
                    lat: 42.42,
                    lon: 23.20,
                    cnt: 10
                }
            }
        },
        // Describe the result format.
        schema: {
            // The data to which the DataSource will be bound is in the "list" field of the response.
            data: "list"
        }
    });

## Using the Mixed Data Operation Mode

All data operations have to occur either on the server or on the client. While you can still determine that part of the data operations will be held on the server and part on the client, using the DataSource in its mixed data-operation mode leads to undesired side effects. For example, if `serverPaging` is enabled and `serverFiltering` is disabled, the DataSource will filter only the data from the current page and the user will see less results than expected. In other scenarios, the DataSource might make more requests than necessary for the data operations to execute.

## Widget Binding

Kendo UI widgets support data binding and use the DataSource component as a binding source for both local and remote data.

The following example demonstrates how to create a DataSource inline with the other Kendo UI widget settings.

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

The following example demonstrates how to create a shared DataSource and allow multiple Kendo UI widgets to bind to the same data collection. Using a shared DataSource decreases the data requests, improves the performance, and provides automatic synchronized refreshing of all the bound widgets when the data changes.

    var sharedDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "data-service.json",
                dataType: "json"
            }
        }
    });

    // Bind two UI widgets to the same DataSource.
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

* [Basic Usage]({% slug basicusage_kendoui_datasourcecomponent %})
* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [CRUD Data Operations]({% slug cruddataoperations_kendoui_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
