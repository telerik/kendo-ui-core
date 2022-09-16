---
title: CRUD Data Operations
page_title: CRUD Data Operations | Kendo UI Data Source
description: "Learn how to use the Kendo UI DataSource component for CRUD data operations."
slug: cruddataoperations_kendoui_datasourcecomponent
position: 5
---

# CRUD Data Operations

The [Kendo UI DataSource component](https://demos.telerik.com/kendo-ui/datasource/index) fully supports CRUD (Create, Read, Update, Destroy) data operations.

However, it must be combined with some user interface or another Kendo UI widget such as the Grid, ListView, etc. Though the examples below use the Grid as a sample, the configurations apply to any other widget or scenario.

## Setting the Transport

The DataSource component can work with local data or remote data. In both cases, the CRUD operations are managed by the `transport` configuration of the DataSource. `transport` is a JavaScript object that can be configured to execute predefined functions or make requests to predefined URLs on certain events. For detailed information on the DataSource `transport`, refer to the [DataSource API documentation](/api/javascript/data/datasource/configuration/transport).

> You have to define all transport actions (read, update, create, destroy) in the same way&mdash;for example, as functions (when using local or custom transport), or as objects (when using remote transport). It is not possible to mix the two configuration alternatives.

## Setting the Schema

The `schema` of the DataSource is responsible for the a number of data-connectivity actions. For detailed information on the DataSource `schema`, refer to the [DataSource API documentation](/api/javascript/data/datasource/configuration/schema).

The `schema` configuration defines the following fields and field types:

* The `data` field types in `schema.model.fields`. This ensures the correct sorting and filtering, and corrects the usage of default field editors, such as a numeric textbox for numeric data. You have to configure `data` for both local and remote data scenarios. You can only skip the definition of `data` when all data fields are of the string type and editing is disabled.
* The `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items. This field must be present in the data. You have to configure `id` for both local and remote data scenarios. You can only skip the definition of `id` when all data fields are of the string type and editing is disabled.

    The field that is used as a model ID has default values that are used by the DataSource component to identify new items. If the value of an item in the data set matches the default value, it will be considered a new item. The default values per field type are:

    ```
    "string": "",
    "number": 0,
    "date": new Date(),
    "boolean": false,
    "default": ""
    ```

    The value of the denoted field in `schema.model.id` will also be set to the field with an `id` name in the actual data object. The field with the `id` name is a reserved field for the DataSource and will always be populated with the default value for its type or with the data from the actual data that is supplied by the developer.

* The `key`, which points to the data items array in `schema.data`. This is required when the data does not represent a plain array of objects or JSON.

## Setting the Local CRUD Operations

The following information is applicable to scenarios in which the data is already available on the client, or when you will have to take care of its retrieval and submission and the Kendo UI DataSource will not make any HTTP requests on its own.

### Local Read Operations

When you have to bind a Kendo UI DataSource instance to local data without the need to support editing, use the `data` option.

    var dataSource = new kendo.data.DataSource({
        data: sampleData
    }

When you will use editing, you are required to provide a `transport` configuration. The `data` option is no longer needed. The `read` method of the `transport` has to pass a local variable and it can make a custom AJAX request and then pass the response.

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                // On success.
                e.success(sampleData);
                // On failure.
                // e.error("XHR response", "status code", "error message");
            }
        }
    }

Executing the `success` method of the `read` function argument populates the DataSource instance and fires its `change` event. Executing the `error` method fires the `error` event of the DataSource which can be handled. For more information on handling errors in such scenarios, refer to the section about [error handling with local transport]({% slug cruddataoperations_kendoui_datasourcecomponent %}#local-or-custom-transport-error-handling).

### Local Update Operations

The `update` configuration setting of the DataSource defines a function that handles the updated data items which are received as a function argument. When `batch` is disabled, as it is by default, and only one data item can be updated at a time, the updated data item is received as an object in `e.data`. If `batch` is enabled and multiple data items can be updated, they are received as an array of objects in `e.data.models`. You have to execute the `success` or `error` method of the function argument at the end.

> * The Kendo UI DataSource uses the `ID` value to determine whether a data item is new or existing.
> * If the `ID` value is `zero`, it is assumed that the data item is new so the `create` function is executed.
> * If you need to use zero `ID` values, then change the [`defaultValue`](/api/javascript/data/model/methods/define) of the ID field to `-1` (minus one) in
[`schema.model.fields`](/api/javascript/data/datasource/configuration/schema.model).

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are omitted for brevity */
            update: function (e) {
                // Batch is enabled.
                // var updateItems = e.data.models;
                // Batch is disabled.
                var updatedItem = e.data;

                // Save the updated item to the original datasource.
                // ...

                // On success.
                e.success();
                // On failure.
                // e.error("XHR response", "status code", "error message");
            }
        }
    });

<!--*-->

### Local Create Operations

The `create` function performs a similar routine as `update` with the following differences:

* The newly created data items have no `ID` so they must be added by the function script or returned by the remote service.
* The newly created data items must be returned in the `success` method with their IDs assigned. Otherwise, the DataSource instance will operate with incorrect data and subsequent data operations can fail.
* If the [`schema.data`](/api/javascript/data/datasource/configuration/schema.data) configuration is set, the `success` method receives the created data item in an object with the same structure as the object that is passed to the `success` method of the `read` function. For more information, refer to the following example and to the previous section on [local update operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#update-local).

<!-- exit list -->

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are omitted for brevity */
            create: function (e) {
                // Batch is disabled.
                // Generate appropriate data item ID and save the new items to the original datasource.
                e.data.my_ID_field_name = 123;
                // ...

                // On success return the new data items with IDs (assuming schema.data is NOT SET).
                e.success(e.data);

                // If schema.data IS SET (for example to "foo"), use the following syntax instead:
                // e.success({"foo": [e.data]});

                // On failure.
                // e.error("XHR response", "status code", "error message");
            }
        }
    });

<!--*-->

### Local Destroy Operations

Similar to `create` and `update`, the `destroy` function receives the items that will be deleted in `e.data`. The function removes the provided items from the original DataSource and returns `success` or `error`.

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* the other CRUD settings are omitted for brevity */
            destroy: function (e) {
                // Remove items from the original datasource by using e.data.

                // On success.
                e.success();
                // On failure.
                // e.error("XHR response", "status code", "error message");
            }
        }
    });

<!--*-->
### Local Transport Error Handling

If any of the `transport` actions (read, update, create, destroy) fails, then you have to pass information about this to the DataSource instance by executing `e.error()` instead of `e.success()` in the respective `transport` function. The `error` method accepts the AJAX request object, status code, and custom error message parameters.

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (e) {
                // On success.
                // e.success(sampleData);
                // On failure.
                e.error("XHR response", "status code", "error message");
            }
        },
        error: function (e) {
            // Handle error.
            alert("Status: " + e.status + "; Error message: " + e.errorThrown);
        }
    });

### Examples

The following example is the complete implementation based on the previous information and demonstrates CRUD operations with simple **Products** data. `original datasource` signifies the `sampleData` variable which is used to populate the Grid initially. All data operations are persisted in this variable so that it can be used or submitted somewhere else. Avoid using an [`ObservableArray`](/api/javascript/data/observablearray) instead of a plain JavaScript array in the example. The Kendo UI DataSource will wrap the provided plain array and transform it to a collection of [`ObservableObjects`](/api/javascript/data/observableobject) automatically.

```dojo
    <style>html { font: 12px sans-serif; }</style>

    <div id="grid"></div>

    <script>
        var sampleData = [
            {ProductID: 1, ProductName: "Apple iPhone 5s", Introduced: new Date(2013, 8, 10), UnitPrice: 525, Discontinued: false, UnitsInStock: 10},
            {ProductID: 2, ProductName: "HTC One M8", Introduced: new Date(2014, 2, 25), UnitPrice: 425, Discontinued: false, UnitsInStock: 3},
            {ProductID: 3, ProductName: "Nokia 5880", Introduced: new Date(2008, 10, 2), UnitPrice: 275, Discontinued: true, UnitsInStock: 0}
        ];

        // Custom logic start.
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

        // Custom logic end.
        $(document).ready(function () {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: function (e) {
                        // On success.
                        e.success(sampleData);
                        // On failure.
                        //e.error("XHR response", "status code", "error message");
                    },
                    create: function (e) {
                        // Assign an ID to the new item.
                        e.data.ProductID = sampleDataNextID++;
                        // Save data item to the original datasource.
                        sampleData.push(e.data);
                        // On success.
                        e.success(e.data);
                        // On failure.
                        //e.error("XHR response", "status code", "error message");
                    },
                    update: function (e) {
                        // Locate item in original datasource and update it.
                        sampleData[getIndexById(e.data.ProductID)] = e.data;
                        // On success.
                        e.success();
                        // On failure.
                        // e.error("XHR response", "status code", "error message");
                    },
                    destroy: function (e) {
                        // Locate item in original datasource and remove it.
                        sampleData.splice(getIndexById(e.data.ProductID), 1);
                        // On success.
                        e.success();
                        // On failure.
                        // e.error("XHR response", "status code", "error message");
                    }
                },
                error: function (e) {
                    // Handle data operation error.
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

## Setting the Remote CRUD Operations

The following information is applicable to scenarios in which you have to retrieve the data from and submit it to a remote data service through HTTP requests that are made by the Kendo UI DataSource.

CRUD operations with remote data rely on server code to perform the read, update, create, and destroy actions. Instead of configuring client functions, the `transport` of the DataSource defines remote service URLs and the expected format in which the data has to be sent and received. Theoretically, similar to the previous examples that use local data, you can use remote CRUD operations with `transport` functions but this is rarely required.

Each of the CRUD operation settings&mdash;read, update, create, destroy&mdash;provides the following common `transport` settings that you have to set accordingly. For more information, refer to the [API of the Kendo UI DataSource](/api/javascript/data/datasource).

* The client request `type` can be `"get"` or `"post"`.
* Additional optional `data` parameters can be sent to the server if needed.
* The client request and expected server response `dataType` can be `"json"`, `"jsonp"`, `"odata"`, etc.

### Remote Read Operations

The `read` service defined by the DataSource `transport` returns data in the expected JSON, JSONP, XML, or oData format. By default, the expected format is JSON. If the response is not a plain array of objects, you have to define a [`schema`](/api/javascript/data/datasource/configuration/schema) which will describe the structure of the response and [where the data is](/api/javascript/data/datasource/configuration/schema.data).

The following example uses a `read` transport configuration. The assumed server response is a plain JSON array of objects.

    /* Server response:

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
The following example is a modified version of the previous one which, due to the more complex response structure, requires the usage of a `schema`. The declared `itemCount` does not match the number of returned items which is normal when you use [server paging](/api/javascript/data/datasource/configuration/serverpaging). The server response contains only the items from the current page but provides information about the [total number of items](/api/javascript/data/datasource/configuration/schema.total) so that you can generate a correct paging interface if needed.

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

* For more information on handling errors in such scenarios, refer to the section about [error handling with remote transport]({% slug cruddataoperations_kendoui_datasourcecomponent %}#error-handling-with-remote-transport).
* For more information on handling repetitive requests performed while filtering in ASP.NET, refer to [this troubleshooting topic]({% slug troubleshooting_common_issues_combobox_kendoui %}#repetitive-requests-are-performed-while-filtering-in-aspnet).

### Remote Update Operation

The `update` service expects the edited data items and returns the same items (including all data fields) as a confirmation of the successful save operation. An empty response is also treated as a valid success response. If [`schema.data`](/api/javascript/data/datasource/configuration/schema.data) is set and the server response is not empty, then the server response must have the same structure as the response of the `read` request. For more information, refer to the previous section on [local update operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#update-local).

The following example demonstrates a case with no `schema.data`.

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
            /* the other CRUD settings are omitted for brevity */
            update: {
                url: "service/products/update/",
                type: "post"
            }
        }
    });

<!--*-->
The following example demonstrates a case with `schema.data`.

    /*Client POST request:

    ProductID: 1
    ProductName: "Fresh yellow bananas"

    Server response:

    {
        "items": [{
            "ProductID": 1,
            "ProductName": "Fresh yellow bananas"
        }]
    }

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* The other CRUD settings are omitted for brevity. */
            update: {
                url: "service/products/update/",
                type: "post"
            }
        },
        schema: {
            data: "items"
        }
    });

<!--*-->

### Remote Create Operations

The `create` action performs a similar routine as `update` with the notable difference that the newly created data items have no IDs so they must be assigned server-side and returned by the remote service. If [`schema.data`](/api/javascript/data/datasource/configuration/schema.data) is set, then the server response will have the same structure as the response of the `read` request. For more information, refer to the previous section on [local update operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}#update-local).

The following example demonstrates a case with no `schema.data`.

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
            /* The other CRUD settings are omitted for brevity */
            create: {
                url: "service/products/create/",
                type: "post"
            }
        }
    });

 with schema.data

    /*Client POST request:

    ProductName: "Fresh yellow bananas"

    Server response:

    {
        "items": [{
            "ProductID": 1,
            "ProductName": "Fresh yellow bananas"
        }]
    }

    */

    var dataSource = new kendo.data.DataSource({
        transport: {
            /* The other CRUD settings are omitted for brevity. */
            create: {
                url: "service/products/create/",
                type: "post"
            }
        },
        schema: {
            data: "items"
        }
    });

<!--*-->

### Remote Destroy Operations

The `destroy` action submits the data items that will be deleted or only their IDs. The expected response is similar to that of the `update` action&mdash;it can be empty or it can include the same data items.

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
            /* the other CRUD settings are omitted for brevity */
            destroy: {
                url: "service/products/destroy/",
                type: "post"
            }
        }
    });

<!--*-->
### Remote Transport Error Handling

If any of the `transport` actions (read, update, create, destroy) fails and errors occur, use either of the following approaches to handle them:

* A standard error can be returned through an empty response and an [HTTP status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).
* A custom error can be returned with a `200` HTTP status code and an error message assigned to an `errors` field in the response or to any other field which is specified in [`schema.errors`](/api/javascript/data/datasource/configuration/schema.errors).

> The two approaches cannot be combined, that is, custom errors can be provided only with a `200` HTTP status code.

When an `error` event is fired, the DataSource does not process any data items which may also be part of the server response. For example, if an update action fails due to conflicting edits and the data needs to be refreshed from the server, call the [`read`](/api/javascript/data/datasource/methods/read) method of the DataSource in the error handler. Sending the new data together with the error response will not populate the DataSource with the new values.

The following example demonstrates a standard error.

    /*Server response:

    HTTP status code: 401 Unathorized
    Response body: empty

    */
    var dataSource = new kendo.data.DataSource({
        /* The other CRUD settings are omitted for brevity. */
        error: function (e) {
            /* The e event argument will represent the following object:

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
The following example demonstrates a custom error.

    /*Server response:

    HTTP status code: 200 OK
    Response body: { "errors": ["foo", "bar"] }

    */
    var dataSource = new kendo.data.DataSource({
        /* The other CRUD settings are omitted for brevity. */
        error: function (e) {
            /* The e event argument will represent the following object:

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

## Submitting All Items with a Single Request

When you use custom transport, the create, update, and delete operations will be handled by the [`transport.submit`](/api/javascript/data/datasource/configuration/transport.submit) function in a single batch. You are also required to define `transport.read` as a function. The `transport.create`, `transport.update`, and `transport.delete` operations will not be executed in this case.

> In order for the defined function to invoke a single request for all read, create, update, and delete operation, set the DataSource in its [batch mode](/api/javascript/data/datasource#configuration-batch).

```dojo
<script>
    var dataSource = new kendo.data.DataSource({
        transport: {
            read:  function(options){
                $.ajax({
                    url: "https://demos.telerik.com/kendo-ui/service/products",
                    dataType: "jsonp",
                    success: function(result) {
                        options.success(result);
                    },
                    error: function(result) {
                        options.error(result);
                    }
                });
            },
            submit: function(e) {
                var data = e.data;
                console.log(data);

                // Send batch update to desired URL, then notify success/error.

                e.success(data.updated,"update");
                e.success(data.created,"create");
                e.success(data.destroyed,"destroy");
                e.error(null, "customerror", "custom error");
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
            id: "ProductID",
            fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
            }
        }
    }
});

dataSource.read().then(function(){
    var productOne = dataSource.at(1),
        productTwo = dataSource.at(2);

    productOne.set("UnitPrice",42);
    productTwo.set("UnitPrice",42);
    dataSource.sync();
});
</script>
```

## Sample Projects and Examples

* For the example on using remote CRUD operations with a Kendo UI Grid, refer to the [online Grid Editing demos](https://demos.telerik.com/kendo-ui/grid/editing-inline).
* For the example on using remote CRUD operations in ASP.NET MVC, refer to [this GitHub page](https://github.com/telerik/kendo-examples-asp-net).
* For a sample mobile application on OpenEdge integration that uses JSDO and a Kendo UI DataSource component to list and update records from an employee table, refer to [this GitHub page](https://github.com/CloudDataObject/sample-crud-app).

## See Also

* [DataSource Overview]({% slug overview_kendoui_datasourcecomponent %})
* [Basic Usage]({% slug basicusage_kendoui_datasourcecomponent %})
* [Offline Support]({% slug offlinesupport_kendoui_datasourcecomponent %})
* [CORS Data Fetching from Another Domain]({% slug corsdatafetching_anotherdomain_datasourcecomponent %})
* [DataSource JavaScript API Reference](/api/javascript/data/datasource)
