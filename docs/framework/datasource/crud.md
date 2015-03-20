---
title: CRUD Operations
page_title: Kendo UI DataSource CRUD Operations
description: How to use the Kendo UI DataSource component for CRUD operations (create, read, update, destroy), i.e. editing
---

# Kendo UI DataSource CRUD Operations

The Kendo UI DataSource fully supports CRUD (Create, Read, Update, Destroy) data operations.
Surely, it must be combined with some user interface or another Kendo UI widget (Grid, ListView, etc).
The examples below will use a Grid, but the information applies for any other widget or scenario.

The DataSource can work with local data or remote data. In both cases the CRUD operations are managed by the so-called **Kendo UI Transport**.
This is a Javascript object that can be configured to execute predefined functions or make requests to predefined URLs on certain events.

## Schema

The DataSource schema has several important roles, some of which are:

* define the data field types in `schema.model.fields`. This will ensure correct sorting and filtering, and correct usage of default field editors (for example, a numeric textbox for numeric data)
* define the id field of the data items in `schema.model.id`. This will ensure correct adding, editing and deleting of items.

The above settings must be configured no matter whether local or remote CRUD operations are used.
The only case when they are not needed is for scenarios when all data fields are of string type and there is no editing.
Further details about the schema are provided in the [DataSource API documentation](/api/javascript/data/datasource#configuration-schema).

## CRUD Operations with Local Transport

### Read (Local)

When a Kendo UI DataSource instance must be bound to local data without the need to support editing, it is sufficient to use the `data` option like this:

    var dataSource = new kendo.data.DataSource({
        data: sampleData
    }

However, when editing will be used, then a `transport` configuration is required. The `data` option is no longer needed.
The `read` method of the `transport` should pass a local variable. It can even make a custom Ajax request and then pass the response.

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                // on success
                e.success(sampleData);
                // on failure
                //e.error("XHR response", "status code", "error message");
            }
        }
    }

Executing the `success` method of the `read` function argument will populate the DataSource instance and fire its `change` event.
Executing the `error` method will fire the `error` event of the DataSource, which can be handled - see [Error Handling with Local Transport](#error-handling-with-local-transport).

### Update (Local)

The `update` configuration setting of the DataSource should define a function that handles the updated data item(s), received as a function argument.
When `batch` is disabled (default) and only one data item can be updated at a time, the updated data item is received as an object in `e.data`. If `batch` is enabled and multiple data items can be
updated, they are received as an array of objects in `e.data.models`. Again, the `success` or `error` method of the function argument must be executed at the end.

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are ommitted for brevity */
            update: function (e) {
                // batch is enabled
                //var updateItems = e.data.models;
                // batch is disabled
                var updatedItem = e.data;

                // save the updated item to the original datasource
                // ...

                // on success
                e.success();
                // on failure
                //e.error("XHR response", "status code", "error message");
            }
        }
    });

### Create (Local)

The `create` function should perform a similar routine as `update`, with a couple of notable differences:

* The newly created data item(s) has no ID, so it must be added by the function script or returned by the remote service.
* The newly created data item(s) must be returned in the `success` method **with their IDs assigned**.
Otherwise the DataSource instance will operate with incorrect data and subsequent data operations can fail.

<!-- exit list -->

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are ommitted for brevity */
            create: function (e) {
                // batch is disabled
                // generate appropriate data item ID and save the new items to the original datasource
                e.data.my_ID_field_name = 123;
                // ...

                // on success return the new data items with IDs
                e.success(e.data);
                // on failure
                //e.error("XHR response", "status code", "error message");
            }
        }
    });

### Destroy (Local)

The `destroy` function receives the item(s) to be deleted in `e.data`, similar to `create` and `update`.
The function should remove the provided items from the original datasource and return `success` or `error`.

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are ommitted for brevity */
            destroy: function (e) {
                // remove items from the original datasource by using e.data

                // on success
                e.success();
                // on failure
                //e.error("XHR response", "status code", "error message");
            }
        }
    });

### Error handling with Local Transport

If any of the transport actions (read, update, create, destroy) fails, then information about this can and should be passed to the Kendo UI DataSource instance.
This is achieved by executing `e.error()` instead of `e.success()` in the respective transport function. The `error` method accepts three parameters -
Ajax request object, status code and custom error message.

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                // on success
                // e.success(sampleData);
                // on failure
                e.error("XHR response", "status code", "error message");
            }
        },
        error: function (e) {
            // handle error
            alert("Status: " + e.status + "; Error message: " + e.errorThrown);
        }
    });

### Complete example: Local CRUD Operations with the Kendo UI Grid

The following example uses the information above to demonstrate CRUD operations with simple Products data.
"original datasource" signifies the sampleData variable, which is used to populate the Grid initially.
All data operations are persisted in this variable, so that it can be used or submitted somewhere else.

    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>Kendo UI Grid - CRUD operations with local data</title>

    <style>html { font-size: 12px; font-family: Arial, Helvetica, sans-serif; }</style>
    <link href="http://cdn.kendostatic.com/2014.2.903/styles/kendo.common.min.css" rel="stylesheet" />
    <link href="http://cdn.kendostatic.com/2014.2.903/styles/kendo.default.min.css" rel="stylesheet" />

    <script src="http://cdn.kendostatic.com/2014.2.903/js/jquery.min.js"></script>
    <script src="http://cdn.kendostatic.com/2014.2.903/js/kendo.web.min.js"></script>
    </head>
    <body>

    <div id="grid"></div>

    <script>
        var sampleData = [
            {ProductID: 1, ProductName: "Apple iPhone 5s", Introduced: new Date(2013, 8, 10), UnitPrice: 525, Discontinued: false, UnitsInStock: 10},
            {ProductID: 2, ProductName: "HTC One M8", Introduced: new Date(2014, 2, 25), UnitPrice: 425, Discontinued: false, UnitsInStock: 3},
            {ProductID: 3, ProductName: "Nokia 5880", Introduced: new Date(2008, 10, 2), UnitPrice: 275, Discontinued: true, UnitsInStock: 0}
        ];

        // custom logic start

        var sampleDataNextID = sampleData.length + 1;

        function getIndexById(id) {
            var idx,
                l = sampleData.length;

            for (var j; j < l; j++) {
                if (sampleData[j].ProductID == id) {
                    return j;
                }
            }
            return null;
        }

        // custom logic end

        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        // on success
                        e.success(sampleData);
                        // on failure
                        //e.error("XHR response", "status code", "error message");
                    },
                    create: function (e) {
                        // assign an ID to the new item
                        e.data.ProductID = sampleDataNextID++;
                        // save data item to the original datasource
                        sampleData.push(e.data);
                        // on success
                        e.success(e.data);
                        // on failure
                        //e.error("XHR response", "status code", "error message");
                    },
                    update: function (e) {
                        // locate item in original datasource and update it
                        sampleData[getIndexById(e.data.ProductID)] = e.data;
                        // on success
                        e.success();
                        // on failure
                        //e.error("XHR response", "status code", "error message");
                    },
                    destroy: function (e) {
                        // locate item in original datasource and remove it
                        sampleData.splice(getIndexById(e.data.ProductID), 1);
                        // on success
                        e.success();
                        // on failure
                        //e.error("XHR response", "status code", "error message");
                    }
                },
                error: function (e) {
                    // handle data operation error
                    alert("Status: " + e.status + "; Error message: " + e.errorThrown);
                },
                pageSize: 10,
                batch: false,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { validation: { required: true } },
                            Introduced: { type: "date" },
                            UnitPrice: { type: "number", validation: { required: true, min: 1} },
                            Discontinued: { type: "boolean" },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                }
            });

            $("#grid").kendoGrid({
                dataSource: dataSource,
                pageable: true,
                toolbar: ["create"],
                columns: [
                    { field: "ProductName", title: "Mobile Phone" },
                    { field: "Introduced", title: "Introduced", format: "{0:yyyy/MM/dd}", width: "200px" },
                    { field: "UnitPrice", title: "Price", format: "{0:c}", width: "120px" },
                    { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
                    { field: "Discontinued", width: "120px" },
                    { command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
                ],
                editable: "inline"
            });
        });
    </script>

    </body>
    </html>

## CRUD Operations with Remote Transport

CRUD operations with remote data rely on server code to perform the read, update, create and destroy actions.
Instead of configuring client functions, the dataSource transport defines remote service URLs and the expected format in which data should be sent and received.
Theoretically, it is possible to use remote CRUD operations with transport functions, similar to the above examples that use local data, but this is rarely required.

Each of the CRUD operation settings (read, update, create, destroy) provides some common transport settings that need to be set accordingly:

* the client request `type` can be `"get"` or `"post"`
* additional optional `data` parameters can be sent to the server if needed
* the client request and expected server response `dataType` can be `"json"`, `"jsonp"`, `"odata"`, etc.

All these settings are described in detail in the [Kendo UI DataSource API](/api/javascript/data/datasource).

### Read (Remote)

The read service defined by the DataSource transport should return data in the expected format (JSON, JSONP, XML, OData). By default, the expected format is JSON.

If the response is **not** a plain array of objects, a [`schema`](/api/javascript/data/datasource#configuration-schema) must be defined, which will describe the structure of the response
and especially, [where the data is](/api/javascript/data/datasource#configuration-schema.data).

Here is a simple example with a read transport configuration. The assumed server response is a plain JSON array of objects.

    /*Server response:

    [{
        "ProductID": 1,
        "ProductName": "Bananas"
    },{
        "ProductID": 2,
        "ProductName": "Pijamas"
    }]

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "service/products/read/",
                type: "post",
                dataType: "json"
            }
        }
    });

Here is a modified version of the above example, which requires the usage of a `schema`, due to the more complex response structure.
The declared `itemCount` does not match the number of returned items, which is normal when using [server paging](/api/javascript/data/datasource#configuration-serverPaging) -
the server response contains only the items from the current page,
but information about the [total number of items](/api/javascript/data/datasource#configuration-schema.total) is provided,
so that a correct paging interface can be generated, if needed.

    /*Server response:

    {
        "itemCount": 10,
        "items": [{
            "ProductID": 1,
            "ProductName": "Bananas"
        },{
            "ProductID": 2,
            "ProductName": "Pijamas"
        }]
    }

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "service/products/read/",
                type: "post",
                dataType: "json"
            }
        },
        schema: {
            data: "items",
            total: "itemCount"
        },
        serverPaging: true
    });

If an error in the server code occurs, the server response can notify the client-side DataSource instance.
See [Error Handling with Remote Transport](#error-handling-with-remote-transport).

### Update (Remote)

The update service expects the edited data item(s) and should return the same item(s) as a confirmation of the successful save operation.
An empty response is also treated as a valid success response.

    /*Client POST request:

    ProductID: 1
    ProductName: "Fresh yellow bananas"

    Server response:

    [{
        "ProductID": 1,
        "ProductName": "Fresh yellow bananas"
    }]

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are ommitted for brevity */
            update: {
                url: "service/products/create/",
                type: "post"
            }
        }
    });

### Create (Remote)

The `create` action should perform a similar routine as `update`, with one notable difference:
the newly created data item(s) has no ID, so it must be assigned server-side and returned by the remote service.

It is possible to return only the ID field(s) and value(s).
In this case these IDs will be assigned to the client-side data items in the same order in which the newly created data items have been submitted.

    /*Client POST request:

    ProductName: "Fresh yellow bananas"

    Server response:

    [{
        "ProductID": 1,
        "ProductName": "Fresh yellow bananas"
    }]

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are ommitted for brevity */
            create: {
                url: "service/products/create/",
                type: "post"
            }
        }
    });

### Destroy (Remote)

The `destroy` action submits the data item(s) that should be deleted, or just its ID(s).
The expected response is similar to that of the `update` action - it can be empty, or it can include the same data item(s).

    /*Client POST request:

    ProductID: 1
    ProductName: "Fresh yellow bananas"

    Server response:

    [{
        "ProductID": 1,
        "ProductName": "Fresh yellow bananas"
    }]

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are ommitted for brevity */
            destroy: {
                url: "service/products/destroy/",
                type: "post"
            }
        }
    });

### Error handling with Remote Transport

In all four transport actions (read, update, create, destroy), an error can be triggered.
There are two options:

* A standard error can be returned via an empty response and an [HTTP status code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
* A custom error can be returned with a 200 HTTP status code and an error message assigned to an `errors` field in the response,
or any other field, specified in [`schema.errors`](/api/javascript/data/datasource#configuration-schema.errors).

<!-- exit list -->

The two techniques cannot be combined, i.e. custom errors can be provided only with a 200 HTTP status code.

Here is a standard error example:

    /* Server response:

    HTTP status code: 401 Unathorized
    Response body: empty

    */
    var dataSource = new kendo.data.DataSource({
        /* the other CRUD settings are ommitted for brevity */
        error: function (e) {
            /* the e event argument will represent the following object:

            {
                errorThrown: "Unauthorized",
                sender: {... the Kendo UI DataSource instance ...}
                status: "error"
                xhr: {... the Ajax request object ...}
            }

            */
            alert("Status: " + e.status + "; Error message: " + e.errorThrown);
        }
    });

Here is a custom error example:

    /* Server response:

    HTTP status code: 200 OK
    Response body: { "errors": ["foo", "bar"] }

    */
    var dataSource = new kendo.data.DataSource({
        /* the other CRUD settings are ommitted for brevity */
        error: function (e) {
            /* the e event argument will represent the following object:

            {
                errorThrown: "custom error",
                errors: ["foo", "bar"]
                sender: {... the Kendo UI DataSource instance ...}
                status: "customerror"
                xhr: null
            }

            */
            alert("Errors: " + e.errors.join("; "));
        }
    });

When an error event is fired, the DataSource will not process any data items, which may also be part of the server response.
For example, if an update action fails due to conflicting edits, and the data needs to be refreshed from the server,
you will need to call the [`read`](/api/javascript/data/datasource#methods-read) method of the DataSource in the error handler.
Sending the new data together with the error response will not populate the DataSource with the new values.

### Examples: Remote CRUD Operations with the Kendo UI Grid

Please refer to the [online Grid Editing demos](http://demos.telerik.com/kendo-ui/grid/editing-inline).

## CRUD Examples with ASP.NET MVC

More examples with CRUD operations in ASP.NET MVC can be found [here](https://github.com/telerik/kendo-examples-asp-net)
