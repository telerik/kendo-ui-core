---
title: CRUD Data Operations
page_title: CRUD Data Operations | Kendo UI Data Source
description: "Learn how to use the Kendo UI DataSource component for CRUD data operations."
slug: cruddataoperations_kendoui_datasourcecomponent
position: 5
---

# CRUD Data Operations

The [Kendo UI DataSource component](http://demos.telerik.com/kendo-ui/datasource/index) fully supports the CRUD (Create, Read, Update, Destroy) data operations. However, it must be combined with some user interface or another Kendo UI widget, such as the Grid, ListView, etc. Note that even though the examples below use the Grid as a sample, the configurations apply to any other widget or scenario.

## Concepts

### Transport

The DataSource component can work with local data or remote data. In both cases the CRUD operations are managed by the Kendo UI DataSource `transport`. This is a Javascript object that can be configured to execute predefined functions or make requests to predefined URLs on certain events.

For detailed information on the DataSource `transport`, refer to the [DataSource API documentation](/api/javascript/data/datasource#configuration-transport).

### Schema

The DataSource `schema` has several important roles, with the most notable ones being:

* Define the `data` field types in `schema.model.fields`. This ensures the correct sorting and filtering, and corrects the usage of default field editors, such as a numeric textbox for numeric data.
* Define the `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items.
* Define the `key`, which points to the data items array in `schema.data`. This is required when the data does not represent a plain array of objects or JSON.

You must configure the first two settings no matter whether local or remote CRUD operations are used. The only case when they are not needed is for scenarios when all data fields are of the string type and there is no editing.

For detailed information on the DataSource `schema`, refer to the [DataSource API documentation](/api/javascript/data/datasource#configuration-schema).

## Local or Custom Transport CRUD Operations

The information in this section is applicable to scenarios, in which the data is already available on the client, or when it is you that is going to take care of its retrieval and submission. In other words, the Kendo UI DataSource will not make any HTTP requests on its own.

### Read (Local)

When a Kendo UI DataSource instance must be bound to local data without the need to support editing, it is sufficient to use the `data` option, as demonstrated below.

###### Example

    var dataSource = new kendo.data.DataSource({
        data: sampleData
    }

However, when editing is going to be used, a `transport` configuration is required. The `data` option is no longer needed. The `read` method of the `transport` should pass a local variable. It can even make a custom Ajax request and then pass the response.

###### Example

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

Executing the `success` method of the `read` function argument populates the DataSource instance and fire its `change` event. Executing the `error` method fires the `error` event of the DataSource, which can be handled.

For more information on handling errors in such scenarios, refer to the section about [error handling with local transport]({% slug cruddataoperations_kendoui_datasourcecomponent %}#local-or-custom-transport-error-handling).

### Update (Local)

The `update` configuration setting of the DataSource should define a function that handles the updated data items, received as a function argument. When `batch` is disabled, as it is by default, and only one data item can be updated at a time, the updated data item is received as an object in `e.data`. If `batch` is enabled and multiple data items can be updated, they are received as an array of objects in `e.data.models`. Again, the `success` or `error` method of the function argument must be executed at the end.

If the Grid is bound to an [`ObservableArray`](/api/javascript/data/observablearray), there is no need to manipulate the array manually. Only `e.success()` or `e.error()` should be called.

###### Example

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

<!--*-->

> **Important**
> * The Kendo UI DataSource uses the ID value to determine whether a data item is new or existing.
> * If the ID value is `zero`, it is assumed that the data item is new, so the `create` function is executed.
> * If you need to use zero ID values, then change the [`defaultValue`](/api/javascript/data/model#methods-Model.define) of the ID field to -1 in
[`schema.model.fields`](/api/javascript/data/datasource#configuration-schema.model).

### Create (Local)

The `create` function should perform a similar routine as the `update` one with a couple of notable differences:

* The newly created data items have no ID, so they must be added by the function script or returned by the remote service.
* The newly created data items must be returned in the `success` method with their IDs assigned. Otherwise, the DataSource instance is going to operate with incorrect data and subsequent data operations can fail.

If the Grid is bound to an [`ObservableArray`](/api/javascript/data/observablearray), there is no need to add the new item to the array manually. Only `e.success()` or `e.error()` should be called.

###### Example

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

<!--*-->
Also, check the notes on IDs in the above [Update (Local)]({% slug cruddataoperations_kendoui_datasourcecomponent %}#update-local) section.

### Destroy (Local)

The `destroy` function receives the items to be deleted in `e.data`, similar to `create` and `update`. The function should remove the provided items from the original datasource and return `success` or `error`.

If the Grid is bound to an [`ObservableArray`](/api/javascript/data/observablearray), there is no need to remove the item from the array manually. Only `e.success()` or `e.error()` should be called.

###### Example

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

<!--*-->
### Local or Custom Transport Error Handling

If any of the transport actions (read, update, create, destroy) fails, then information about this can and should be passed to the Kendo UI DataSource instance. This is achieved by executing `e.error()` instead of `e.success()` in the respective transport function. The `error` method accepts three parameters&mdash;Ajax request object, status code, and custom error message.

###### Example

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

### Examples

The complete example below uses the information above to demonstrate CRUD operations with simple Products data. `original datasource` signifies the `sampleData` variable, which is used to populate the Grid initially. All data operations are persisted in this variable, so that it can be used or submitted somewhere else.

If the Grid is bound to an [`ObservableArray`](/api/javascript/data/observablearray), there is no need to add, edit or remove items from the array manually. Only `e.success()` or `e.error()` should be called. When adding an item, it still needs an ID to be assigned.

###### Example

```html
    <style>html { font: 12px sans-serif; }</style>

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

            for (var j=0; j < l; j++) {
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
```

## Remote Transport CRUD Operations

The information in this section is applicable to scenarios, in which the data should be retrieved from and submitted to a remote data service via HTTP requests made by the Kendo UI DataSource.

CRUD operations with remote data rely on server code to perform the read, update, create and destroy actions. Instead of configuring client functions, the dataSource transport defines remote service URLs and the expected format in which data should be sent and received. Theoretically, it is possible to use remote CRUD operations with transport functions, similar to the above examples that use local data, but this is rarely required.

Each of the CRUD operation settings&mdash;read, update, create, destroy&mdash;provides some common transport settings that need to be set accordingly:

* The client request `type` can be `"get"` or `"post"`.
* Additional optional `data` parameters can be sent to the server if needed.
* The client request and expected server response `dataType` can be `"json"`, `"jsonp"`, `"odata"`, etc.

For detailed information on these settings, refer to the [article about the Kendo UI DataSource API](/api/javascript/data/datasource).

### Read (Remote)

The `read` service defined by the DataSource transport should return data in the expected format&mdash;JSON, JSONP, XML, OData. By default, the expected format is JSON. If the response is not a plain array of objects, a [`schema`](/api/javascript/data/datasource#configuration-schema) must be defined, which will describe the structure of the response and especially, [where the data is](/api/javascript/data/datasource#configuration-schema.data).

The example below uses a `read` transport configuration. The assumed server response is a plain JSON array of objects.

###### Example

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

<!--*-->
Here is a modified version of the above example, which requires the usage of a `schema`, due to the more complex response structure. The declared `itemCount` does not match the number of returned items, which is normal when using [server paging](/api/javascript/data/datasource#configuration-serverPaging)&mdash;the server response contains only the items from the current page, but information about the [total number of items](/api/javascript/data/datasource#configuration-schema.total) is provided, so that a correct paging interface can be generated, if needed.

###### Example

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

<!--*-->
If an error in the server code occurs, the server response can notify the client-side DataSource instance.

For more information on handling errors in such scenarios, refer to the section about [error handling with remote transport]({% slug cruddataoperations_kendoui_datasourcecomponent %}#error-handling-with-remote-transport).

### Update (Remote)

The `update` service expects the edited data items and should return the same items (including all data fields) as a confirmation of the successful save operation. An empty response is also treated as a valid success response.

###### Example

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

<!--*-->
Also, check the notes on IDs in the above [Update (Local)]({% slug cruddataoperations_kendoui_datasourcecomponent %}#update-local) section.

### Create (Remote)

The `create` action should perform a similar routine as `update`, with one notable difference&mdash;the newly created data items have no IDs, so they must be assigned server-side and returned by the remote service.

###### Example

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

<!--*-->
Also, check the notes on IDs in the above [Update (Local)]({% slug cruddataoperations_kendoui_datasourcecomponent %}#update-local) section.

### Destroy (Remote)

The `destroy` action submits the data items that should be deleted, or just its IDs. The expected response is similar to that of the `update` action&mdash;it can be empty, or it can include the same data items.

###### Example

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

<!--*-->
### Remote Transport Error Handling

In all four transport actions (read, update, create, destroy), an error can be triggered. There are two options:

* A standard error can be returned via an empty response and an [HTTP status code](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
* A custom error can be returned with a `200` HTTP status code and an error message assigned to an `errors` field in the response, or any other field, specified in [`schema.errors`](/api/javascript/data/datasource#configuration-schema.errors).

<!-- exit list -->

The two techniques cannot be combined, i.e. custom errors can be provided only with a `200` HTTP status code.

The example below demonstrates a standard error.

###### Example

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

<!--*-->
The example below demonstrates a custom error.

###### Example

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

<!--*-->
When an `error` event is fired, the DataSource does not process any data items, which may also be part of the server response. For example, if an update action fails due to conflicting edits, and the data needs to be refreshed from the server, you need to call the [`read`](/api/javascript/data/datasource#methods-read) method of the DataSource in the error handler. Sending the new data together with the error response is not going to populate the DataSource with the new values.

## Sample Apps and Examples

### Remote CRUD Operations with the Grid

To see the example on remote CRUD operations with a Kendo UI Grid, refer to the [online Grid Editing demos](http://demos.telerik.com/kendo-ui/grid/editing-inline).

### Remote CRUD Operations in ASP.NET MVC

To see the example on remote CRUD operations in ASP.NET MVC, refer to [this GitHub page](https://github.com/telerik/kendo-examples-asp-net).

### OpenEdge Integration Using JSDO

To run a sample mobile application, which uses the Kendo UI DataSource component to list and update records from an employee table, refer to [this GitHub page](https://github.com/CloudDataObject/sample-crud-app).

## See Also

Other articles on the Kendo UI DataSource component:

* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [Basic Usage]({% slug basicusage_kendoui_datasourcecomponent %})
* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
